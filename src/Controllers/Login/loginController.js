const db = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    try {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], async (error, results) => {
        if (error) {
          console.error("Erro ao buscar usuário por e-mail:", error);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        const user = results[0];

        if (!user) {
          return res.status(401).json({ error: "E-mail incorreto" });
        }

        if (user.active !== 1) {
          return res.status(401).json({ error: "Usuário desativado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, {
          expiresIn: "24h",
        });

        res.json({
          token,
          id: user.id,
          name: user.name,
          email: user.email,
        });
      });
    } catch (error) {
      console.error("Erro durante o login:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
