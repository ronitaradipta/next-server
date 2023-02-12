const { Address } = require("../../models");

module.exports = async (req, res) => {
  try {
    const result = await Address.findOne({ where: { id: req.params.id }, attributes: ["name", "address", "regency", "city", "zipcode", "phone_number"] });

    if (!result) {
      return res.status(404).send({ message: "There is no address yet, try to add one" });
    }
    await Address.destroy({ where: { id: result.id } });

    return res.status(200).send({
      message: "Address is deleted",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
