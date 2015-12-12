'use strict';

angular.module('app')
  .controller('AuthSignupCtrl', [
    '$q', '$scope', '$state', 'AuthService',
    function ($q, $scope, $state, AuthService) {

    // view model
    $scope.vm = {
      email: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.vm.email, $scope.vm.password)
        .then(function() {
          $state.go('portal');
        });
    };

    function init() {

    };

    init();

  }]);
