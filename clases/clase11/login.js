// var crypto=require("crypto");
// crypto.createHash("sha256").update("1234").digest("hex");
var express = require("express");
var datos = require("./datos");
var router = express.Router();


router.post("/login",function(req,res,next){
    var nombre=req.body.nombre;
    var clave=req.body.clave;
    datos.login.validar(nombre,clave,function(err,userData){
        if(err){
            next(err);
            return;
        }
        if(userData){
            req.session.user=userData;
            res.end();
        }else{
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

router.get('/logged/status',function(req,res,next){
    if(req.session.user){
        res.end();
    }else{
        res.status(401).end();
    }
})
module.exports=router;