const db = require("../../db");

module.exports = {
  getAccount: () => {
    return new Promise((accepted, rejected) => {
      db.query("SELECT * FROM account ORDER BY id DESC", (error, results) => {
        if (error) {
          rejected(error);
          return;
        } else {
          accepted(results);
        }
      });
    });
  },

  getBank: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT bank FROM account WHERE active = 1 ORDER BY id DESC",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  getDataByBank: (bank) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select number_account, agency from account where bank = ?",
        [bank],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  insert: (holder, type_account, number_account, agency, bank) => {
    return new Promise((accepted, rejected) => {
      db.query(
        "INSERT INTO account (holder, type_account, number_account, agency, bank) VALUES (?, ?, ?, ?, ?)",
        [holder, type_account, number_account, agency, bank],
        (error, results) => {
          if (error) {
            rejected(error);
            console.log("Erro ao inserir dados");
          } else {
            accepted(results);
          }
        }
      );
    });
  },

  update: (id, holder, type_account, number_account, agency, bank, active) => {
    return new Promise((accepted, reject) => {
      db.query(
        "UPDATE account SET holder = ?, type_account = ?, number_account = ?, agency = ?, bank = ?, active = ? WHERE id = ?",
        [holder, type_account, number_account, agency, bank, active, id],
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
