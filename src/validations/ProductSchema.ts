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
  imageUrl: {
    optional: true,
    in: 'body',
    trim: true,
    isURL: true,
    errorMessage: 'Image URL must be a valid URL',
  },
  price: {
    in: 'body',
    trim: true,
    isNumeric: {
      options: {
        no_symbols: true,
      },
    },
    errorMessage:
      'Price must be a valid number, with no decimal point (minor unit).',
  },
};
