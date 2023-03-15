const { Address } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { name, address, regency, city, province, zipcode, phoneNumber } = req.body;
    const { id } = req.params;

    const result = await Address.findByPk(id);

    if (!result) {
      return res.status(404).send({ message: 'Address is not found' });
    }

    if (req.user.userRole !== 'Admin') {
      if (result.userId !== req.user.userId) {
        return res.status(401).send({ message: 'Unauthorized request' });
      }
    }

    await Address.update(
      {
        name:name,
        address: address,
        regency: regency,
        city: city,
        province: province,
        zipcode: zipcode,
        phoneNumber: phoneNumber,
      },
      {
        where: { id: req.params.id },
      }
    );

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
