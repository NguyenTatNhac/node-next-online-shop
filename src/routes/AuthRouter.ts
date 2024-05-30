import express from 'express';
import { checkSchema } from 'express-validator';
import { RegisterUserSchema } from '../validations/UserSchema';
import validationResultHandler from '../middlewares/ValidationResultHandler';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.post(
  '/register',
  checkSchema(RegisterUserSchema),
  validationResultHandler,
  AuthController.registerUser,
);

export default authRouter;
