# Express

Sirve para crear sitios web con contenido estático o dinámico, proveer servicios web SOAP (pensado principalmente por IBM para la interoperabilidad entre sistema) o REST APIs. 

## Servidor web básico

Cómo funciona un servidor web? Recibe pedidos, tiene una dirección, procesa la dirección y devuelve un pedido. 

### Para crear un servidor con express:
```js
var express = require('express'); //Le indica que cargue express

var app = express();              // le asigno el objeto express a app. El objeto es una función y la ejecuto. Esto me devuelve una instancia de un servidor express.

app.get('/', function (req, res) {    //get es una función del servidor express que recibe 2 parámetros: una ruta y una función. Cuando reciba un pedido http get y sea un pedido de barra, de la raíz del servidor, ejecutá la función. La función recibe 3 parámetros: un objeto req y uno res (req: request y res: response). También viene next que sirve para encadenar estos callbacks. Estas funciones se llaman middleware
  res.send('Respuesta desde Express!');
});

var server = app.listen(3000, function () {  // Activa el servidor: función listen. Esta función vincula a esta instancia de express en este equipo con un puerto determinado. 
  console.log('Servidor web iniciado');
});
```
y en la pantalla de comandos

```sh 
> npm server.js

Servidor web iniciado

```
Y si vamos a un navegador y escribimos en la url 

```sh
localhost:3000

```
Podemos ver la respuesta.

Tipos de errores
100, 200 y 300 --> ok
400 --> Error cliente
500 --> Error del servidor

# Servir archivos estáticos

Internamente tengo una carpeta con los archivos a servir. El servidor, por lo tanto, debe:

Recibir pedidos de diferentes rutas web,
Transformar esos pedidos en rutas del sistema de archivos,
Solicitar el contenido de los archivos al sistema operativo,
Una vez obtenido, armar la respuesta al pedido original y enviarla o,
En caso de error, armar una respuesta de error y enviarla.

Express provee un middleware especial que hace todo este procesamiento por nosotros. Los middleware son callbacks que transforman un pedido http en una respuesta.

```jsvar express = require('express');

var app = express();

app.use(express.static('www')); //use: Todos los pedidos que recibas, pasalos por este middleware. El middleware en este caso es el módulo express, que tiene un métodos llamado static que es una función. Cuando ejecuto express.static('www'), devuelve una función que es un middleware, o sea una función que recibe un req un res y un next. 

var server = app.listen(3000, function () { // Levantalo en el puerto 3000
  console.log('Servidor web iniciado');
});

```

# Express.static

Tiene varias opciones de configuración. Tiene 3 cosas importantes a destacar. Los middleware reciben req, res y pueden decidir pasar el pedido al siguiente middleware. Una de las cosas que puede hacer es responder al cliente, si no lo hace, alguien más tiene que hacerlo.
app.use(express.static(ruta)) --> genera una función que va a ser un middleware para hacer esto. 

Por ejemplo, puedo hacer:

```js
app.use(express.static('www'));
app.use(express.static('movil'));
```

Se fija si el recurso está en 'www', si no  está, se fija en 'movil', si no está, da un 404. De esta manera puedo ir colocando carpetas que estén en el sitio web que podría querer generar.

Qué pasa si una de mis secciones está en otro lugar? A app.use() le puedo pasar una ruta que mapea con otro directorio.
```sh
app.use('/m2', express.static('movil'));
```

Genera un 'alias' para la carpeta movil. En la url ahora tengo que escribir

```sh
localhost:3000/m2/movil
```

## Opciones del servicio de archivos

Las puede recibir como segundo parámetro. express.static(ruta, opeciones).

El middleware express.static recibe, entonces, dos parámetros. El primero es la raíz donde los archivos serán buscados. Opcionalmente se podrá ejecutar con un segundo parámetro de opciones con las sigueintes propiedades:

* dotfiles: especifica si se deben servir archivos que comienzan con un punto (.). Los valores son allow, deny e ignore (valor por defecto).
* etag habilita (valor por defecto) o deshabilita la generación de ETags.
* extensions habilita o deshabilita (valor por defecto) la transformación automática a otras extensiones de nombres de archivos.
* index define el archivo que se enviará al solicitar un directorio, por ejemplo se enviará /index.html (valor por defecto) al pedir /.
* lastModified envía (valor por defecto) o no el encabezado Last-Modified con la fecha de modificación del archivo.
* maxAge define el valor en milisegundos de la propiedad max-age del encabezado Cache-Control. El valor por defecto es 0 y también acepta cadenas de texto ms.
* redirect fuerza (valor por defecto) o no la redirección a la ruta que termina en / cuando la ruta solicitada es un directorio.
* setHeaders es una función que sirve para dar valores a los encabezados que se envían en cada solicitud.

