import { Schema, Model, model } from 'mongoose';
import { ITaskModel } from './task.interface';

const TaskSchema: Schema = new Schema({
  title: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  startDate: String,
  endDate: String,
  comment: String,
  completed: { type: Boolean, default: false },
});

TaskSchema.methods.add = async function () {
  return this.save();
};

const Task: Model<ITaskModel> = model<ITaskModel>('Task', TaskSchema);

export default Task;
