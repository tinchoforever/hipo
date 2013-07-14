'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('suggestionController', function ($scope,wizard,profile,suggestionService) {
    $scope.ret = true;
    $scope.condition = "icon-" + "light-up";

    var onSuggestion = function(data){
        $scope.suggestion = data;
        $scope.profile =profile;
        $scope.weekDay =moment().format('dddd');
        $scope.numberDay = decimos(moment().date());
        $scope.month=  moment().format('MMMM');
        $scope.condition = "icon-" + "water";
    };
    //Si hay actividad, la mando
    if (wizard.currentActivity !== ""){
         suggestionService.getFor(wizard.currentActivity , onSuggestion);
    }
     //Sino, pido el default
    else {

        suggestionService.get(onSuggestion);
    }

});
