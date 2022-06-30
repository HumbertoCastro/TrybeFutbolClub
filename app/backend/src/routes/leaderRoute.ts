import { Router } from 'express';
import LeaderControler from '../controler/leaderControler';

const leaderRoutes = Router();
const leaderCtrl = new LeaderControler();

leaderRoutes.get('/home', leaderCtrl.getLeader);
leaderRoutes.get('/', leaderCtrl.getLeaderAll);
leaderRoutes.get('/away', leaderCtrl.getLeaderAway);

export default leaderRoutes;
