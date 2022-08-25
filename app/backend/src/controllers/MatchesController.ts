import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }
  // PRECISO APLICAR INVERSÃO DE DEPENDENCIA
  async list(_req: Request, res: Response) {
    const matches = await this.matchesService.list();
    return res.status(200).json(matches);
  }
}
