const registerService = require("../../Services/RegisterService/RegisterService");

module.exports = {
  getServices: async (req, res) => {
    const json = {
      error: "",
      results: [],
    };

    const services = await registerService.getServices();

    for (const i in services) {
      json.results.push({
        id: services[i].id,
        service: services[i].service_name,
        category: services[i].category,
        sub_category: services[i].sub_category,
        value_initial: services[i].value_initial,
        value_additional: services[i].value_additional,
        value_total: services[i].value_total,
        location: services[i].location,
        service_provider: services[i].service_provider,
        form_payment: services[i].form_payment,
        bank: services[i].bank,
        account: services[i].account,
        agency: services[i].agency,
        date_initial: services[i].date_initial,
        date_final: services[i].date_final,
        observation: services[i].observation,
        proof: services[i].proof,
        user_create: services[i].user_create,
        created_at: services[i].created_at,
      });
    }

    res.json(json);
  },
};
