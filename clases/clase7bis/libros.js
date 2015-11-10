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

router.post("/",function(req, res,next){
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
router.get("/:id",function(req,res,next){
    var _id = req.params.id;
    datos.libros.select(_id,function(err,libro){
        if(err){
            next(err);
            return;
        }
        res.json(libro);
    });
})

router.delete("/:id",function(req,res,next){
    var _id = req.params.id;
    datos.libros.delete(_id,function(err,libros){
        if(err){
            next(err);
            return;
        }
        res.json(libros);
    })
})

router.put("/:id",function(req,res,next){
    var _id=req.params.id;
    datos.libros.update(_id,req.body,function(err,libro){
        if(err){
            next(err);
            return;
        }
        res.json(libro);
    });
    
});


module.exports = router;