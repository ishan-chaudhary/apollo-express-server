import { Document } from 'mongoose';
import { IUserModel } from '../user/user.interface';

export interface ITask {
  title: string;
  user?: IUserModel['_id'];
  startDate: string;
  endDate: string;
  completed?: boolean;
  comment?: string;
}

export interface ITaskModel extends ITask, Document {
  add(): Promise<ITaskModel>;
}
