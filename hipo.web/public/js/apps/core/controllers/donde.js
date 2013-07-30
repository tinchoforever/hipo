'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('dondeController', function ($scope,wizard,profile,suggestionService, placesService) {

    $scope.ret = true;
    $scope.condition = "sunny-container";
    $scope.pattern = "sunny-pattern";
    $scope.profile =profile;
    $scope.weekDay =moment().format('dddd');
    $scope.numberDay = decimos(moment().date());
    $scope.month=  moment().format('MMMM');

    var onSuggestion = function(data){
        $scope.suggestion = data;
        $scope.condition = "sunny-container";
        $scope.pattern = "sunny-pattern";
    };
    //Si hay actividad, la mando
    if (wizard.currentActivity !== ""){
         suggestionService.getFor(wizard.currentActivity , onSuggestion);
    }
     //Sino, pido el default
    else {

        suggestionService.get(onSuggestion);
    }
    placesService.getAll(function(data){
      for (var i = 0;i <data.length; i++) {
            var point = data[i];
            point.map = "http://staticmap.openstreetmap.de/staticmap.php?center=" + point.lat + ',' +point.lng + "&zoom=20&size=300x200&maptype=mapnik&markers="+ point.lat + ',' +point.lng +",lightblue1";

        };
        console.log(data[0]);
        $scope.points = data;
    });

});
