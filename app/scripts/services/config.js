'use strict';

var apiServer = 'http://10.1.201.191:3000/api';

angular.module('app')

  .constant('API_SERVER', apiServer)

  .factory('ConfigService', function() {
    return {
      apiServer: apiServer
    };
  });

