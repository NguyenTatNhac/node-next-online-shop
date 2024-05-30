import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import { User } from '../types/UserTypes';
import AlreadyExistsError from '../errors/AlreadyExistsError';
import httpError from 'http-errors';

class AuthController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = req.body;
      const registeredUser = await UserService.registerUser(user);
      res.json(registeredUser);
    } catch (error: unknown) {
      if (error instanceof AlreadyExistsError) {
        next(httpError.BadRequest('User with this email already exists'));
      } else {
        next(error);
      }
    }
  }
}

export default AuthController;
