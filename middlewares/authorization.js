const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  if (!req.headers || !req.headers["authorization"]) {
    res.statusCode = 403;
    res.json({ error: "Missing JWT token from the 'Authorization' header" });
    return;
  } else {
    const token = req.headers["authorization"];
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        res.statusCode = 403;
        res.json({ error: "Wrong JWT token" });
        return;
      }
      req.user = user;
      next();
    });
  }
};