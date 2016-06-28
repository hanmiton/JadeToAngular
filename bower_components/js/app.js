(function () {

  var app = angular.module('ingedex', [
    'google-maps',
    'ngRoute',
    'angular-md5',
    'ingedex.controllers',
    'ingedex.directives',
    'ingedex.filters',
    'ingedex.services'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
      })
      .when('/convenios', {
        templateUrl: 'views/convedex.html',
        controller: 'ConvedexController'
      })
      .when('/convenios/:type', {
        templateUrl: 'views/convedex.html',
        controller: 'ConvedexController'
      })
      .when('/convenios/convenio/:name', {
        templateUrl: 'views/convenio.html',
        controller: 'ConvenioController',
      })
      .when('/', {
        templateUrl: 'views/ingedex.html',
        controller: 'IngedexController'
      })
       .when('/:type', {
        templateUrl: 'views/ingedex.html',
        controller: 'IngedexController'
      })
      .when('/ingeniero/:name', {
        templateUrl: 'views/ingeniero.html',
        controller: 'IngenieroController',
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

})();