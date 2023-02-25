const express = require('express');
const usersController = require('../../controllers/users');
const { isAdmin, isAuthenticate } = require('../../middleware/Authenticate');

const router = express.Router();

router.get('/', isAuthenticate, isAdmin, usersController.GetAllUsers);
router.get('/profile', isAuthenticate, usersController.GetUserDetails);
router.post('/', isAuthenticate, isAdmin, usersController.CreateUsers);
router.put(
  '/profile/update',
  isAuthenticate,
  usersController.UpdateUserDetails
);
router.put('/password', isAuthenticate, usersController.UpdateUserPassword);
router.delete('/:id', isAuthenticate, isAdmin, usersController.DeleteUsers);

module.exports = router;
