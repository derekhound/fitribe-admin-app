'use strict';

angular.module('app')
  .factory('AuthService', [
    '$rootScope', 'MyUser',
    function ($rootScope, MyUser) {

    function login(email, password) {
      return MyUser
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
      return MyUser
       .logout()
        .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(email, password) {
      return MyUser
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
