'use strict';

angular.module('app')
  .controller('SettingsProfileIndexCtrl', [
    '$q', '$scope', 'Upload', 'ConfigService', 'MyUser',
    function ($q, $scope, Upload, ConfigService, MyUser) {

    // view model
    $scope.vm = {
      avatar: null
    };

    $scope.save = function() {
      $scope.upload();
    };

    $scope.upload = function() {
      // http://apiServer/users/123/avatars
      var url = ConfigService.apiServer + '/users/' + MyUser.getCurrentId() + '/avatars';

      Upload.upload({
        url: url,
        data: {
          file: $scope.vm.avatar
        }
      // success
      }).then(function(res) {
        console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);
      // fail
      }, function(res) {
        console.log('Error status: ' + res.status);
      // progress
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };

    function init() {

    };

    init();

  }]);
