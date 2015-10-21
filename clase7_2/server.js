var express = require("express");
var bodyParser = require("body-parser");

var libros = require("./libros");

var app = express();

app.use(bodyParser.json());

app.use("/api/libros", libros);

app.listen(4000, function () {
    console.log("Servidor iniciado");
});