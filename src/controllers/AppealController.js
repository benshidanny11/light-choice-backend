import dotenv from 'dotenv';
import randomstring from 'randomstring';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { getErrorMessage, getPaymentAccessToken, getSuccessMessage, sendSms } from '../helpers';
import { Appeal } from '../db/models';
import { STATUSES } from '../constants/ResponseStatuses';

dotenv.config();
const { RIGHT_CHOICE_PHONE_SMS_TO } = process.env;
const AppealController = {
    createAppeal: async (req, res) => {
        try {
            const { orderid, appealmsg, appealreason } = req.body;
            const { authUser } = req;

            const appealData = {
                aid: uuid(),
                requesterid: authUser.uid,
                orderid,
                appealmsg,
                appealreason,
                appealstatus: 'Initiated'
            }
            // Save transaction
            const appeal = await Appeal.create(appealData);

            if (!appeal) {
                return res.status(STATUSES.BAD_REQUEST).send(getErrorMessage('Could not send appeal!'));
            }
            await sendSms({
                to: RIGHT_CHOICE_PHONE_SMS_TO,
                body: `${req.authUser.firstname} ${req.authUser.lastname} with phone number ${req.authUser.phonenumber}, has initiated appeal.`
              });
            res.status(201).send(
                getSuccessMessage('Appeal was submitted successfully')
            );
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: 'Unknown error occured' });
        }
    },
    findAll: async (req, res) => {
        const { paginate } = req;
        const limit = paginate?.limit;
        const offset = paginate?.offset;
        const count=await Appeal.count();
        const appeals = await Appeal.findAll({
          limit,
          offset,
        });
        return res.json({appeals,count});
      },
      findPatientAppeals:async (req, res) => {
        const { paginate } = req;
        const limit = paginate?.limit;
        const offset = paginate?.offset;
        const count=await Appeal.count();
        const appeals = await Appeal.findAll({
          limit,
          offset,
          where: {
            requesterid: req.authUser.uid
          }
        });
        return res.json({appeals,count});
      },
      findOneById: async (req, res) => {
        const { aid } = req.params;
        const appeal = await Appeal.findOne({ where: { aid } });
        return res.json({appeal});
      },
      approveOrReject: async (req, res) => {
        const payload = {
          appealstatus: req.body.appealstatus,
        };
        const { aid } = req.params;
        const appeal = await Appeal.update(payload, { where: { aid } });
        if (appeal[0] === 0) {
          return res.status(400).send(getErrorMessage(`Could not ${req.body.appealstatus=='APPROVED'?'approve':'reject'} this appeal`));
        }
        return res.status(200).send(getSuccessMessage(`You have successfully ${req.body.appealstatus=='APPROVED'?'approved':'rejected'} appeal`));
      },
};

export default AppealController;
