import 'regenerator-runtime';
import express from 'express';
import User from './_user';

const api = express();

api.use('/auth', User);
api.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to light choice app',
  });
});
api.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Page not found',
  });
});

export default api;

