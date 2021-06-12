import Task from './task.schema';
import { ITask, ITaskModel } from './task.interface';
import { ObjectID } from 'bson';
class TaskModel {
  public async create(body: ITask) {
    let T: ITaskModel = new Task(body);
    return await T.add();
  }

  public async fetchTask(user: string) {
    return await Task.find({ user: new ObjectID(user) }).lean();
  }

  public async fetchAllTasks() {
    return await Task.find().lean();
  }

  public async deleteTask(id: string) {
    return await Task.findByIdAndDelete(id).lean();
  }
}

export default new TaskModel();
