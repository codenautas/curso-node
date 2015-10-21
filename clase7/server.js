var express = require("express");
var bodyParser = require("body-parser");

var datos = require("./datos");

var app = express();

app.use(bodyParser.json());
//ver todos
app.get("/libros", function (req, res, next) {
    datos.libros.selectAll(function (err, libros) {
        if (err) {
            next(err);
            return;
        }
        res.json(libros);
    });
});

// definición del resto de las rutas
//agregar
var seq = 0;
app.post("/libros", function (req, res, next) {
    var libro = req.body;
    datos.libros.insert(libro,function (err, idLibro) {
        if (err) {
            next(err);
            return;
        }
        res.status(201).json({
            _id: idLibro
        });
    });
});

//ver uno
app.get("/libros/:id", function (req, res, next) {
    var _id = req.params.id;
    datos.libros.select(_id, function(err, miLibro) {
      if (err) {
          next(err);
          return;
      }
      if (!miLibro) {
         res.status(404).end();
         return;
      }
      res.send(miLibro)
    });
});

//borrar uno
app["delete"]("/libros/:id", function (req, res, next) {
    var _id = req.params.id;
    datos.libros.delete(_id, function(err,estado) {
        if (err) {
          next(err);
          return;
        }
        if (estado) {res.status(200).end()}
        else {res.status(404).end()}        
    });
});

//cambiar uno
app.put("/libros/:id", function (req, res, next) {
    var _id = req.params.id;
    var cambios = req.body;
    datos.libros.update(_id, cambios, function(err,estado) {
        if (err) {
          next(err);
          return;
        }
        if (estado) {res.status(200).end()}
        else {res.status(404).end()}        
    });
});
/**/
/*
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

*/
//inicia servidor
app.listen(4000, function () {
    console.log("Servidor iniciado");
});



