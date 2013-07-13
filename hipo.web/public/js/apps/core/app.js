'use strict';

angular.module('hipoApp', ['hipoApp.controllers', 'hipoApp.services'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: '/views/core/main.html',
    controller: 'mainController'
  })
  .when('/', {
    templateUrl: '/views/core/mock.html',
    controller: 'mockController'
  })
  .otherwise({
    redirectTo: '/'
  });
});

