'use strict';

angular.module('app')
  .factory('ConfigService', function() {
    return {
      apiServer: 'http://10.1.201.191:3000/api'
    };
  });

