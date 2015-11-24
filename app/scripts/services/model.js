'use strict';

angular.module('app')
  .factory('$model', [
    '$resource', '$config',
    function ($resource, $config) {

    var apiServer = $config.apiServer;

    var client = $resource(apiServer + '/client/:clientId', {
      clientId: '@clientId'
    });

    var user = $resource(apiServer + '/user/:clientId', {
      userId: '@userId'
    });

    return {
      client: client,
      user: user
    };

  }]);
