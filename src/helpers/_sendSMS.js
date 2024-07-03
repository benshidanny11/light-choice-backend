/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const sendSms = async (smsData) => {
  console.log(`PID: ${process.pid} === SENDING SMS ===`);
  const {PINDO_TOKEN, PINDO_SMS_URL, SMS_SENDER_ID}=process.env;
  await axios.post(
    PINDO_SMS_URL,
    {
      sender: SMS_SENDER_ID,
      to: smsData.to,
      text: smsData.body
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${PINDO_TOKEN}`,
      }
    }
  );
};
