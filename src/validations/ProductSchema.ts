import { Schema } from 'express-validator';

export const ProductSchema: Schema = {
  id: {
    optional: true,
    in: 'body',
    trim: true,
    isNumeric: true,
    errorMessage: 'ID must be a number',
  },
  name: {
    in: 'body',
    trim: true,
    notEmpty: true,
    errorMessage: 'Name cannot be empty',
  },
};
