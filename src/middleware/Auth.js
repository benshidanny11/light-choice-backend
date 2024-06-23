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
    if (!authorization) return res.sendStatus(401);
    const token = authorization.split(' ')[1];
    if (!token || token === 'undefined') return res.sendStatus(401);
    decodeJWT(token, async (err, decoded) => {
      const u_email = decoded?.u_email;
      const type = decoded?.type;
      if (err || !u_email || !type || type !== 'accessToken') return res.sendStatus(403);
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (!user) return res.sendStatus(403);
      req.authUser = user;
      next();
    });
  },
  verifyUserVerificationToken: async (req, res, next) => {
    const { token } = req.params;
    if (!token || token === 'undefined') return res.sendStatus(401);
    decodeJWT(token, async (err, decoded) => {
      const u_email = decoded?.u_email;
      const type = decoded?.type;
      if (err || !u_email || !type || type !== 'userVerification') return res.sendStatus(403);
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (!user) return res.sendStatus(403);
      req.authUser = user;
      next();
    });
  },
  verifyUPasswordResetToken: async (req, res, next) => {
    const { token } = req.params;
    if (!token || token === 'undefined') return res.sendStatus(401);
    decodeJWT(token, async (err, decoded) => {
      if (err || !decoded) return res.sendStatus(403);
      const u_email = decoded?.u_email;
      const type = decoded?.type;
      if (!u_email || !type || type !== 'passwordReset') return res.sendStatus(403);
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (!user) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
  verifyToken: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    const token = authorization.split(' ')[1];
    if (!token || token === 'undefined') return res.sendStatus(401);
    try {
      const { u_email } = await decodeToken(token);
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (!user) {
        return res.status(403).json({
          error: {
            message: 'Invalid token',
          },
        });
      }
      req.authUser = user;
      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  },
  verifyToken2: async (req, res, next) => {
    const { token } = req.params;
    if (!token) return res.sendStatus(401);
    try {
      const { u_email } = await decodeToken(token);
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (!user) {
        return res.status(400).json({
          status: 400,
          error: {
            message: 'Invalid token',
          },
        });
      }
      req.authUser = user;
      next();
    } catch (error) {
      if (error.name && error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 401,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
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
