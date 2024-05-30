import {
  DataTypes,
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  CreationOptional,
} from 'sequelize';
import { RoleModel } from './RoleModel';
import { ProductModel } from './ProductModel';

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  // Attributes
  declare id: CreationOptional<number>;
  declare email: string;
  declare hashedPassword: string;
  declare firstName: string;
  declare lastName: string;

  // Mixins functions
  declare getProducts: HasManyGetAssociationsMixin<ProductModel>;
  declare getRoles: BelongsToManyGetAssociationsMixin<RoleModel>;
}

export default (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    },
  );
};
