const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Protected Profile Route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Profile Access Success",
    user: req.user,
  });
});

module.exports = router;