import { Router } from 'express';
import TeamControler from '../controler/TeamsControler';

const teansRoutes = Router();
const teansControler = new TeamControler();

teansRoutes.get('/', teansControler.getAll);
teansRoutes.get('/:id', teansControler.getById);

export default teansRoutes;
