# M�dulos
Son bloques de funcionalidad que est�n juntos y los puedo invocar desde mi programa. 

## 'require'
Cuando llamo a la funci�n require con un string, node busca si el m�dulo con ese nombre existe y de ser as�, lo ejecuta. Esto es casi lo mismo que como funcionan los m�dulos.

Node viene integrado con unos cuantos m�dulos. Los m�dulos que no vienen integrados en el core de mode, para usarlos utilizamos commonJs.

# M�dulo fs
Nos permite acceso a archivos. Est� hecho a imagen y semejanza de los comando de linux y unix que se usan para acceder al sistema de archivos. Algunos ejemplos de funciones con las que cuenta el m�dulo son: leer, escribir archivos, mkdir, rmdir, etc.

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
En general, est� MIT, que es muy permitiva: se puede bajar el c�digo y hacer casi lo que se quiere
gpl u otras: obligan al usuario a republicar el c�digo que utiliza el c�digo p�blico.