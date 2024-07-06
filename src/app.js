import 'regenerator-runtime';
import logger from 'morgan';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routers';
import credentials from './middleware/Credentials';``
import { corsConfig, serverConfig } from './config';
import db from './db/models/index';

dotenv.config();
const { sequelize: dbCon } = db;
const app = express();
const { port } = serverConfig;
app
  .use(express.json())
  .use(express.json({ limit: '25mb' }))
  .use(express.urlencoded({ limit: '25mb', extended: true }))
  .use(express.urlencoded({ extended: false }))
  .use(credentials)
  .use(cors(corsConfig))
  .use(logger('dev'))
  .use('/', api)
  .set('port', port);

dbCon
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Database succesfully connected ✅\nPID: ${process.pid} Server listening on port: ${port} in ${process.env.NODE_ENV} mode 😊`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;

