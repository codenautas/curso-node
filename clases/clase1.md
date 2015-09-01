# Clase 1
1/9/2015

# Introducción

La historia de Node.JS empieza con la historia de Javascript (y la implementación de los navegadores desde Netscape). 
Node se basa en ese Javascript, unido a una librería que le permite al programa Javascript acceder 
a los recursos de la máquina donde está alojado. 
Esto se puede utilizar para crear la lógica que está en el servidor 
(aunque en realidad se puede usar para más cosas, por ejemplo para automatizar procesos internos). 

Node.JS está orientado a eventos; al igual que el Javascript que reside en el navegador que tiene eventos asociados
a la interacción del usuario (cuando hace click) o a la interacción con la red (cuando se termina de cargar algo o 
cuando vienen los datos de una petición AJAX). 

Javascript puede usarse como lenguaje con programación funcional.

Javascript puede usarse también como lenguaje orientado a objetos (si bien la sintaxis no es la típica), 
pero permite tener objetos, clases y herencia entre clases.

# Javascript

## Tipos de datos
Si bien Javascript no es fuertemente tipado (no hace el control en el momento de asignar variables o pasar parámetros), sí tiene tipos. Los tipos de datos son:

tipo de datos | explicacion
--------------|------------
`boolean`     | `true` y `false` (es lo que devuelven por ejemplo las comparaciones `===`, `<`, etc
`numeric`     | los números. Ojo que son de punto flotante y tienen los mismos problemas que en cualquier otro lenguaje (ej `0.1 + 0.2` no es igual a `0.3`)
`string`      | las cadenas de texto. En javascript no existe el tipo para un solo caracter
`object`      | todos los demás objetos, incluidas las funciones
`undefined`   | las variables no definidas, los miembros que no están en un objeto y las funciones que no retornan nada
`null`        | el valor `null` explícito cuando quiero tener un `return` que no devuelve nada se pone `return null;`

## Una forma de usar objetos

Sin usar clases

```js
> var animal={come:true, camina:true}
undefined
> animal
{ come: true, camina: true }
> var perro=Object.create(animal);
undefined
> perro
{}
> perro.come
true
> perro.ladra=true
true
> animal.ladra
undefined
> perro.prototype
undefined
> perro.__proto__
{ come: true, camina: true }
> animal.habla=true // le enseñamos a hablar a todos los animales mágicamente
true
> perro.habla
true
> var gato=Object.create(animal);
undefined
> gato.come
true
> gato.habla=false // perdió la magia
false
> perro.habla
true
```
