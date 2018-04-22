'use strict';

angular.module('myApp.viewPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewPost', {
    templateUrl: 'viewPost/viewPost.html',
    controller: 'ViewPostCtrl'
  });
}])

    .controller('ViewPostCtrl', ['$http', function ($http) {
        var URL = 'http://localhost:8080';
        var self = this;
        self.userList = [];

        this.fetchUsers = function () {
            $http.get(URL + '/user/list')
                .then(
                    function (data) {
                        console.log(data);
                        var users = data.data.objects;

                        self.userList = [];
                        for (var index in users){
                          console.log(users[index])
                          self.userList.push(users[index]);
                        }
                    },
                    function () {
                        console.log("error");
                    }
                );
        };
        self.fetchUsers();

}]);