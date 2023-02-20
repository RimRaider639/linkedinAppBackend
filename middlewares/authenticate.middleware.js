const jwt = require("jsonwebtoken");
require("dotenv").config();
function authenticate(req, res, next) {
  jwt.verify(req.headers.token, process.env.KEY, (err, payload) => {
    if (err) res.send({ message: "Please login" });
    req.body.userID = payload._id;
    next();
  });
}

module.exports = { authenticate };
