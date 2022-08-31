import Match from '../database/models/Match';

export default class LeaderboardService {
  async filterHomeTeams() {
    const result = await Match.sequelize?.query(`
      SELECT T.team_name AS name,(SUM(M.home_team_goals > M.away_team_goals)*3 + 
      SUM(M.home_team_goals = M.away_team_goals)) AS totalPoints,
      COUNT(M.home_team) AS totalGames, 
      SUM(M.home_team_goals > M.away_team_goals) AS totalVictories,
      SUM(M.home_team_goals = M.away_team_goals) AS totalDraws,
      SUM(M.home_team_goals < M.away_team_goals) AS totalLosses,
      SUM(M.home_team_goals) AS goalsFavor, SUM(M.away_team_goals) AS goalsOwn,
      (SUM(M.home_team_goals) - SUM(M.away_team_goals)) AS goalsBalance,
      ROUND(((SUM(M.home_team_goals > M.away_team_goals)*3 + SUM(M.home_team_goals = 
          M.away_team_goals)) / (COUNT(M.home_team) * 3)) * 100,2) as efficiency
      FROM matches AS M
      INNER JOIN teams AS T
      ON M.home_team = T.id
      WHERE M.in_progress = 0
      GROUP BY T.id
      ORDER BY totalPoints DESC, totalLosses, goalsFavor DESC, goalsOwn;`);

    return result;
  }
}