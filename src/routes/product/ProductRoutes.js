const express = require('express');
const productController = require('../../controllers/product');

const router = express.Router();

router.post('/', productController.CreateProduct);
// router.get('/', productController.GetAllCategories);
// router.put('/:id', productController.UpdateCategory);
// router.delete('/:id', productController.DeleteCategory);

module.exports = router;
