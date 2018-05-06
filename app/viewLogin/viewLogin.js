'use strict';

angular.module('myApp.viewLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewLogin', {
    templateUrl: 'viewLogin/viewLogin.html',
    controller: 'ViewLoginCtrl'
  });
}])

.controller('ViewLoginCtrl', ['$http', function ($http) {
  var self = this;
  var URL = 'http://localhost:8080';

  this.login = function () {
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