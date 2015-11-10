var express = require("express");
var bodyParser = require("body-parser");
var session= require("express-session");
var connectPg = require("connect-pg-simple");
var pgSession = connectPg(session);
var pg = require('pg');
var connString= require("./conn-string"); //para que sepa que toma un archivo se usa ./ del directorio actual

var login = require("./login");                         
var libros = require("./libros");

var SERVER_PORT = 3000;

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(session({
    store: new pgSession({
        pg: pg,
        conString: connString
    }),
    cookie: {
        maxAge:1*60*1000
    },
    resave: false,
    rolling:true,
    saveUninitialized: true,
    secret: "COOKIE_SECRET"
}));

app.use("/api", login);
app.use("/api/libros", libros);

app.listen(SERVER_PORT, function () {
    console.log("Servidor iniciado en el puerto %s", SERVER_PORT);
});
