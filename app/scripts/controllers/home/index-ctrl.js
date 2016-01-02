'use strict';

angular.module('app')
  .controller('HomeIndexCtrl', [
    '$q', '$scope', '$state',
    function ($q, $scope, $state) {

    // view model
    $scope.vm = {
    };

    $scope.$state = $state;

    function init() {

    };

    init();

  }]);
