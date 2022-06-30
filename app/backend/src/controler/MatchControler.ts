import { NextFunction, Request, Response } from 'express';
import ThrowError from '../helpers/throwError';
import MatchesService from '../services/matches.service';

export default class MatchControler {
  private matchService = new MatchesService();
  public getAll =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const progress = req.query.inProgress as string;
    try {
      if (progress) {
        const progressMatchs = await this.matchService.getByProgress(progress !== 'false');
        if (!progressMatchs || progressMatchs.length <= 0) {
          throw new ThrowError(404, 'No matches found');
        }
        return res.status(200).json(progressMatchs);
      }
      const teans = await this.matchService.getAll();
      return res.status(200).json(teans);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public createMatch =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      if (req.body.homeTeam === req.body.awayTeam) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const createdMatch = await this.matchService.createMatch(req.body);
      return res.status(201).json(createdMatch);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public createFinishedMatch =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const { id } = req.params;
    try {
      await this.matchService.createFinishedMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public updateMatch =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const { id } = req.params;
    try {
      await this.matchService.updateFinished(Number(id), req.body);
      return res.status(200).json({ message: 'Updated goals!' });
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };
}
