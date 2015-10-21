var express = require('express');

var app = express();
/*
app.get('/', function (req, res) {
  res.send('Respuesta desde Express!');
}); //esta función es un callback; pero en express cuando un callback tiene determinadas 
    //características se lo llama midlleware: transforman un pedido http eneventualmente una
    //respuesta
*/
    
app.use(express.static('www'));
app.use(express.static('movil'));

//Probar que pasa sii lo doy vuelta --sale el fondo azul
//app.use(express.static('movil'));
//app.use(express.static('www'));


var server = app.listen(3000, function () {
  console.log('Servidor web iniciado');
});