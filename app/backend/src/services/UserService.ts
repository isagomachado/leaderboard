// import * as Joi from 'joi';
import User from '../database/models/User';

export default class UserService {
  async getByEmail(email: string) {
    const user = await User.findOne({
      where: { email },
      raw: true,
    });

    return user;
  }
}
