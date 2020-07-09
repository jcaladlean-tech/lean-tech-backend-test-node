import JWT from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../models/User/UserMongo';
import { HttpCode } from './HttpCodes';
import { config } from '../config';

export const authentication = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data: any = JWT.verify(token, config.auth.token_key);
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(HttpCode.UNAUTHORIZED).json({ error: 'Not authorized to access this resource' });
  }
};

export const authorize = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) {
        return res.status(HttpCode.UNAUTHORIZED).json({error: 'Not authorized to access this route'});
      }
      next();
    }
};
