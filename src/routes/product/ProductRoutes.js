const express = require('express');
const productController = require('../../controllers/product');

const router = express.Router();

router.post('/:id', productController.CreateProduct);
router.get('/', productController.GetAllProducts);
router.get('/:id', productController.GetProductById);
router.put('/:id', productController.UpdateProduct);
router.delete('/:id', productController.DeleteProduct);

module.exports = router;
