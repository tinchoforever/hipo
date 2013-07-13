'use strict';
var hipoApp = angular.module('hipoApp.models',[]);


hipoApp.service('profile', function($http) {
    return {
        name:"Hipocampo",
        preferences: []
    };
});