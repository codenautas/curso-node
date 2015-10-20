var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var seq = 0;
var productos = [];

app.get("/productos", function (req, res, next) {
    res.json(productos);
});

app.post("/productos", function (req, res, next) {
    var _id = "ID" + seq++;

    var producto = req.body;
    producto._id = _id;
    productos.push(producto);

    res.status(201).json({
        _id: _id
    });
});

app.get("/productos/:id", function (req, res, next) {
    var _id = req.params.id;
    // buscar entre los productos el que tenga el `_id` solicitado
    var productosFiltrados = productos.filter(function(candidato){
        return candidato._id == _id;
    });
    // responder con dicho objeto
    if(productosFiltrados.length==0){
        // responder con un error 404 si no se ha encontrado
        res.status(404);
        res.end("No se encontro");
    }else if(productosFiltrados.length==1){
        res.status(200).json(productosFiltrados[0]);
        res.end();
    }else{
        res.status(500);
        res.end("mas de un producto con el mismo ID");
    }
});

var server = app.listen(3000, function () {
  console.log('Servidor web iniciado');
});