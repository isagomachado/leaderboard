import 'dotenv/config';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
// import Match from '../database/models/Match';
import MatchesService from '../services/MatchesService';
import UnauthorizedError from '../errors/UnauthorizedError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }
  // PRECISO APLICAR INVERSÃO DE DEPENDENCIA
  async list(req: Request, res: Response) {
    console.log(req.query.inProgress);
    const aux = req.query.inProgress === 'true';
    if (req.query.inProgress) {
      const filterMatches = await this.matchesService.filterList(aux);
      return res.status(200).json(filterMatches);
    }

    const matches = await this.matchesService.list();
    return res.status(200).json(matches);
  }

  async inProgressAdd(req: Request, res: Response) {
    const { authorization }: any = req.headers;
    const verifyToken = verify(authorization, secret);

    if (!verifyToken) throw new UnauthorizedError('Token must be a valid token');

    // const validateBody = await this.matchesService.validateBodyAdd(req.body);
    const match = await this.matchesService.inProgressAdd(req.body);
    // const match = await this.matchesService.get(id);
    return res.status(201).json(match);
  }

  async changeInProgress(req: Request, res: Response) {
    try {
      const { id }: any = req.params;
      console.log(req.params)
      await this.matchesService.changeInProgress(id);
      return res.status(200).json({message: 'Finished'});
    } catch (err) {
      console.log(err)
    }
  }
}
