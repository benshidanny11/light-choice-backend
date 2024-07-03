import express from 'express';
import PaymentController from '../controllers/PaymentController';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import User from '../middleware/user';

const router = express.Router();

router.post('/createpayment', Validator('payment'), Auth.verifyAccessToken, User.checkIsPatient, PaymentController.sendPayment);
router.post('/verifypayment', Auth.verifyAccessToken, User.checkIsPatient,PaymentController.verifyPayment);

export default router;
