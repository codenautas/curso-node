var app = angular.module("libros", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "vistas/login.html",
            controller: "loginController",
            controllerAs: "vm"
        })
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

app.run(function ($rootScope, $http, $location) {
    $rootScope.$on("$routeChangeStart", function () {
        $http.get("/api/login/status").then(function () {
            //
        }, function () {
            if ($location.path() === "/login") {
                return;
            }
            var backUrl = $location.url();
            $location.url("/login").search({
                back: backUrl
            });
        });
    });
});

app.service("librosService", function ($http, $location) {

    function notificarError(err) {
        /* if (err.status === 401) {
            var backUrl = $location.url();
            $location.url("/login").search({
                back: backUrl
            });
        } else { */
            alert("Error: " + err.statusText);
        // }
    }

    return {
        getLibros: function () {
            return $http.get("/api/libros").then(function (response) {
                return response.data;
            }).catch(notificarError);
        },
        getLibro: function (_id) {
            return $http.get("/api/libros/" + _id).then(function (response) {
                return response.data;
            }).catch(notificarError);
        },
        createLibro: function (libro) {
            return $http.post("/api/libros", libro).catch(notificarError);
        },
        updateLibro: function (_id, libro) {
            return $http.put("/api/libros/" + _id, libro).catch(notificarError);
        },
        deleteLibro: function (_id) {
            return $http.delete("/api/libros/" + _id).catch(notificarError);
        }
    };
});

app.controller("listaLibros", function ($location, librosService) {
    var vm = this;

    vm.libros = [];

    librosService.getLibros().then(function (libros) {
        vm.libros = libros;
    });

    vm.crear = function () {
        $location.url("/detalle");
    };

    vm.editar = function (_id) {
        $location.url("/detalle/" + _id);
    };

    vm.eliminar = function (_id) {
        librosService.deleteLibro(_id).then(function () {
            vm.libros = vm.libros.filter(function (libro) {
                return libro._id !== _id;
            });
        });
    };
});

app.controller("detalleLibro", function ($routeParams, $location, librosService) {
    var vm = this;

    vm._id = $routeParams.id;
    vm.libro = {};

    if (vm._id) {
        librosService.getLibro(vm._id).then(function (libro) {
            vm.libro = libro;
        });
    }

    vm.modificar = function () {
        if (vm._id) {
            librosService.updateLibro(vm._id, vm.libro).then(function () {
                $location.url("/lista");
            });
        } else {
            librosService.createLibro(vm.libro).then(function () {
                $location.url("/lista");
            });
        }
    };
});

app.controller("loginController", function ($http, $location) {
    var vm = this;

    vm.login = function () {
        $http.post("/api/login", {
            nombre: vm.user,
            clave: vm.pass
        }).then(function () {
            $location.url($location.search().back || "");
        }, function (response) {
            if (response.status === 401) {
                vm.mensajeError = 'Usuario o clave inválidas';
            } else {
                vm.mensajeError = 'Error desconocido: ' + response.statusText;
            }
        });
    };
});
