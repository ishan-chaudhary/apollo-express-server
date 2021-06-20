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
    logInUser(email:String!,password:String!):User
  }
`;

export const resolver: IResolvers = {
  Query: {
    users: async (_: void, args: void, ctx: Context, info: GraphQLResolveInfo) => {
      return await User.fetchAllUsers();
    },
    user: async (_: void, { id }: { id: string }, ctx: Context, info: GraphQLResolveInfo) => {
      return await User.fetchUser(id);
    },
  },
  Mutation: {
    addUser: async (
      _: void,
      { email, password, firstName }: IUser,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => {
      return await User.create({ firstName, email, password });
    },
    logInUser: async (_: void, { email, password }: IUser, ctx: Context, info: GraphQLResolveInfo) => {
      return await User.logIn(email, password);
    },
  },
};
