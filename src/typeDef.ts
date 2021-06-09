import { typeDef as helloDef } from './schema/hello';

const Query = `
  type Query {
    _empty: String
  }
`;

export default [Query, helloDef];
