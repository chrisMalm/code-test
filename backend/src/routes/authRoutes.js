const express = require("express");
const {
  signup,
  login,
  me,
  logout,
  protected,
  getUsers,
} = require("../controllers/authController");
const { authenticateToken } = require("../middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticateToken, me);
router.get("/protected", authenticateToken, protected);
router.get("/users", getUsers);

module.exports = router;
