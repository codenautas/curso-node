/* Primera versión leyendo un archivo en duro:
var fs = require("fs");
fs.readFile("archivo.txt", "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);  
});

console.log("Leyendo archivo...");
*/
//Segunda versión leyendo un archivo como parametro de la línea de comandos
var  archivo = process.argv.slice(2);

var fs = require("fs");
fs.readFile(archivo[0], "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);  
});

console.log("Leyendo archivo...");
