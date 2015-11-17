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

router.post("/", function (req, res, next) {
    var libro = req.body;
    datos.libros.insert(libro, function (err, _id) {
        if (err) {
            next(err);
            return;
        }
        res.status(201).json({
            _id: _id
        });
    });
});

router.get("/:id", function (req, res, next) {
    var _id = req.params.id;
    datos.libros.select(_id, function (err, libro) {
        if (err) {
            next(err);
            return;
        }
        if (!libro) {
            res.status(404).end();
            return;
        }
        res.json(libro);
    });
});

router.delete("/:id", function (req, res, next) {
    if(!req.session.user){
        res.status(401).end();
        return;
    }
    var _id = req.params.id;
    datos.libros.delete(_id, function (err, encontrado) {
        if (err) {
            next(err);
            return;
        }
        if (!encontrado) {
            res.status(404).end();
            return;
        }
        res.end();
    });
});

router.put("/:id", function (req, res, next) {
    var _id = req.params.id;
    var libro = req.body;
    datos.libros.update(_id, libro, function (err, modificado) {
        if (err) {
            next(err);
            return;
        }
        if (!modificado) {
            res.status(404).end();
            return;
        }
        res.end();
    });
});

module.exports = router;
