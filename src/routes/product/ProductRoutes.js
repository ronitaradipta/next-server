const express = require('express');
const productController = require('../../controllers/product');
const upload = require('../../middleware/upload');

const router = express.Router();

router.post('/:id', upload.array('images'), productController.CreateProduct);
router.get('/', productController.GetAllProducts);
router.get('/:id', productController.GetProductById);
router.put('/:id', upload.array('images'), productController.UpdateProduct);
router.delete('/:id', productController.DeleteProduct);

module.exports = router;
