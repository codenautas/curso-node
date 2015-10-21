var express = require("express");

var datos = require("./datos");

var router = express.Router();

router.get("/", function (req, res, next) {
    datos.libros.selectAll(function (err, libros) {
        if (err) {
            next(err);
            return;
        }
        res.json(libros);
    });
});

// resto de las rutas
var seq = 0;
router.post("/", function (req, res, next) {
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
router.get("/:id", function (req, res, next) {
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
router["delete"]("/:id", function (req, res, next) {
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
router.put("/:id", function (req, res, next) {
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

module.exports = router;