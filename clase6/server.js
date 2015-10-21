var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var productos = [];
//ver todos
app.get("/productos", function (req, res, next) {
    res.json(productos);
});
//agregar
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
//ver uno
app.get("/productos/:id", function (req, res, next) {
    var _id = req.params.id;
    var resultado = productos.filter(function(elemento){
                     return elemento._id === _id;
    });
    if (resultado.length==0) {
       res.status(404).end();
    }
    else {
    res.send(resultado[0])};
    // buscar entre los productos el que tenga el `_id` solicitado
    // responder con dicho objeto
    // responder con un error 404 si no se ha encontrado
});
//borrar uno
app["delete"]("/productos/:id", function (req, res, next) {
    var _id = req.params.id;
    var resultado = productos.filter(function(elemento){
                     return elemento._id !== _id;
    });
    if (resultado.length == productos.length) {
      res.status(404).end();
      }
    else {productos=resultado;
          res.status(200).end()}
});
//modificar uno

app.put("/productos/:id", function (req, res, next) {
    var _id = req.params.id;
    console.log("Id: ",_id);
    console.log("req.params: ",req.params);
    var cambios = req.body;
    console.log("req.body: ", cambios);
    //var indice = productos.findIndex(function(elemento){
    //                 return elemento._id === _id;
    //});
    var indice = -1;
    for (var i=0; i < productos.length; i++) {
       if (productos[i]._id === _id) {indice = i}
    }
    console.log("Indice: " , indice);
    if (indice===-1) {
       res.status(404).end();
    }
    else {
       productos[indice].nombre = cambios.nombre||productos[indice].nombre;
       productos[indice].autor  = cambios.autor||productos[indice].autor;
       productos[indice].precio = cambios.precio||productos[indice].precio;
       res.send(productos[indice])};
});
//inicia servidor
app.listen(4000, function () {
    console.log("Servidor iniciado");
});



