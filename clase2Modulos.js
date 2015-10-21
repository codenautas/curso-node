//lo escribo acá y para ejecutarlo lo copio en una consola.
//ejercicio 1
var usuarios = (function () {
    var todosLosUsuarios = ["Juan", "Ana", "Pedro"];
    //ejercicio 2
    function agregarUsuarios(nuevoUsuario){
      return todosLosUsuarios.push(nuevoUsuario);
    };
    //ejercicio 2
    function contarUsuarios(){
      return todosLosUsuarios.length;
    }
    function eliminarUsuario(unUsuario){
      function esUsuario(nombre) {
        return nombre!==unUsuario;
      }
      var misUsuarios = todosLosUsuarios.filter(esUsuario);
      todosLosUsuarios = misUsuarios;
      return todosLosUsuarios;
    }
    return {
        obtenerTodos: function () {
            return todosLosUsuarios;
        },
        eliminar: eliminarUsuario,
        contar: contarUsuarios,
        agregar: agregarUsuarios
    };
})();

//para probarlo escribo en la consola cada una de estas líneas: 
usuarios.obtenerTodos(); // ["Juan", "Ana", "Pedro"]
usuarios.contar();
usuarios.eliminar("Juan");
usuarios.agrear("Maria");
usuarios.contar();