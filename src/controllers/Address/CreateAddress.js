const { Address, User, Role } = require("../../models");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const { name, address, regency, city, zipcode, phone_number } = req.body;

    const Result = await Address.create({
      name: name,
      Address: address,
      regency: regency,
      city: city,
      zipcode: zipcode,
      phone_number: phone_number,
      userId: user.id,
    });
    return res.status(201).send({ msg: "New Address is Successfuly Added", Result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
