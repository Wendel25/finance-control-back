const db = require("../../db");

module.exports = {
  getData: () => {
    return new Promise((accepted, reject) => {
      db.query(
        `
        SELECT s.id, s.subCategory, GROUP_CONCAT(c.category) AS category_name
        FROM subcategory s
        JOIN category c ON s.category_id = c.id
        GROUP BY s.id, s.subCategory;
      `,
        (error, results) => {
          if (error) {
            reject(error);
            console.log("Erro ao buscar sub categorias");
          } else {
            accepted(results);
          }
        }
      );
    });
  },

  getSubCategoryByCategory: (category) => {
    return new Promise((accepted, reject) => {
      db.query(
        `
          SELECT s.id, s.subCategory, s.category_id
          FROM subcategory s
          JOIN category c ON s.category_id = c.id
          WHERE c.category = ?;
        `,
        [category],
        (error, results) => {
          if (error) {
            reject(error);
            console.log("Erro ao buscar subcategorias");
          } else {
            accepted(results);
          }
        }
      );
    });
  },

  insert: (subcategory, categoryID) => {
    return new Promise((accepted, reject) => {
      db.query(
        "INSERT INTO subcategory (subCategory, category_id) VALUES (?, ?)",
        [subcategory, categoryID],
        (error, results) => {
          if (error) {
            console.error(
              "Erro ao inserir sub categoria no banco de dados:",
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
    return new Promise((accepted, reject) => {
      db.query(
        "DELETE FROM subcategory WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
            console.log("Erro ao deletar sub categorias");
          } else {
            accepted(results);
          }
        }
      );
    });
  },
};
