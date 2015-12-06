'use strict';

angular.module('app')
  .controller('SigninCtrl', [
    '$q', '$scope', 'AuthService',
    function ($q, $scope, AuthService) {

    // view model
    $scope.vm = {
      email: '',
      password: ''
    };

    $scope.signin = function() {
      AuthService.login($scope.vm.email, $scope.vm.password)
        .then(function() {

          //$state.go('add-review');
        });
    };

    function init() {

    };

    init();

  }]);
