'use strict';
var hipoApp = angular.module('hipoApp.services');


hipoApp.service('suggestionService', function($http,profile) {
    return {
        getFor: function(key,callback){
            var url = "/api/v1/start/" + key;
            var userProfile = profile.asSuggestionParameter();
            $http.post(url,userProfile).success(function(data) {
                 callback(data);
            });
        },
        get: function(callback){
            var url = "/api/v1/start";
            var userProfile = profile.asSuggestionParameter();
            console.log(userProfile);
            $http.post(url,userProfile).success(function(data) {
                 callback(data);
            });
        }
    };
});