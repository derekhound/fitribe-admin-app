'use strict';

angular.module('app')
  .factory('AuthService', [
    '$rootScope', 'User',
    function ($rootScope, User) {

    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function(res) {
          $rootScope.currentUser = {
            id: res.user.id,
            tokenId: res.id,
            email: email
          };
        });
    }

    function logout() {
      return User
       .logout()
        .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(email, password) {
      return User
        .create({
         email: email,
         password: password
        })
        .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };

  }]);
