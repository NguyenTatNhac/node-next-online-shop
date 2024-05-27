import express from 'express';
import ProductController from '../controllers/ProductController';

const router = express.Router();

/* /products */
router.post('/', ProductController.addProduct);
router.get('/:id', ProductController.getProduct);
router.get('/', ProductController.getAllProducts);
router.put('/', ProductController.updateProduct);
router.delete('/', ProductController.deleteProduct);

export default router;
