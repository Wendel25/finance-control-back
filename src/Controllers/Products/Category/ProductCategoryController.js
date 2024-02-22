const productCategoryService = require("../../../Services/Products/Category/ProductCategoryService");

module.exports = {
  get: async (req, res) => {
    const providers = await productCategoryService.get();

    const json = {
      error: "",
      results: providers,
    };

    res.json(json);
  },

  insert: async (req, res) => {
    const json = {
      error: "",
      results: {},
    };

    const category = req.body.category;

    if (!category) {
      return res.status(400).json({ error: "Campo obrigatório" });
    }

    try {
      const insertCateogory = await productCategoryService.insert(category);

      res.json({
        category: {
          category,
        },
      });
    } catch (error) {
      console.log("Erro ao fazer cadastro", error);
      res.status(500).json({ error: "Erro ao registrar categoria" });
    }
  },

  delete: async (req, res) => {
    const deleteCategory = await productCategoryService.delete(req.params.id);

    return res.status(200).json({ message: "Categoria excluida com sucesso" });
  },
};
