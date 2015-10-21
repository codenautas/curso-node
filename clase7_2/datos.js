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

        // TODO: delete
        delete: function (_id, callback) {
            var resultado = libros.filter(function(elemento){
                     return elemento._id !== _id;
                });
            if (resultado.length == libros.length) {
                callback(null, false);
                return;
            }
            libros = resultado;
            callback(null, true);

        },

        // TODO: update
        update: function(_id, cambios, callback) {
           var indice = -1;
           for (var i=0; i < libros.length; i++) {
              if (libros[i]._id === _id) {indice = i}
           }
           if (indice===-1) {
              callback(null, false);
              return;
           }
           else {
              libros[indice].nombre = cambios.nombre||libros[indice].nombre;
              libros[indice].autor  = cambios.autor||libros[indice].autor;
              libros[indice].precio = cambios.precio||libros[indice].precio;
              callback(null, true)};
          }
          /*
            var _id = req.params.id;
    console.log("Id: ",_id);
    console.log("req.params: ",req.params);
    var cambios = req.body;
    console.log("req.body: ", cambios);
    //var indice = productos.findIndex(function(elemento){
    //                 return elemento._id === _id;
    //});
    var indice = -1;
    for (var i=0; i < productos.length; i++) {
       if (productos[i]._id === _id) {indice = i}
    }
    console.log("Indice: " , indice);
    if (indice===-1) {
       res.status(404).end();
    }
    else {
       productos[indice].nombre = cambios.nombre||productos[indice].nombre;
       productos[indice].autor  = cambios.autor||productos[indice].autor;
       productos[indice].precio = cambios.precio||productos[indice].precio;
       res.send(productos[indice])};
*/
    } 
};