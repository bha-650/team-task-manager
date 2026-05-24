const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Save decoded user data
      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        message: "No Token, Authorization Denied",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Not Authorized, Token Failed",
      error: error.message,
    });
  }
};

module.exports = protect;