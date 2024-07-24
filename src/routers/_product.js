import 'regenerator-runtime';
import express from 'express';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';
import ProductController from '../controllers/ProductController';
import Paginate from '../middleware/Paginate';

const router = express.Router();

router.post(
  '/createnew',
  Validator('product'),
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  ProductController.createProduct
);

router.put(
  '/updateproduct/:pid',
  Validator('product'),
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  ProductController.updateProduct
);
router.get(
  '/getall',
  // Auth.verifyAccessToken,
  Paginate,
  ProductController.findAll
);

router.delete(
  '/deleteproduct/:pid',
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  ProductController.deleteProduct
);

router.get(
  '/findbyid/:pid',
  Auth.verifyAccessToken,
  ProductController.findById
);

export default router;
