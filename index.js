var express = require("express")
var app = express()

// Middleware para parsear los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let port = 8080

app.listen(port,function(req,res){
    console.log("Servidor listo en puerto: " + port);
    console.log("http://localhost:" + port);
})

var router = require('./routes/routes');
app.use('/', router);
app.set("view engine", "ejs");
app.use(express.static('public'));


