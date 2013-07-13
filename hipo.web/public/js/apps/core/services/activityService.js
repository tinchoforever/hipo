'use strict';
var hipoApp = angular.module('hipoApp.services',[]);


hipoApp.service('activityService', function($http) {
    return {
        getAll: function(hash,callback){
            var url = "api/v1/activities/all";
            $http.get(url).success(function(data) {
                 callback(data);
            });
        }
    };
});