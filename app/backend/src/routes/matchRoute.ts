import { Router } from 'express';
import MatchControler from '../controler/MatchControler';

const matchRoutes = Router();
const matchControler = new MatchControler();

matchRoutes.get('/', matchControler.getAll);
matchRoutes.post('/', matchControler.createMatch);
matchRoutes.post('/', matchControler.createMatch);
matchRoutes.patch('/:id/finish', matchControler.createFinishedMatch);
matchRoutes.patch('/:id/', matchControler.updateMatch);

export default matchRoutes;
