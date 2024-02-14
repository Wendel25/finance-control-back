const db = require("../../db");

module.exports = {
  getUsers: () => {
    return new Promise((accepted, reject) => {
      db.query("SELECT * FROM users", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        accepted(results);
      });
    });
  },

  getUserByEmail: (email) => {
    return new Promise((accepted, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], (error, results) => {
        if (error) {
          console.error("Erro ao buscar usuário por e-mail:", error);
          reject(error);
        } else {
          accepted(results[0]);
        }
      });
    });
  },

  insert: (name, nameRBX, email, password) => {
    return new Promise((accepted, reject) => {
      const sql =
        "INSERT INTO users (name, nameRBX, email, password) VALUES (?, ?, ?, ?)";
      db.query(sql, [name, nameRBX, email, password], (error, results) => {
        if (error) {
          console.error("Erro ao inserir usuário no banco de dados:", error);
          reject(error);
        } else {
          accepted(results);
        }
      });
    });
  },

  update: (id, name, nameRBX, email, active) => {
    return new Promise((accepted, reject) => {
      db.query(
        "UPDATE users SET name = ?, nameRBX = ?, email = ?, active = ? WHERE id = ?",
        [name, nameRBX, email, active, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            accepted(results);
          }
        }
      );
    });
  },
};
