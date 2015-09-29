var express = require('express');

var app = express();

// app.get('/', function (req, res) {
  // res.send('Respuesta desde Express!');
// });
// app.use(express.static('movil'));
app.use(express.static('www'));
app.use('/m2', express.static('movil'));

var server = app.listen(3000, function () {
  console.log('Servidor web iniciado');
});