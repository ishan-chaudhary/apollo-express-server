import { Model, model, Schema } from 'mongoose';
import { IUserModel } from './user.interface';

const UserSchema: Schema = new Schema({
  firstName: String,
  password: String,
  token: String,
  email: String,
});

UserSchema.methods.add = async function () {
  return this.save();
};

const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default User;
