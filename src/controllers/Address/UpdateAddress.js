const { Address } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { name, address, regency, city, zipcode, phone_number } = req.body;
    const result = await Address.findOne({
      where: { id: id.params.id },
      attributes: ["name", "address", "regency", "city", "zipcode", "phone_number"],
    });
    if (!result) {
      return res.status(404).send({ message: "Address is not found" });
    }

    await Address.update(
      {
        name: name,
        address: address,
        regency: regency,
        city: city,
        zipcode: zipcode,
        phone_number: phone_number,
      },
      {
        where: { id: id.params.id },
      }
    );

    return res.status(200).send({
      message: "updated successfully",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
