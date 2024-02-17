const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authMiddleware = require("./Middlewares/AuthController");

router.use(bodyParser.json());

const loginController = require("./Controllers/Login/loginController");
const userController = require("./Controllers/Users/UsersController");
const categoryController = require("./Controllers/Category/CategoryController");
const subcategoryController = require("./Controllers/SubCategory/SubCategoryController");
const accountsBankController = require("./Controllers/Accounts/AccountsBankController");
const registerServiceController = require("./Controllers/RegisterService/RegisterServiceController");
const providersController = require("./Controllers/Providers/ProvidersController");

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
router.post("/new-subcategory", subcategoryController.insert);
router.delete("/subcategory/:id", subcategoryController.delete);

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

//Prestadores de serviço
router.get("/providers", providersController.getProviders);
router.post("/new-provider", providersController.insert);

// Registros de serviços realizados
router.get("/services", registerServiceController.getServices);

module.exports = router;
