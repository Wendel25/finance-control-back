require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes.js");

const bd = require('./db.js');
const server = express();
const port = 3000;

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/api', routes);

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
