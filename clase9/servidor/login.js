var express = require("express");

var datos = require("./datos");

var router = express.Router();

var sesion = require("./sesion")

router.post("/login", function (req, res, next) {
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

router.post("/logout", function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            next (err);
            return;
        }
        res.end();
    });
});

router.get("/logged/status", sesion.checkUser, function (req, res, next) {
      res.end();
});

module.exports = router;