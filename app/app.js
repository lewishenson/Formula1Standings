'use strict';

angular.module('F1FeederApp', [
  'F1FeederApp.controllers',
  'F1FeederApp.services'
]);

angular.module('F1FeederApp.controllers', []).controller('driversController', function($scope, ergastAPIservice) {
    $scope.driversList = [];

    ergastAPIservice.getDrivers().success(function (response) {
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
});

angular.module('F1FeederApp.services', []).  factory('ergastAPIservice', function($http) {
    var ergastAPI = {};

    ergastAPI.getDrivers = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2014/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    return ergastAPI;
  });