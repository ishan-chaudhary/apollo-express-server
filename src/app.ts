import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import schema from './lib/services/GrahqlSchema';
import dbConnection from './lib/services/dbConnection';
import User from './components/user/user.model';
import ErrorLogs from './lib/utils/winston';
import { DatabaseError } from './lib/utils/errorHandler';

const app: express.Application = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
  context: async ({ req }) => {
    let user = await User.fetchUserByToken(req.headers.authorization || null);
    return user ? { user } : null;
  },
  formatError: (err) => {
    if (err.originalError instanceof DatabaseError) {
      return new Error('Internal Server Error');
    }
    return err;
  },
  plugins: [
    {
      requestDidStart(initialRequestContext) {
        return {
          executionDidStart(executionRequestContext) {
            return {
              willResolveField({ source, args, context, info }) {
                const start = new Date().getSeconds();
                return (error, result) => {
                  const end = new Date().getSeconds();
                  if (error) {
                    console.log(
                      `Field ${info.parentType.name}.${info.fieldName} took ${(end - start) * 1000}ms`
                    );
                    ErrorLogs.log({
                      level: 'error',
                      message: `Field ${info.parentType.name}.${info.fieldName} took ${
                        (end - start) * 1000
                      }ms.\n It failed with ${error}`,
                    });
                  }
                };
              },
            };
          },
        };
      },
    },
  ],
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

dbConnection.mongoConnection();

export { app };
