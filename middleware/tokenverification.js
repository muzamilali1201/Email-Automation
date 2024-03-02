const User = require("../models/User");
const customError = require("../utils/error");
const jwt = require("jsonwebtoken");

const tokenverification = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    throw new customError(403, "User is not login or auth header didn't set!");
  }
  token = token.split(" ")[1];
  const response = jwt.verify(token, process.env.SECRET_KEY);
  if (!response) throw new customError(403, "Token couldn't verified!");
  const user = await User.findOne({ _id: response.id });
  if (user) {
    req.userid = response.userid;
    next();
    return;
  }
};

module.exports = tokenverification;
