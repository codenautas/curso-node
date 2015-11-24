var express = require("express");
var cors = require("cors");

var APP_PORT = 8080;
var API_PORT = 4000;

var app= express();
app.use(express.static('public'));
app.listen(APP_PORT, function(){
  console.log('Aplicacion web en puerto %s', APP_PORT);
});

var api = express();
api.get('/api/libros', cors(), function(req,res, next){
var libros = [{
  _id:1,
  titulo: 'El fin de la eternidad',
  autor: 'Isaac Asimov'
  }, {
  _id:2,
  titulo: 'Martín Fierro',
  autor: 'Jose Hernández'

  }];

res.json(libros);
});

api.options('*',cors());

api.delete('/api/libros/:_id', cors(), function(req,res,next){
	res.end();
});

api.listen(API_PORT, function(){
  console.log('Aplicacion web en puerto %s', API_PORT);
})
