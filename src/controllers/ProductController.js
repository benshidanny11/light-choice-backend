/* eslint-disable camelcase */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import Sequelize, { Op } from 'sequelize';
import { Product, User } from '../db/models';
import { getErrorMessage, getSuccessMessage } from '../helpers';
import { STATUSES } from '../constants/ResponseStatuses';

const ProductController = {
  createProduct: async (req, res) => {
    const { authUser, body } = req;
    const data = {
      pid: uuid(),
      pname: body.productname,
      pmark: body.productmark,
      pdesc: body.productdesc,
      ptags: req.body.producttags || [],
      pimage: body.productimage,
      pprice: body.productprice,
      uid: authUser.uid,
    };

    const product = await Product.create(data);
    if (!product) return res.status(STATUSES.INTERNAL_SERVER_ERROR).send(getErrorMessage('Could not create product'));
    return res.status(STATUSES.CREATED).send(getSuccessMessage('Product create successfully'));
  },
  updateProduct: async (req, res) => {
    const { body, authUser } = req;
    const { pid } = req.params;
    const data = {
      pname: body.productname,
      pmark: body.productmark,
      pdesc: body.productdesc,
      ptags: req.body.producttags || [],
      pimage: body.productimage,
      pprice: body.productprice,
      uid: authUser.uid,
    };
    const product = await Product.update(data, { where: { pid } });
    if (product[0] === 0) {
      return res.status(STATUSES.BAD_REQUEST).send(getErrorMessage('Could not update prodcut'));
    }
    return res.status(STATUSES.OK).send(getSuccessMessage('Updated product successfully'));
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const count = await Product.count();
    const products = await Product.findAll({
      limit,
      offset
    });
    res.json({ products, count });
  },
  deleteProduct: async (req, res) => {
    const { pid } = req.params;
    const medicine = await Product.findOne({ where: { pid } });
    if (!medicine) {
      return res.status(STATUSES.BAD_REQUEST).send(getErrorMessage('Could not delete product'));
    }
    await medicine.destroy();
    return res.status(STATUSES.OK).send(getSuccessMessage('Product deleted successfully'));
  },
  findById: async (req, res) => {

    const { pid } = req.params;
    let prodcut = await Product.findOne({ where: { pid } });
    prodcut = prodcut?.dataValues;
    if (!prodcut) {
      return res.status(STATUSES.NOTFOUND).send(getErrorMessage('No product found'));
    }
    return res.status(STATUSES.OK).json(prodcut);
  },
  filterProduct: async (req, res) => {
    const { prodquery } = req.query;
    const filteredProducts = await Product.findAll({
      where: {
        [Op.or]: [
          {
            pname: {
              [Op.like]: `%${prodquery}%`, // 'searchString' is the substring you're looking for
            },
          },
          {
            pdesc: {
              [Op.like]: `%${prodquery}%`, // 'searchString' is the substring you're looking for
            },
          },
          {
            pmark:{
              [Op.like]: `%${prodquery}%`,
            }
          },
          {
            ptags: {
              [Op.contains]: [prodquery],
            },
          }
        ]
       
      },
      logging: console.log,
    });

    return res.status(STATUSES.OK).send(filteredProducts);
  }
}

export default ProductController;
