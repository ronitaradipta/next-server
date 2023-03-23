module.exports = async (req, res) => {
  delete req.headers.authorization;
  res.status(200).send({
    message: 'Logout is Success',
    success: true,
  });
};
