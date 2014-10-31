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

angular.module('F1FeederApp.controllers', []);

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