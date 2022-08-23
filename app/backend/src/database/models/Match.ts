import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public home_team: number;
  public home_team_goals: number;
  public away_team: number;
  public away_team_goals: number;
  public in_progress: number;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  home_team: {
    allowNull: false,
    type: INTEGER,
    references : {
      model: 'teams',
      key: 'id',
    },
  },
  home_team_goals: {
    type: INTEGER,
  },
  away_team: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  away_team_goals: {
    allowNull: false,
    type: INTEGER,
  },
  in_progress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

Match.belongsTo(Team, { foreignKey: 'id' });
// Match.belongsTo(Team, { foreignKey: 'id' })

export default Match;
