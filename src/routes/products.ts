import express from 'express';
import ProductController from '../controllers/ProductController';
import { ProductSchema } from '../validations/ProductSchema';
import { checkSchema, param } from 'express-validator';
import validationResultHandler from '../middlewares/ValidationResultHandler';

const router = express.Router();

/* /products */
router.post(
  '/',
  checkSchema(ProductSchema),
  validationResultHandler,
  ProductController.addProduct,
);

router.get(
  '/:id',
  param('id').isNumeric(),
  validationResultHandler,
  ProductController.getProduct,
);

router.get('/', ProductController.getAllProducts);

router.put(
  '/:id',
  param('id').isNumeric(),
  validationResultHandler,
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  param('id').isNumeric(),
  validationResultHandler,
  ProductController.deleteProduct,
);

export default router;
