# Módulos
Son bloques de funcionalidad que están juntos y los puedo invocar desde mi programa. 

## 'require'
Cuando llamo a la función require con un string, node busca si el módulo con ese nombre existe y de ser así, lo ejecuta. Esto es casi lo mismo que como funcionan los módulos.

Node viene integrado con unos cuantos módulos. Los módulos que no vienen integrados en el core de mode, para usarlos utilizamos commonJs.

# Módulo fs
Nos permite acceso a archivos. Está hecho a imagen y semejanza de los comando de linux y unix que se usan para acceder al sistema de archivos. Algunos ejemplos de funciones con las que cuenta el módulo son: leer, escribir archivos, mkdir, rmdir, etc.

## Ejemplo
Leer archivo y mostrarlo

```js
var fs = require("fs");
fs.readFile("archivo.txt", "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);  
});
```

# npm y el archivo package.json
Licencias de los paquetes
En general, está MIT, que es muy permitiva: se puede bajar el código y hacer casi lo que se quiere
gpl u otras: obligan al usuario a republicar el código que utiliza el código público.