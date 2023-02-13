const express = require('express');
const categoryController = require('../../controllers/category');
const { isAuthenticate, isAdmin } = require('../../middleware/Authenticate');
const upload = require('../../middleware/upload');

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  isAdmin,
  upload.single('image'),
  categoryController.CreateCategory
);

router.get('/', categoryController.GetAllCategories);
router.put(
  '/:id',
  isAuthenticate,
  isAdmin,
  upload.single('image'),
  categoryController.UpdateCategory
);
router.delete(
  '/:id',
  isAuthenticate,
  isAdmin,
  categoryController.DeleteCategory
);

module.exports = router;
