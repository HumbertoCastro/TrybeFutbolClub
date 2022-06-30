import { NextFunction, Request, Response } from 'express';

const errorCap = (error: any, req: Request, res: Response, _next: NextFunction) => {
  if (error.type === 'ErrorHandler') {
    res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

export default errorCap;
