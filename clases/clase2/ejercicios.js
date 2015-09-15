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
    })
}
function solicitarRegistro() {
    console.log("Debe registrarse");
}
function notificarError(mensaje) {
    console.log("Error: " + mensaje);
}
/*Realizar una funci�n login() que reciba un nombre de usuario, obtenga sus datos y registre su acceso. Utilizar las funciones de solicitud de registro y notificacion de errores para los casos que sea necesario.*/

/////////////////////////////////////////////////////////
function login(nombre) {
    obtenerUsuario(nombre).then(function(rol){
        solicitarRegistro();
         var datos={};
         datos.nombre=nombre;
         datos.rol=rol.rol;
        return datos;
    }).then(function(datos){
        registrarAcceso(datos.nombre,datos.rol);
    }).catch(function(err){
        notificarError(err);
    });
}
////////////////////////////////////////////////////////

// $$$$$$$$$$$$$$$$$$$$$
function login(nombre) {
    obtenerUsuario(nombre).then(function(trae){
        solicitarRegistro();
         var rol=trae.rol;
        return {nombre,rol};
    }).then(function(datos){
        registrarAcceso(datos.nombre,datos.rol);
    }).catch(function(err){
        notificarError(err);
    });
}
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 
 

/*Extender la funci�n login para que pueda encadenarse una operaci�n adicional en la cadena de promesas, llamando a la siguiente funci�n en caso de un ingreso exitoso:*/

function registrarEstad�sticas(datos) {
    console.log("Estad�sticas agregadas: " + datos.nombre + ", " + datos.rol + ", " + Date(datos.hora));
}

function login(nombre) {
    return new Promise(function(fulfill,reject){
        obtenerUsuario(nombre).then(function(rol){
            solicitarRegistro();
             var datos={};
             datos.nombre=nombre;
             datos.rol=rol.rol;
            return datos;
        }).then(function(datos){
            registrarAcceso(datos.nombre,datos.rol);
            fulfill(datos);
        }).catch(function(err){
            notificarError(err);
            reject(err);
        });
        
    });
}
login("Pedro").then(registrarEstad�sticas).catch(function(err){
    console.log(err);
})
// Usuario Pedro ingresa como invitado
// Estad�sticas agregadas: Pedro, invitado, Sep 05 2015