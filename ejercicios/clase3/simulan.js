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


function login(nombre) {
    console.log('empezando login ',nombre);
    obtenerUsuario(nombre).then(function(infoConexion){
        console.log('resuelto login ',nombre);
        registrarAcceso(nombre,infoConexion.rol);
    }).catch(function(err){
        console.log('resuelto login ',nombre);
        notificarError(err.message);
        solicitarRegistro();
    });
}

login("Pedro");
// Usuario Pedro ingresa como invitado
login("Juan");
// Usuario Juan ingresa como usuario
login("Pablo");
// Error: Usuario desconocido
// Debe registrarse