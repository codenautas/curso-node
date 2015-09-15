function aMinusculas(palabra) {
    return palabra.toLowerCase();
}

function aMayusculas(palabra) {
    return palabra.toUpperCase();
}

function obtenerUsuarios() {
    return new Promise(function (fulfill) {
        setTimeout(function () {
            var usuarios = ["Juan", "Ana", "Pedro"];
            fulfill(usuarios);
        }, 5000); // demora 250 ms
    });
}

var promesa= obtenerUsuarios();