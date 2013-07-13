'use strict';
var hipoApp = angular.module('hipoApp.services');


hipoApp.service('suggestionService', function($http) {
    return {
        getAll: function(key,callback){
            var url = "/api/v1/suggestions";
            $http.get(url).success(function(data) {
                 callback(data);
            });
        }
    };
});