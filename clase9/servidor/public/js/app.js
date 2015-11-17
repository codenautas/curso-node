var app = angular.module("libros", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
	      // login view definition
        .when("/login", {
            templateUrl: "vistas/login.html",
            controller: "loginControler",
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

app.run(function($rootScope, $http, $location){
	$rootScope.$on("$routeChangeStart", function(event, next){
		$http.get("/api/logged/status").then(function(){
			//$rootScope.loggedIn = true;
			//console.log("session ok");
		}, function(){
			if($location.path() !== "/login"){
				$location.url("/login?back=" + $location.url());
			}
		})
	})
});

app.service("librosService", function($http){
	/*
	function notificarError(err) {
	if (err.status ===401) {
	   var backUrl = $}
	} */
	return {
		getLibros: function(){
			return $http.get("/api/libros").then(function(response){
					return response.data;
					});
		},
		getLibro: function (_id) {
			return $http.get("/api/libros/"+_id).then(function(response){
					return response.data;
					});
		},
		createLibro: function(libro) {
		    return $http.post("api/libros",libro);
		},
		updateLibro: function(_id, libro) {
		    return $http.put("api/libros/"+_id, libro);
		},
		deleteLibro: function(_id){
			return $http.delete("/api/libros/"+_id);
		}
	};
});

app.controller("listaLibros", function ($location, librosService) {
    var vm = this;

    vm.libros = [];
	/*
    $http.get("/api/libros/").then(function(response){
        vm.libros = response.data;
    });*/
	librosService.getLibros().then(function(libros){
	    vm.libros = libros;
	});
	
    vm.crear = function() {
      //objeto de angular que nos ayuda a hacer cambio de vistas $location
      $location.url("/detalle");
    };
    
    vm.editar = function (_id) {
      $location.url("/detalle/" + _id);
    };
    
    vm.eliminar = function(_id){
      librosService.deleteLibro(_id).then(function(){
		/*
		$http.get("/api/libros/").then(function(response){
            vm.libros = response.data;
        });*/
		librosService.getLibros().then(function(libros){
			vm.libros = libros;
		});
      });
    }

});

app.controller("detalleLibro", function ($routeParams, $location, librosService) {
    var vm = this;

    vm._id = $routeParams.id;
    vm.libro = {};
    
    if (vm._id) {
	    /*
        $http.get("/api/libros/"+vm._id).then(function(response){
        vm.libro = response.data;
		*/
		librosService.getLibro(vm._id).then(function(libro){
			vm.libro = libro})
    }
    
    vm.modificar = function(){
       if(vm._id) {
	     /*
         $http.put("/api/libros/"+vm._id, vm.libro).then(function(){
             $location.url("/lista");
         });
		 */
		 librosService.updateLibro(vm._id, vm.libro).then(function(){
             $location.url("/lista");
		 });
       }
       else{
           /*
			$http.post("/api/libros/", vm.libro).then(function(){
             $location.url("/lista");
          });*/
		 librosService.createLibro(vm.libro).then(function(){
             $location.url("/lista");
		 });
       }
    };

});


app.controller("loginControler", function ($http, $location) {
		var vm = this;
		vm.login = function(){
			$http.post("/api/login",{
				nombre: vm.user,
				clave: vm.pass
			}).then(function(response){
				//console.log("exitos!");
				$location.url($location.search().back || "");
				}, function(response){
				 console.log("falla: " + response.statusText)});
		};
});
