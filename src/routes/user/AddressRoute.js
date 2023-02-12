const express = require("express");
const AddressController = require("../../controllers/Address");
const { isAuthenticate } = require("../../middleware/Authenticate");

const router = express.Router();

router.get("/address", isAuthenticate, AddressController.CreateAddress);
router.get("/address/:id", isAuthenticate, AddressController.GetAllAddress);
router.post("/address", isAuthenticate, AddressController.GetAddressDetail);
router.put("/address/:id", isAuthenticate, AddressController.UpdateAddress);
router.delete("/address:id", isAuthenticate, AddressController.DeleteAddress);

module.exports = router;
