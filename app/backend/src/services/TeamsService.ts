import NotFoundError from '../errors/NotFoundError';
import Team from '../database/models/Team';

export default class TeamsService {
  async list(): Promise<Team[]> {
    const teams = await Team.findAll();
    if (!teams) {
      throw new NotFoundError('Not Found');
    }
    return teams;
  }

  async get(id: Team['id']): Promise<Team> {
    const team = await Team.findByPk(id, {
      raw: true,
    });

    if (!team) throw new NotFoundError('Not Found');

    return team;
  }
}
