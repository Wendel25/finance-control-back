const supplierService = require("../../Services/Supplier/SupplierService");

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
};
