import { typeDef as helloDef } from './components/hello/hello.graphql';

const Query = `
  type Query {
    _empty: String
  }
`;

export default [Query, helloDef];
