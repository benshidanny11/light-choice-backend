/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import workerfarm from 'worker-farm';
import { v4 as uuid } from 'uuid';
import dotev from 'dotenv';
//import { sendOrderRequestEmail, sendOrderSucccesToPatientEmail } from '../services';
import { User, Order } from '../db/models';
// import { productList } from '../helpers/_products.helper';
import { sendSms } from '../helpers';
import { getErrorMessage, getSuccessMessage } from '../helpers';
import { STATUSES } from '../constants/ResponseStatuses';
import { sendSMSWorker } from '../workers';

dotev.config();

const { LIGHTCHOICE_EMAIL, RIGHT_CHOICE_PHONE_SMS_TO } = process.env;

const OrderController = {
  createNewOrder: async (req, res) => {

    const orderPayload = {
      oid: uuid(),
      productid: req.body.productid,
      oprescription: req.body.prescription,
      ostatus: 'Pending',
      oaddress: req.body.orderaddress,
      opaymentref: null,
      oamount: req.body.orderamount,
      orderedby: req.body.orderby,
      approvedby: null,
      orderpaid: 'NO',
      productid:req.body.productid,
      oquantity:req.body.orderquantity,
    };

    const order = await Order.create(orderPayload);

    if (!order) {
      return res.status(STATUSES.BAD_REQUEST).send(getErrorMessage('Could not create order!'));
    }

    await sendSms({
      to: RIGHT_CHOICE_PHONE_SMS_TO,
      body: `${req.authUser.firstname} ${req.authUser.lastname} with phone number ${req.authUser.phonenumber}, has ordered product.`
    });

    await sendSms({
      to: req.authUser.phonenumber,
      body: `Your order has been submited successfully, please proceed with payment proceess.`
    });

    return res.status(STATUSES.CREATED).send(getSuccessMessage('Order submitted successfully'));
  },
  approveOrReject: async (req, res) => {
    const payload = {
      ostatus: req.body.orderstatus,
      approvedby:req.authUser.uid
    };
    const { oid } = req.params;
    const order = await Order.update(payload, { where: { oid } });
    if (order[0] === 0) {
      return res.status(400).send(getErrorMessage(`Could not ${req.body.orderstatus=='APPROVED'?'approve':'reject'} this order`));
    }
    return res.status(200).send(getSuccessMessage(`You have successfully ${req.body.orderstatus=='APPROVED'?'approved':'rejected'} order`));
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const count=await Order.count();
    const orders = await Order.findAll({
      limit,
      offset,
    });
    return res.json({orders,count});
  },
  findPatientOrders: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const orders = await Order.findAll({
      limit,
      offset,
      where: {  },
    });
    return res.json(orders);
  },
};

export default OrderController;
