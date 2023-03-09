const { Address, User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.userId } });

    const { name, address, regency, city, province, zipcode, phoneNumber } =
      req.body;

    // set default to be true when first time adding a new address
    const addresses = await Address.findAll({ where: { userId: user.id } });
    const isMain = addresses.length === 0; // this value is true;

    const Result = await Address.create({
      name,
      isMain,
      address,
      regency,
      city,
      zipcode,
      province,
      phoneNumber,
      userId: user.dataValues.id,
    });
    return res
      .status(201)
      .send({ msg: 'New Address is Successfuly Added', data: Result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
