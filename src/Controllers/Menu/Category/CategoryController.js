const categoryService = require("../../../Services/Menu/Category/CategoryService");

module.exports = {
  getCategory: async (req, res) => {
    const json = {
      error: "",
      result: [],
    };

    const category = await categoryService.getCategories();

    for (const i in category) {
      json.result.push({
        id: category[i].id,
        name: category[i].category,
      });
    }

    res.json(json);
  },

  insert: async (req, res) => {
    const json = {
      error: "",
      result: {},
    };

    const category = req.body.category;

    if (!category) {
      return res.status(400).json({ error: "Campo obrigatório" });
    }

    try {
      const existingCategory = await categoryService.getCategory(category);

      if (existingCategory.length > 0) {
        return res.status(400).json({ error: "Categoria já existe" });
      }

      const categoryInsert = await categoryService.insert(category);

      res.json({
        message: "Categoria registrada com sucesso",
        category: {
          category,
        },
      });
    } catch (error) {
      console.error("Erro ao registrar categoria:", error);
      res.status(500).json({ error: "Erro ao registrar categoria" });
    }
  },

  delete: async (req, res) => {
    const json = {
      error: "",
      result: {},
    };

    await categoryService.delete(req.params.id);

    return res.status(200).json({ message: "Categoria excluida com sucesso" });
  },
};
