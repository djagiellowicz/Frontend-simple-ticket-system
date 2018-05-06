'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.userView',
    'myApp.viewRegistration',
    'myApp.viewIncidents',
    'myApp.viewCreateIncidents',
    'myApp.authorisationService',
    'myApp.viewLogin',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/viewRegistration'});
}]).run(function ($rootScope, AuthorisationService, $window, $http) {

    if (AuthorisationService.loggedInUser.id === '') {
        var token = $window.sessionStorage.getItem('token');
        var user_id = $window.sessionStorage.getItem('user_id');

        if (token !== null) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            AuthorisationService.logged_in_id = user_id;
            $rootScope.loggedIn = true;
        }else{
            $rootScope.loggedIn = false;
        }
    } else {
        $rootScope.loggedIn = true;
    }
});

