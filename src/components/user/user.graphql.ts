import { IResolvers } from 'graphql-tools';
import { GraphQLResolveInfo } from 'graphql';
import { IUser } from './user.interface';
import User from './user.model';

export const typeDef = `
  type User{
    _id:ID
    firstName:String,
    email:String,
    password:String,
    token:String
  }
  extend type Query{
    users:[User]
    user(id:ID):User
  }
  extend type Mutation{
    addUser(email:String,!password:String!,firstName:String!):User
  }
`;

export const resolver: IResolvers = {
  Query: {
    users: (_: void, args: void, ctx: Context, info: GraphQLResolveInfo) => {
      return User.fetchAllUsers();
    },
    user: (_: void, { id }: { id: string }, ctx: Context, info: GraphQLResolveInfo) => {
      return User.fetchUser(id);
    },
  },
  Mutation: {
    addUser: (_: void, { email, password, firstName }: IUser, ctx: Context, info: GraphQLResolveInfo) => {
      return User.create({ firstName, email, password });
    },
  },
};
