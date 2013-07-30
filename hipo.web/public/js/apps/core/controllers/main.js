'use strict';
var hipoApp = angular.module('hipoApp.controllers', []);

hipoApp.controller('mainController', function ($scope,$location,wizard,activityService) {
    $scope.condition = "sunny-container";
    $scope.pattern = "sunny-animation";
    activityService.getAll(function(data){
        $scope.activities = data;
    });
    $scope.suggestFor = function(activity){

        wizard.currentActivity = activity.name;
        window.location= "/#/quehagohoy"
    };

});
