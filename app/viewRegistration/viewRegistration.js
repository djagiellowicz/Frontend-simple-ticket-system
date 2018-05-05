'use strict';

angular.module('myApp.viewRegistration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewRegistration', {
    templateUrl: 'viewRegistration/viewRegistration.html',
    controller: 'ViewRegistrationCtrl'
  });
}])

.controller('ViewRegistrationCtrl', ['$http', function ($http) {
  var self = this;
  var URL = 'http://localhost:8080';
  var formUser = {
      'login': '',
      'name': '',
      'surname': '',
      'password': ''
  }
  this.sendToBackend = function () {
    $http.post(URL + "/user/register", self.formUser)
        .then(function(data){
          console.log(data);
          if (data.status === 200){
              alert("Username already taken");
              return;
          }
          document.getElementById("registration_form").reset();
    }), function (data) {
        console.log(data);
        console.log("error");

    }
  }
}]);