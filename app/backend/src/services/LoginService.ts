import * as Joi from 'joi';
import { sign, verify } from 'jsonwebtoken';
import { ILogin } from '../interfaces/ILogin';
import UnauthorizedError from '../errors/UnauthorizedError';
import { passwordService } from './passwordService';
import IncorrectDataError from '../errors/IncorrectDataError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class LoginService {
  async validateBody(unknown: unknown) {
    const schema = Joi.object<ILogin>({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    });
    const result = schema.validateAsync(unknown);
    return result;
  }

  async makeToken(data: ILogin): Promise<string | undefined> {
    const { email, password } = data;
    const passwordHash = passwordService.encryptPassword(password);
    if (email !== 'admin@admin.com' && email !== 'user@user.com') {
      throw new IncorrectDataError('Incorrect email or password');
    }
    if (password !== 'secret_admin' && password !== 'secret_user') {
      throw new IncorrectDataError('Incorrect email or password');
    }
    const payload = { email, passwordHash };
    const token = sign(payload, secret, { expiresIn: '30d', algorithm: 'HS256' });
    return token;
  }

  async readToken(token: string) {
    try {
      const decoded = verify(token, secret);
      console.log(decoded);
      // observar essa saida para verificar token para VALIDAÇÃO
      return decoded;
    } catch (err) {
      throw new UnauthorizedError('Invalid fields');
    }
  }
}
