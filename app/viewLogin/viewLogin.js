'use strict';

angular.module('myApp.viewLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewLogin', {
    templateUrl: 'viewLogin/viewLogin.html',
    controller: 'ViewLoginCtrl'
  });
}])

.controller('ViewLoginCtrl',['$http', '$window','$rootScope' , 'AuthorisationService', function ($http,$window,$rootScope, AuthorisationService) {
  var self = this;
  var URL = 'http://localhost:8080';
  this.formLogin = {
      'username' : '',
      'password' : ''
  };

  this.login = function () {
    $http.post(URL + "/authenticate", self.formLogin)
        .then(function (response) {
            console.log("User has logged in: " + response);

            var token = response.data.token;
            var loggedInUser = response.data.user;

            AuthorisationService.loggedInUser = loggedInUser;

            $window.sessionStorage.setItem('token', token);
            $window.sessionStorage.setItem('user_id', loggedInUser.id);

            window.location = "#!/";

            $rootScope.loggedIn = true;

        }, function (response) {
            console.log("Error: " + response);
        });
  };
}]);