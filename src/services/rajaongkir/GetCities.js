const callApi = require('./instance');

module.exports = async (req, res) => {
  const { province } = req.query;

  try {
    const response = await callApi.get(`/city?province=${province}`);

    return res.status(200).send({
      message: 'success',
      data: response.data.rajaongkir.results.length
        ? response.data.rajaongkir.results
        : 'not found',
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};
