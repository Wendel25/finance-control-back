const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const userController = require("./Controllers/Users/UsersController");
const categoryController = require("./Controllers/Category/CategoryController");
const subcategoryController = require("./Controllers/SubCategory/SubCategoryController");
const accountsBankController = require("./Controllers/Accounts/AccountsBankController")

//Categorias
router.get("/categories", categoryController.getCategory);
router.post("/new-category", categoryController.insert);
router.delete("/category/:id", categoryController.delete);

//Sub Categorias
router.get("/subcategories", subcategoryController.getSubCategory);
router.post("/new-subcategory", subcategoryController.insert);
router.delete("/subcategory/:id", subcategoryController.delete);

//Usuarios
router.get("/users", userController.getUsers);
router.post("/register-user", userController.insert);
router.put("/user/:id", userController.update);

//Contas bancárias
router.get("/accounts", accountsBankController.getAccounts);
router.post("/new-accounts", accountsBankController.insetAccount);
router.put("/account/:id", accountsBankController.update);

module.exports = router;
