'use strict';
var hipoApp = angular.module('hipoApp.controllers', []);

hipoApp.controller('mainController', function ($scope,$location,wizard,activityService) {
    $scope.condition = "icon-" + "light-up";
    activityService.getAll(function(data){
        $scope.activities = data;
    });
    $scope.suggestFor = function(activity){

        wizard.currentActivity = activity.name;
        window.location= "/#/quehagohoy"
    };

});
