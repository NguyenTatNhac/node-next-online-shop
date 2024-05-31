import express from 'express';
import ProductController from '../controllers/ProductController';
import { ProductSchema } from '../validations/ProductSchema';
import { checkSchema, param } from 'express-validator';
import validationResultHandler from '../middlewares/ValidationResultHandler';
import authRequired from '../middlewares/AuthRequired';

const productsRouter = express.Router();

/* /products */
productsRouter.post(
  '/',
  authRequired,
  checkSchema(ProductSchema),
  validationResultHandler,
  ProductController.addProduct,
);

productsRouter.get(
  '/:id',
  param('id').isNumeric(),
  validationResultHandler,
  ProductController.getProduct,
);

productsRouter.get('/', ProductController.getAllProducts);

productsRouter.put(
  '/:id',
  authRequired,
  param('id').isNumeric(),
  checkSchema(ProductSchema),
  validationResultHandler,
  ProductController.updateProduct,
);

productsRouter.delete(
  '/:id',
  authRequired,
  param('id').isNumeric(),
  validationResultHandler,
  ProductController.deleteProduct,
);

export default productsRouter;
