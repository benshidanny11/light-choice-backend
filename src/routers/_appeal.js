import express from 'express';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import User from '../middleware/user';
import AppealController from '../controllers/AppealController';

const router = express.Router();

router.post('/createappeal', Validator('appeal'), Auth.verifyAccessToken, User.checkIsPatient, AppealController.createAppeal);
router.get('/findallappeals', Auth.verifyAccessToken, User.checkISAdmin, AppealController.findAll);
router.get('/findpatientappeals', Auth.verifyAccessToken, User.checkIsPatient, AppealController.findPatientAppeals);
router.get('/findonebyid/:aid', Auth.verifyAccessToken, User.checkISAdmin, AppealController.findOneById);
router.put('/approveorreject/:aid', Auth.verifyAccessToken, AppealController.approveOrReject);
export default router;
