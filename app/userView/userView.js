'use strict';

angular.module('myApp.userView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userView', {
    templateUrl: 'userView/userView.html',
    controller: 'UserViewCtrl'
  });
}])
    .controller('UserViewCtrl', ['$http','$rootScope', 'AuthorisationService', function ($http, $rootScope, AuthorisationService) {
        var URL = 'http://localhost:8080';
        var listURL = '/user/list';
        var removeURL = '/user/delete/';
        var self = this;
        self.authorisation = AuthorisationService.self;
        self.userList = [];
        self.pageNumber = 0;
        self.totalNumberOfElements = 0;
        self.showUser = false;
        self.formUser;

        this.fetchUsers = function () {
          if (self.pageNumber != 0) {
            listURL = '/user/list/' + self.pageNumber;
          }
          else{
            listURL = '/user/list';
          }

            $http.get(URL + listURL)
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
        this.edit = function (id) {
            $http.get(URL + '/user/get/' + id)
                .then(
                    function (user) {
                        console.log(user.data.object);
                        self.formUser = user.data.object;
                        self.showUser = true;
                    },
                    function () {
                        console.log("error");
                    }
                );
        }

        this.nextPage = function(){
          self.pageNumber = self.pageNumber + 1;
          self.fetchUsers();
        };
        this.previousPage = function(){
          self.pageNumber = self.pageNumber - 1;
          self.fetchUsers();
        };
        this.remove = function(id) {
            $http.post(URL + removeURL + id, null)
                .then(
                    function () {
                        console.log("User removed");
                        self.fetchUsers();
                    },
                    function () {
                        console.log("error");
                    }
                );
        };
            self.fetchUsers();


        }]);