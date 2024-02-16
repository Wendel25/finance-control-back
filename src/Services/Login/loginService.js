const db = require("../../db");

module.exports = {
  getUsersLogin: (email) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], (error, results) => {
        if (error) {
          console.error("Erro ao buscar usuário por e-mail:", error);
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
};
