'use strict';

angular.module('app')
  .controller('UserUpsertCtrl', [
    '$q', '$scope', '$model', '$uibModalInstance', 'item',
    function ($q, $scope, $model, $uibModalInstance, item) {

    // edit action
    if (item) {
      $scope.vm = {
        title:        'Edit',
        okName:       'Update',
        username:     item.username,
        password:     '',
      }
    // new action
    } else {
      $scope.vm = {
        title:        'New',
        okName:       'Create',
        username:     '',
        password:     '',
      }
    }

    $scope.ok = function() {
      var params = _.pick($scope.vm, ['username', 'password']);
      // edit action
      if (item) {
        params.userId = item.userId;
        $model.user.update(params, function(user) {
          $uibModalInstance.close(user);
        });
      // new action
      } else {
        $model.user.save(params, function(user) {
          $uibModalInstance.close(user);
        });
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

