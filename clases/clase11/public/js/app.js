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

app.controller("loginController",function($http,$location){
    var vm=this;
    vm.login=function(){
        $http.post('/api/login',{
            nombre: vm.user,
            clave:  vm.pass
        }).then(function(response){
            console.log("Logueo correcto");
            $location.url("/lista");
        },function(response){
            console.log("Falla: "+ response.statusText);
        });
    };
})