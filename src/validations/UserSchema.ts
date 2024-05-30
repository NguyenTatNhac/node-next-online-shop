import { Schema } from 'express-validator';

export const RegisterUserSchema: Schema = {
  email: {
    in: 'body',
    trim: true,
    isEmail: true,
    errorMessage: 'Invalid email',
  },
  firstName: {
    in: 'body',
    trim: true,
    notEmpty: true,
    errorMessage: 'First name cannot be empty',
  },
  lastName: {
    in: 'body',
    trim: true,
    notEmpty: true,
    errorMessage: 'Last name cannot be empty',
  },
  password: {
    in: 'body',
    isLength: {
      // Should use "isStrongPassword" in practical
      options: {
        min: 5,
      },
    },
    errorMessage: 'Password must be at least 5 characters long',
  },
  repeatedPassword: {
    in: 'body',
    custom: {
      options: (value, { req }) => value === req.body.password,
    },
    errorMessage: 'Repeat password does not match',
  },
};

export const LoginUserSchema: Schema = {
  email: {
    in: 'body',
    trim: true,
    isEmail: true,
    errorMessage: 'Invalid email',
  },
  password: {
    in: 'body',
    notEmpty: true,
    errorMessage: 'Wrong password',
  },
};
