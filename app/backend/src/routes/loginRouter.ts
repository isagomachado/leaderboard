import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const loginRouter = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', (req: Request, res: Response) => loginController.login(req, res));
loginRouter.get('/validate', (req: Request, res: Response) => loginController.loginRole(req, res));

export default loginRouter;
