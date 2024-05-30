import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { User } from '../types/UserTypes';
import AlreadyExistsError from '../errors/AlreadyExistsError';
import httpError from 'http-errors';
import WrongCredentialsError from '../errors/WrongCredentialsError';

class AuthController {
  static async registerUser(
    req: Request,
    res: Response<User>,
    next: NextFunction,
  ) {
    try {
      const user: User = req.body;
      const registeredUser = await AuthService.registerUser(user);
      res.json(registeredUser);
    } catch (error: unknown) {
      if (error instanceof AlreadyExistsError) {
        next(httpError.BadRequest('User with this email already exists'));
        return;
      }
      next(error);
    }
  }

  static async loginUser(
    req: Request,
    res: Response<{ jwt: string }>,
    next: NextFunction,
  ) {
    const { email, password } = req.body;
    try {
      const jwt = await AuthService.loginUser({ email, password });
      res.json({ jwt });
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        next(httpError.Unauthorized('Wrong email or password'));
        return;
      }
      next(error);
    }
  }
}

export default AuthController;
