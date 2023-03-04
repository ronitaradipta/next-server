const { User, Role, Address, user_profile } = require('../../models');

module.exports = async (req, res) => {
  try {
    const result = await User.findOne({
      where: { id: req.user.userId },
      attributes: ['id', 'name', 'email'],
      include: [
        { model: Role, attributes: ['name'] },
        {
          model: Address,
          attributes: ['Address', 'regency', 'city', 'province', 'zipcode'],
        },
        {
          model: user_profile,
          attributes: ['avatar', 'birth_day', 'gender', 'phone_number'],
        },
      ],
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
