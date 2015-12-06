'use strict';

angular.module('app')
  .controller('ClientCtrl', [
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
        templateUrl: 'views/account/client/client-upsert.html',
        controller: 'ClientUpsertCtrl',
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
        templateUrl: 'views/account/client/client-delete.html',
        controller: 'ClientDeleteCtrl',
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
      $model.client.query({}, function(clients) {
        $scope.vm.items = clients;
      });
    }

    function init() {
      query();
    };

    init();

  }]);
