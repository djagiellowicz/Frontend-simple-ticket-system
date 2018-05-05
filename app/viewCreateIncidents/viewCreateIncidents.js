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
        self.usersList = [];

        this.sendToBackend = function () {
            $http.post(URL + "/incident/create", self.formIncident)
                .then(function(data){
                    console.log(data);
                    document.getElementById("incident_form").reset();

                }), function (data) {
                console.log(data);
            }
        }
        this.fetchUsers = function () {
            if(self.usersList.length === 0) {
                $http.get(URL + "/user/all")
                    .then(
                        function (data) {
                            console.log(data);
                            var users = data.data.objects;

                            self.usersList = [];

                            for (var index in users) {
                                console.log(users[index]);
                                self.usersList.push(users[index]);
                            }
                        },
                        function () {
                            console.log("error");
                        }
                    );
            }
        };
        self.fetchUsers();
    }]);