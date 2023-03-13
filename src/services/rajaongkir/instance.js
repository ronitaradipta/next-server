const axios = require('axios');

const key = process.env.RAJAONGKIR_KEY;

const callApi = axios.create({
  baseURL: 'https://api.rajaongkir.com/starter',
  headers: { key },
});

module.exports = callApi;
