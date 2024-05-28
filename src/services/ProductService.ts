import { Product } from '../types/ProductTypes';
import ProductRepository from '../repositories/ProductRepository';

class ProductService {
  static async getAll(): Promise<Product[]> {
    return ProductRepository.findAll();
  }

  static async addProduct(product: Product): Promise<Product> {
    return ProductRepository.create(product);
  }

  static async getProduct(id: number): Promise<Product | null> {
    return ProductRepository.findById(id);
  }

  static async updateProduct(product: Product): Promise<Product> {
    return ProductRepository.update(product);
  }

  static async deleteProduct(id: number): Promise<void> {
    await ProductRepository.deleteById(id);
  }
}

export default ProductService;
