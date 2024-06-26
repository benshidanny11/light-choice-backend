/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import 'regenerator-runtime';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import {
    generatePassword,
    getSuccessMessage,
    generateAccessToken
} from '../helpers';
import {
    User
} from '../db/models';
import { serverConfig } from '../config';
import { STATUSES } from '../constants/ResponseStatuses';

const { httpOnlyCookieOptions: cookieOptions } = serverConfig;
dotenv.config();
const UserController = {
    signup: async (req, res) => {
        const { body } = req;
        const userObject = {
            uid: uuid(),
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            phonenumber: body.phone,
            username: body.username,
            role:'PATIENT',
            password: generatePassword(body.password),
        };
        let newUser = await User.create(userObject);
        newUser = newUser?.dataValues;
        if (!newUser) return res.sendStatus(500);
        res.status(STATUSES.CREATED).send(getSuccessMessage('User signed up successfully!'));
    },
    login: async (req, res) => {
        const {
          user: { uid, email, role },
        } = req;
        const userData = { uid, email, role };
        const accesstoken = await generateAccessToken(userData);
        res.json({ accesstoken, userData });
      }
};

export default UserController;
