const productService = require("../../../Services/Products/Itens-products/ProductsService");

module.exports = {
  getProducts: async (req, res) => {
    const products = await productService.getProducts();

    const json = {
      error: "",
      results: products,
    };

    res.json(json);
  },

  getSuppliers: async (req, res) => {
    const suppliers = await productService.getSuppliers();

    const json = {
      error: "",
      results: suppliers,
    };

    res.json(json);
  },

  insert: async (req, res) => {
    const {
      product,
      category,
      price,
      amount,
      supplier,
      date_purchase,
      description,
    } = req.body;

    if (product && category && price && amount && supplier && date_purchase) {
      try {
        const newProduct = {
          product,
          category,
          price,
          amount,
          supplier,
          date_purchase,
          description,
        };

        const products = await productService.insert(newProduct);

        res.status(201).json(products);
      } catch (error) {
        console.log("Erro ao cadastrar produto");
      }
    } else {
      console.log("Campos obrigatórios");
      return res
        .status(400)
        .json({ error: "Preencha todos os campos antes de enviar" });
    }
  },
};
