import { Product } from '../types/ProductTypes';
import sequelize from '../sequelize';
import { ProductModel } from '../sequelize/models/ProductModel';
import { ModelStatic } from 'sequelize';

const Model = sequelize.model('Product') as ModelStatic<ProductModel>;

class ProductRepository {
  static async create(product: Product): Promise<Product> {
    return Model.create(product);
  }

  static async findAll(): Promise<Product[]> {
    return Model.findAll();
  }
}

export default ProductRepository;
