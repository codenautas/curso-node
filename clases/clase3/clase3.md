
# Node

Es un ambiente de ejecución de js que está basado en V8 (motor de google). Surge en 2008-2009. En ese momento los servidores que más se usaban (por ejemplo, Apache) tenían un problema serio: consumen recursos linealmente con la cantidad de usuarios. A medida que uso más recurso, la performance empeora. 
Cómo funciona Apache para atender la carga? Cada vez que viene un pedido nuevo, Apache larga un thread nuevo, atiende el pedido y cuando tiene que hacer algo internamente, el hilo de ejecución se queda blockeado. Y hace esto con cada pedido, generando un thread nuevo. Cuando obtiene lo que quería, se desbloquea y continua. Si la carga es muy grande, consume toda la memoria, simula que el disco es más memoria y degrada la performance a causa de este gran consumo. 

Hay otro modelo: NgNet no levanta un thread por cada pedido, sino que internamente tiene un loop de eventos: viene un pedido, lo incorpora en el loop, lo atiende. Si requiere datos, guarda ese pedido y sigue con lo que puede hacer y así guarda los pedidos hasta poder resolverlos. NgNet, mantiene su performance constante, no crece linealmente.
En Node se usa JavaScript porque en el browser hay este tipo de programación. Entonces ya había un modelo de programación asíncrona y orientada a eventos, que deciden usar. Node tiene tres componenetes: javascript, loop de eventos y es no blockeante. 

### Problemas actuales de Node: Extensiones nativas
Node está en JS, pero si hay cosas que no tiene, se puede extender. Las extensiones nativas se escriben en c++. Y la interfaz entre la parte de c++ y Js también cambió. Esto trajo problemas, porque algunas de esas comunicaciones ya no son compatibles.

### Nota
Todos los lenguajes de programación tiene dos partes: syntax, objetos, etc y por otro lado, está la librería standard: serie de objetos que existen en el lenguaje y permiten acceder a pantalla, disco, red, colecciones.  Node nos da las mismas cosas. Replica la gran mayoría de las funciones, objetos y propiedades globales del browser (pero hay algunas cosas que no, como por ejemplo el objeto navigator).
Además, Node viene integrado con REPL, que es un ambiete de ejecución. Lo mismo que se puede hacer en el browser.

## Objeto Process

```js
process.addListener("SIGINT", function () { // escucha `Ctrl-C` o `kill -2`
    console.log("Terminando el proceso...");
    process.exit(1);
});
setInterval(function () {
    console.log(process.pid); // imprime el id de proceso actual
}, 1000);
/*env tiene todas las variables de entorno del sistema. argv
process.argv me devuelve todos los parámetros con los que llamé a la función por línea de comando*/
```
