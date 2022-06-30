import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { IUser } from '../interfaces/user.interface';
import ThrowError from '../helpers/throwError';
import Token from '../helpers/Token';

export default class LoginService {
  private token = Token;
  public login = async (email: string, password: string) => {
    const user = await User.findOne({
      where: { email },
    }) as unknown as IUser;

    if (!user) throw new ThrowError(401, 'Incorrect email or password');

    const verifyPass = bcrypt.compareSync(password, user.password);

    if (!verifyPass) throw new ThrowError(401, 'Incorrect email or password');

    const { id, username, role } = user;
    const tokenReturn = this.token.CreateToken({ user });
    return {
      user: {
        id, username, role, email,
      },
      token: tokenReturn,
    };
  };

  public validate = async (tokenParan: string) => {
    if (!tokenParan) {
      throw new ThrowError(401, 'must pass a token');
    } else {
      const role = this.token.OpenToken(tokenParan);
      return role;
    }
  };
}
