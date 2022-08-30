import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.patch('/:id/finish', (req: Request, res: Response) => {
  matchesController.changeInProgress(req, res);
});
matchesRouter.patch('/:id', (req: Request, res: Response) => matchesController.updateMatch(req, res));
matchesRouter.get('/', (req: Request, res: Response) => matchesController.list(req, res));
matchesRouter.post('/', (req: Request, res: Response) => matchesController.inProgressAdd(req, res));

export default matchesRouter;
