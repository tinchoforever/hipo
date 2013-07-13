'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('startController', function ($scope,$location,wizard,activityService) {
    $scope.hidden = true;
    $scope.finish = false;


    $scope.start = function(){
        $scope.hidden = false;
        $scope.activities[0].show = true;
    }
    activityService.getAll(function(data){

        for (var i = 0; i < data.length; i++) {
            data[i].show = false;
            data[i].selected =false;
            data[i].index= i;
        };
        $scope.activities = data;
    });


    $scope.yes = function(activity){
        activity.show = false;
        activity.selected =true;
        $scope.moveToNext(activity);

    };
    $scope.no = function(activity){
        activity.show = false;
        activity.selected =false;
        $scope.moveToNext(activity);
    }

    $scope.moveToNext = function(activity){
        if (activity.index+1 < $scope.activities.length ){
            $scope.activities[activity.index+1].show=true;
        }
        else {
            $scope.finish =true;
        }
    }

    $scope.suggestFor = function(activity){

        wizard.currentActivity = activity.name;
        // window.location= "/#/quehagohoy"
    };

});
