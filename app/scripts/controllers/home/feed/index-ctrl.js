'use strict';

angular.module('app')
  .controller('HomeFeedIndexCtrl', [
    '$q', '$scope', 'Upload', 'ConfigService', 'MyUser', 'Post',
    function ($q, $scope, Upload, ConfigService, MyUser, Post) {

    // view model
    $scope.vm = {
      message: '',
      photos: []
    };

    $scope.post = function() {
      var params = {
        id: MyUser.getCurrentId(),
        message: $scope.vm.message
      }

      // add post
      MyUser._create_feeds(params, function(res) {

        // add photos
        if ($scope.vm.photos.length > 0) {
          var url = ConfigService.apiServer + '/Posts/' + res.id + '/Attachments';
          Upload.upload({
            url: url,
            data: {
              photos: $scope.vm.photos
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
        }
      });
    };

    /*
    $scope.save = function() {
      $scope.upload();
    };

    $scope.upload = function() {
      // http://apiServer/users/123/avatars
      var url = ConfigService.apiServer + '/users/' + User.getCurrentId() + '/avatars';

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
    */

    function init() {

    };

    init();

  }]);
