'use strict';

angular.module('app')
  .controller('UserCtrl', [
    '$q', '$scope', '$model', '$uibModal',
    function ($q, $scope, $model, $uibModal) {

    // view model
    $scope.vm = {
      items: []
    };

    $scope.upsert = function(item) {
      // open modal
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'views/account/user/user-upsert.html',
        controller: 'UserUpsertCtrl',
        resolve: {
          item: function() {
            return item;
          }
        }
      });

      // after closing modal, refresh page
      modalInstance.result.then(function(newItem) {
        init();
      });
    };

    $scope.delete = function(item) {
      // open modal
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'views/account/user/user-delete.html',
        controller: 'UserDeleteCtrl',
        resolve: {
          item: function() {
            return item;
          }
        }
      });

      // after closing modal, refresh page
      modalInstance.result.then(function(oldItem) {
        init();
      });
    };

    function query() {
      $model.user.query({}, function(users) {
        $scope.vm.items = users;
      });
    }

    function init() {
      query();
    };

    init();

  }]);
