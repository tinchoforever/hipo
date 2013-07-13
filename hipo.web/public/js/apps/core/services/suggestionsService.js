'use strict';
var hipoApp = angular.module('hipoApp.services',[]);


hipoApp.service('suggestionsService', function($http) {
    return {
        getAll: function(hash,callback){
            var url = "/api/v1/suggestions";
            $http.get(url).success(function(data) {
                 callback(data);
            });
        }
    };
});