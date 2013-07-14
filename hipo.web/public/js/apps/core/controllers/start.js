'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('startController', function ($scope,$location,profile,activityService) {
    $scope.hidden = true;
    $scope.finish = false;
    $scope.likes = [];
    $scope.likeTags = [];


    $scope.show = function(i){
        return $scope.steps[i];
    };
    $scope.next = function(){
        $scope.steps[$scope.current] = false;
         if ($scope.current+1 < $scope.steps.length ){
            $scope.current++;
            $scope.steps[$scope.current]=true;
        }
        else {
            $scope.finish = true;
        }
    }

    $scope.start = function(){
        $scope.steps = [];
        for (var i = 0; i < 3; i++) {
           $scope.steps[i] = false;
        };
        $scope.steps[0] = true;
        $scope.current = 0;
    }
    activityService.getAll(function(data){

        for (var i = 0; i < data.length; i++) {
            data[i].show = false;
            data[i].selected =false;
            data[i].index= i;
        };
        $scope.activities = data;
        $scope.activities[0].show = true;
    });


    $scope.yes = function(activity){
        activity.show = false;
        activity.selected =true;
        $scope.likes.push(activity);
        $scope.likeTags.push(activity.name);
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
            $scope.next();
        }
    }

    $scope.movilidad =function(name){
        $scope.mobility = name;
        $scope.next();
    }




    $scope.submit = function(){
        profile.likes = $scope.likes;
        profile.movility = $scope.mobility;
        profile.name= $scope.name;
        profile.save();
        window.location= "/#/quehagohoy";
    }

});
