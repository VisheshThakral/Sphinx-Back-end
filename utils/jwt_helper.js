const jwt = require("jsonwebtoken");

module.exports = {
  getUserId(token) {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    return payload.id;
  },
  createAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: userId,
      };
      const secret = process.env.TOKEN_KEY;
      const options = {
        expiresIn: "1h",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  createRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};
