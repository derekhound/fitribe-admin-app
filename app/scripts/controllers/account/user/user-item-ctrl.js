'use strict';

angular.module('app')
  .controller('UserItemCtrl', [
    '$q', '$scope', '$model', '$stateParams',
    function ($q, $scope, $model, $stateParams) {

    // view model
    $scope.vm = {
      item: {}
    };

    function get() {
      $model.user.get({ userId: $stateParams.userId }, function(user) {
        $scope.vm.item = user;
      });
    }

    (function init() {
      get();
    })();

  }]);

