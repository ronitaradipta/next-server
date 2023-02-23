const { Address } = require('../../models');

module.exports = async (req, res) => {
  try {
    const result = await Address.findAll({
      where: { userId: req.user.userId },
      attributes: [
        'id',
        'address',
        'regency',
        'city',
        'zipcode',
        'phoneNumber',
      ],
    });
    if (!result.length) {
      return res
        .status(404)
        .send({ message: 'There is no address saved, try to add one' });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
