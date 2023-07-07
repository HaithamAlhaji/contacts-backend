const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validation = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("validation:1");
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("token not valid");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("token not valid");
    }
  } else {
    res.status(401);
    throw new Error("token not found");
  }
});

module.exports = validation;
