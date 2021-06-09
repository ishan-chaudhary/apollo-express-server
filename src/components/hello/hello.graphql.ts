import { IResolvers } from 'graphql-tools';
import { GraphQLResolveInfo } from 'graphql';
import { Hello } from './hello.interface';

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
