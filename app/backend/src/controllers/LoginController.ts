import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
// import { ILoginService } from '../interfaces/ILoginService';

export default class LoginController {
  constructor(private loginService: LoginService) { }

  async login(req: Request, res: Response) {
    // const validateBody = await this.LoginService.validateBody(req.body);
    const token = await this.loginService.makeToken(req.body);
    return res.status(200).json({ token });
  }
}