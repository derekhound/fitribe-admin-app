'use strict';

angular.module('app')
  .controller('UserUpsertCtrl', [
    '$q', '$scope', '$uibModalInstance', 'User', 'item',
    function ($q, $scope, $uibModalInstance, User, item) {

    // edit action
    if (item) {
      $scope.vm = {
        title:        'Edit',
        verb:         'Update',
        email:        item.email,
        password:     '',
      }
    // new action
    } else {
      $scope.vm = {
        title:        'New',
        verb:         'Create',
        email:        '',
        password:     '',
      }
    }

    $scope.ok = function() {
      var params = _.pick($scope.vm, ['email', 'password']);
      // edit action
      if (item) {
        params.id = item.id;
        User.upsert(params, function(user) {
          $uibModalInstance.close(user);
        });
      // new action
      } else {
        User.create(params, function(user) {
          $uibModalInstance.close(user);
        });
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

