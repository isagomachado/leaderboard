import { Request, Response, Router } from 'express';
// import LoginController from '../controllers/LoginController';
// import LoginService from '../services/LoginService';

const matchesRouter = Router();

// const loginService = new LoginService();
// const loginController = new LoginController(loginService);

matchesRouter.get('/', (req: Request, res: Response) => res.status(200).send('ok'));


export default matchesRouter;