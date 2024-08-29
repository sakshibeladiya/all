const jwt = require("jsonwebtoken");

exports.buildToken = async (data) => {
  try {
    const token = jwt.sign(data, process.env.jwtAuth, { expiresIn: "1h" });
    return token;
  } catch (e) {
    throw new Error(e);
  }
};

exports.verifyToken = (role) => {
  return (req, res, next) => {
    try {
      const token = req.headers["authorization"].split("Bearer ")[1];
      console.log(token, "token");
      const decode = jwt.verify(token, process.env.jwtAuth);

      if (!role.includes(decode.role)) {
        return res.status(403).json({ message: "forbiden" });
      }

      req.user = decode;
      next();
    } catch (e) {
      return res
        .status(500)
        .json({ message: e.message || "INTERNAL SERVER ERROR" });
    }
  };
};

exports.fsd = (role = []) => {
  console.log(role);
  return (req, res, next) => {
    try {
      const token = req.headers?.authorization?.split("Bearer ")[1];
      if (!token) {
        return res.status(403).json({
          status: false,
          message: "Token is Invalid !!",
        });
      }
      const decode = jwt.verify(token, process.env.JWT_TOKEN);

      if (!role.includes(decode?.role)) {
        return res.status(403).json({
          status: false,
          message: "You are Not Authorized !!",
        });
      }
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        error: error.message || "Internal Server Error",
      });
    }
  };
};
