const express = require('express');
const categoryController = require('../../controllers/category');
const { isAuthenticate, isAdmin } = require('../../middleware/Authenticate');
// change this :
// const upload = require('../../middleware/upload');
// const format = require('../../middleware/format');

// and replace with :
const { FileUpload, FileResize } = require('../../middleware/Media');

const router = express.Router();

router.post(
  '/',
  isAuthenticate,
  isAdmin,
  FileUpload.single('image'),
  FileResize,
  categoryController.CreateCategory
);

router.get('/', categoryController.GetAllCategories);

router.put(
  '/:id',
  isAuthenticate,
  isAdmin,
  FileUpload.single('image'),
  FileResize,
  categoryController.UpdateCategory
);
router.delete(
  '/:id',
  isAuthenticate,
  isAdmin,
  categoryController.DeleteCategory
);

module.exports = router;
