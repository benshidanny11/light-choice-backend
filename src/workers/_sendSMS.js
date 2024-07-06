/* eslint-disable no-unused-vars */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
import 'regenerator-runtime';
import { sendSms } from '../helpers';

const sendSMS = async (smsBody) => {
  console.log(`PID: ${process.pid} === SENDING SMS WORKER STARTED===`);
  await sendSms(smsBody, (res) => {
    done(res);
  });
};

module.exports = sendSMS;
