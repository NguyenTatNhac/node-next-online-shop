import { Product } from '../types/ProductTypes';
import sequelize from '../sequelize/Sequelize';
import { ProductModel } from '../sequelize/models/ProductModel';
import { ModelStatic } from 'sequelize';
import ProductMapper from '../mapper/ProductMapper';
import NotFoundError from '../errors/NotFoundError';

const Model = sequelize.model('Product') as ModelStatic<ProductModel>;

class ProductRepository {
  static async create(product: Product): Promise<Product> {
    return Model.create(product);
  }

  static async findAll(): Promise<Product[]> {
    const products = await Model.findAll();
    return products.map(ProductMapper.fromModelToDto);
  }

  static async findById(id: number): Promise<Product | null> {
    const model = await Model.findByPk(id);
    if (model) {
      return ProductMapper.fromModelToDto(model);
    }
    return null;
  }

  static async update(product: Product) {
    const existing = await Model.findByPk(product.id);

    if (existing == null) {
      throw new NotFoundError();
    }

    // Perform the update
    existing.name = product.name;
    existing.imageUrl = product.imageUrl;
    existing.price = product.price;

    const updatedProduct = await existing.save();
    return ProductMapper.fromModelToDto(updatedProduct);
  }

  static async deleteById(id: number): Promise<void> {
    await Model.destroy({
      where: { id },
    });
  }
}

export default ProductRepository;
