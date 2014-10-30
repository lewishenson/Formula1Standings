'use strict';

angular
  .module('F1FeederApp', [
    'F1FeederApp.controllers',
    'F1FeederApp.services',
    'ngRoute'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when("/drivers", { templateUrl: "drivers/list.html", controller: "driversController" }).
      when("/drivers/:id", { templateUrl: "drivers/individual.html", controller: "driverController" }).
      otherwise({redirectTo: '/drivers'});
  }]);

angular
  .module('F1FeederApp.controllers', [])
  .controller('driversController', function($scope, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];

    $scope.searchFilter = function (driver) {
        var keyword = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
    };

    ergastAPIservice.getDrivers().success(function (response) {
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  })
  .controller('driverController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;

    ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]; 
    });

    ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races; 
    }); 
  });

angular
  .module('F1FeederApp.services', [])
  .factory('ergastAPIservice', function($http) {
    var ergastAPI = {};

    ergastAPI.getDrivers = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2014/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverDetails = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2014/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverRaces = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2014/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }

    return ergastAPI;
  });