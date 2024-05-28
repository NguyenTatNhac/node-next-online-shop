import {
  DataTypes,
  Sequelize,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

// Just some split for code readability
type Attributes = InferAttributes<ProductModel>;
type CreationAttrs = InferCreationAttributes<ProductModel>;
export interface ProductModel extends Model<Attributes, CreationAttrs> {
  id: CreationOptional<number>;
  name: string;
}

export default (sequelize: Sequelize) => {
  sequelize.define<ProductModel>(
    'Product',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'products',
    },
  );
};
