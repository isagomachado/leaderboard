import Team from '../database/models/Team';
import Match from '../database/models/Match';
import NotFoundError from '../errors/NotFoundError';

export default class MatchesService {
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
}
