'use strict';

angular.module('app')
  .controller('UserDeleteCtrl', [
    '$q', '$scope', '$model', '$uibModalInstance', 'item',
    function ($q, $scope, $model, $uibModalInstance, item) {

    $scope.ok = function() {
      $model.user.delete({ userId: item.userId }, function(user) {
        $uibModalInstance.close(user);
      });
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

