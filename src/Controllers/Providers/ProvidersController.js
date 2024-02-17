const providersService = require("../../Services/Providers/ProvidersService");

module.exports = {
  getProviders: async (req, res) => {
    const json = {
      error: "",
      results: [],
    };

    const providers = await providersService.getDataProviders();

    for (const i in providers) {
      json.results.push({
        id: providers[i].id,
        name: providers[i].name,
        cpf: providers[i].cpf,
        email: providers[i].email,
        birth_date: providers[i].birth_date,
        number_phone: providers[i].number_phone,
        number_phone_reserve: providers[i].number_phone_reserve,
        cep: providers[i].cep,
        city: providers[i].city,
        district: providers[i].district,
        localization: providers[i].localization,
        service_provider: providers[i].service_provider,
        active: providers[i].active,
      });
    }

    res.json(json);
  },

  insert: async (req, res) => {
    const {
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
        email,
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
          email,
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
};
