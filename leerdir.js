//Mi solucion ejercicio 2
/*
var  ruta = process.argv.slice(2);

var fs = require("fs");
fs.readdir(ruta[0], function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);  
});

console.log("Leyendo archivo...");
*/
//Solucion del profesor del ejerccio 2 + Bonus:

var fs = require("fs");
fs.readdir(process.argv[2], function(err,files) {
   files.filter(function (file) {
      var ext = process.argv[3];
      return ext?RegExp(process.argv[3] + "$").test(file) : true;
   }).forEach(function(file) {
      console.log(file);
   });
});