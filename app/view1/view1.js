'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

    .controller('View1Ctrl', ['$http', '$rootScope', function ($http, $rootScope) {
        var URL = 'http://localhost:8080';
        var restOfURL = '/user/list';
        var self = this;
        self.loggedInUser = $rootScope.loggedInUser;
        self.userList = [];
        self.pageNumber = 0;


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