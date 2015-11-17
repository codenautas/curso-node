var seq = 0;
var libros = [];
var pg = require('pg');
var connString = require('./conn-string');
var types= require('pg').types;
var crypto=require("crypto");

types.setTypeParser(1700,function(val){
    return val?Number(val):null
})

function getPgClient(callback) {
    pg.connect(connString, function (err, client, done) {
        if (err) {
            done(true);
            callback(err);
            return;
        }
        callback(null, client, done);
    });
}
function queryPgParams(query, params, callback) {
    getPgClient(function (err, client, done) {
        if (err) {
            callback(err);
            return;
        }
        client.query(query, params, function (err, result) {
            if (err) {
                done(true);
                callback(err);
                return;
            }
            done();
            callback(null, result);
        });
    });
}
function queryPg(query, callback) {
    queryPgParams(query, [], callback);
}

module.exports = {
    libros: {
        selectAll: function (callback) {
            queryPg("SELECT * FROM libros", function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, result.rows);
            });
        },
        select: function (_id, callback) {
            var query="SELECT * FROM libros where _id=$1"
            queryPgParams(query, _id, function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                var libro=result.rows[0];
                //libro.precio=Number(libro.precio)
                callback(null, libro);
            });
        },
        insert: function (libro, callback) {
            
            var query = "INSERT INTO libros (titulo, autor, precio) VALUES ($1, $2, $3) RETURNING _id";
            queryPgParams(query, [libro.titulo, libro.autor, libro.precio], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, result.rows[0]._id);
            });
        },
        delete: function (_id, callback) {
            var query = "DELETE FROM libros WHERE _id=$1";
            queryPgParams(query, [_id], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, result.rowCount);
            });
        },

        update: function (_id, libro, callback) {
            var query="UPDATE libros set titulo=$1, autor=$2, precio=$3 where _id=$4";
            queryPgParams(query,[libro.titulo,libro.autor,libro.precio,_id],function(err, result){
                if(err){
                    callback(err);
                    return;
                }
                libro._id = _id;
                callback(null,result.rowCount);
            });
        }
    },
    login:{
        validar:function(nombre,clave,callback){
            var query= "SELECT * FROM usuarios WHERE nombre=$1";
            queryPgParams(query,[nombre],function(err,results){
                if(err){
                    callback(err);
                    return;
                }

                var usuario=results.rows[0];
                var hash=crypto
                    .createHash("md5")
                    .update(clave)
                    .digest("hex");
                if(usuario && (usuario.hash===hash)){
                    callback(null,{
                        nombre:usuario.nombre
                    });
                }else{
                    callback(null,null);
                }    
                
            });
        }
    }
};
