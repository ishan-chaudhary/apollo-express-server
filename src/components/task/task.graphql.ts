import { IResolvers } from 'graphql-tools';
import { GraphQLResolveInfo } from 'graphql';
import Task from './task.model';
import User from '../user/user.model';
import { ITask } from './task.interface';
import { ApolloError } from 'apollo-server-express';

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

    input newTask{
      title:String! , comment: String , startDate: String , endDate: String
    }

    extend type Mutation{
      addTask(task:newTask):Task,
      deleteTask(id:ID!):Task
    }

    extend type Query{
      getTask:[Task],
      allTasks:[Task]
    }

    extend type User{
      tasks:[Task] 
    }
`;

export const resolver: IResolvers = {
  Query: {
    getTask: async (_: void, args: any, { user }: Context, info: GraphQLResolveInfo) => {
      if (user) {
        return await Task.fetchTask(user._id);
      } else {
        throw new ApolloError('Not Authorised');
      }
    },
    allTasks: async (_: void, { user }: { user: string }, ctx: Context, info: GraphQLResolveInfo) => {
      return await Task.fetchAllTasks();
    },
  },
  Mutation: {
    addTask: async (_: void, { task }: { task: ITask }, { user }: Context, info: GraphQLResolveInfo) => {
      if (user) {
        task.user = user._id;
        return await Task.create(task);
      } else {
        throw new ApolloError('Not Authorised');
      }
    },
    deleteTask: async (_: void, { id }: { id: string }, ctx: Context, info: GraphQLResolveInfo) => {
      return await Task.deleteTask(id);
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
