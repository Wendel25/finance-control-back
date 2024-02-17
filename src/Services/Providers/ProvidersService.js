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

  getUserByCPF: (cpf) => {
    return new Promise((accepted, reject) => {
      db.query(
        "SELECT * FROM physical_person WHERE cpf = ?",
        [cpf],
        (error, results) => {
          if (error) {
            reject(error);
            console.log("Erro ao buscar cpf");
          } else {
            accepted(results);
          }
        }
      );
    });
  },

  insert: (
    name,
    cpf,
    email,
    birth_date,
    number_phone,
    number_phone_reserve,
    cep,
    city,
    district,
    localization,
    service_provider
  ) => {
    return new Promise((accepted, reject) => {
      const data =
        "INSERT INTO physical_person (name, cpf, email, birth_date, number_phone, number_phone_reserve, cep, city, district, localization, service_provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        data,
        [
          name,
          cpf,
          email,
          birth_date,
          number_phone,
          number_phone_reserve,
          cep,
          city,
          district,
          localization,
          service_provider,
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
