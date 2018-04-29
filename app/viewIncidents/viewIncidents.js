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
                        document.getElementById("description_form").value = incident.data.object.description;
                    },
                    function () {
                        console.log("error");
                    }
                );
            alert("It's alive!");

        };
        self.fetchIncidents();

}]);