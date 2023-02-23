const { Address } = require('../../models');

module.exports = async (req, res) => {
  try {
    const result = await Address.findAll({
      attributes: [
        'id',
        'address',
        'regency',
        'city',
        'zipcode',
        'phoneNumber',
        'userId',
      ],
    });
    if (result.length === 0) {
      return res
        .status(404)
        .send({ message: 'There is no address saved, try to add one' });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
