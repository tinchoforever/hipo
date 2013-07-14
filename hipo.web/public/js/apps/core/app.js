'use strict';

angular.module('hipoApp', ['hipoApp.controllers', 'hipoApp.services', 'hipoApp.models'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/que', {
    templateUrl: '/views/core/main.html',
    controller: 'mainController'
  })
  .when('/empezar', {
    templateUrl: '/views/core/diagnostico/start.html',
    controller: 'startController'
  })
  .when('/quehagohoy', {
    templateUrl: '/views/core/suggestion.html',
    controller: 'suggestionController'
  })
  .when('/donde', {
    templateUrl: '/views/core/donde.html',
    controller: 'dondeController'
  })
  .when('/', {
    templateUrl: '/views/core/home.html',
    controller: 'mockController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
