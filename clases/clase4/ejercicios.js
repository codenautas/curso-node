/*Ejercicio 1

Crear un programa que simule el comando cat de Unix o type de Windows: debe recibir un nombre de archivo como parámetro e imprimir por pantalla el contenido del archivo.

Bonus: Crear un archivo bash o bat que simplifique la sintaxis a:

> node-cat mi-archivo.txt */

var fs=require('fs');
var nombreArchivo=String(process.argv[2]);
fs.readFile(nombreArchivo, "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);  
});
