import dotenv from 'dotenv';
import randomstring from 'randomstring';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { getErrorMessage, getPaymentAccessToken, getSuccessMessage } from '../helpers';
import { PaymentTrasaction } from '../db/models';
import { STATUSES } from '../constants/ResponseStatuses';

dotenv.config();
const { PAY_PACK_API_LINK } = process.env;
const PaymentController = {

  sendPayment: async (req, res) => {
    try {
      // Get access token
      const accessToken = await getPaymentAccessToken();

      const { number, amount, orderid, paymentmode } = req.body;
      const { authUser } = req;
      const indepontencyKey = randomstring.generate(32);
      const response = await axios.post(
        `${PAY_PACK_API_LINK}/transactions/cashin?Idempotency-Key=${indepontencyKey}`,
        {
          amount,
          number
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        }
      );


      if (response.data) {
        const { ref, status } = response.data;
        const transactionData = {
          payid: uuid(),
          paidby: authUser.uid,
          orderid: orderid,
          paymentstatus: status,
          paymentref: ref,
          paymentmode: paymentmode,
          transactionamout: amount,
          accountdebited: number
        }
        // Save transaction
        const payment = await PaymentTrasaction.create(transactionData);

        if (!payment) {
          return res.status(STATUSES.BAD_REQUEST).send(getErrorMessage('Could not create payment tansaction!'));
        }
        res.status(201).send(
          payment
        );
      } else {
        return res.status(STATUSES.BAD_REQUEST).send(getErrorMessage('Could not create payment tansaction!'));
      }

    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Unknown error occured' });
    }
  },
  verifyPayment: async (req, res) => {
    const { ref, transactionid } = req.body;
    // Get access token
    try {
      const accessToken = await getPaymentAccessToken();
      const response = await axios.get(
        `${PAY_PACK_API_LINK}/events/transactions?ref=${ref}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        }
      );
      if (response.data?.transactions) {
        if (response.data.transactions[0].data.status == 'successful') {
          await PaymentTrasaction.update({ paymentstatus: response.data.transactions[0].data.status }, { where: { payid: transactionid } });
          return res.send({...getSuccessMessage('Order paid successfully!'),paymentStatus: response.data.transactions[0].data.status });
        } else {
          return res.status(STATUSES.BAD_REQUEST).send({...getErrorMessage('Order not paid paid!'), paymentStatus: response.data.transactions[0].data.status });
        }
      }
    } catch (e) {
      res.status(500).send({ message: 'Unknown error occured' });
    }
  }
};

export default PaymentController;
