'use strict';

angular.module('app')
  .controller('SettingsAccountIndexCtrl', [
    '$q', '$scope', '$state',
    function ($q, $scope, $state) {

    // view model
    $scope.vm = {
      username: '',
      email: ''
    };

    $scope.save = function() {

    };

    function init() {

    };

    init();

  }]);
