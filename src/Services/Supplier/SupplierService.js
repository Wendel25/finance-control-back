const db = require("../../db");

module.exports = {
  getDataSupplier: (page, pageSize) => {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * pageSize;
      const query = `SELECT * FROM supplier_physical_person ORDER BY id DESC LIMIT ? OFFSET ?`;

      db.query(query, [pageSize, offset], (error, results) => {
        if (error) {
          console.error("Erro ao buscar registros:", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getSupplierSingle: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT name FROM supplier_physical_person where active = 1 ORDER BY id DESC",
        (error, results) => {
          if (error) {
            reject(error);
            console.log("Erro ao buscar registros");
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  insert: (
    name,
    cpf,
    group_name,
    number_phone,
    number_phone_reserve,
    cep,
    city,
    district,
    localization,
    number_localization,
    service_provider,
    observation
  ) => {
    return new Promise((accepted, reject) => {
      const data =
        "INSERT INTO supplier_physical_person (name, cpf, group_name, number_phone, number_phone_reserve, cep, city, district, localization, number_localization, service_provider, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        data,
        [
          name,
          cpf,
          group_name,
          number_phone,
          number_phone_reserve,
          cep,
          city,
          district,
          localization,
          number_localization,
          service_provider,
          observation,
        ],
        (error, results) => {
          if (error) {
            reject(error);
            console.log("Erro ao fazer cadastro de prestador de serviço");
          } else {
            accepted(results);
          }
        }
      );
    });
  },
};
