'use strict';

angular.module('myApp.authorisationService', ['ngRoute'])
    .service("AuthorisationService", [function (){
        this.logged_in_id = '';
        this.loggedInUser = {
            'id': '',
            'login': ''
        };
        this.self = this;
    }]);

