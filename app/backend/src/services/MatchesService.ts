import * as Joi from 'joi';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import NotFoundError from '../errors/NotFoundError';
import { IAddMatch } from '../interfaces/IAddMatch';
import { IMatch } from '../interfaces/IMatch';
import IncorrectDataError from '../errors/IncorrectDataError';
import { IChangeMatch } from '../interfaces/IChangeMatch';

export default class MatchesService {
  // async validateBodyAdd(unknown: unknown) {
  //   const schema = Joi.object<IAddMatch>({
  //     homeTeam: Joi.number(),
  //     awayTeam: Joi.number(),
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
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = data;
    if (homeTeam === awayTeam) {
      throw new IncorrectDataError('It is not possible to create a match with two equal teams');
    }
    const exists = await this.verifyExistsTeam(homeTeam, awayTeam);

    if(!exists) throw new NotFoundError('There is no team with such id!');
    
    const aux = {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    };
    const model = await Match.create(aux, {
      raw: true,
    });
    return model;
  }

  async verifyExistsTeam(homeTeam: IAddMatch['homeTeam'], awayTeam: IAddMatch['awayTeam']) {
    const home = await Team.findOne({
      where: {id: homeTeam},
    })
    const away = await Team.findOne({
      where: {id: awayTeam},
    })

    if (!home || !away) return false;

    return true;
  }

  async changeInProgress(id: number): Promise<void> {
    await Match.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async updateMatch(id: number, data: IChangeMatch) {
    const { homeTeamGoals, awayTeamGoals } = data;
    await Match.update(
      { homeTeamGoals, awayTeamGoals },
      {
        where: {
          id,
          inProgress: true,
        }
      }
    )
  }

  // async get(id: number) {
  //   if (!id) throw new InvalidIdError('id is not valid');
  //   const match = await Match.findOne({
  //     where: { id },
  //     include: [
  //       {
  //         model: Team,
  //         as: 'teamHome',
  //         attributes: { exclude: ['id'] },
  //       },
  //       {
  //         model: Team,
  //         as: 'teamAway',
  //         attributes: { exclude: ['id'] },
  //       },
  //     ],
  //   });
  //   if (!match) throw new NotFoundError('Not Found');

  //   return match;
  // }
}
