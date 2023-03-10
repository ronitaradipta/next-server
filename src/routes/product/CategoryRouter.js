const express = require('express');
const categoryController = require('../../controllers/category');
const { isAuthenticate, isAdmin } = require('../../middleware/Authenticate');

// and replace with :
const { FileUpload } = require('../../middleware/Media');

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  isAdmin,
  FileUpload.single('image'),
  categoryController.CreateCategory
);

router.get('/', categoryController.GetAllCategories);

router.put(
  '/:id',
  isAuthenticate,
  isAdmin,
  FileUpload.single('image'),
  categoryController.UpdateCategory
);
router.delete(
  '/:id',
  isAuthenticate,
  isAdmin,
  categoryController.DeleteCategory
);

module.exports = router;
