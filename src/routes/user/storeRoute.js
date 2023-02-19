const express = require('express');
const storeController = require('../../controllers/store');
const { isAuthenticate, isAdmin } = require('../../middleware/Authenticate');
const upload = require('../../middleware/upload');

const router = express.Router();

router.post('/', isAuthenticate, storeController.CreateStore);
router.get('/', storeController.GetAllStores);
router.get('/user', isAuthenticate, storeController.GetUserStore);

router.put(
  '/',
  isAuthenticate,
  upload.single('image'),
  storeController.UpdateStore
);
router.delete('/:id', isAuthenticate, isAdmin, storeController.DeleteStore);
router.get('/:id/products', storeController.GetAllStoreProducts);

module.exports = router;
