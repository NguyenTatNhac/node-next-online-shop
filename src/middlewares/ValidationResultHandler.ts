import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';

/**
 * Handle the validation result which is returned from the "express-validator"
 * middleware.
 */
const ValidationResultHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    next(createHttpError(400, errors));
  }
};

export default ValidationResultHandler;
