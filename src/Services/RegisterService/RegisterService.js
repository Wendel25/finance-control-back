const db = require("../../db");

module.exports = {
  getServices: () => {
    return new Promise((accepted, reject) => {
      db.query("SELECT * FROM services", (error, results) => {
        if (error) {
          reject(error);
        } else {
          accepted(results);
        }
      });
    });
  },
};
