const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authMiddleware = require("./Middlewares/AuthController");

router.use(bodyParser.json());

const loginController = require("./Controllers/Login/loginController");
const userController = require("./Controllers/Users/UsersController");
const categoryController = require("./Controllers/Menu/Category/CategoryController");
const subcategoryController = require("./Controllers/Menu/SubCategory/SubCategoryController");
const accountsBankController = require("./Controllers/Accounts/AccountsBankController");
const registerServiceController = require("./Controllers/RegisterService/RegisterServiceController");
const providersController = require("./Controllers/Register-external/Providers/ProvidersController");
const suppliersController = require("./Controllers/Register-external/Supplier/SupplierController");
const categoryProductsController = require("./Controllers/Products/Category/ProductCategoryController");
const productsController = require("./Controllers/Products/Itens-products/ProductsController");

// Login
router.post("/login", loginController.login);

// Middleware de autenticação aplicado a todas as rotas
router.use(authMiddleware);

// Categorias
router.get("/categories", categoryController.getCategory);
router.post("/new-category", categoryController.insert);
router.delete("/category/:id", categoryController.delete);

// Sub Categorias
router.get("/subcategories", subcategoryController.getSubCategory);
router.get("/subcategory/:category", subcategoryController.getSubCategoryByCategory);
router.post("/new-subcategoategry", subcategoryController.insert);
router.delete("/subcory/:id", subcategoryController.delete);

// Usuarios
router.get("/users", userController.getUsers);
router.post("/register-user", userController.insert);
router.put("/user/:id", userController.update);

// Contas bancárias
router.get("/accounts", accountsBankController.getAccounts);
router.get("/bank", accountsBankController.getBank);
router.get("/bank/:bank", accountsBankController.getDataByBank);
router.post("/new-accounts", accountsBankController.insetAccount);
router.put("/account/:id", accountsBankController.update);

// Prestadores de serviço
router.get("/providers", providersController.getProviders);
router.get("/providers-legal", providersController.getProvidersLegal);
router.get("/provider", providersController.getProvidersSingle);
router.post("/new-provider", providersController.insert);
router.post("/new-provider-legal", providersController.insertLegalPerson);
router.put("/update-provider/:id", providersController.update);
router.put("/update-provider-legal/:id", providersController.updateLegal);

// Fornecedores
router.get("/suppliers", suppliersController.get);
router.get("/supplier-legal", suppliersController.getLegal);
router.get("/supplier", suppliersController.getSingle);
router.post("/new-suppliers", suppliersController.insert);
router.post("/new-suppliers-legal", suppliersController.insertLegal);
router.put("/update-suppliers/:id", suppliersController.update);
router.put("/update-suppliers-legal/:id", suppliersController.updateLegal);

// Categoria de produtos
router.get('/product-category', categoryProductsController.get);
router.post('/new-product-category', categoryProductsController.insert);
router.delete('/product-category/:id', categoryProductsController.delete);

// Produtos
router.get('/products', productsController.getProducts);
router.get('/product-suppliers', productsController.getSuppliers);
router.post('/new-product', productsController.insert);

// Registros de serviços realizados
router.get("/services", registerServiceController.getServices);

module.exports = router;
