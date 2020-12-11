const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = async (req, res, next) => {
  const token = req?.headers('Authorization');
  if (!token) {
    return res.status(401).send({
      errorMessage: 'There is no token, please try again',
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({
      errorMessage: 'This token is expired, please try again',
    });
  }
};

module.exports = checkAuth;
