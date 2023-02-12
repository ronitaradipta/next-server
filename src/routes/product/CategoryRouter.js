const express = require('express');
const categoryController = require('../../controllers/category');

const router = express.Router();

router.post('/', categoryController.CreateCategory);
router.get('/', categoryController.GetAllCategories);
router.put('/:id', categoryController.UpdateCategory);
router.delete('/:id', categoryController.DeleteCategory);

module.exports = router;
