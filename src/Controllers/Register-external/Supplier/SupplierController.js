const supplierService = require("../../../Services/Register-external/Supplier/SupplierService");

module.exports = {
  get: async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;

      const providers = await supplierService.getDataSupplier(page, pageSize);

      const json = {
        error: "",
        results: providers,
        page: page,
        pageSize: pageSize,
      };

      res.json(json);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      res.status(500).json({ error: "Erro ao buscar registros" });
    }
  },

  getSingle: async (req, res) => {
    const providers = await supplierService.getSupplierSingle();

    const json = {
      error: "",
      results: providers,
    };

    res.json(json);
  },

  insert: async (req, res) => {
    const {
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
    } = req.body;

    if (
      !name ||
      !cpf ||
      !number_phone ||
      !cep ||
      !city ||
      !district ||
      !localization ||
      !service_provider
    ) {
      return res.status(400).json({ error: "Campos obrigatórios faltantes!" });
    }

    try {
      const registerSupplier = await supplierService.insert(
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
      );

      res.json({
        data: {
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
        },
      });
    } catch (error) {
      console.error("Erro ao registrar prestador de serviço:", error);
      res.status(500).json({ error: "Erro ao registrar prestador de serviço" });
    }
  },

  update: async (req, res) => {
    const id_user = req.params.id;
    const {
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
    } = req.body;

    const json = {
      error: "",
      results: {},
    };

    if (
      id_user &&
      name &&
      cpf &&
      number_phone &&
      cep &&
      city &&
      district &&
      localization &&
      number_localization &&
      service_provider &&
      active
    ) {
      try {
        await supplierService.update(
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
        );

        json.results = {
          message: "Cadastro atualizado com sucesso!",
        };

        res.status(200).json(json);
      } catch (error) {
        console.log(error);
        json.error = "Erro ao atualizar usuário";
        res.status(400).json(json);
      }
    } else {
      json.error = "Preencha todos os campos!";
      res.status(400).json(json);
    }
  },

  // Pessoa Juridica

  getLegal: async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;

      const providers = await supplierService.getDataSupplierLegal(
        page,
        pageSize
      );

      const json = {
        error: "",
        results: providers,
        page: page,
        pageSize: pageSize,
      };

      res.json(json);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      res.status(500).json({ error: "Erro ao buscar registros" });
    }
  },

  insertLegal: async (req, res) => {
    const {
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
    } = req.body;

    if (
      !social_reason ||
      !cnpj ||
      !number_phone ||
      !cep ||
      !city ||
      !district ||
      !localization ||
      !service
    ) {
      return res.status(400).json({ error: "Campos obrigatórios faltantes!" });
    }

    try {
      const registerSupplier = await supplierService.insertLegal(
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
      );

      res.json({
        data: {
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
        },
      });
    } catch (error) {
      console.error("Erro ao registrar prestador de serviço:", error);
      res.status(500).json({ error: "Erro ao registrar prestador de serviço" });
    }
  },

  updateLegal: async (req, res) => {
    const id_user = req.params.id;
    const {
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
    } = req.body;

    const json = {
      error: "",
      results: {},
    };

    if (
      id_user &&
      social_reason &&
      cnpj &&
      number_phone &&
      cep &&
      city &&
      district &&
      localization &&
      number_localization &&
      service &&
      active
    ) {
      try {
        await supplierService.updateLegal(
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
        );

        json.results = {
          message: "Cadastro atualizado com sucesso!",
        };

        res.status(200).json(json);
      } catch (error) {
        console.log(error);
        json.error = "Erro ao atualizar usuário";
        res.status(400).json(json);
      }
    } else {
      json.error = "Preencha todos os campos!";
      res.status(400).json(json);
    }
  },
};
