/*
//Ejercicio 3
//Dadas
function obtenerUsuario(nombre) {
    return new Promise(function (fulfill, reject) {
        if (nombre === "Juan") {
            fulfill({
                rol: "usuario"
            });
        } else if (nombre === "Pedro") {
            fulfill({
                rol: "invitado"
            });
        } else {
            reject(new Error("Usuario desconocido"));
        }
    });
}
function registrarAcceso(nombre, rol) {
    return new Promise(function (fulfill, reject) {
        console.log("Usuario " + nombre + " ingresa como " + rol);
        fulfill();
    });
}
function solicitarRegistro() {
    console.log("Debe registrarse");
}
function notificarError(mensaje) {
    console.log("Error: " + mensaje);
}
*/
//-----------------------------------
fs = require("fs");
function renombrar(anterior, nuevo){
  fs.rename(anterior, nuevo, function (err) {
    if (err) console.log("Error al renombrar: " + err.message);
    console.log('El archivo se renombró con éxito!');
  });
};
function registrar(archivo) {
  fs.appendFile(archivo, 'Este archivo fue renombrado a: '+archivo, "utf8", function (err) {
    if (err) throw err;
    console.log('La información fue agregada al archivo!');
  });
};
function mostrar(archivo) {
  fs.readFile(archivo, "utf8", function (err, data) {
    if (err) throw err;
    console.log(data);  
  });
};

//---Con Promesas
fs = require("fs");
function renombrar(anterior, nuevo){
return new Promise(function (fulfill, reject) {
  fs.rename(anterior, nuevo, function (err) {
    if (err) {console.log("Error al renombrar: " + err.message); reject()}
    });
  console.log('El archivo se renombró con éxito!');
  fulfill();
});
};
function registrar(archivo) {
return new Promise(function (fulfill, reject) {
  fs.appendFile(archivo, 'Este archivo fue renombrado a: '+archivo, "utf8", function (err) {
    if (err) {console.log("Error al registrar: " + err.message); reject()}
    });
  console.log('La información fue agregada al archivo!');
  fullfil();
  });
};
function mostrar(archivo) {
return new Promise(function (fulfill, reject) {
  fs.readFile(archivo, "utf8", function (err, data) {
    if (err) {console.log("Error al mostrar: " + err.message); reject()}
    else console.log(data);
    });
      
  });
};

//-------------------------------------------------
//renombrar(process.argv[2], process.argv[3]);
//registrar(process.argv[2]);
mostrar(process.argv[2]);

//version de Estefi
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
