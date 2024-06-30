/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import 'regenerator-runtime';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { decodeToken, getErrorMessage, decodeJWT } from '../helpers';
import { User } from '../db/models';
import { STATUSES } from '../constants/ResponseStatuses';

dotenv.config();

const Auth = {
  verifyAccessToken: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(STATUSES.UNAUTHORIZED).send(getErrorMessage('No access token'));
    const token = authorization.split(' ')[1];
    if (!token || token === 'undefined') return res.status(STATUSES.UNAUTHORIZED).send(getErrorMessage('No access token'));
    decodeJWT(token, async (err, decoded) => {
      const email = decoded?.email;
      if (err || !email) return res.status(STATUSES.UNAUTHORIZED).send(getErrorMessage('Youre not allowed to perform this operation'));
      let user = await User.findOne({ where: { email } });
      user = user?.dataValues;
      if (!user) return res.status(STATUSES.UNAUTHORIZED).send(getErrorMessage('Youre not allowed to perform this operation'));
      req.authUser = user;
      next();
    });
  },

  checkCredentials: async (req, res, next) => {
    const { user, body: { password }, } = req;
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    console.log(password, user.password)
    if (!isCorrectPassword) {
      return res.status(STATUSES.UNAUTHORIZED).send({
        error: getErrorMessage('Password is incorrect'),
      });
    }
    next();
  },
};

export default Auth;
