import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME  || 'movietime_db',
  process.env.DB_USER  || 'root',
  process.env.DB_PASS  || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

export const connectDatabase = async () => {
  await sequelize.authenticate();
  console.log('✅  Database connection established successfully.');

  await sequelize.sync({ alter: true });
  console.log('✅  Models synchronised with the database.');
};

export default sequelize;
