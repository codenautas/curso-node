var pg = require('pg');
var crypto= require('crypto');
var connString =  connString ;
var connString= require("./conn-string");

var types = require('pg').types;

types.setTypeParser(1700, function(val) {
  //remember: all values returned from the server are either NULL or a string
  return val ? Number(val): null;
});

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


var seq = 0;
var libros = [];

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
     
        select: function (_id, callback) {
            var query = "SELECT * FROM libros WHERE _id=$1";
            queryPgParams(query, [_id], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                var libro=result.rows[0];
                //libro.precio=Number(libro.precio); pasaje a numero a mano
                callback(null, libro);
            });
        },

        delete: function (_id, callback) {
            var query = "DELETE FROM libros WHERE _id=$1";
            queryPgParams(query, [_id], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                //console.log(result);
                if(result.rowCount==0){
                    callback(null, false);
                }
                callback(null, true);
            });
        },

        update: function (_id, libro, callback) {
           var query = "UPDATE libros set autor=$2, titulo= $3, precio=$4  WHERE _id=$1";
            queryPgParams(query, [_id,libro.titulo, libro.autor, libro.precio], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                //console.log(result);
                if(result.rowCount==0){
                    callback(null, false);
                }
                callback(null, true);
            });
/*
            var encontrados = libros.filter(function (prod) {
                return prod._id === _id;
            });

            if (!encontrados.length) {
                callback(null, false);
                return;
            }

            libros = libros.filter(function (prod) {
                return prod._id !== _id;
            });

            libro._id = _id;
            libros.push(libro);

            callback(null, true);
*/            
        }
      
    },
    login: {
        validar: function(nombre, clave, callback){
            var query = "SELECT * FROM usuarios WHERE nombre=$1";
            queryPgParams(query, [nombre], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                var usuario=result.rows[0];
                var hash=crypto
                    .createHash('md5')
                    .update(clave)
                    .digest('hex');
                console.log(hash, usuario.clave);    
                if (usuario && usuario.clave==hash /*hash==usuario.clave */) {
                    callback(null,{
                        nombre: usuario.nombre //subconjunto datos del usuario para guardar
                    });
                }
                else {
                    callback(null, null);
                }
            });
        }
    }
};
