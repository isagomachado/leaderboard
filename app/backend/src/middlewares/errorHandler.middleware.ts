import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;
  console.log(err);
  switch (name) {
    case 'ValidationError': res.status(400).json({ message: 'All fields must be filled' }); break;
    case 'InvalidIdError': res.status(400).json({ message }); break;
    case 'IncorrectDataError': res.status(401).json({ message }); break;
    case 'NotFoundError': res.status(404).json({ message }); break;
    case 'TokenRequiredError': res.status(400).json({ message }); break;
    case 'UnauthorizedError': res.status(401).json({message}); break;
    case 'JsonWebTokenError': res.status(401).json({message: 'Token must be a valid token'}); break;
    default: res.status(500).json(err.message);
  }
};

export default errorHandler;
