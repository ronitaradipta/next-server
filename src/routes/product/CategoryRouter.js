const express = require('express');
const categoryController = require('../../controllers/product/CreateCategory');

const router = express.Router();

router.post('/', categoryController);

module.exports = router;
