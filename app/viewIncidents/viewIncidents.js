'use strict';

angular.module('myApp.viewIncidents', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewIncidents', {
    templateUrl: 'viewIncidents/ViewIncidents.html',
    controller: 'ViewIncidentsCtrl'
  });
}])

    .controller('ViewIncidentsCtrl', ['$http', function ($http) {
        var URL = 'http://localhost:8080';
        var restOfURL = '/incident/list';
        var self = this;
        self.incidentsList = [];
        self.pageNumber = 0;
        self.totalNumberOfElements = 0;
        self.showme = false;
        // self.roles = [];
        self.statusesList = [

        ]


        this.fetchIncidents = function () {
            if (self.pageNumber != 0) {
                restOfURL = '/incident/list/' + self.pageNumber;
            }
            else{
                restOfURL = '/incident/list';
            }

            $http.get(URL + restOfURL)
                .then(
                    function (data) {
                            console.log(data);
                            var incidents = data.data.objects;
                            self.pageNumber = data.data.currentPage;
                            self.totalNumberOfElements = data.data.numberOfElements;

                            self.incidentsList = [];
                            for (var index in incidents){
                                console.log(incidents[index]);
                                self.incidentsList.push(incidents[index]);
                            }
                        },
                        function () {
                            console.log("error");
                        }
                );
        };
        this.nextPage = function(){
            self.pageNumber = self.pageNumber + 1;
            self.fetchIncidents();
        };
        this.previousPage = function(){
            self.pageNumber = self.pageNumber - 1;
            self.fetchIncidents();
        };
        this.alert = function(data){
            var id = data.id;
            self.showme = true;
            $http.get(URL + '/incident/get/' + id)
                .then(
                    function (incident) {
                        console.log(incident);
                        document.getElementById("id_form").value = incident.data.object.id;
                        document.getElementById("title_form").value = incident.data.object.title;
                        document.getElementById("description_form").value = incident.data.object.description;
                        document.getElementById("creationDate_form").value = incident.data.object.creationDate;
                        document.getElementById("status_form").value = incident.data.object.status;
                        document.getElementById("created_by_login_form").value = incident.data.object.createdBy.login;
                        document.getElementById("createdBy_name_form").value = incident.data.object.assignedTo.name;
                        document.getElementById("createdBy_surname_form").value = incident.data.object.assignedTo.surname;
                        document.getElementById("assignedTo_name_form").value = incident.data.object.assignedTo.name;
                        document.getElementById("assignedTo_surname_form").value = incident.data.object.assignedTo.surname;
                    },
                    function () {
                        console.log("error");
                    }
                );
            alert("It's alive!");

        };
        this.remove = function(){
            var incidentId = document.getElementById("id_form").value;
            console.log(incidentId);
            $http.delete(URL + '/incident/delete/' + incidentId)
                .then(
                    function () {
                        console.log("incident has been deleted");
                        document.getElementById("incident_update_form").reset();
                        self.showme = false;
                        self.fetchIncidents();
                    },
                    function () {
                        console.log("error");
                    }
                );

        }
        // this.fetchRoles = function (){
        //     $http.get(URL + '/role/list')
        //         .then(
        //             function (roles) {
        //                 console.log(roles);
        //                 var roles = data.data.objects;
        //
        //                 self.roles = [];
        //
        //                 for (var index in roles) {
        //                     console.log(roles[index]);
        //                     self.roles.push(roles[index]);
        //                 }
        //
        //             },
        //             function () {
        //                 console.log("error");
        //             }
        //         );
        //     alert("It's alive!");
        //
        // };

        this.fetchStatuses = function () {
            $http.get(URL + "/incident/status/list")
                .then(
                    function (data) {
                        console.log(data);
                        var statuses = data.data.objects;

                        self.statusesList = [];

                        for (var index in statuses){
                            console.log(statuses[index]);
                            self.statusesList.push(statuses[index]);
                        }
                    },
                    function () {
                        console.log("error");
                    }
                );
        };
        self.fetchStatuses();
        self.fetchIncidents();



}]);