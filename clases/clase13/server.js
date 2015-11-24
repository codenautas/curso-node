var express = require('express');
var session = require('express-session');

var APP_PORT = 8080;
var API_PORT = 4000;

var app = express();
app.use(express.static('public'));
app.listen(APP_PORT, function () {
  console.log('Aplicación web en puerto %s', APP_PORT);
});

var api = express();
api.use(session({
  cookie: {
    maxAge: 1 * 60 * 1000
  },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  secret: 'COOKIE_SECRET'
}));
api.get('/api/libros', function (req, res, next) {
  res.json([{
    titulo: 'El Fin de la Eternidad',
    autor: 'Isaac Asimov'
  }, {
    titulo: '2001 Odisea Espacial',
    autor: 'Arthur Clarke'
  }]);
});
api.listen(API_PORT, function () {
  console.log('API en puerto %s', API_PORT);
});
