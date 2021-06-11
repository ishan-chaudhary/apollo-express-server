import 'graphql-import-node';
import typeDefs from '../utils/typeDef';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../utils/resolvers';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
