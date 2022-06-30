import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  private loginService = new LoginService();

  public login =
  async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    try {
      const user = await this.loginService.login(email, password);
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  };

  public validateLogin = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    if (token) {
      const role = this.loginService.validate(token);
      return res.status(200).json(role);
    }
    return res.status(500).json({ message: 'd' });
  };
}
