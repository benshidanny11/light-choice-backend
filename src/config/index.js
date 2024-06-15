import 'regenerator-runtime';
import corsConfig from './_cors';
import serverConfig from './_server';
import databaseConfig from './_database';
import constants from './_constants';
import allowedOrigins from './_allowedOrigins';

export {
  allowedOrigins,
  corsConfig,
  serverConfig,
  databaseConfig,
  constants
};
