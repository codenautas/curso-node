//Ejercicio 1:
function contarCeros(vector){
return vector.reduce(function(previo, actual, indice, myArray){
               if (actual==0) {previo = previo+1};
               return previo;
               }, 0);
}

var lista = [1, 4, 2, 0, 6, 2];
contarCeros(lista); // devuelve 1

//Ejercicio 2
function esCero(valor) {
    return valor === 0;
}
function contarCeros(vector){
return vector.reduce(function(previo, actual, indice, myArray){
               if (esCero(actual)) {previo = previo+1};
               return previo;
               }, 0);
}

