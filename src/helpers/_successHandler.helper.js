/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';

export const getSuccessMessage = (message) => {
  const success = {responsestatus:'SUCCESS',responsecode:1,successMessage:message};
  return success;
};
