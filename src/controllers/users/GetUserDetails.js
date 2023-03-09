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
          attributes: [
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
      ],
    });

    return res.status(200).send({ message: `Success`, data: result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// const { User, Role, Address, user_profile } = require('../../models');

// module.exports = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: { id: req.user.userId },
//       attributes: ['id', 'name', 'email'],
//       include: [
//         { model: Role, attributes: ['name'] },
//         {
//           model: Address,
//           attributes: [
//             'name',
//             'isMain',
//             'Address',
//             'regency',
//             'city',
//             'province',
//             'zipcode',
//           ],
//         },
//         {
//           model: user_profile,
//           attributes: ['avatar', 'birth_day', 'gender', 'phone_number'],
//         },
//       ],
//     });

//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }

//     const address =
//       user.Addresses.find((addr) => addr.isMain) || user.Addresses[0];

//     const result = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.Role.name,
//       address: address
//         ? {
//             name: address.name,
//             isMain: address.isMain,
//             Address: address.Address,
//             regency: address.regency,
//             city: address.city,
//             province: address.province,
//             zipcode: address.zipcode,
//           }
//         : null,
//       user_profile: user.user_profile,
//     };

//     return res.status(200).send({ message: 'Success', data: result });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };
