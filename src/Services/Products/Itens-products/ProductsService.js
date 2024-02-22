const db = require("../../../db");

module.exports = {
  getProducts: () => {
    return new Promise((accepted, reject) => {
      const url = "SELECT * FROM products ORDER BY id DESC;";
      db.query(url, (error, results) => {
        if (error) {
          console.log("Erro no servidor", error);
          reject(error);
        } else {
          const groupedProducts = {};

          results.forEach((product) => {
            const category = product.category;
            if (!groupedProducts[category]) {
              groupedProducts[category] = [];
            }
            groupedProducts[category].push(product);
          });

          accepted(groupedProducts);
        }
      });
    });
  },

  getSuppliers: () => {
    return new Promise((accepted, reject) => {
      const url = `
        (SELECT name FROM supplier_physical_person WHERE active = 1)
        UNION
        (SELECT social_reason FROM supplier_legal_person WHERE active = 1);
      `;

      db.query(url, (error, results) => {
        if (error) {
          console.log("Erro no servidor", error);
          reject(error);
        } else {
          accepted(results);
        }
      });
    });
  },

  insert: (newProduct) => {
    return new Promise((accepted, reject) => {
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

      const supplierString = Array.isArray(supplier)
        ? supplier.join(", ")
        : supplier;

      const values = [
        product,
        category,
        price,
        amount,
        supplierString,
        date_purchase,
        description,
      ];

      db.query(sql, values, (error, result) => {
        if (error) {
          console.error("Erro ao inserir produto no banco de dados:", error);
          reject(error);
        } else {
          const insertedProduct = {
            id: result.insertId,
            product,
            category,
            price,
            amount,
            supplier: supplierString,
            date_purchase,
            description,
          };
          accepted(insertedProduct);
        }
      });
    });
  },
};
