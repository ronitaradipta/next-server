const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Role = require('../../models/role');

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies?.AccessToken)
      return res
        .status(401)
        .send({ msg: 'Sessions Expired, Please Login to your Account' });
    const decodeData = jwt.verify(process.env.AccessToken);

    const user = await User.findById({
      where: { id: decodeData.id },
      attributes: ['name', 'email'],
      include: [{ model: Role, as: 'role', attributes: ['name'] }],
    });
    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
  }
};
