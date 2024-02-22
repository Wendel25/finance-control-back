const Product = require("../../../models/Products/Product/Product");

const productController = {
  async insert(req, res) {
    try {
      const {
        product,
        category,
        price,
        amount,
        supplier,
        date_purchase,
        description,
      } = req.body;

      const newProduct = await Product.create({
        product,
        category,
        price,
        amount,
        supplier,
        date_purchase,
        description,
      });

      res.status(201).json({
        id: newProduct.id,
        product: newProduct.product,
        category: newProduct.category,
        price: newProduct.price,
        amount: newProduct.amount,
        supplier: newProduct.supplier,
        date_purchase: newProduct.date_purchase,
        description: newProduct.description,
        active: newProduct.active,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao inserir produto no banco de dados" });
    }
  },
};

module.exports = productController;
