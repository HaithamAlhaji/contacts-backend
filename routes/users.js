const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/users");
const validation = require("../middlewares/validation");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validation, currentUser);

module.exports = router;
