const express = require('express');
const productController = require('../../controllers/product');
const { isAuthenticate } = require('../../middleware/Authenticate');

const { FileUpload } = require('../../middleware/Media');

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  FileUpload.array('images'),
  productController.CreateProduct
);

router.get('/', productController.GetAllProducts);
router.get('/:id', productController.GetProductById);

router.put(
  '/:id',
  isAuthenticate,

  FileUpload.array('images'),
  productController.UpdateProduct
);

router.delete('/:id', isAuthenticate, productController.DeleteProduct);

module.exports = router;
