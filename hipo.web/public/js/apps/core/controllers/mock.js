'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('mockController', function ($scope) {

    $scope.weekDay =moment().format('dddd');
    $scope.numberDay = moment().date();
    $scope.month=  moment().format('MMMM');
});
