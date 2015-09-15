 // function suma(){
    // var arreglo=process.argv;
    // var suma=0;
    // for(i=2;i<arreglo.length;i++){
        // var suma=suma+parseInt(arreglo[i]);
    // }
    // return suma;
// }
// console.log(suma());




function suma(){
    var arreglo=process.argv;
    arreglo=arreglo.slice(2,arreglo.length);
    var suma=0;
    arreglo.forEach(function(elemento){
        suma=suma+parseInt(elemento);
    });
    return suma;
}
console.log(suma());



