//Herencia objetos
var animal={come:true, camina:true};
/*>> animal
> Object {come:true,camina:true}*/
var perro= Object.create(animal),
/*>> perro
> Object {come:true, camina:true}*/
perro.ladra=true;
/*>>perro
> Object {come:true, camina:true, habla:true}
animal.habla=true;*/
var gato=Object.create(animal);
gato.habla=false;
/*>> gato
> Object {come:true, camina:true, habla:false}
>> animal
> Object {come:true, camina:true, habla:true}
>> delete gato.habla
>> gato.habla
>true*/
//Herencia funciones
function Caballo(){}
var caballo=new Caballo();
Caballo.prototype.galopa = true
/*caballo.galopa
true*/

// Programación funcional
var nombres=["Ana", "Marta", "Lorena"];
nombres.map(function(nombre){return nombre.toLowerCase()}).map(function(nombre){return nombre + "!"})
/*nombres.map(function(nombre){return nombre.toLowerCase()}) devuelve un array, entonces puedo otra vez tomar cada elemento y hacerle algo: nombres.map(function(nombre){return nombre.toLowerCase()}).map(function(nombre){return nombre + "!"})*/
//Reduce
var nombres=["Ana", "Marta","Lorena","Ana","Susana"];
nombres.reduce(function(previo,nombre){return nombre=="Ana"? previo+1:previo },0)
// reduce recibe un parámetro y una función. El parámetro es el valor inicial, en este caso es cero. Ejecuta la función (que checkea si el nombre es "Ana" y el parámetro previo devuelve "previo" si es false o previo+1 si es true
nombres.filter(function(nombre){return nombre == "Ana"})
/*Filtra uno a uno los elementos*/
function contarAnas(array){return array.reduce(function(previo,nombre){return nombre=="Ana"? previo+1:previo },0)}
/*>>contarAnas(nombres)
>2*/