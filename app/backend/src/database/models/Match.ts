import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
Match.init({
  homeTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
  tableName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
