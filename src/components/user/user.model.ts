import User from './user.schema';
import { IUser, IUserModel } from './user.interface';
import { generateToken } from '../../lib/helpers/index';

class UserModel {
  public async create(user: IUser): Promise<IUserModel> {
    let u: IUserModel = new User(user);
    u.token = await generateToken({ id: u._id });
    return await u.add();
  }

  public fetchAllUsers = async () => {
    return await User.find({});
  };
  public fetchUser = async (id: string) => {
    let data = await User.findById(id).lean();
    return data;
  };
}

export default new UserModel();
