import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService: TeamsService) { }
  // PRECISO APLICAR INVERSÃO DE DEPENDENCIA
  async list(_req: Request, res: Response) {
    const teams = await this.teamsService.list();
    console.log(teams);
    return res.status(200).json(teams);
  }
}
