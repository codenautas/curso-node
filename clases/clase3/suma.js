 // function suma(){
    // var arreglo=process.argv;
    // var suma=0;
    // for(i=2;i<arreglo.length;i++){
        // var suma=suma+parseInt(arreglo[i]);
    // }
    // return suma;
// }
// console.log(suma());




// function suma(){
    // var arreglo=process.argv;
    // arreglo=arreglo.slice(2,arreglo.length);
    // var suma=0;
    // arreglo.forEach(function(elemento){
        // suma=suma+parseInt(elemento);
    // });
    // return suma;
// }
// console.log(suma());
/*
console.log(process.env.NODE_OP)

console.log(process.argv.slice(2).reduce(function(suma, valor){
   return suma + Number(valor); 
},0))
*/
/* Ejercicios 2
var sumar=process.argv.slice(2).reduce(function(suma, valor){
   return suma + Number(valor); 
},0);
switch(process.env.NODE_OP){
    case "suma":
    console.log(sumar);
    break;
    case "prom":
    console.log(suma/(process.argc.length-2));
    break;
    default:
    console.log("operación desconocida");
}
*/

/*Otra version ejercicio 2
function suma(lista){
    return lista.reduce(function(suma, valor){
        return suma + Number(valor); 
    },0);
}
function prom(lista){
    return suma(lista)/lista.length;
}
var lista=process.argv.slice(2);

switch(process.env.NODE_OP){
    case "suma":
    console.log(suma(lista));
    break;
    case "prom":
    console.log(suma(lista)/(process.argv.length-2));
    break;
    default:
    console.log("operación desconocida");
}
*/
var op = {
    suma: function(lista){
        return lista.reduce(function(suma,valor){
            return suma +Number(valor);
        },0);
    },
    prom: function(lista){
        return op.suma(lista)/lista.length;
    }
};
var lista = process.argv.slice(2);
var operaciones = op[process.env.NODE_OP]||function(){
    console.log("operacion desconocida")
    };
console.log(operaciones(lista));
 