module.exports = async () => {
  try {
    if (req.user.role.name !== "admin") return res.status(403).send({ msg: "Access is Prohibited" });
    next();
  } catch (error) {
    console.log(error.message);
  }
};
