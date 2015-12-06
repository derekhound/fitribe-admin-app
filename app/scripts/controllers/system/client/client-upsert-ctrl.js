'use strict';

angular.module('app')
  .controller('ClientUpsertCtrl', [
    '$q', '$scope', '$model', '$uibModalInstance', 'item',
    function ($q, $scope, $model, $uibModalInstance, item) {

    // edit action
    if (item) {
      $scope.vm = {
        title:        'Edit',
        okName:       'Update',
        name:         item.name,
        redirectURI:  item.redirectURI,
        trusted:      item.trusted
      }
    // new action
    } else {
      $scope.vm = {
        title:        'New',
        okName:       'Create',
        name:         '',
        redirectURI:  '',
        trusted:      true
      }
    }

    $scope.ok = function() {
      var params = _.pick($scope.vm, ['name', 'redirectURI', 'trusted']);
      // edit action
      if (item) {
        params.clientId = item.clientId;
        $model.client.update(params, function(client) {
          $uibModalInstance.close(client);
        });
      // new action
      } else {
        $model.client.save(params, function(client) {
          $uibModalInstance.close(client);
        });
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

