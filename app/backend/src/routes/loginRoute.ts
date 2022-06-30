import { Router } from 'express';
import LoginController from '../controler/LoginControler';

const loginRoutes = Router();
const loginControler = new LoginController();

loginRoutes.post('/', loginControler.login);
loginRoutes.get('/validate', loginControler.validateLogin);

export default loginRoutes;
