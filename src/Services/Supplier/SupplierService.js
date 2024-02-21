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
        `
        SELECT name AS name FROM supplier_physical_person WHERE active = 1
        UNION
        SELECT social_reason AS name FROM supplier_legal_person WHERE active = 1
        ORDER BY name DESC;
        `,
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

  update: (
    id_user,
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
    active
  ) => {
    return new Promise((accepted, reject) => {
      const query =
        "UPDATE supplier_physical_person SET name = ?, cpf = ?, group_name = ?, number_phone = ?, number_phone_reserve = ?, cep = ?, city = ?, district = ?, localization = ?, number_localization = ?, service_provider = ?, observation = ?, active = ? WHERE id = ?";

      db.query(
        query,
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

  // Pessoa Juridica
  getDataSupplierLegal: (page, pageSize) => {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * pageSize;
      const query = `SELECT * FROM supplier_legal_person ORDER BY id DESC LIMIT ? OFFSET ?`;

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

  insertLegal: (
    social_reason,
    fantasy_name,
    cnpj,
    state_registration,
    group_name,
    number_phone,
    number_phone_reserve,
    cep,
    city,
    district,
    localization,
    number_localization,
    service,
    observation
  ) => {
    return new Promise((accepted, reject) => {
      const data =
        "INSERT INTO supplier_legal_person (social_reason, fantasy_name, cnpj, state_registration, group_name, number_phone, number_phone_reserve, cep, city, district, localization, number_localization, service, observation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        data,
        [
          social_reason,
          fantasy_name,
          cnpj,
          state_registration,
          group_name,
          number_phone,
          number_phone_reserve,
          cep,
          city,
          district,
          localization,
          number_localization,
          service,
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

  updateLegal: (
    id_user,
    social_reason,
    fantasy_name,
    cnpj,
    state_registration,
    group_name,
    number_phone,
    number_phone_reserve,
    cep,
    city,
    district,
    localization,
    number_localization,
    service,
    observation,
    active
  ) => {
    return new Promise((accepted, reject) => {
      const query =
        "UPDATE supplier_legal_person SET social_reason = ?, fantasy_name = ?, cnpj = ?, state_registration = ?, group_name = ?, number_phone = ?, number_phone_reserve = ?, cep = ?, city = ?, district = ?, localization = ?, number_localization = ?, service = ?, observation = ?, active = ? WHERE id = ?";

      db.query(
        query,
        [
          social_reason,
          fantasy_name,
          cnpj,
          state_registration,
          group_name,
          number_phone,
          number_phone_reserve,
          cep,
          city,
          district,
          localization,
          number_localization,
          service,
          observation,
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
