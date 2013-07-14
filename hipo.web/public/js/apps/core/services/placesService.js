'use strict';
var hipoApp = angular.module('hipoApp.services');


hipoApp.service('placesService', function($http,profile) {
    return {
        getFor: function(key,callback){
            var url = "/api/v1/places/search/" + key;
            var userProfile = profile.asSuggestionParameter();
            $http.post(url,userProfile).success(function(data) {
                 callback(data);
            });
        },
        getAll: function(callback){
            var url = "/api/v1/places/search/"
            var userProfile = profile.asSuggestionParameter();
            console.log(userProfile);
            $http.post(url,userProfile).success(function(data) {
                 callback(data);
            });
        }
    };
});