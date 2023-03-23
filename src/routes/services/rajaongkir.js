const express = require('express');
const rajaongkirService = require('../../services/rajaongkir');

const router = express.Router();

router.get('/provinces', rajaongkirService.GetProvinces);
router.get('/cities', rajaongkirService.GetCities);
router.post('/courier/:courier', rajaongkirService.GetCost);

module.exports = router;
