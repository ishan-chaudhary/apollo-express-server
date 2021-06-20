import User from './user.schema';
import { IUser, IUserModel } from './user.interface';
import { generateToken, verifyToken } from '../../lib/helpers/index';
import { ApolloError, AuthenticationError, UserInputError } from 'apollo-server-express';

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
      if (!user) throw new AuthenticationError('Invalid Token');
      return await User.findById(user.id);
    } else {
      return null;
    }
  }

  public async logIn(email: string, password: string) {
    try {
      if (email && password) {
        let u = await User.findOne({ email, password });
        if (u) {
          return u;
        } else {
          throw new UserInputError('Invalid Email Id and password');
        }
      } else {
        throw new UserInputError('Email and Password are incorrect');
      }
    } catch (err) {
      console.log(err);
      throw new ApolloError('Internal Server Error');
    }
  }
}

export default new UserModel();
