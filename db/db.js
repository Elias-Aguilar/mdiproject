require('dotenv').config();

var mysql = require('mysql2');

var conexion = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'mdi',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'r00tpassw0rd',
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('Conexion exitosa');
  }
});

module.exports = conexion;
