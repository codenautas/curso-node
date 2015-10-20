var express = require("express");
var bodyParser = require("body-parser");

var libros = require("./libros");

var SERVER_PORT = 3000;

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/api/libros", libros);

app.listen(SERVER_PORT, function () {
    console.log("Servidor iniciado en el puerto %s", SERVER_PORT);
});
