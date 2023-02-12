const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const [oldPassword, newPassword] = req.body;
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).send({ msg: "Old password is wrong" });
    await User.update(
      { password: newPassword },
      {
        where: { id: req.user.id },
      }
    );
    return res.status(200).send({
      message: "updated successfully",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
