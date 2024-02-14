const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const userController = require("./Controllers/Users/UsersController")
const categoryController = require("./Controllers/Category/CategoryController")

//Usuarios
router.get('/users', userController.getUsers);
router.post('/register-user', userController.insert);
router.put('/user/:id', userController.update);

//Categorias
router.get('/categories', categoryController.getCategory);
router.post('/new-category', categoryController.insert);
router.delete('/category/:id', categoryController.delete);

module.exports = router;
