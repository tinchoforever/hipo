'use strict';

angular.module('hipoApp', ['hipoApp.controllers', 'hipoApp.services', 'hipoApp.models'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: '/views/core/main.html',
    controller: 'mainController'
  })
  .when('/quehagohoy', {
    templateUrl: '/views/core/suggestion.html',
    controller: 'suggestionController'
  })
  .when('/donde', {
    templateUrl: '/views/core/map.html',
    controller: 'mapController'
  })
  .when('/', {
    templateUrl: '/views/core/mock.html',
    controller: 'mockController'
  })
  .otherwise({
    redirectTo: '/'
  });
});

