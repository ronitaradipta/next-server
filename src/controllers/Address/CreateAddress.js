const { Address, User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.userId } });

    const { address, regency, city, province, zipcode, phoneNumber } = req.body;

    const Result = await Address.create({
      address: address,
      regency: regency,
      city: city,
      zipcode: zipcode,
      province: province,
      phoneNumber: phoneNumber,
      userId: user.dataValues.id,
    });
    return res
      .status(201)
      .send({ msg: 'New Address is Successfuly Added', data: Result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
