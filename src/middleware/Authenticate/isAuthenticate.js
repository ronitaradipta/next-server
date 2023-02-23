const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.AccessToken)
      return res
        .status(401)
        .send({ message: 'Sessions Expired, Please Login to your Account' });

    jwt.verify(
      req.cookies.AccessToken,
      process.env.ACCESS_TOKEN,
      (err, user) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
          } else {
            return res.sendStatus(403);
          }
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
