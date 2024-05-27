import { Product } from '../types/ProductTypes';
import sequelize from '../sequelize';
import { ProductModel } from '../sequelize/models/Product.model';
import { ModelStatic } from 'sequelize';

const ProductModel = sequelize.model('Product') as ModelStatic<ProductModel>;

class ProductRepository {
  static async create(product: Product): Promise<Product> {
    return await ProductModel.create(product);
  }
}

export default ProductRepository;
