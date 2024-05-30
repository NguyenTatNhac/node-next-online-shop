import express from 'express';
import { checkSchema } from 'express-validator';
import { LoginUserSchema, RegisterUserSchema } from '../validations/UserSchema';
import validationResultHandler from '../middlewares/ValidationResultHandler';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.post(
  '/register',
  checkSchema(RegisterUserSchema),
  validationResultHandler,
  AuthController.registerUser,
);

authRouter.post(
  '/login',
  checkSchema(LoginUserSchema),
  validationResultHandler,
  AuthController.loginUser,
);

export default authRouter;
