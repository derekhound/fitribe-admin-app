'use strict';

angular.module('app')
  .factory('$config', function() {
    return {
      apiServer: 'http://10.1.201.191:1337'
    };
  });

