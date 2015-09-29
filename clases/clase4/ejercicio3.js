/*
Ejercicio 3

Crear un programa que renombre un archivo recibiendo dos parámetros: nombre actual y nuevo nombre. Adicionalmente, debe agregar el texto "// Archivo renombrado a [nuevo-nombre]" al final del mismo. Finalmente, debe imprimir por pantalla el nuevo contenido del archivo.
*/

var fs=require('fs');
var path=require('path');

// var oldPath=String(process.argv[2]);
// var newPath=String(process.argv[3]);
var actualPath=process.cwd()+'\\';
var oldPath=actualPath+String(process.argv[2]);
var newPath=actualPath+String(process.argv[3]);


fs.rename(oldPath,newPath,function(){
    console.log(actualPath);
    callback(newPath);
})

function callback(newPath){
        newFileName=path.basename(newPath);
        fs.writeFile(newPath, 'Archivo renombrado a '+newFileName, 'utf8', function(err){
            if(err){throw err}
        });
}

