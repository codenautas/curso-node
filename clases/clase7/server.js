"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var datos = require("./datos");

var app = express();

app.use(bodyParser.json());

app.get("/productos", function (req, res, next) {
    datos.productos.selectAll(function (err, productos) {
        if (err) {
            next(err);
            return;
        }
        res.json(productos);
    });
});

app.post("/productos", function (req, res, next) {
    datos.productos.insert(req.body,function(err,  res){
        if(err){
            res.status(500).end(err.message||err);
            return ;
        }
        res.status(201).json({
            _id: res
        });
    });
});

var port=3002;

app.listen(port, function () {
    console.log("Servidor iniciado en el puerto",port);
});

