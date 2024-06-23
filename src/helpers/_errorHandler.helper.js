/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';

export const getErrorMessage = (message) => {
  const error = {responsestatus:'ERROR',responsecode:0,errormessage:message};
  return error;
};
