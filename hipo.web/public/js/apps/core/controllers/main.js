'use strict';
var hipoApp = angular.module('hipoApp.controllers', []);

hipoApp.controller('mainController', function ($scope,$location,wizard,activityService) {

    activityService.getAll(function(data){
        $scope.activities = data;
    });
    $scope.suggestFor = function(activity){
        console.log(activity.name)
        wizard.currentActivity = activity.name;
        window.location= "/#/quehagohoy"
    };

});
