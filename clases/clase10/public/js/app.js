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

app.controller("listaLibros", function ($location,$http) {
    var vm = this;
    vm.libros = [];
    $http.get("/api/libros/").then(function(res){
        vm.libros=res.data;
    });
    
    vm.crear= function(){
        $location.url("/detalle");
    };
    vm.editar= function(_id){
        $location.url("/detalle/"+_id);
    };
    vm.eliminar= function(_id){
        $http.delete("/api/libros/"+_id).then(function(){
            $http.get("/api/libros/").then(function(res){
                vm.libros=res.data;
            });
        });
    };
    
});

app.controller("detalleLibro", function ($routeParams,$location,$http) {
    var vm = this;

    vm._id = $routeParams.id;
    vm.libro = {};
    if(vm._id){
        $http.get("/api/libros/"+vm._id).then(function(res){
            vm.libro=res.data;
        });
    }
    vm.modificar= function(){
        if(vm._id){
            $http.put("/api/libros/"+vm._id,vm.libro).then(function(){
                $location.url("/lista");
            });
        }else{
            $http.post("/api/libros/",vm.libro).then(function(){
                $location.url("/lista");
                //return resp;
            });
        }
    };
});
