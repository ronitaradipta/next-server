const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    const result = await User.findAll({
      limit: limit,
      offset: offset,
      attributes: ["id", "name", "email"],
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
