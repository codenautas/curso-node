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
    
    return obtenerUsuario(nombre).then(function(rol){
         registrarAcceso(nombre,rol.rol);
    }).catch(function(err){
        solicitarRegistro();
        notificarError(err);
    });
}
////////////////////////////////////////////////////////

/*Extender la funci�n login para que pueda encadenarse una operaci�n adicional en la cadena de promesas, llamando a la siguiente funci�n en caso de un ingreso exitoso:*/

function registrarEstad�sticas(datos) {
    console.log("Estad�sticas agregadas: " + datos.nombre + ", " + datos.rol + ", " + Date(datos.hora));
}

function login(nombre) {
    
    return obtenerUsuario(nombre).then(function(rol){
         registrarAcceso(nombre,rol.rol);
        var datos={
            nombre:nombre,
            rol:rol.rol
        };
        return datos; 
    }).catch(function(err){
        solicitarRegistro();
        notificarError(err);
    });
}
login("Pedro").then(registrarEstad�sticas).catch(function(err){
    console.log(err);
})



// Usuario Pedro ingresa como invitado
// Estad�sticas agregadas: Pedro, invitado, Sep 05 2015