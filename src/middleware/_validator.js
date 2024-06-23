/* eslint-disable linebreak-style */
import 'regenerator-runtime';
import _ from 'lodash';
import schemas from './_schemas';
import e from 'express';

export default (schema) => (req, res, next) => {
  const data = req.body;

  if (_.has(schemas, schema)) {
    const chosenSchema = _.get(schemas, schema);
    const validationResult = chosenSchema.validate(data, {
      abortEarly: false,
    });
    if (!validationResult.error) {
      req.body = data;
      next();
    } else {
      const allErrors = [];
      validationResult.error.details.forEach((errors) => {
        const findError = allErrors.filter((error) => error === errors.context.label);
        if (findError.length === 0) {
          allErrors.push(errors.context.label);
        }
      });
      console.log(allErrors);
      return res.status(400).send({
        status: 400,
        error: { message: allErrors },
      });
    }
  }
};
