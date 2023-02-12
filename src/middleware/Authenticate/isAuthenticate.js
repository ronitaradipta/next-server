const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.AccessToken)
      return res
        .status(401)
        .send({ message: 'Sessions Expired, Please Login to your Account' });

    const decodeData = jwt.verify(
      req.cookies.AccessToken,
      process.env.ACCESS_TOKEN
    );

    req.user = decodeData;

    next();
  } catch (error) {
    console.log(error.message);
  }
};
