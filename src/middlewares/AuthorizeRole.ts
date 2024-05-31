import { NextFunction, Request, Response } from 'express';
import httpError from 'http-errors';
import { UserRole } from '../types/UserTypes';
import UserService from '../services/UserService';
import { RoleModel } from '../sequelize/models/RoleModel';

const AuthorizeRole = (roles: UserRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      next(httpError.Unauthorized());
      return;
    }

    const userWithRoles = await UserService.getByIdWithRoles(user.id);
    if (!userWithRoles) {
      // User might have been deleted
      next(httpError.Unauthorized());
      return;
    }

    const associatedRoles = userWithRoles.Roles as RoleModel[];
    const permitted = associatedRoles.some((role) => roles.includes(role.id));
    if (!permitted) {
      next(httpError.Forbidden());
      return;
    }

    next();
  };
};

export default AuthorizeRole;
