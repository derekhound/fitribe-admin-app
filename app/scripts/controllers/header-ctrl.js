'use strict';

angular.module('app')
  .controller('HeaderCtrl', [
    '$q', '$scope', '$state', 'AuthService', 'User',
    function ($q, $scope, $state, AuthService, User) {

    // view model
    $scope.vm = {};

    $scope.isAuthenticated = function() {
      return User.isAuthenticated();
    };

    $scope.logout = function() {
      AuthService.logout()
        .then(function() {
          $state.go('portal');
        });
    };

    function init() {

    };

    init();

  }]);
