const { Address } = require("../../models");

module.exports = async (req, res) => {
  try {
    const result = await Address.findById({
      where: { id: req.params.id },
      attributes: ["name", "address", "regency", "city", "zipcode", "phone_number"],
    });
    if (!result) {
      return res.status(404).send({ message: "Address is not found" });
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
