import jwt from "jsonwebtoken";

const jwtSecret = "ASDADasldfakd&%*w12240810234598as%^kfdnjasf02as"; // Replace with environment variable for security

export const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ msg: "Token missing" });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: "Invalid token" });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = user; // Pass user data to the next middleware
      next();
    });
  };
};
