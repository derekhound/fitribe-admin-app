'use strict';

angular.module('app')
  .controller('ClientItemCtrl', [
    '$q', '$scope', '$model', '$stateParams',
    function ($q, $scope, $model, $stateParams) {

    // view model
    $scope.vm = {
      item: {}
    };

    function get() {
      $model.client.get({ clientId: $stateParams.clientId }, function(client) {
        $scope.vm.item = client;
      });
    }

    (function init() {
      get();
    })();

  }]);

