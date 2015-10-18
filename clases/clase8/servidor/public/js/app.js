var app = angular.module("libros", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/lista", {
            templateUrl: "vistas/lista.html",
            controller: "listaLibros",
            controllerAs: "vm"
        })
        .when("/detalle/:id?", {
            templateUrl: "vistas/detalle.html",
            controller: "detalleLibro",
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: "/lista"
        });
});

app.controller("listaLibros", function () {
    var vm = this;

    vm.libros = [];

});

app.controller("detalleLibro", function ($routeParams) {
    var vm = this;

    vm._id = $routeParams.id;
    vm.libro = {};

});
