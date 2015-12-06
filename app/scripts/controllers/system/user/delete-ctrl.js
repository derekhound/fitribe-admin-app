'use strict';

angular.module('app')
  .controller('UserDeleteCtrl', [
    '$q', '$scope', '$uibModalInstance', 'User', 'item',
    function ($q, $scope, $uibModalInstance, User, item) {

    $scope.ok = function() {
      User.delete({ id: item.id }, function(user) {
        $uibModalInstance.close(user);
      });
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

