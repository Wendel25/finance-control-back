const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "control-finance",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Conectado ao banco de dados");
});

module.exports = connection;
