//var seq = 0;
//var libros = [];
var pg = require('pg');
var types = require('pg').types;
var crypto = require("crypto");

types.setTypeParser(1700, function(val) {
  return val ? Number(val): null;
});

var connString = "postgres://postgres:admin1234@localhost:5435/libros_db";
/* Funciones agregadas para el manejo de Bd */
function getPgClient(callback) {
    pg.connect(connString, function (err, client, done) {
        if (err) {
            done(true);
            callback(err);
            return;
        }
        callback(null, client, done);
    });
};

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
/* fin Funciones agregadas para el manejo de Bd */

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
            var query = "SELECT * FROM libros WHERE _id = $1";
            queryPgParams(query, [_id], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                var libro2 = result.rows[0];
                //libro2.precio = Number(libro2.precio);
                callback(null,libro2);
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
        update: function(_id, libro, callback){
            var query = "UPDATE libros SET titulo =$2 , autor=$3, precio=$4 WHERE _id=$1";
            queryPgParams(query, [_id, libro.titulo, libro.autor, libro.precio], function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, result.rowCount);
            });

        }
    },
	login: {
	    validar: function(nombre,clave,callback) {
		    var query = "SELECT * from usuarios where nombre=$1";
			queryPgParams(query, [nombre], function(err,results) {
			      if (err) {
                     callback(err);
					 return;
				  }
				  var usuario = results.rows[0];
				  var hash = crypto
				      .createHash('md5')
					  .update(clave)
					  .digest('hex');
				  if (hash === usuario.hash){
				      callback(null, {
                          nombre: usuario.nombre
					  });
				  } else {
				    callback (null,null);
				  }
			})
		}
	}
};

