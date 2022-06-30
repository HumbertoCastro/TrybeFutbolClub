import objectLeaderbords from '../helpers/objectLeaderboards';
import MatchesService from './matches.service';
import TeamsService from './teams.service';
// import ThrowError from '../helpers/throwError';

export default class LeaderboardsService {
  private matchService = new MatchesService();
  private teansService = new TeamsService();
  public getLeaderboards = async (home: boolean, all: boolean) => {
    const matchs = await this.matchService.getAll();
    const times = await this.teansService.getAll();
    const leaderBoardsTime = times.map((time) => {
      let data = [];
      if (all) data = this.createMatchDataAll(time, matchs);
      else if (home) data = this.createMatchData(time, matchs);
      else data = this.createMatchDataAway(time, matchs);
      data.goalsBalance = data.goalsFavor - data.goalsOwn;
      data
        .efficiency = Number(((data.totalPoints / (data.totalGames * 3)) * 100).toFixed(2));
      return data;
    });
    return this.orderTheLeaderBoard(leaderBoardsTime);
  };

  public orderTheLeaderBoard = (data: any) => {
    const obj = data.sort((a: any, b: any) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return obj;
  };

  public createMatchData = (time: any, matchs: any) => (
    matchs.filter((partida: any) => partida.homeTeam === time.id && !partida.inProgress)
      .reduce((acc: any, partida: any) => {
        if (partida.homeTeamGoals > partida.awayTeamGoals) {
          acc.totalVictories += 1;
          acc.totalPoints += 3;
        } else if (partida.homeTeamGoals < partida.awayTeamGoals) {
          acc.totalLosses += 1;
        } else {
          acc.totalDraws += 1;
          acc.totalPoints += 1;
        }
        acc.totalGames += 1;
        acc.goalsFavor += partida.homeTeamGoals;
        acc.goalsOwn += partida.awayTeamGoals;
        acc.name = time.teamName;
        return acc;
      }, { ...objectLeaderbords })
  );

  public createMatchDataAway = (time: any, matchs: any) => (
    matchs.filter((partida: any) => partida.awayTeam === time.id && !partida.inProgress)
      .reduce((acc: any, partida: any) => {
        if (partida.homeTeamGoals < partida.awayTeamGoals) {
          acc.totalVictories += 1;
          acc.totalPoints += 3;
        } else if (partida.homeTeamGoals > partida.awayTeamGoals) {
          acc.totalLosses += 1;
        } else {
          acc.totalDraws += 1;
          acc.totalPoints += 1;
        }
        acc.totalGames += 1;
        acc.goalsFavor += partida.awayTeamGoals;
        acc.goalsOwn += partida.homeTeamGoals;
        acc.name = time.teamName;
        return acc;
      }, { ...objectLeaderbords })
  );

  public createMatchDataAll = (time: any, matchs: any) => {
    const away = this.createMatchDataAway(time, matchs);
    const home = this.createMatchData(time, matchs);
    return (
      {
        ...away,
        totalPoints: home.totalPoints + away.totalPoints,
        totalGames: home.totalGames + away.totalGames,
        totalVictories: home.totalVictories + away.totalVictories,
        totalDraws: home.totalDraws + away.totalDraws,
        totalLosses: home.totalLosses + away.totalLosses,
        goalsFavor: home.goalsFavor + away.goalsFavor,
        goalsOwn: home.goalsOwn + away.goalsOwn,
      }
    );
  };
}
