import { Document } from 'mongoose';

export interface IUser {
  firstName: string;
  email: string;
  password: string;
  token?: string;
}

export interface IUserModel extends Document, IUser {
  add(): Promise<IUserModel>;
}
