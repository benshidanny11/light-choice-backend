import 'regenerator-runtime';
import dotenv from 'dotenv';

dotenv.config();
export default {
  development: {
    host: process.env.SERVER,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true }
    },
    ssl: {
      rejectUnauthorized: false
    }
  }
};
