import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatchToCreate from '../interfaces/match.interface';
import ThrowError from '../helpers/throwError';

export default class MatchesService {
  public getAll = async () => Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  public getByProgress = async (progress: boolean) => Match.findAll({
    where: { inProgress: progress },
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  public createMatch = async (body: IMatchToCreate) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const Hteam = await Match.findOne({ where: { homeTeam } });
    const Ateam = await Match.findOne({ where: { awayTeam } });
    if (!Ateam || !Hteam) {
      throw new ThrowError(404, 'There is no team with such id!');
    }
    const created = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return created;
  };

  public createFinishedMatch = async (id: number) => {
    const updatedMatch = await Match.update({ inProgress: false }, { where: { id } });
    if (updatedMatch[0]) {
      return true;
    }
    throw new ThrowError(500, 'No match found');
  };

  public updateFinished = async (id: number, body: IMatchToCreate) => {
    const { homeTeamGoals, awayTeamGoals } = body;
    const updatedMatch = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (updatedMatch[0]) {
      return true;
    }
    throw new ThrowError(500, 'not possible to update');
  };
}
