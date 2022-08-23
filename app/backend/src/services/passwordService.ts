import 'dotenv/config';
import { genSaltSync, hashSync } from 'bcryptjs';

export const passwordService = {
  encryptPassword: (password: string) => {
    const salt = genSaltSync(5);
    const encryptedPassword = hashSync(password, salt);
    return encryptedPassword;
  },
};
