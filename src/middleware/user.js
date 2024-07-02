/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import 'regenerator-runtime';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
const { Op } = require('sequelize');
import { User } from '../db/models';
import { getErrorMessage } from '../helpers';

export default {
  // Supper user
  checkISAdmin: async (req, res, next) => {
    const user = req.user || req.authUser;
    if (user?.role === 'ADMIN') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send(getErrorMessage(MESSAGES.UNAUTHORIZED),
      );
    }
  },
  checkIsPatient: async (req, res, next) => {
    const { authUser } = req;
    if (authUser?.role === 'PATIENT') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send(getErrorMessage(MESSAGES.UNAUTHORIZED));
    }
  },
  // check if user exists
  checkUserExists: async (req, res, next) => {
    const { phone, email } = req.body;
    try {
      let user = await User.findOne({ where: {  [Op.or]: [
        { email },
        { phonenumber:phone}
      ]} });
      user = user?.dataValues;
      if (!user) {
        next();
      } else {
        res.status(409).send(getErrorMessage('Account already exists'));
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(getErrorMessage('Internal server error'));
    }
  },
  checkUserExistsLogin: async (req, res, next) => {
    const { username } = req.body;
    try {
      let user = await User.findOne({ where: { [Op.or]: [
        { email:username },
        { phonenumber:username}
      ] } });
      user = user?.dataValues;
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(STATUSES.BAD_REQUEST).send(getErrorMessage('User email or phone number not exist not exist'));
      }
    } catch (error) {
      console.log(error);
      res.status(STATUSES.INTERNAL_SERVER_ERROR).send( getErrorMessage('Internal server error'));
    }
  },
};
