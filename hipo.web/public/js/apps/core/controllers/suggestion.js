'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('suggestionController', function ($scope,wizard,profile,suggestionService) {
    $scope.ret = true;
    suggestionService.getAll(wizard.currentActivity, function(data){
        $scope.suggestion = data;
        $scope.profile =profile;
    });

});
