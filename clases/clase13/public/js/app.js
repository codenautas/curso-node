/* globals angular */

var app = angular.module('libros', []);

app.controller('librosController', function ($http) {
  var vm = this;

  vm.libros = [];
  vm.error = '';

  $http.get('http://localhost:4000/api/libros').then(function (response) {
    vm.libros = response.data;
  }).catch(function (err) {
    vm.error = 'Error: (' + err.status + ') ' + (err.message || '');
  });
});
