# Express

Sirve para crear sitios web con contenido est�tico o din�mico, proveer servicios web SOAP (pensado principalmente por IBM para la interoperabilidad entre sistema) o REST APIs. 

## Servidor web b�sico

C�mo funciona un servidor web? Recibe pedidos, tiene una direcci�n, procesa la direcci�n y devuelve un pedido. 

### Para crear un servidor con express:
```js
var express = require('express'); //Le indica que cargue express

var app = express();              // le asigno el objeto express a app. El objeto es una funci�n y la ejecuto. Esto me devuelve una instancia de un servidor express.

app.get('/', function (req, res) {    //get es una funci�n del servidor express que recibe 2 par�metros: una ruta y una funci�n. Cuando reciba un pedido http get y sea un pedido de barra, de la ra�z del servidor, ejecut� la funci�n. La funci�n recibe 3 par�metros: un objeto req y uno res (req: request y res: response). Tambi�n viene next que sirve para encadenar estos callbacks. Estas funciones se llaman middleware
  res.send('Respuesta desde Express!');
});

var server = app.listen(3000, function () {  // Activa el servidor: funci�n listen. Esta funci�n vincula a esta instancia de express en este equipo con un puerto determinado. 
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

# Servir archivos est�ticos

Internamente tengo una carpeta con los archivos a servir. El servidor, por lo tanto, debe:

Recibir pedidos de diferentes rutas web,
Transformar esos pedidos en rutas del sistema de archivos,
Solicitar el contenido de los archivos al sistema operativo,
Una vez obtenido, armar la respuesta al pedido original y enviarla o,
En caso de error, armar una respuesta de error y enviarla.

Express provee un middleware especial que hace todo este procesamiento por nosotros. Los middleware son callbacks que transforman un pedido http en una respuesta.

```jsvar express = require('express');

var app = express();

app.use(express.static('www')); //use: Todos los pedidos que recibas, pasalos por este middleware. El middleware en este caso es el m�dulo express, que tiene un m�todos llamado static que es una funci�n. Cuando ejecuto express.static('www'), devuelve una funci�n que es un middleware, o sea una funci�n que recibe un req un res y un next. 

var server = app.listen(3000, function () { // Levantalo en el puerto 3000
  console.log('Servidor web iniciado');
});

```

# Express.static

Tiene varias opciones de configuraci�n. Tiene 3 cosas importantes a destacar. Los middleware reciben req, res y pueden decidir pasar el pedido al siguiente middleware. Una de las cosas que puede hacer es responder al cliente, si no lo hace, alguien m�s tiene que hacerlo.
app.use(express.static(ruta)) --> genera una funci�n que va a ser un middleware para hacer esto. 

Por ejemplo, puedo hacer:

```js
app.use(express.static('www'));
app.use(express.static('movil'));
```

Se fija si el recurso est� en 'www', si no  est�, se fija en 'movil', si no est�, da un 404. De esta manera puedo ir colocando carpetas que est�n en el sitio web que podr�a querer generar.

Qu� pasa si una de mis secciones est� en otro lugar? A app.use() le puedo pasar una ruta que mapea con otro directorio.
```sh
app.use('/m2', express.static('movil'));
```

Genera un 'alias' para la carpeta movil. En la url ahora tengo que escribir

```sh
localhost:3000/m2/movil
```

## Opciones del servicio de archivos

Las puede recibir como segundo par�metro. express.static(ruta, opeciones).

El middleware express.static recibe, entonces, dos par�metros. El primero es la ra�z donde los archivos ser�n buscados. Opcionalmente se podr� ejecutar con un segundo par�metro de opciones con las sigueintes propiedades:

* dotfiles: especifica si se deben servir archivos que comienzan con un punto (.). Los valores son allow, deny e ignore (valor por defecto).
* etag habilita (valor por defecto) o deshabilita la generaci�n de ETags.
* extensions habilita o deshabilita (valor por defecto) la transformaci�n autom�tica a otras extensiones de nombres de archivos.
* index define el archivo que se enviar� al solicitar un directorio, por ejemplo se enviar� /index.html (valor por defecto) al pedir /.
* lastModified env�a (valor por defecto) o no el encabezado Last-Modified con la fecha de modificaci�n del archivo.
* maxAge define el valor en milisegundos de la propiedad max-age del encabezado Cache-Control. El valor por defecto es 0 y tambi�n acepta cadenas de texto ms.
* redirect fuerza (valor por defecto) o no la redirecci�n a la ruta que termina en / cuando la ruta solicitada es un directorio.
* setHeaders es una funci�n que sirve para dar valores a los encabezados que se env�an en cada solicitud.

