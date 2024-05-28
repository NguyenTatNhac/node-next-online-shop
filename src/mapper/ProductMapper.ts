import { ProductModel } from '../sequelize/models/ProductModel';
import { Product } from '../types/ProductTypes';

export default class ProductMapper {
  static fromModelToDto(model: ProductModel): Product {
    const { id, name, imageUrl, price } = model;
    return { id, name, imageUrl, price };
  }
}
