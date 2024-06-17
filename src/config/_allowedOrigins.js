import 'regenerator-runtime';
import dotenv from 'dotenv';

dotenv.config();

export default [
  process.env.FRONTEND_HOST,
  process.env.FRONTEND_HOST_LOCAL,
  process.env.FRONTEND_HOST_PRODUCTION,
  'http://localhost:3000',
];
