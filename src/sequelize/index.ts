import { Dialect, Sequelize } from 'sequelize';

const { DB_NAME = '', DB_USERNAME = '', DB_PASSWORD, DB_HOST } = process.env;

const DB_DIALECT = process.env.DB_DIALECT as Dialect;
const DB_PORT = Number(process.env.DB_PORT);

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

export default sequelize;
