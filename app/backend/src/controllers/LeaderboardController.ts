import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }
  // PRECISO APLICAR INVERSÃO DE DEPENDENCIA
  async filterHomeTeams(_req: Request, res: Response) {
    const result: any = await this.leaderboardService.filterHomeTeams();
    console.log(result);
    return res.status(200).json(result[0]);
  }
}