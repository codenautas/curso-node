// simula una consulta asíncrona a la base de datos
function obtenerUsuarios(callback) {
    setTimeout(function () {
        var usuarios = ["Juan", "Ana", "Pedro"];
        callback(usuarios);
    }, 250); // demora 250 ms
}
//Una vez que obtengas los usuarios, que es una operación que se ejecuta en forma asíncrona,
//mostralos por pantalla
obtenerUsuarios(function (usuarios) {
    console.log(usuarios); // ["Juan", "Ana", "Pedro"]
});
//-------------------------------------------------------
//Cuando se trabaja con Node.js, la convención es que las funciones callback siempre reciben como primer 
//parámetro una variable que representa el estado de error de la operación:
obtenerUsuariosNode(function (err, usuarios) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log(usuarios); // ["Juan", "Ana", "Pedro"]
});
//Pero si es necesario encadenar operaciones asíncronas y además mantener el registro de  errores
//en cada uno de los pasos intermedios, las cosas se complican.
//Un patrón de desarollo que facilita esto es el uso de promesas:
//El código de las líneas 2 a 12 usando promesas se escribe así:
// simula una consulta asíncrona a la base de datos usando promesas
function obtenerUsuarios() {
    return new Promise(function (fulfill) {
        setTimeout(function () {
            var usuarios = ["Juan", "Ana", "Pedro"];
            fulfill(usuarios);
        }, 250); // demora 250 ms
    });
}

obtenerUsuarios().then(function (usuarios) {
    console.log(usuarios); // ["Juan", "Ana", "Pedro"]
});
//____________________________________________________________________
//Ejercicio 1: Dadas:
function obtenerUsuario(nombre) {
    return new Promise(function (fulfill, reject) {
        if (nombre === "Juan") {
            fulfill({
                rol: "usuario"
            });
        } else if (nombre === "Pedro") {
            fulfill({
                rol: "invitado"
            });
        } else {
            reject(new Error("Usuario desconocido"));
        }
    });
}
function registrarAcceso(nombre, rol) {
    return new Promise(function (fulfill, reject) {
        console.log("Usuario " + nombre + " ingresa como " + rol);
        fulfill();
    });
}
function solicitarRegistro() {
    console.log("Debe registrarse");
}
function notificarError(mensaje) {
    console.log("Error: " + mensaje);
}
//Realizar una función login() que reciba un nombre de usuario, obtenga sus datos y registre su acceso. 
//Utilizar las funciones de solicitud de registro y notificacion de errores para los casos que sea necesario.
/*
Ejemplo:
obtenerUsuarios().then(function (usuarios) {
    return usuarios.map(aMayusculas);
}).then(function (usuarios) {
    console.log(usuarios); // ["JUAN", "ANA", "PEDRO"]
});
Ejemplo:
obtenerUsuarios.then(function (usuarios) {
    usuarios.forEach(function (usuario) {
        obtenerRoles(usuario).then(function (roles) {
            grabarRoles(usuario, roles.push("borrar"));
        });
    });
});

*/
//Ejercicio 1 (resolución)
function login(nombre){
  obtenerUsuario(nombre).then(function(rol){
     registrarAcceso(nombre,rol.rol);
     },    
     function(error){
       notificarError(error.message);
       solicitarRegistro();
     }
    );
}
//____________________________________________________________________
//Ejercicio 2: a las funciones dadas agregar:
function registrarEstadisticas(datos) {
    console.log("Estadísticas agregadas: " + datos.nombre + ", " + datos.rol + ", " + Date(datos.hora));
}
//Ejercicio 2 (resolución)
//primer intento
function login(nombre){
  obtenerUsuario(nombre).then(function(rol){
     registrarAcceso(nombre,rol.rol);
     rol.nombre = nombre;
     return rol;
     },    
     function(error){
       notificarError(error.message);
       solicitarRegistro();
     }
    ).then(function (datos){
             registrarEstadisticas(datos);
          });
}
//pero esto es lo que se pide:
function login(nombre){
  return obtenerUsuario(nombre).then(function(rol){
     registrarAcceso(nombre,rol.rol);
     rol.nombre = nombre;
     return rol;
     },    
     function(error){
       notificarError(error.message);
       solicitarRegistro();
     }
    );
}

login("Pedro").then(registrarEstadisticas);
