'use strict';

angular.module('app')
  .controller('UserItemCtrl', [
    '$q', '$scope', '$stateParams', 'User',
    function ($q, $scope, $stateParams, User) {

    // view model
    $scope.vm = {
      item: {}
    };

    function findById() {
      User.findById({ id: $stateParams.id }, function(user) {
        $scope.vm.item = user;
      });
    }

    function init() {
      findById();
    };

    init();

  }]);

