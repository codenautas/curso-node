/*
Ejercicio 1
Crear un módulo que contenga en un array privado una lista de nomrbes de usuario. Este módulo debe exponer solo una función para obtener la lista:
*/

var usuarios = (function () {
    var listaUsuario=["Juan", "Ana", "Pedro"];
    
    return {
        obtenerTodos:  function(){
            return listaUsuario;
        }   
    };
})();

usuarios.obtenerTodos(); // ["Juan", "Ana", "Pedro"]

/*
Ejercicio 2
Extender el módulo con una función para agregar usuarios y otra para obtener la cantidad de usuarios.
*/

var usuarios = (function () {
    var listaUsuario=["Juan", "Ana", "Pedro"];
    
    return {
        obtenerTodos:  function(){
            return listaUsuario;
        },
        agregarUsuario: function(usuario){
            listaUsuario.push(usuario);
        },
        obtenerCantidad: function(){
            return listaUsuario.length;
        }
    };
})();

usuarios.obtenerTodos();

/*
Ejercicio 3
Extender el módulo para poder eliminar usuarios de la lista.
*/
var usuarios = (function () {
    var listaUsuario=["Juan", "Ana", "Pedro"];
    
    return {
        obtenerTodos:  function(){
            return listaUsuario;
        },
        agregarUsuario: function(usuario){
            listaUsuario.push(usuario);
        },
        obtenerCantidad: function(){
            return listaUsuario.length;
        },
        eliminarUsuario: function(usuario){
            listaUsuario=listaUsuario.filter(function(usuarioLista){
                return usuarioLista!=usuario;
            })
        }
    };
})();


Tarea
Leer el resto del documento y hacer los ejercicios

var usuarios = (function () {
    var listaUsuario=["Juan", "Ana", "Pedro"];
    
    return {
        obtenerTodos:  function(){
            return listaUsuario;
        },
        agregarUsuario: function(usuario){
            listaUsuario.push(usuario);
        },
        eliminarUsuario: function(usuario){
            listaUsuario=listaUsuario.filter(function(usuarioLista){
                return usuarioLista!=usuario;
            })
        },
        obtenerCantidad: function(){
            return listaUsuario.length;
        }
    };
})();