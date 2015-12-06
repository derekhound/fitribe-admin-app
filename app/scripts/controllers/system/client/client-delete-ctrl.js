'use strict';

angular.module('app')
  .controller('ClientDeleteCtrl', [
    '$q', '$scope', '$model', '$uibModalInstance', 'item',
    function ($q, $scope, $model, $uibModalInstance, item) {

    $scope.ok = function() {
      $model.client.delete({ clientId: item.clientId }, function(client) {
        $uibModalInstance.close(client);
      });
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

