/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const { PAY_PACK_API_LINK, PAYPACK_APPLICATION_ID, PAYPACK_APPLICATION_SECRET } = process.env;
export const getPaymentAccessToken = async () => {
  const response = await axios.post(
    `${PAY_PACK_API_LINK}/auth/agents/authorize`,
    {
      client_id: PAYPACK_APPLICATION_ID,
      client_secret: PAYPACK_APPLICATION_SECRET
    }
  );
  return response.data.access;
};
