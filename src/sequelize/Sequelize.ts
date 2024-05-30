import { Dialect, Sequelize } from 'sequelize';
import ProductModel from './models/ProductModel';
import Logger from '../utils/Logger';
import RoleModel from './models/RoleModel';
import UserModel from './models/UserModel';

const { DB_NAME = '', DB_USERNAME = '', DB_PASSWORD, DB_HOST } = process.env;

const DB_DIALECT = process.env.DB_DIALECT as Dialect;
const DB_PORT = Number(process.env.DB_PORT);

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: (message) => Logger.info(message),
});

/* Add the (future) newly added models to this array */
const modelDefiners = [ProductModel, RoleModel, UserModel];

// Define models
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Associations
const { Product, User, Role } = sequelize.models;
/* Product __One-To-Many__ User */
User.hasMany(Product, {
  foreignKey: 'userId', // override the default "UserId"
});
Product.belongsTo(User, {
  foreignKey: 'userId', // override the default "UserId"
});
/* User __Many-To-Many__ Role */
User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });

export default sequelize;
