const { Address } = require('../../models');

module.exports = async (req, res) => {
  try {
    const result = await Address.findAll({
      where: { userId: req.user.userId },
      attributes: [
        'id',
        'name',
        'isMain',
        'address',
        'regency',
        'city',
        'zipcode',
        'phoneNumber',
        'userId',
      ],
    });
    let message =
      result.length > 0
        ? 'Success'
        : ' There is no address saved, try to add one';
    return res.status(200).send({
      message,
      data: result || [],
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
