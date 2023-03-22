const { refreshtoken } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const token = req.query.refresh_token;
    const refreshTokenData = await refreshtoken.findOne({
      where: { token },
    });

    if (!refreshTokenData) {
      return res
        .status(401)
        .send({ message: 'No refresh token found, you are unauthorized!' });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token has expired' });
        } else {
          return res.status(403).send(err);
        }
      }

      const AccessToken = jwt.sign(
        { data: user.data },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '24h',
        }
      );

      res.status(200).send({ data: AccessToken });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
