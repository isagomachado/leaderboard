// import * as Joi from 'joi';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import NotFoundError from '../errors/NotFoundError';
import { IAddMatch } from '../interfaces/IAddMatch';
import { IMatch } from '../interfaces/IMatch';
import InvalidIdError from '../errors/InvalidIdError';

export default class MatchesService {
  // async validateBodyAdd(unknown: unknown) {
  //   const schema = Joi.object<IAddMatch>({
  //     homeTeam: Joi.number(), // O valor deve ser o id do time
  //     awayTeam: Joi.number(), // O valor deve ser o id do time
  //     homeTeamGoals: Joi.number(),
  //     awayTeamGoals: Joi.number(),
  //   });
  //   const result = schema.validateAsync(unknown);
  //   return result;
  // }

  async list(): Promise<Match[]> {
    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    if (!matches) throw new NotFoundError('Not Found');

    return matches;
  }

  async filterList(inProgress: boolean) {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    if (!matches) throw new NotFoundError('Not Found');

    return matches;
  }

  async inProgressAdd(data: IAddMatch): Promise<IMatch> {
    const aux = {
      ...data,
      inProgress: true,
    };
    const model = await Match.create(aux, {
      raw: true,
    });
    return model;
  }

  async get(id: number) {
    if (!id) throw new InvalidIdError('id is not valid');
    const match = await Match.findOne({
      where: { id },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    if (!match) throw new NotFoundError('Not Found');

    return match;
  }
}
