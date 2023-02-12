module.exports = async (req, res) => {
  res.cookie('AccessToken', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).send({
    message: 'Logout is Success',
    success: true,
  });
};
