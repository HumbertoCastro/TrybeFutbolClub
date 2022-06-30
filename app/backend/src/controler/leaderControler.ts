import { NextFunction, Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboard.service';

export default class LeaderControler {
  private leaderService = new LeaderboardsService();
  public getLeader =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      const teans = await this.leaderService.getLeaderboards(true, false);
      return res.status(200).json(teans);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public getLeaderAway =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      const teans = await this.leaderService.getLeaderboards(false, false);
      return res.status(200).json(teans);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public getLeaderAll =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      const teans = await this.leaderService.getLeaderboards(false, true);
      return res.status(200).json(teans);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };
}
