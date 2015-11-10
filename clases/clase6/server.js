var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var productos = [];
var seq = 0;
app.use(bodyParser.json());


app.get("/productos", function (req, res, next) {
    res.json(productos);
});

app.get("/productos/:id", function (req, res, next) {
    var _id = req.params.id;
    var respuesta=productos.filter(function(libro){
        return libro['_id']==_id;
    })
    
    if (respuesta.length){
    res.json(respuesta);
    }else{
        res.status(404).end();
    }
})

app.post("/productos", function (req, res, next) {
    var _id = "ID" + seq++;

    var producto = req.body;
    producto._id = _id;
    productos.push(producto);

    res.status(201).json({
        _id: _id
    });
});

app.delete("/productos/:id",function(req,res,next){
    var _id=req.params.id;
    var respuesta=productos.filter(function(libro){        
        return libro['_id']!=_id;
    });

    if(respuesta.length!=productos.length){
        productos=respuesta;
        res.status(200).end();
    }else{
        res.status(404).end();
    }
})

app.put("/productos/:id",function(req,res,next){
    var _id=req.params.id;
    var respuesta=productos.filter(function(libro){
        return libro['_id']==_id;
    });
    productos.forEach(function(libro){
        if(libro['_id']==_id){
            libro=req.body;
        }
        return;
    });
    if(respuesta.length){
        res.status(200).end();
    }else{
        res.status(404).end();
    }
})

app.listen(3001, function () {
    console.log("Servidor iniciado");
});


