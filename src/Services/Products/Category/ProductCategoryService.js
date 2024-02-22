const db = require("../../../db");

module.exports = {
  get: () => {
    return new Promise((accepted, reject) => {
      const url = "SELECT * FROM category_products ORDER BY id DESC;";
      db.query(url, (error, results) => {
        if (error) {
          console.log("Erro ao buscar categorias");
          reject(error);
        } else {
          accepted(results);
        }
      });
    });
  },

  insert: (category) => {
    return new Promise((accepted, reject) => {
      const url = "INSERT INTO category_products (category) VALUES (?)";
      db.query(url, [category], (error, results) => {
        if (error) {
          reject(error);
          console.log("Erro ao cadastrar categoria para o produto");
        } else {
          accepted(results);
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((accepted, reject) => {
      const url = "DELETE FROM category_products WHERE id = ?";
      db.query(url, [id], (error, results) => {
        if (error) {
          console.log("Erro ao deletar categoria");
          reject(error);
        } else {
          accepted(results);
        }
      });
    });
  },
};
