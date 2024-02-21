const subcategoryService = require("../../../Services/Menu/SubCategory/SubCategoryService");

module.exports = {
  getSubCategory: async (req, res) => {
    const json = {
      error: "",
      result: [],
    };

    const subcategory = await subcategoryService.getData();

    for (const i in subcategory) {
      json.result.push({
        id: subcategory[i].id,
        subCategory: subcategory[i].subCategory,
        category: subcategory[i].category_name,
      });
    }

    res.json(json);
  },

  getSubCategoryByCategory: async (req, res) => {
    const json = {
      error: "",
      result: {},
    };

    const category = req.params.category;

    try {
      const subCategory = await subcategoryService.getSubCategoryByCategory(
        category
      );

      res.json({
        subcategory: subCategory,
      });

    } catch (error) {
      console.error("Erro ao obter subcategoria:", error);
      return res.status(500).json({ error: "Erro ao obter subcategoria" });
    }
  },

  insert: async (req, res) => {
    const json = {
      error: "",
      result: {},
    };

    const subcategory = req.body.subCategory;
    const categoryID = req.body.category;

    try {
      const categoryInsert = await subcategoryService.insert(
        subcategory,
        categoryID
      );

      res.json({
        message: "Sub categoria registrada com sucesso",
        subcategory: {
          subcategory,
          categoryID,
        },
      });
    } catch (error) {
      console.error("Erro ao registrar sub categoria:", error);
      res.status(500).json({ error: "Erro ao registrar sub categoria" });
    }
  },

  delete: async (req, res) => {
    const json = {
      error: "",
      result: {},
    };

    await subcategoryService.delete(req.params.id);

    return res
      .status(200)
      .json({ message: "Sub categoria excluida com sucesso" });
  },
};
