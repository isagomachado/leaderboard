import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;
  console.log(err);
  switch (name) {
    case 'ValidationError': res.status(400).json({ message }); break;
    case 'InvalidIdError': res.status(400).json({ message }); break;
    case 'NotFoundError': res.status(404).json({ message }); break;
    default: res.status(500).json(err.message);
  }
};

export default errorHandler;
