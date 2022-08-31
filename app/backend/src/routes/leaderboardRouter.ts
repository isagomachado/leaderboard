import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardRouter = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

// leaderboardRouter.get('/', (req: Request, res: Response) => teamsController.list(req, res));
leaderboardRouter.get('/home', (req: Request, res: Response) => leaderboardController.filterHomeTeams(req, res));

export default leaderboardRouter;