const providersService = require("../../Services/Providers/ProvidersService");

module.exports = {
  //API PAGINADA
  getProviders: async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;

      const providers = await providersService.getDataProviders(page, pageSize);

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

  getProvidersSingle: async (req, res) => {
    const providers = await providersService.getProvidersSingle();

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
      birth_date,
      number_phone,
      number_phone_reserve,
      cep,
      city,
      district,
      localization,
      service_provider,
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
      const providers = await providersService.getUserByCPF(cpf);

      if (providers.length > 0) {
        return res
          .status(400)
          .json({ error: "o cpf informado já existe no banco de dados" });
      }

      const registerProvider = await providersService.insert(
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
      );

      res.json({
        message: "Prestador registrado com sucesso",
        user: {
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
      birth_date,
      number_phone,
      number_phone_reserve,
      cep,
      city,
      district,
      localization,
      service_provider,
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
      birth_date &&
      number_phone &&
      cep &&
      city &&
      district &&
      localization &&
      service_provider &&
      active
    ) {
      try {
        await providersService.update(
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

  // Pessoa Jurídica
  insertLegalPerson: async (req, res) => {
    const {
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
    } = req.body;

    if (
      !social_reason ||
      !cnpj ||
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
      const registerProviderLegal = await providersService.insertProviderLegal(
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
      );

      res.json({
        message: "Prestador registrado com sucesso",
        user: {
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
          service_provider,
        },
      });
    } catch (error) {
      console.error("Erro ao registrar prestador de serviço:", error);
      res.status(500).json({ error: "Erro ao registrar prestador de serviço" });
    }
  },

  getProvidersLegal: async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;

      const providers = await providersService.getDataProvidersLegal(
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

  updateLegal: async (req, res) => {
    const id_user = req.params.id; // Capturando o ID da rota
    const {
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
      service_provider &&
      active
    ) {
      try {
        await providersService.updateLegal(
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
      console.log(json.error); 
      res.status(400).json(json);
    }
  },
};
