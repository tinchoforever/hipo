'use strict';
var hipoApp = angular.module('hipoApp.models');

hipoApp.service('wizard', function($http) {
    return {
       currentActivity:""
    };
});