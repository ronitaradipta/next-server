const express = require('express');
const sellerTransactionsController = require('../../controllers/SellerTransactions');
const { isAuthenticate, isAdmin } = require('../../middleware/Authenticate');

const router = express.Router();

router.post(
  '/withdraw',
  isAuthenticate,
  sellerTransactionsController.CreateTransactions
);

router.get(
  '/',
  isAuthenticate,
  isAdmin,
  sellerTransactionsController.GetAllStoreTransactions
);

router.get(
  '/store',
  isAuthenticate,
  sellerTransactionsController.GetStoreTransactions
);

router.put(
  '/update/:id',
  isAuthenticate,
  isAdmin,
  sellerTransactionsController.UpdateTransactionStatus
);

module.exports = router;
