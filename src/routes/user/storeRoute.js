const express = require("express");
const storeController = require("../../controllers/store");

const router = express.Router();

router.post("/", storeController.CreateStore);
router.get("/", storeController.GetAllStores);
router.put("/:id", storeController.UpdateStore);
router.delete("/:id", storeController.DeleteStore);

router.get("/:id/products", storeController.GetAllStoreProducts);

module.exports = router;
