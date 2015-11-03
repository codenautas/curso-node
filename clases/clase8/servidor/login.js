var express = require("express");

var datos = require("./datos");

var router = express.Router();

router.post("/", function (req, res, next) {
    var nombre = req.body.nombre;
    var clave = req.body.clave;
    datos.login.validar(nombre, clave, function (err, userData) {
        if (err) {
            next(err);
            return;
        }
        if (userData) {
            req.session.user = userData;
            res.end();
        } else {
            res.status(401).end();
        }
    });
});

module.exports = router;
