'use strict';

angular.module('myApp.userView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userView', {
    templateUrl: 'userView/userView.html',
    controller: 'UserViewCtrl'
  });
}])
    .controller('UserViewCtrl', ['$http', '$rootScope', function ($http, $rootScope) {
        var URL = 'http://localhost:8080';
        var restOfURL = '/user/list';
        var self = this;
        self.loggedInUser = $rootScope.loggedInUser;
        self.userList = [];
        self.pageNumber = 0;
        self.totalNumberOfElements = 0;

        this.fetchUsers = function () {
          if (self.pageNumber != 0) {
            restOfURL = '/user/list/' + self.pageNumber;
          }
          else{
            restOfURL = '/user/list';
          }

            $http.get(URL + restOfURL)
                .then(
                    function (data) {
                        console.log(data);
                        var users = data.data.objects;
                        self.pageNumber = data.data.currentPage;
                        self.totalNumberOfElements = data.data.numberOfElements;

                        self.userList = [];
                        for (var index in users){
                          console.log(users[index]);
                          self.userList.push(users[index]);
                        }
                    },
                    function () {
                        console.log("error");
                    }
                );
        };

        this.nextPage = function(){
          self.pageNumber = self.pageNumber + 1;
          self.fetchUsers();
        };
        this.previousPage = function(){
          self.pageNumber = self.pageNumber - 1;
          self.fetchUsers();
        };
        self.fetchUsers();


}]);