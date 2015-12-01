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

app.run(function($rootScope,$http,$location){
    $rootScope.$on("$routeChangeStart",function(event, next){
        $http.get('/api/logged/status').then(function(){
             //$rootScope.loggedIn=true; 
        },function(){
            if($location.path() !== "/login"){
                $location.url('/login?back='+$location.url());
            }
        });
    });
});

app.service("librosService",function($http){
    
    function notificarError(err){
        alert("Error: "+ err.statusText);
    }
    return{
        getLibros: function(){
            return $http.get("/api/libros/").then(function(res){
                return res.data;
            }).catch(notificarError);
        },
        deleteLibros: function(_id){
            return $http.delete("/api/libros/"+_id).then(function(){
                $http.get("/api/libros/").then(function(res){
                    return res.data;
                });
            }).catch(notificarError);
        },
        createLibro: function(libro){
            return $http.post("/api/libros/",libro).catch(notificarError);
        },
        updateLibro: function(_id,libro){
            return $http.put("/api/libros/"+_id,libro).catch(notificarError);
        },
        getLibro: function(_id){
            return $http.get("/api/libros/"+_id).then(function(res){
                return res.data;
            }).catch(notificarError);
        }
    };
});



app.controller("listaLibros", function ($location,$http,librosService) {
    var vm = this;
    vm.libros = [];
    librosService.getLibros().then(function(libros){
        vm.libros= libros;
    });
    vm.crear= function(){
        $location.url("/detalle");
    };
    vm.editar= function(_id){
        $location.url("/detalle/"+_id);
    };
    vm.eliminar= function(_id){
        librosService.deleteLibros(_id).then(function(lista){
            librosService.getLibros().then(function(libros){
                vm.libros=libros;
            })
        })
    };
    
});

app.controller("detalleLibro", function ($routeParams,$location,librosService) {
    var vm = this;

    vm._id = $routeParams.id;
    vm.libro = {};
    if(vm._id){
        librosService.getLibro(vm._id).then(function(libro){
            vm.libro=libro;
        })
    }
    vm.modificar= function(){
        if(vm._id){
            librosService.updateLibro(vm._id,vm.libro).then(function(){
                $location.url("/lista");
            });
            
        }else{
            librosService.createLibro(vm.libro).then(function(){
                $location.url("/lista");
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
            $location.url($location.search().back || "");
        },function(response){
            console.log("Falla: "+ response.statusText);
        });
    };
})