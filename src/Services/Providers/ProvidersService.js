const db = require("../../db");

module.exports = {
  getDataProviders: () => {
    return new Promise((accepted, reject) => {
      db.query("SELECT * FROM physical_person", (error, results) => {
        if (error) {
          reject(error);
          console.log("Erro ao buscar registros");
        } else {
          accepted(results);
        }
      });
    });
  },
};
