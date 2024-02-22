const db = require("../../../db");

module.exports = {
  insert: (newProduct) => {
    return new Promise((resolve, reject) => {
      const {
        product,
        category,
        price,
        amount,
        supplier,
        date_purchase,
        description,
      } = newProduct;

      const sql =
        "INSERT INTO products (product, category, price, amount, supplier, date_purchase, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        product,
        category,
        price,
        amount,
        supplier,
        date_purchase,
        description,
      ];

      db.query(sql, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
};
