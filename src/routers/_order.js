import 'regenerator-runtime';
import express from 'express';
import Validator from '../middleware/_validator';
import OrderController from '../controllers/OrderController';
import Auth from '../middleware/Auth';
import User from '../middleware/user';
import Paginate from '../middleware/Paginate';

const router = express.Router();

router.post(
  '/createorder',
  Validator('order'),
  Auth.verifyAccessToken,
  OrderController.createNewOrder
);

router.get(
  '/findall',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  Paginate,
  OrderController.findAll
);
router.get(
  '/findpatientorders',
  Auth.verifyAccessToken,
  User.checkIsPatient,
  OrderController.findPatientOrders
);

router.put(
  '/aproveorreject/:oid',
 // Validator('orderstatus'),
  Auth.verifyAccessToken,
  User.checkISAdmin,
  OrderController.approveOrReject
);

export default router;
