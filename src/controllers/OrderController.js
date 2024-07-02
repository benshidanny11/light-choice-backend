/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import dotev from 'dotenv';
//import { sendOrderRequestEmail, sendOrderSucccesToPatientEmail } from '../services';
import { User, Order } from '../db/models';
// import { productList } from '../helpers/_products.helper';
// import { sendSms } from '../helpers/_sendSMS';
import { getErrorMessage, getSuccessMessage } from '../helpers';
import { STATUSES } from '../constants/ResponseStatuses';

dotev.config();

const { LIGHTCHOICE_EMAIL } = process.env;

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
    // sendOrderRequestEmail({
    //   email: DOPHARMA_EMAIL,
    //   orderid: order.o_id,
    //   name: req.body.name,
    //   phonenumber: req.body.address.split(',')[0],
    // });
    // const products = await productList(req.body.medicines);
    // sendOrderSucccesToPatientEmail({
    //   email: req.body.p_email, orderid: req.body.refcode, products, totalamount: req.body.totalamount
    // });
    // await sendSms({
    //   sender: 'DotpharmaOrder',
    //   body: `${req.body.name} with phone number ${req.body.address.split(',')[0]}, has ordered products. Chek`
    // });
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
