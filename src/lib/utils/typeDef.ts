import { typeDef as HelloDef } from '../../components/hello/hello.graphql';
import { typeDef as UserDef } from '../../components/user/user.graphql';
import { typeDef as TaskDef } from '../../components/task/task.graphql';

const Query = `
  type Query {
    _empty: String
  }
  type Mutation{
    _empty:String
  }
`;

export default [Query, HelloDef, UserDef, TaskDef];
