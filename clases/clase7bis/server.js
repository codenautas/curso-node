var express = require("express");
var bodyParser = require("body-parser");

var libros = require("./libros");

var app = express();

app.use(bodyParser.json());

app.use("/libros", libros);

app.listen(3000, function () {
    console.log("Servidor iniciado");
});