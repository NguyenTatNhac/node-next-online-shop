import { Product } from '../types/ProductTypes';

class ProductService {
  static async getAll(): Promise<Product[]> {
    return [
      {
        id: 'the first product',
      },
      {
        id: 'the 2nd product',
      },
      {
        id: 'the 3rd product',
      },
    ];
  }
}

export default ProductService;
