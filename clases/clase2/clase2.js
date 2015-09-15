/*
Ejercicio 1
Crear un m�dulo que contenga en un array privado una lista de nomrbes de usuario. Este m�dulo debe exponer solo una funci�n para obtener la lista:
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
Extender el m�dulo con una funci�n para agregar usuarios y otra para obtener la cantidad de usuarios.
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
Extender el m�dulo para poder eliminar usuarios de la lista.
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