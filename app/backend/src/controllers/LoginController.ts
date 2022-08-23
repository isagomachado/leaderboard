import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
// import { ILoginService } from '../interfaces/ILoginService';

export default class LoginController {
  constructor(private loginService: LoginService) { } 
  // PRECISO APLICAR INVERSÃO DE DEPENDENCIA E DEIXAR loginService vinculado a uma interface e não uma classe declarada
  async login(req: Request, res: Response) {
    const validateBody = await this.loginService.validateBody(req.body);
    const token = await this.loginService.makeToken(validateBody);
    return res.status(200).json({ token });
  }
}