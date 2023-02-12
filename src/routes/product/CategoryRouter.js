const express = require('express');
const categoryController = require('../../controllers/category');
const { isAuthenticate, isAdmin } = require('../../middleware/Authenticate');

const router = express.Router();

router.post('/', isAuthenticate, isAdmin, categoryController.CreateCategory);
router.get('/', categoryController.GetAllCategories);
router.put('/:id', isAuthenticate, isAdmin, categoryController.UpdateCategory);
router.delete(
  '/:id',
  isAuthenticate,
  isAdmin,
  categoryController.DeleteCategory
);

module.exports = router;
