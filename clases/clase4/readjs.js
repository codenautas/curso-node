var fs = require("fs");
fs.readFile("archivo.txt", "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);  
});
console.log("Leyendo archivo...")