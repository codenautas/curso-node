var seq = 0;
var libros = [];

module.exports = {
    libros: {
        selectAll: function (callback) {
            callback(null, libros);
        },

        insert: function (libro, callback) {
            var _id = "ID" + seq++;

            libro._id = _id;
            libros.push(libro);

            callback(null, _id);
        },

        select: function (_id, callback) {
            var encontrados = libros.filter(function (prod) {
                return prod._id === _id;
            });

            if (!encontrados.length) {
                callback(null, null);
                return;
            }

            callback(null, encontrados[0]);
        },

        delete: function (_id, callback) {
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

            callback(null, true);
        },

        update: function (_id, libro, callback) {

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
        }
    }
};
