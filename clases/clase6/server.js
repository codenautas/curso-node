var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var productos = [];

app.get("/productos", function (req, res, next) {
    res.json(productos);
});

var seq = 0;

app.post("/productos", function (req, res, next) {
    var _id = "ID" + seq++;

    var producto = req.body;
    producto._id = _id;
    productos.push(producto);

    res.status(201).json({
        _id: _id
    });
});

var port=3002;

app.listen(port, function () {
    console.log("Servidor iniciado en el puerto",port);
});

