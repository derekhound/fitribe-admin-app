'use strict';

angular.module('app')
  .controller('HeaderCtrl', [
    '$q', '$scope', '$state', 'AuthService', 'MyUser',
    function ($q, $scope, $state, AuthService, MyUser) {

    // view model
    $scope.vm = {};

    $scope.isAuthenticated = function() {
      return MyUser.isAuthenticated();
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
