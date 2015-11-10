var express = require("express");
var bodyParser = require("body-parser");

var datos = require("./datos");

var app = express();

app.use(bodyParser.json());

app.get("/libros", function (req, res, next) {
    datos.libros.selectAll(function (err, libros) {
        if (err) {
            next(err);
            return;
        }
        res.json(libros);
    });
});
app.post("/libros",function(req, res,next){
    var libro=req.body;
    
    datos.libros.insert(libro,function(err,_id){
        if(err){
            next(err);
            return;
        }
        res.status(201).json({
            _id: _id
        });
    })
});
app.get("/libros/:id",function(req,res,next){
    var _id = req.params.id;
    datos.libros.select(_id,function(err,libro){
        if(err){
            next(err);
            return;
        }
        res.json(libro);
    });
})
app.delete("/libros/:id",function(req,res,next){
    var _id = req.params.id;
    datos.libros.delete(_id,function(err,libros){
        if(err){
            next(err);
            return;
        }
        res.json(libros);
    })
})

app.put("/libros/:id",function(req,res,next){
    var _id=req.params.id;
    datos.libros.update(_id,req.body,function(err,libro){
        if(err){
            next(err);
            return;
        }
        res.json(libro);
    });
    
});


app.listen(3000, function () {
    console.log("Servidor iniciado");
});