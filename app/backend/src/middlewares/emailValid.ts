import { Request, Response, NextFunction } from 'express';
import loginSchema from '../schema/login.schema';

const emailValidation = (req: Request, _res: Response, next: NextFunction): Response | void => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    throw error;
  }
  next();
};

export default emailValidation;
