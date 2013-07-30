'use strict';
var hipoApp = angular.module('hipoApp.controllers');

hipoApp.controller('mockController', function ($scope) {
    $scope.ret = true;
    $scope.condition = "sunny-container";
    $scope.pattern = "sunny-pattern";
    $scope.weekDay =moment().format('dddd');
    $scope.numberDay = decimos(moment().date());
    $scope.month=  moment().format('MMMM');
});
