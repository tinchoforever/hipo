'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('suggestionController', function ($scope,wizard,profile,suggestionService, placesService) {
    $scope.ret = true;
    $scope.condition = "sunny-container";
    $scope.pattern = "sunny-pattern";

    var onSuggestion = function(data){
        $scope.suggestion = data;
        $scope.profile =profile;
        $scope.weekDay =moment().format('dddd');
        $scope.numberDay = decimos(moment().date());
        $scope.month=  moment().format('MMMM');

        var condition = data.weather.condition;
        $scope.condition = "sunny-container";
        $scope.pattern = "sunny-pattern";
        if (condition.indexOf('Cloudy')) {
            $scope.condition = "cloudy-container";
            $scope.pattern = "cloudy-pattern";
        } else if (condition.indexOf('Storm')) {
            $scope.condition = "storm-container";
            $scope.pattern = "storm-pattern";
        } else if (condition.indexOf('Sunny')) {
            $scope.condition = "sunny-container";
            $scope.pattern = "sunny-pattern";
        } else if (condition.indexOf('Rain')) {
            $scope.condition = "rain-container";
            $scope.pattern = "rain-pattern";
        }
        
        placesService.getAll(function(data){
          for (var i = 0;i <data.length; i++) {
                var point = data[i];
                point.map = "http://staticmap.openstreetmap.de/staticmap.php?center=" + point.lat + ',' + point.lng + "&zoom=20&size=300x200&maptype=mapnik&markers="+ point.lat + ',' +point.lng +",lightblue1";

            };
            console.log(data[0]);
            $scope.points = data;
        });
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
