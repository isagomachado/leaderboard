import { ILogin } from './ILogin';

export interface ILoginService {
  validateBody(data: ILogin): ILogin,
  makeToken(data: ILogin): string,
  readToken(token: string): string,
}
