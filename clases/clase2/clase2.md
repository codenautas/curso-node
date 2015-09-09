# Clase 2
8/9/2015, notas tomadas de la clase dada por https://github.com/gabmontes

# Alcance de las variables

Las variables se definen con la palabra clave 'var'. Las variables tiene alcance dentro de la función, no dentro de bloques (como en c, por ejemplo). Los sujetos globales los puedo llamar desde cualquier función y la función los entiende. Los locales (definidos dentro de funciones) no tienen alcance global.  En ECMA6 se crea una nueva palabra clave 'let' y esa variable definida con 'let' tiene alcance dentro del bloque. También incorporaron 'const' para definir una constante.

## Ejemplo
```js
> function externa(){
    var a="1";
    function interna(){
        var b="2";
        if(b){
            var c="3";
            console.log(c);
        }
        console.log(a);
        console.log(b);
        console.log(c);
    }
    interna();
    console.log(a);
    console.log(b);
}
> externa()
3
1
2
3
1
```

# Hoisting

Otra particularidad del lenguaje el hoisting. Todas las variables que defino dentro de una función por más que las defina en cualquier lado de la función, lo que hace el intérprete es primero leer todo, encuentra las variables, las da por conocidas y después ejecuta la función asignando valores. No asigna, pero sabe que está definida. Después ejecuta y da a conocer el valor.

```js
var nombre='global1';
var nombre2='global2';

function pruebaHoisting() {
    console.log(nombre); // undefined porque existe var nombre dentro y abajo
    console.log(nombre2); // global2
    var nombre = "Juan";
    console.log(nombre); // Juan
}
>pruebaHoisting();
```

Esto es equivalente a:

```js
function pruebaHoisting() {
    var nombre;
    console.log(nombre); // undefined
    var nombre = "Juan";
    console.log(nombre); // Juan
}
pruebaHoisting();
```

Existe un programa JSHint que lee el código y checkea por ejemplo que no usemos variables antes de declararlas. Se pueden integrar en los editores como una línea de texto. (JSLint es como JSHint, pero más estricto.)

# Clausuras

Puedo crear funciones adentro de funciones. Las funciones cumplen un rol muy importante en la definición de JavaScript: puedo pasar funciones como parámetros de funciones, también se pueden devolver funciones. 

## Ejemplo
```js
>function crearPrefijo(prefijo) { //recibe un string que es el prefijo
    var str = prefijo + " ";  //internamente defina una una variable

    return function (nombre) { //devuelve una función (anónima )que crea en el momento, que recibe un nombre, y devuelve
        return str + nombre;  //  el prefijo con el espacio y el nombre. 
    }
}

>var prefijarDr = crearPrefijo("Dr.");
>prefijarDr("Gonzalez"); // Dr. Gonzalez
```
La variable 'str' es visible para la función anónima. Lo que ocurre es lo siguiente: el intérprete lee todo el programa. Crea una función con todo el cuerpo, no la ejecuta, la crea. Se declara una variable y le asigna el resultado de una función. El resultado va a parar a prefijarDr y devuelve a una función que nunca ejecutó. Entonces pasa al renglón siguiente y prefijarDr es una función nueva que la llama con el parámetro "Gonzales". La función de afuera la ejecuta primero y cuando ejecuta la segunda, no vuelve a ejecutar la primera. 

La clausura es un objeto asociado a una función y este objeto tiene las referencias a todas las variables que ve la función. En el caso de la función interna 'str' es una variable que la función ve porque está adentro de su alcance. Y esa referencia vive con la función anónima. 
Así como los objetos tienen un prototipo, las funciones también tienen un objeto asociado (clausura) con todas las variables visibles y ese objeto vive con la función. 

Qué pasa si creo otro prefijo??  

```js
>function crearPrefijo(prefijo) {
    var str = prefijo + " ";

    return function (nombre) {
        return str + nombre;
    }
}

>var prefijarSr = crearPrefijo("Sr."); 
```

Esto me genera una función nueva, entonces me crea una clausura nueva. Cada vez que entro en la función, son variables diferentes, nuevas, sólo que acá puedo llevarme la referencia. 

```js
>prefijarSr("Rodriguez"); // Dr. Gonzalez
>crearPrefijo("Sra."); //Esto devuelve una función, entonces la puedo invocar directamente:
>crearPrefijo("Sra.")("Alvarez"); 
```

### Cadena de clausuras.
Empieza con alcance local, sigue con las clausuras, hasta llegar al objeto global. Puedo crear variables que sobreescriben las variables de las funciones base. 

### Ventajas de los alcances
Podemos hacer lo mismo que en lenguajes tradicionales hacemos con las intancias y métodos y propiedades públicas y privadas. 

# Patrón módulo

Patrón es una forma de resolver un problema. Sirve para no exponer cosas que podrían hacer que el programa funcione mal. Es la forma de hacer las cosas de manera privada.

## Ejemplo

```js
>var modulo = (function () {

    // variables privadas
    var clavePublica = "secreto normal";
    var clavePrivada = "secreto de Estado";

    // interfaz pública
    return {
        obtenerClave: function () {
            return clavePublica;
        }
    };
})();
```

Defino una variable que va a ser mi módulo. La finalidad del módulo es poder acceder a la clave pública, pero que no pueda desde afuera acceder a la clase privada. Entonces, defino el módulo, que es igual a una función. Defino la función y la llamo inmediatamente (como se muestra en el ejemplo). El resultado de la ejecución es un objeto y este objeto tiene métodos y propiedades que se le asignan al módulo. Por ejemplo, tiene un método 'obtenerClave', entonces abajo puedo escribir 'modulo.obtenerClave()' y me devuelve la clave pública y no tengo forma de obtener la clave privada (desde afuera). 
Entonces el patrón módulo es una función anónima que devuelve un objeto a través del cual puedo acceder a todo los datos que quiero.

#### Ejercicio realizado en clase

Crear un módulo que contenga en un array privado una lista de nomrbes de usuario. Este módulo debe exponer funciones para: obtener la lista de usuarios, agregar usuarios, obtener la cantidad de usuarios y eliminar usuarios:

```js
var usuarios = (function () {
    var listaUsuario=["Juan", "Ana", "Pedro"];
    
    return {
        obtenerTodos:  function(){
            return listaUsuario;
        },
        agregarUsuario: function(usuario){
            listaUsuario.push(usuario);
        },
        obtenerCantidad: function(){
            return listaUsuario.length;
        },
        eliminarUsuario: function(usuario){
            listaUsuario=listaUsuario.filter(function(usuarioLista){
                return usuarioLista!=usuario;
            })
        }
    };
})();
```


# ES5 y el modo estricto

A partir de Js5 se agregaron varias funciones a los objetos como 'create()', 'defineProperty()', las funciones 'parse()', 'stringify', etc, es decir, se mejoraron las librerías básicas. 
En cuanto a seguridad nos trae el modo estricto. Cambia la forma en la que se comporta el intérprete. Hay que definir las variables, sino muestra error, por ejemplo si me equivoco en el nombre de una variable y le asigno un valor sin haberla definido primero, me avisa. 
Para llevar adelante esto sin problemas de compatibilidad con versiones antesrios, se utilizó la estrategia de 'optar si': opto por querer que tenga todos los comportamientos de seguridad. Le tengo que agregar el string 'use strict' (que también tiene alcance dentro de la función). Entonces para todos los sitios web viejos, esto es transparente, pero para los navegadores nuevos, trae resultados (Tablas de compatibilidad de los browsers con js http://kangax.github.io/compat-table/es5/).
La recomendación es tratar de usar el modo estricto cada vez que pueda, pero no de manera global: si lo definís suelto arriba y después incluís una librería que no es compatible, entonces, la rompés. Es preferible usarlo dentro del propio entorno y no alterar el exterior. 

# Callbacks y promesas

JavaScript tiene orientación a eventos y es asíncrono. Responde a 'clicks' y cuando tiene que ejecutar una operación que tarda en realizar, puede ir haciendo otras cosas (pero hay un sólo hilo de ejecución, un solo thread). Para esto existen las callbacks y las promesas.
 
## Ejemplo

```js
// simula una consulta asíncrona a la base de datos
function obtenerUsuarios(callback) {
    setTimeout(function () {
        var usuarios = ["Juan", "Ana", "Pedro"];
        callback(usuarios);
    }, 250); // demora 250 ms
}

>obtenerUsuarios(function (usuarios) {  //cuando obtengas los usuarios, mostralos, pero mientras seguís con el resto.
    console.log(usuarios); // ["Juan", "Ana", "Pedro"]
});

```

En node hay una convención: que todos los callbacks primero reciben una variable error y después reciben lo que sea, porque todo puede fallar. 

```js
>obtenerUsuariosNode(function (err, usuarios) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log(usuarios); // ["Juan", "Ana", "Pedro"]
});
```

Las operaciones asíncronas también las podemos encadenar: 

```js
// agregar un permiso de "borrar" a usuarios
>obtenerUsuarios(function (usuarios) {
    usuarios.forEach(function (usuario) {
        obtenerRoles(usuario, function (roles) {
            grabarRoles(usuario, roles.push("borrar"));
        });
    });
});
```

Cuando a esto le agregamos los errores con la convención:

```js
// agregar un permiso de "borrar" a usuarios considerando errores
>obtenerUsuarios(function (err, usuarios) {
    if (err) {
        console.log(err.message);
        return;
    }
    usuarios.forEach(function (err, usuario) {
        if (err) {
            console.log(err.message);
            return;
        }
        obtenerRoles(usuario, function (err, roles) {
            if (err) {
                console.log(err.message);
                return;
            }
            grabarRoles(usuario, roles.push("borrar"), function (err) {
                if (err) {
                    console.log(err.message);
                    return;
                }
            });
        });
    });
});
```

# Promesas
Para evitar el llamado callback hell (dificultad en el código debido al manejo de errores y forma en que se usan las callbacks) se pueden usar promesas:

```js 
// simula una consulta asíncrona a la base de datos usando promesas
>function obtenerUsuarios() {
    return new Promise(function (fulfill) {
        setTimeout(function () {
            var usuarios = ["Juan", "Ana", "Pedro"];
            fulfill(usuarios);
        }, 250); // demora 250 ms
    });
}

>obtenerUsuarios().then(function (usuarios) {
    console.log(usuarios); // ["Juan", "Ana", "Pedro"]
});

```

Esto me quita los errores del código manejándolos de otra manera. A las promesas les paso dos funciones: una para cuando la promesa se cumpla y otra para cuando no. Una promesa es el resultado de una operación asíncrona a futuro. Puede tener 3 estados: pendientes (cuando la creo hasta que me devuelve el dato), fulfill (cuando me la devolvieron con el resultado esperado) y rechazada (cuando hubo un error).

