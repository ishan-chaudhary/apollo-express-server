import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import schema from './lib/services/GrahqlSchema';
import dbConnection from './lib/services/dbConnection';

const app: express.Application = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

dbConnection.mongoConnection();

export { app };
