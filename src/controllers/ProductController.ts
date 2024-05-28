import { NextFunction, Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { Product } from '../types/ProductTypes';
import httpError from 'http-errors';
import NotFoundError from '../errors/NotFoundError';

class ProductController {
  static async addProduct(req: Request, res: Response, next: NextFunction) {
    const product: Product = req.body;
    // Clear the ID, just in case the client specify the ID by accident
    product.id = undefined;

    try {
      const addedProduct = await ProductService.addProduct(product);
      res.json(addedProduct);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.id);
      const product = await ProductService.getProduct(productId);

      if (product) {
        res.json(product);
      } else {
        next(httpError.BadRequest('The product could not be found'));
      }
    } catch (error: unknown) {
      next(error);
    }
  }

  static async getAllProducts(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (error: unknown) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    const productId = Number(req.params.id);
    const productBody: Product = req.body;

    try {
      productBody.id = productId;
      const updatedProduct = await ProductService.updateProduct(productBody);
      res.json(updatedProduct);
    } catch (e: unknown) {
      if (e instanceof NotFoundError) {
        next(httpError.BadRequest('The product not found'));
      } else {
        next(e);
      }
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const productId = Number(req.params.id);

    try {
      await ProductService.deleteProduct(productId);
      res.json({ message: 'Success' });
    } catch (e: unknown) {
      next(e);
    }
  }
}

export default ProductController;
