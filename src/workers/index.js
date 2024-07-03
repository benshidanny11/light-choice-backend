/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';
import workerfarm from 'worker-farm';

export const sendSMSWorker = workerfarm(require.resolve('./_sendSMS'));
