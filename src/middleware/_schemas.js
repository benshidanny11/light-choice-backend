import 'regenerator-runtime';
import Joi from '@hapi/joi';

const schemas = {};

const email = Joi.string()
  .trim()
  .lowercase()
  .email()
  .required()
  .label('Email is required and should look like this : example@email.com!');
const password = Joi.string()
  .min(8)
  .required()
  .label('Password is required,  it must have at least 8 letters');

const username=Joi.string()
.min(3)
.required()
.label('Email or Phone number is required!');

const confirm = Joi.string()
  .min(8)
  .required()
  .label('Confirm password is required,  it must have at least 8 letters');

const name = Joi.string()
  .min(3)
  .required()
  .label('Name is required,  it must have at least 3 letters');
const phone = Joi.string()
  .min(10)
  .max(12)
  .required()
  .label('Phone is required,  it must have at least 10 digits');



const producttags = Joi.array()
  .required()
  .label('Product tags is required, should be an array of strings');


  const productname = Joi.string()
  .min(3)
  .required()
  .label('Product name is required');

  const productmark = Joi.string()
  .min(3)
  .required()
  .label('Protuct mark name is required');

  
  const productdesc = Joi.string()
  .min(3)
  .required()
  .label('Product description is required');

  const productimage = Joi.string()
  .required()
  .label('Product image is required, it should be a link');

  const productprice = Joi.number()
  .required()
  .label('Product prise is require');
  

  const orderamount = Joi.number()
  .required()
  .label('Order amount is require');


  const prescription = Joi.string()
  .min(3)
  .required()
  .label('Order prescription is require');

  const orderby = Joi.string()
  .min(3)
  .required()
  .label('Order user id is require');

  const orderaddress = Joi.string()
  .min(3)
  .required()
  .label('Order address is require');

  const orderquantity = Joi.number()
  .required()
  .label('Order quantity is require');


  const productid = Joi.string()
  .min(3)
  .required()
  .label('Order product id is require');


  schemas.orderstatus = Joi.string()
  .required()
  .label('Order status is require, should be APPROVE or REJECT');

schemas.login = Joi.object().keys({
  username,
  password,
});

schemas.createuser = Joi.object().keys({
  email,
  firstname:name,
  lastname:name,
  phone,
  password
});

schemas.resetpass = Joi.object().keys({
  password,
  confirm,
});

schemas.resetPassword = Joi.object().keys({
  userid: Joi.any().required().label('User id is required'),
  password,
});

schemas.resendemail = Joi.object().keys({
  email
});

schemas.product = Joi.object().keys({
 productname,
 productmark,
 productimage,
 productdesc,
 productprice,
 producttags
});

schemas.order = Joi.object().keys({
  productid,
  prescription,
  orderby,
  orderaddress,
  orderquantity,
  orderamount
});


export default schemas;
