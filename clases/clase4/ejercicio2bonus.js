/* Otra forma de resolver el ejercicio con las extensiones*/

var fs=require('fs');
fs.readdir(process.argv[2], function(err,files){
    files.filter(function(file){
        var ext=process.argv[3];
        return ext ? RegExp(process.argv[3] + "$").test(file):true;
    }).forEach(function(file){
        console.log(file);
    });
});