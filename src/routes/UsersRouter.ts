import express from 'express';
import UserController from '../controllers/UserController';
import { checkSchema } from 'express-validator';
import validationResultHandler from '../middlewares/ValidationResultHandler';
import { RegisterUserSchema } from '../validations/UserSchema';

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  checkSchema(RegisterUserSchema),
  validationResultHandler,
  UserController.registerUser,
);

export default usersRouter;
