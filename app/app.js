'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.userView',
  'myApp.viewRegistration',
  'myApp.viewIncidents',
  'myApp.viewCreateIncidents',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/viewRegistration'});
}]).run(function ($rootScope) {
    $rootScope.loggedInUser=1;
})

