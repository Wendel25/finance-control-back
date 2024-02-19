const db = require("../../db");

module.exports = {
  getDataProviders: (page, pageSize) => {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * pageSize;
      const query = `SELECT * FROM physical_person ORDER BY id DESC LIMIT ? OFFSET ?`;

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

  getProvidersSingle: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT name FROM physical_person where active = 1 ORDER BY id DESC",
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
        "INSERT INTO physical_person (name, cpf, birth_date, number_phone, number_phone_reserve, cep, city, district, localization, service_provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        data,
        [
          name,
          cpf,
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

  update: (
    id_user,
    name,
    cpf,
    birth_date,
    number_phone,
    number_phone_reserve,
    cep,
    city,
    district,
    localization,
    service_provider,
    active
  ) => {
    return new Promise((accepted, reject) => {
      const query =
        "UPDATE physical_person SET name = ?, cpf = ?, birth_date = ?, number_phone = ?, number_phone_reserve = ?, cep = ?, city = ?, district = ?, localization = ?, service_provider = ?, active = ? WHERE id = ?";

      db.query(
        query,
        [
          name,
          cpf,
          birth_date,
          number_phone,
          number_phone_reserve,
          cep,
          city,
          district,
          localization,
          service_provider,
          active,
          id_user,
        ],

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


  // Pessoa Jurídica

  insertProviderLegal: (
    social_reason,
    cnpj,
    fantasy_name,
    state_registration,
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
        "INSERT INTO legal_person (social_reason, cnpj, fantasy_name, state_registration, number_phone, number_phone_reserve, cep, city, district, localization, service_provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        data,
        [
          social_reason,
          cnpj,
          fantasy_name,
          state_registration,
          number_phone,
          number_phone_reserve,
          cep,
          city,
          district,
          localization,
          service_provider
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

  getDataProvidersLegal: (page, pageSize) => {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * pageSize;
      const query = `SELECT * FROM legal_person ORDER BY id DESC LIMIT ? OFFSET ?`;

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

  updateLegal: (
    id_user,
    social_reason,
    fantasy_name,
    cnpj,
    state_registration,
    number_phone,
    number_phone_reserve,
    cep,
    city,
    district,
    localization,
    service_provider,
    active,
  ) => {
    return new Promise((accepted, reject) => {
      const query =
        "UPDATE legal_person SET social_reason = ?, fantasy_name = ?, cnpj = ?, state_registration = ?, number_phone = ?, number_phone_reserve = ?, cep = ?, city = ?, district = ?, localization = ?, service_provider = ?, active = ? WHERE id = ?";

      db.query(
        query,
        [
          social_reason,
          fantasy_name,
          cnpj,
          state_registration,
          number_phone,
          number_phone_reserve,
          cep,
          city,
          district,
          localization,
          service_provider,
          active,
          id_user,
        ],

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
