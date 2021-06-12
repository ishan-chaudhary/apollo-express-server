import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import schema from './lib/services/GrahqlSchema';
import dbConnection from './lib/services/dbConnection';
import User from './components/user/user.model';

const app: express.Application = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
  context: async ({ req }) => {
    console.log(req.headers.authorization);
    let user = await User.fetchUserByToken(req.headers.authorization || null);
    return { user };
  },
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

dbConnection.mongoConnection();

export { app };
