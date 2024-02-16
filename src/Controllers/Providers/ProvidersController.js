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
        localization: providers[i].localization,
        service_provider: providers[i].service_provider,
        active: providers[i].active,
      });
    }

    res.json(json);
  },
};
