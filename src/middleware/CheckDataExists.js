/* eslint-disable camelcase */
import 'regenerator-runtime';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import {
  User, Pharmacy, Medicine, Doctor, Patient
} from '../db/models';

export default {
  // Pharmacy exists
  checkPharmacyExists: async (req, res, next) => {
    const ph_id = req.body.phid;

    let pharmacy = await Pharmacy.findOne({ where: { ph_id } });
    pharmacy = pharmacy?.dataValues;
    if (!pharmacy) {
      return res.status(STATUSES.NOTFOUND).send({
        status: STATUSES.NOTFOUND,
        message: `Pharmacy ${MESSAGES.NOT_FOUND}`,
      });
    }
    return next();
  },
  // Medicine exists
  checkMedicineExists: async (req, res, next) => {
    const m_id = req.body.mid;
    let medicine = await Medicine.findOne({ where: { m_id } });
    medicine = medicine?.dataValues;
    if (!medicine) {
      return res.status(STATUSES.NOTFOUND).send({
        status: STATUSES.NOTFOUND,
        message: `Medicine ${MESSAGES.NOT_FOUND}`,
      });
    }
    return next();
  },

  // Doctor exists
  checkDoctorExists: async (req, res, next) => {
    const d_id = req.body.docid;
    let doctor = await Doctor.findOne({ where: { d_id } });
    doctor = doctor?.dataValues;
    if (!doctor) {
      return res.status(STATUSES.NOTFOUND).send({
        status: STATUSES.NOTFOUND,
        message: `Doctor ${MESSAGES.NOT_FOUND}`,
      });
    }
    return next();
  },
  // Patient exists
  checkPatientExists: async (req, res, next) => {
    const p_id = req.body.patid;
    let patient = await Patient.findOne({ where: { p_id } });
    patient = patient?.dataValues;
    if (!patient) {
      return res.status(STATUSES.NOTFOUND).send({
        status: STATUSES.NOTFOUND,
        message: `Patient ${MESSAGES.NOT_FOUND}`,
      });
    }
    return next();
  },
  checkPatientExistsForCreate: async (req, res, next) => {
    const p_id = req.body.pid;
    let patient = await Patient.findOne({ where: { p_id } });
    patient = patient?.dataValues;
    if (!patient) {
      return next();
    }
    return res.status(STATUSES.NOTFOUND).send({
      status: STATUSES.NOTFOUND,
      message: `Patient ${MESSAGES.ALREDY_EXISTS}`,
    });
  },
  checkUserExists: async (req, res, next) => {
    const { u_id } = req.body.uid;
    let user = await User.findOne({ where: { u_id } });
    user = user?.dataValues;
    if (!user) {
      return res.status(STATUSES.NOTFOUND).send({
        status: STATUSES.NOTFOUND,
        message: `User ${MESSAGES.ALREDY_EXISTS}`,
      });
    }
    return next();
  },
};
