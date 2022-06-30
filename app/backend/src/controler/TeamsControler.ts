import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamControler {
  private teamsService = new TeamsService();
  public getAll =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      const teans = await this.teamsService.getAll();
      return res.status(200).json(teans);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const time = await this.teamsService.getBy(id);
      return res.status(200).json(time);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };
}
