const express = require("express");
const usersController = require("../../controllers/users");
const { isAdmin, isAuthenticate } = require("../../middleware/Authenticate");

const router = express.Router();

router.get("/", isAuthenticate, isAdmin, usersController.GetAllUsers);
router.get("/:id", isAuthenticate, isAdmin, usersController.GetUserDetails);
router.post("/", isAuthenticate, isAdmin, usersController.CreateUsers);
router.put("/:id", isAuthenticate, usersController.UpdateUserDetails);
router.put("/:id", isAuthenticate, usersController.UpdateUserPassword);
router.delete("/:id", isAuthenticate, isAdmin, usersController.DeleteUsers);

module.exports = router;
