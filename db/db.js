var mysql = require('mysql2');

var conexion = mysql.createConnection({
  host: 'locahost',
  port: 3306,
  database: 'mdidatabase',
  user: 'mdiuserdatabase',
  password: 'md1p4ssw0rd',
});

conexion.connect(function (error) {
  if (error) {
    throw error
  } else {
    console.log('Conexion exitosa');
  }
})

module.exports = conexion