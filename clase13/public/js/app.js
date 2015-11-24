var app = angular.module("libros", []);


app.controller("librosController", function ($http) {
    var vm = this;
    vm.libros = [];
	
	$http.get('http://localhost:4000/api/libros').then(function(response){
	    vm.libros = response.data;
	});
	
	vm.borrar = function (_id) {
		$http.delete('http://localhost:4000/api/libros/' + _id).then(function(response){
			vm.libros = vm.libros.filter(function(libro){
				return libro._id !== _id;
			});
		});
	};
});
