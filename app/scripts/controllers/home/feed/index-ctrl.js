'use strict';

angular.module('app')
  .controller('HomeFeedIndexCtrl', [
    '$q', '$scope', 'Upload', 'ConfigService', 'MyUser', 'Post',
    function ($q, $scope, Upload, ConfigService, MyUser, Post) {

    // view model
    $scope.vm = {
      message: '',
      images: []
    };

    // data
    $scope.feeds = [];

    function getFeed()
    {
      var params = {
        id: MyUser.getCurrentId()
      };

      MyUser._find_feeds(params, function(res) {
        $scope.feeds = res;
      });
    }

    $scope.post = function() {
      var params = {
        id: MyUser.getCurrentId(),
        message: $scope.vm.message
      }

      // add post
      MyUser._create_feeds(params, function(res) {
        var postId = res.id;

        // add images
        if ($scope.vm.images.length > 0) {
          var url = ConfigService.apiServer + '/Posts/' + postId + '/Attachments';
          Upload.upload({
            url: url,
            data: {
              files: $scope.vm.images
            },
            arrayKey: '[]'
          // success
          }).then(function(res) {
            //console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);
            console.log('--- Suceess ---');
            console.log(res);

            // TODO:
            // get post
            Post._findById({id: postId}, function(res) {
              console.log(res);
              $scope.feeds.push(res);
            });


          // fail
          }, function(res) {
            console.log('Error status: ' + res.status);
          // progress
          }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log(evt.config.data);
            console.log('progress: ' + progressPercentage + '%');
            console.log(evt.config.data.files);
          });

        } else {
          // TODO:
          // get post
          Post._findById({id: postId}, function(res) {
            console.log(res);
            $scope.feeds.push(res);
          });
        }
      });
    };

    function init() {
      getFeed();
    };

    init();

  }]);
