import {  INTEGER, Model, STRING  } from 'sequelize';
import db from '.';
import Match from './Match';
// import OtherModel from './OtherModel';

class Team extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public team_name: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  team_name: {
    allowNull: false,
    type: STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
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

Team.hasMany(Match, { foreignKey: 'home_team' } )
Team.hasMany(Match, { foreignKey: 'away_team' } )

export default Team;
