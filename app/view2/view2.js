'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$http', function ($http) {
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
          document.getElementById("registration_form").reset();
    }), function (data) {
        console.log(data);

    }


  }


}]);