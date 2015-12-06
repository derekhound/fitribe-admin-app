'use strict';

angular.module('app')
  .controller('HeaderCtrl', [
    '$q', '$scope', 'AuthService', 'User',
    function ($q, $scope, AuthService, User) {

    // view model
    $scope.vm = {};

    $scope.isAuthenticated = function() {
      return User.isAuthenticated();
    };

    $scope.logout = function() {
      AuthService.logout();
    };

    function init() {

    };

    init();

  }]);
