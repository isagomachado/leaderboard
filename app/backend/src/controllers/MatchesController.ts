import { Request, Response } from 'express';
// import Match from '../database/models/Match';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService) { }
  // PRECISO APLICAR INVERSÃO DE DEPENDENCIA
  async list(req: Request, res: Response) {
    console.log(req.query.inProgress);
    const aux = req.query.inProgress === 'true'
    if (req.query.inProgress) {
      const filterMatches = await this.matchesService.filterList(aux);
      console.log('ok');

      // const mapFilterMatches = filterMatches.map((match) => {
      //   // console.log(match.getDataValue('inProgress'))
      //   if (match.inProgress) {
      //     return {
      //       ...match,
      //       inProgress: true,
      //     }
      //   } else {
      //     return {
      //       ...match,
      //       inProgress: false,
      //     }
      //   }
      // })
      // console.log('----------------------------------------------')
      // console.log(mapFilterMatches)
      return res.status(200).json(filterMatches);
    }

    const matches = await this.matchesService.list();

    // const mapMatches = matches.map((match) => {
    //   if (match.inProgress) {
    //     match.inProgress = true;
    //   } else {
    //     match.inProgress = false;
    //   }
    // })
    // console.log(matches);
    return res.status(200).json(matches);
  }
}
