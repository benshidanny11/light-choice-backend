import 'regenerator-runtime';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export const generateRefreshToken = async (payload, expiration = '1d') => {
  const refreshToken = await jwt.sign({ ...payload, type: 'refreshToken' }, JWT_SECRET, { expiresIn: expiration });
  return refreshToken;
};

export const generateAccessToken = async (payload, expiration = '49y') => {
  const accessToken = await jwt.sign({ ...payload, type: 'accessToken' }, JWT_SECRET, { expiresIn: expiration });
  return accessToken;
};

export const generateUserVerificationToken = async (payload, expiration = '5m') => {
  const verifyToken = await jwt.sign({ ...payload, type: 'userVerification' }, JWT_SECRET, { expiresIn: expiration });
  return verifyToken;
};

export const generatePasswordResetToken = async (payload, expiration = '5m') => {
  const pswResetToken = await jwt.sign({ ...payload, type: 'passwordReset' }, JWT_SECRET, { expiresIn: expiration });
  return pswResetToken;
};

export const decodeToken = async (token, callback) => {
  const user = await jwt.verify(token, JWT_SECRET, callback);
  return user;
};

export const decodeJWT = (token, callback) => jwt.verify(token, JWT_SECRET, callback);
