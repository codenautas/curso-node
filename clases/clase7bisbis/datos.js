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
                //var error=new Error("libro no encontrado")
                //callback(error, null);
                callback(null,null);
                return;
            }

            callback(null, encontrados[0]);
        },

        delete: function (_id,callback){
            var respuesta=libros.filter(function(libro){        
                return libro['_id']!=_id;
            });
            
            if(respuesta.length==libros.length){
                callback(null,null);
            }
            callback(null, respuesta);       
        },
    
        update: function(_id,libro,callback){
            var longitud=libros.length;
            libros=libros.filter(function(libro){
            return libro['_id']!=_id;
            });
            if(longitud==libros.length){
                callback(null,null);
            }
            libro._id=_id;
            libros.push(libro);
            callback(null,libro);
        }
    }
};