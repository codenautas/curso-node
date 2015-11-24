var express = require('express');
var session = require('express-session');
var cors = require('cors');

var APP_PORT = 8080;
var API_PORT = 4000;

var app = express();
app.use(express.static('public'));
app.listen(APP_PORT, function () {
  console.log('Aplicación web en puerto %s', APP_PORT);
});

var api = express();
api.use(cors());
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
    _id: 1,
    titulo: 'El Fin de la Eternidad',
    autor: 'Isaac Asimov'
  }, {
    _id: 2,
    titulo: '2001 Odisea Espacial',
    autor: 'Arthur Clarke'
  }]);
});
api.delete('/api/libros/:_id', function (req, res, next) {
  res.end();
});
api.listen(API_PORT, function () {
  console.log('API en puerto %s', API_PORT);
});
