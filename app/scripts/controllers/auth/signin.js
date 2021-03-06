'use strict';

angular.module('app')
  .controller('AuthSigninCtrl', [
    '$q', '$scope', '$state', 'AuthService',
    function ($q, $scope, $state, AuthService) {

    // view model
    $scope.vm = {
      email: '',
      password: ''
    };

    $scope.signin = function() {
      AuthService.login($scope.vm.email, $scope.vm.password)
        .then(function() {
          $state.go('portal');
        });
    };

    function init() {

    };

    init();

  }]);
