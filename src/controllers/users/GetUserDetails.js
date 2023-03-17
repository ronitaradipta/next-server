const { User, Role, Address, user_profile, Store } = require('../../models');

module.exports = async (req, res) => {
  try {
    const result = await User.findOne({
      where: { id: req.user.userId },
      attributes: ['id', 'name', 'email'],
      include: [
        { model: Role, attributes: ['name'] },
        {
          model: Address,
          attributes: [
            'id',
            'name',
            'isMain',
            'Address',
            'regency',
            'city',
            'province',
            'zipcode',
          ], // include only main address to be shown on profile page
          where: { isMain: true },
          required: false, // make the address model optional when there is no address yet
        },
        {
          model: user_profile,
          attributes: ['avatar', 'birth_day', 'gender', 'phone_number'],
        },
        {
          model: Store,
          attributes: ['name', 'image'],
        },
      ],
    });

    return res.status(200).send({ message: `Success`, data: result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
