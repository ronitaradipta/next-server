const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const result = await User.findById({
      where: { id: req.user.id },
      attributes: ["name", "email"],
      include: [
        { model: Role, as: "Role", attributes: ["name"] },
        {
          model: Address,
          as: "Address",
          attributes: ["Address", "regency", "city", "province", "zipcode"],
        },
      ],
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
