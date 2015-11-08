var crypto = require('crypto');
var pg = require('pg');
var types = require('pg').types;
var connString = require('./conn-string');

types.setTypeParser(1700, function(val) {
    return val ? Number(val) : null;
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

module.exports = {
    libros: {
        selectAll: function (callback) {
            queryPg("SELECT * FROM libros", function (err, results) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results.rows);
            });
        },

        insert: function (libro, callback) {
            var query = "INSERT INTO libros (titulo, autor, precio) VALUES ($1, $2, $3) RETURNING _id";
            queryPgParams(query, [libro.titulo, libro.autor, libro.precio], function (err, results) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results.rows[0]._id);
            });
        },

        select: function (_id, callback) {
            var query = "SELECT * FROM libros WHERE _id=$1";
            queryPgParams(query, [_id], function (err, results) {
                if (err) {
                    callback(err);
                    return;
                }
                var libro = results.rows[0];
                callback(null, libro);
            });
        },

        delete: function (_id, callback) {
            var query = "DELETE FROM libros WHERE _id=$1";
            queryPgParams(query, [_id], function (err, results) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results.rowCount);
            });
        },

        update: function (_id, libro, callback) {
            var query = "UPDATE libros SET titulo=$1, autor=$2, precio=$3 WHERE _id=$4";
            queryPgParams(query, [libro.titulo, libro.autor, libro.precio, _id], function (err, results) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, results.rowCount);
            });
        }
    },

    login: {
        validar: function (nombre, clave, callback) {
            var query = "SELECT * FROM usuarios WHERE nombre=$1";
            queryPgParams(query, [nombre], function (err, results) {
                if (err) {
                    callback(err);
                    return;
                }

                var usuario = results.rows[0];
                var hash = crypto
                    .createHash('md5')
                    .update(clave)
                    .digest('hex');

                if (hash === usuario.hash) {
                    callback(null, {
                        nombre: usuario.nombre
                    });
                } else {
                    callback(null, null);
                }
            });
        }
    }
};
