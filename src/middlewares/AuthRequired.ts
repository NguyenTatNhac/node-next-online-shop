import { NextFunction, Request, Response } from 'express';
import httpError from 'http-errors';
import JwtService from '../services/JwtService';
import UserService from '../services/UserService';

const AuthRequired = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    next(httpError.Unauthorized());
    return;
  }

  // The Header will be in the format: "Bearer JWT_TOKEN"
  const jwtToken = authHeader.split(' ')[1];
  try {
    const verifiedPayload = JwtService.verify(jwtToken);
    const user = await UserService.getById(verifiedPayload.id);

    // User might have been deleted
    if (user === null) {
      next(httpError.Unauthorized());
      return;
    }

    req.user = user;
    next();
  } catch (err: unknown) {
    next(httpError.Unauthorized());
  }
};

export default AuthRequired;
