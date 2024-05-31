import {
  DataTypes,
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  CreationOptional,
  BelongsToManyAddAssociationMixin,
} from 'sequelize';
import { RoleModel } from './RoleModel';
import { ProductModel } from './ProductModel';
import { UserRole } from '../../types/UserTypes';

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
  declare Roles?: RoleModel[];

  // Mixins functions
  declare getProducts: HasManyGetAssociationsMixin<ProductModel>;
  declare getRoles: BelongsToManyGetAssociationsMixin<RoleModel>;
  declare addRole: BelongsToManyAddAssociationMixin<RoleModel, UserRole>;
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
