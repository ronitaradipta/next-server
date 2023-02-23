const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: id.req.params },
      attributes: ["name", "email"],
    });

    if (!user) {
      return res.status(404).send({ message: "Unkown Data Users" });
    }

    await User.destroy({ where: { id: user.id } });

    return res.status(200).send({
      message: "User has Been Deleted",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
