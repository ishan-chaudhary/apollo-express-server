import User from './user.schema';
import { IUser, IUserModel } from './user.interface';
import { generateToken, verifyToken } from '../../lib/helpers/index';

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

  public async fetchUserByToken(token: string | null) {
    if (token) {
      let { user }: any = await verifyToken(token.split(' ')[1]);
      return await User.findById(user.id);
    } else {
      return {};
    }
  }
}

export default new UserModel();
