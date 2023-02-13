const express = require('express');
const productController = require('../../controllers/product');
const { isAuthenticate } = require('../../middleware/Authenticate');
const upload = require('../../middleware/upload');

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  upload.array('images'),
  productController.CreateProduct
);
router.get('/', productController.GetAllProducts);
router.get('/', productController.GetProductBySearch);
router.get('/', productController.GetProductsByCategory);
router.get('/:id', productController.GetProductById);

router.put(
  '/:id',
  isAuthenticate,
  upload.array('images'),
  productController.UpdateProduct
);

router.delete('/:id', isAuthenticate, productController.DeleteProduct);

module.exports = router;
