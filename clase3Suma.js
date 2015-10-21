/*
//Ejercicio 1
var vector = process.argv;
var a = vector.shift();
var b = vector.shift();
var suma = vector.reduce(function(previo, actual, indice, myArray){
               previo = previo+parseInt(actual);
               return previo;
               }, 0);
console.log(suma);
//otra forma
var total = 0;
vector.forEach(function(elemento){total = total + parseInt(elemento)});
console.log(total);
*/
//propuesto por el profesor:
//console.log(process.argv.slice(2).reduce(function(suma, valor){
//return suma + Number(valor);
//}, 0));
//


//Ejercicio 2
/*
var vector = process.argv;
var a = vector.shift();
var b = vector.shift();
var c = vector.shift();
var total = 0;
vector.forEach(function(elemento){total = total + parseInt(elemento)});

var operacion = [];
console.log(c.split("="));
operacion = c.split("=");
console.log(operacion[1]);
if (operacion[1] == 'prom') {resultado = total/vector.length}
else{resultado = total};
console.log(resultado);
*/
/*
//propuesto por el profesor:
//EN LA linea de comandos hay que hacer:
//set NODE_OP=suma, y despues ejecutar
//Primera version
console.log(process.env.NODE_OP);
var suma = process.argv.slice(2).reduce(function(suma, valor){
return suma + Number(valor);
}, 0);

switch(process.env.NODE_OP){
  case "suma":
  console.log(suma);
  break;
  case "prom":
  console.log(suma/(process.argv.length-2));
  break;
  default:
  console.log("operacion desconocida");
}

//Segunda version
function suma(lista) {
   return lista.reduce(function(suma, valor){
     return suma + Number(valor);
   }, 0);
};

function prom (lista) {
  return suma(lista)/lista.length;
}
  
var  lista = process.argv.slice(2);  

switch(process.env.NODE_OP){
  case "suma":
  console.log(suma(lista));
  break;
  case "prom":
  console.log(prom(lista));
  break;
  default:
  console.log("operacion desconocida");
}
*/
//Tercera version:
var op = {
suma: function suma(lista) {
        return lista.reduce(function(suma, valor){
                  return suma + Number(valor);
               }, 0);
      },

prom: function prom (lista) {
        return op.suma(lista)/lista.length;
      }

};

var  lista = process.argv.slice(2);  

var operacion = op[process.env.NODE_OP] || function() {
   console.log("operacion desconocida");
};

console.log (operacion(lista));
