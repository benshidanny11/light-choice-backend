/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import 'regenerator-runtime';
import express from 'express';
import User from '../controllers/AuthController';
import Auth from '../middleware/Auth';
import Validator from '../middleware/_validator';
import UserMiddle from '../middleware/user';

const {
  verifyAccessToken,
  verifyUserVerificationToken,
  verifyUPasswordResetToken
} = Auth;

const router = express.Router();

// Authentication and authorization
router.post('/login',Validator('login'), UserMiddle.checkUserExistsLogin, Auth.checkCredentials, User.login);
router.post('/signup', Validator('createuser'), UserMiddle.checkUserExists, User.signup);

export default router;

