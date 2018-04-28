'use strict';

angular.module('myApp.viewCreateIncidents', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewCreateIncidents', {
            templateUrl: 'viewCreateIncidents/viewCreateIncidents.html',
            controller: 'viewCreateIncidentsCtrl'
        });
    }])

    .controller('viewCreateIncidentsCtrl', ['$http', function ($http) {
        var self = this;
        var URL = 'http://localhost:8080';
        var formIncident = {
            'title': '',
            'description': '',
            'createdById': ''
        }
        this.sendToBackend = function () {
            $http.post(URL + "/incident/create", self.formIncident)
                .then(function(data){
                    console.log(data);

                }), function (data) {
                console.log(data);

            }
        }
    }]);