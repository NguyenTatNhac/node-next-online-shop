import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  static async addProduct(req: Request, res: Response) {}

  static async getProduct(req: Request, res: Response) {
    res.json({
      id: '1',
      name: 'first',
    });
  }

  static async getAllProducts(_req: Request, res: Response) {
    const products = await ProductService.getAll();
    res.json(products);
  }

  static async updateProduct(req: Request, res: Response) {}

  static async deleteProduct(req: Request, res: Response) {}
}

export default ProductController;
