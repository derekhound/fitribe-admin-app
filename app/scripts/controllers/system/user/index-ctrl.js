'use strict';

angular.module('app')
  .controller('UserIndexCtrl', [
    '$q', '$scope', '$uibModal', 'User',
    function ($q, $scope, $uibModal, User) {

    // view model
    $scope.vm = {
      items: []
    };

    $scope.upsert = function(item) {
      // open modal
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'views/system/user/upsert.html',
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
        templateUrl: 'views/system/user/delete.html',
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

    function find() {
      User.find({}, function(users) {
        $scope.vm.items = users;
      });
    }

    function init() {
      find();
    };

    init();

  }]);
