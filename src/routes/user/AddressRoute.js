const express = require('express');
const AddressController = require('../../controllers/Address');
const { isAuthenticate, isAdmin } = require('../../middleware/Authenticate');

const router = express.Router();

router.get('/users', isAuthenticate, AddressController.GetUserAddress);
router.get('/:id', isAuthenticate, AddressController.GetAddressById);
router.get('/', isAuthenticate, isAdmin, AddressController.GetAllAddress);
router.post('/', isAuthenticate, AddressController.CreateAddress);
router.put('/:id', isAuthenticate, AddressController.UpdateAddress);
router.delete('/:id', isAuthenticate, AddressController.DeleteAddress);

module.exports = router;
