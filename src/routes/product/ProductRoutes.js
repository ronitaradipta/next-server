const express = require('express');
const productController = require('../../controllers/product');
const { isAuthenticate } = require('../../middleware/Authenticate');
// change this :
// const upload = require('../../middleware/upload');
// const format = require('../../middleware/format');

// and replace with :
const { FileUpload, FileResize } = require('../../middleware/Media');

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  FileUpload.array('images'),
  FileResize,
  productController.CreateProduct
);

router.get('/', productController.GetAllProducts);
router.get('/:id', productController.GetProductById);

router.put(
  '/:id',
  isAuthenticate,
  FileUpload.array('images'),
  FileResize,
  productController.UpdateProduct
);

router.delete('/:id', isAuthenticate, productController.DeleteProduct);

module.exports = router;
