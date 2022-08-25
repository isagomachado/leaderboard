import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';
// import LoginController from '../controllers/LoginController';
// import LoginService from '../services/LoginService';

const teamsRouter = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

// teamsRouter.post('/', (req: Request, res: Response) => loginController.login(req, res));
teamsRouter.get('/', (req: Request, res: Response) => teamsController.list(req, res));

export default teamsRouter;
