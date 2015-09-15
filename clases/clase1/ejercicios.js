/*Ejercicio 1:

Dado un array de números cualquiera, por ejemplo [1, 4, 2, 0, 6, 2], desarrollar una función que devuelva la cantidad de veces que un elemento es 0. Se la debería usar así:

var lista = [1, 4, 2, 0, 6, 2];
contarCeros(lista); // devuelve 1*/

//Método filter 
var lista=[1,4,2,0,6,2];
function contarCeros(lista){
    var resultado=lista.filter(function(elemento){
        var contador=0;
        return elemento==0?contador+1:contador;
    });
    return resultado.length;
}
var lista=[0,4,2,0,6,2];
function contarCeros(lista){
    return lista.filter(function(elemento){
        var contador=0;
        return elemento==0?contador+1:contador;
    }).length;
}

//método forEach
var lista=[1,4,2,0,6,2];
function contarCeros(lista){
    var contador=0;
    lista.forEach(function(elemento){
        contador=elemento==0?contador+1:contador;
    });
    return contador;
}
contarCeros(lista)

/*Extender la función anterior para que evalúe cualquier condición. Por ejemplo:

function esCero(valor) { return valor === 0; }
contarSi(esCero, lista); // devuelve 1*/
var lista=[1,4,2,0,6,2];
function esCero(valor){
    return valor===0;
}
function contarSi(esCero,lista){
    return lista.filter(esCero).length;
}
contarSi(esCero,lista);

/*Ejercicio 3:

Reimplementar contarCeros utilizando contarSi.*/

//
function esCero(valor){
    return valor===0;
}
function contarSi(esCero,lista){
    return lista.filter(esCero).length;
}
function contarCeros(lista){
    return contarSi(esCero, lista);
}
var lista=[1,4,2,0,6,2];
contarCeros(lista);

/*Ejercicio 4*/
function esCero(valor){
    return valor===0;
}
function contarSi(esCero,lista){
    var contador=0;
    lista.forEach(function(elemento){
        contador=esCero(elemento)?contador+1:contador;
    });
    return contador;
}
function contarCeros(lista){
    return contarSi(esCero,lista);
}
var lista=[1,4,2,0,6,0];
contarSi(esCero,lista)


////////////// nombre genérico //////////////
function condicion(valor){
    return valor===0;
}
function contarSi(condicion,lista){
    return lista.filter(condicion).length;
}
function contarCeros(lista){
    return contarSi(condicion, lista);
}
var lista=[1,4,2,0,6,2];
contarCeros(lista);

////////////////////////////////////
function crearPrefijo(prefijo) {
    var str = prefijo + " ";

    return function (nombre) {
        return str + nombre;
    }
}

var prefijarDr = crearPrefijo("Dr.");
prefijarDr("Gonzalez"); // Dr. Gonzalez
