import { IResolvers } from 'graphql-tools';
import { GraphQLResolveInfo } from 'graphql';
import Task from './task.model';
import User from '../user/user.model';
import { ITask } from './task.interface';

export const typeDef = `
    type Task{
      _id:ID
      title:String
      user:User,
      comment:String,
      startDate:String,
      endDate:String,
      completed:Boolean
    }

    extend type Mutation{
      addTask(title:String! , user : String! , comment: String , startDate: String , endDate: String):Task
    }

    extend type Query{
      getTask(id:ID!):Task,
      allTasks:[Task]
    }

    extend type User{
      tasks:[Task] 
    }
`;

export const resolver: IResolvers = {
  Query: {
    getTask: async (_: void, { user }: { user: string }, ctx: Context, info: GraphQLResolveInfo) => {
      return await Task.fetchTask(user);
    },
    allTasks: async (_: void, { user }: { user: string }, ctx: Context, info: GraphQLResolveInfo) => {
      return await Task.fetchAllTasks();
    },
  },
  Mutation: {
    addTask: async (_: void, args: ITask, ctx: Context, info: GraphQLResolveInfo) => {
      return await Task.create(args);
    },
  },
  Task: {
    user: async ({ user }: { user: string }, args: void, ctx: Context, info: GraphQLResolveInfo) => {
      return await User.fetchUser(user);
    },
  },
  User: {
    tasks: async ({ _id }: { _id: string }, args: void, ctx: Context, info: GraphQLResolveInfo) => {
      return await Task.fetchTask(_id);
    },
  },
};
