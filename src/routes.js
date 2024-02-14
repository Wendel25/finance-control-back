const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const userController = require("./Controllers/Users/UsersController")
const categoryController = require("./Controllers/Category/CategoryController")
const subcategoryController = require("./Controllers/SubCategory/SubCategoryController")

//Categorias
router.get('/categories', categoryController.getCategory);
router.post('/new-category', categoryController.insert);
router.delete('/category/:id', categoryController.delete);

//Sub Categorias
router.get('/subcategories', subcategoryController.getSubCategory);
router.post('/new-subcategory', subcategoryController.insert);
router.delete('/subcategory/:id', subcategoryController.delete);

//Usuarios
router.get('/users', userController.getUsers);
router.post('/register-user', userController.insert);
router.put('/user/:id', userController.update);

module.exports = router;
