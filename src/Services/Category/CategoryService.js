const db = require("../../db");

module.exports = {
  getCategories: () => {
    return new Promise((accepted, reject) => {
      db.query("SELECT * FROM category ORDER BY id DESC", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        accepted(results);
      });
    });
  },

  getCategory: (category) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM category WHERE category = ?",
        [category],
        (error, results) => {
          if (error) {
            console.log("Erro ao buscar categoria:", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  insert: (category) => {
    return new Promise((accepted, reject) => {
      db.query(
        "INSERT INTO category (category) VALUES (?)",
        [category],
        (error, results) => {
          if (error) {
            console.error(
              "Erro ao inserir categoria no banco de dados:",
              error
            );
            reject(error);
          } else {
            accepted(results);
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM category WHERE id = ?", [id], (error, results) => {
        if (error) {
          console.error("Erro ao deletar categoria", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};
