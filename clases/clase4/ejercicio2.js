/*
Ejercicio 2

Crear un programa que, dada una ruta, imprima el nombre de todos los archivos de ese directorio.

Bonus: Si se recibe un parámetro adicional, por ejemplo txt, mostrar solo los archivos que tengan esa extensión.
*/
/*
var fs=require('fs');
var path=process.argv[2];


fs.readdir(path,function(err,data){
    if (err){throw err;}
    console.log(data);
})
*/


var fs=require('fs');
var pathFile=process.argv[2];
var path = require('path')
var extensions=process.argv[3];

fs.readdir(pathFile,function(err,data){
    if (err){throw err;}
    data.filter(function(archivo){
        return path.extname(String(archivo)).slice(1)==extensions;
    }).forEach(function(file){console.log(file);})
})

/* Otra forma de resolver el ejercicio con las extensiones

var fs=require('fs');
fs.readdir(process.argv[2], function(err,files){
    files.filter(function(file){
        var ext=process.argv[3];
        return ext ? RegExp(process.argv[3] + "$").test(file):true;
    }).forEach(function(file){
        console.log(file);
    });
});

*/