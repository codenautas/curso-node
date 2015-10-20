"use strict";

var seq = 0;
var productos = [];

module.exports = {
    productos: {
        selectAll: function (callback) {
            callback(null, productos);
        },

        insert: function (producto, callback) {
            var _id = "ID" + seq++;

            producto._id = _id;
            productos.push(producto);

            callback(null, _id);
        },

        select: function (_id, callback) {
            var encontrados = productos.filter(function (prod) {
                return prod._id === _id;
            });

            if (!encontrados.length) {
                callback(null, null);
                return;
            }

            callback(null, encontrados[0]);
        }

        // TODO: delete

        // TODO: update
    }
};