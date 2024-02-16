const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res) => {
  const token = req.headers.authorization;

  console.log("Token recebido:", token);

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    return res.status(401).json({ error: "Token inválido" });
  });
};