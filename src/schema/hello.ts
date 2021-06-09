import { IResolvers } from 'graphql-tools';
import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../models/context';
import { Hello } from '../models/hello';

export const typeDef = `
  type Hello{
    sentence:String
  }

  extend type Query{
    helloWorld:Hello
  }
`;

export const resolver: IResolvers = {
  Query: {
    helloWorld: (_: void, args: void, ctx: Context, info: GraphQLResolveInfo): Hello => {
      return { sentence: "It's Back" };
    },
  },
};
