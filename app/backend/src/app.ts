import * as express from 'express';
import errorCap from './middleweres/error';
import loginRoutes from './routes/loginRoute';
import teansRoutes from './routes/teamsRoute';
import matchRoutes from './routes/matchRoute';
import leaderRoutes from './routes/leaderRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', loginRoutes);
    this.app.use('/teams', teansRoutes);
    this.app.use('/leaderboard', leaderRoutes);
    this.app.use('/matches', matchRoutes);
    this.app.use(errorCap);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
