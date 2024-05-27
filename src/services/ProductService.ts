import { Product } from '../types/ProductTypes';
import ProductRepository from '../repositories/ProductRepository';

class ProductService {
  static async getAll(): Promise<Product[]> {
    return [];
  }

  static async addProduct(product: Product): Promise<Product> {
    return ProductRepository.create(product);
  }
}

export default ProductService;
