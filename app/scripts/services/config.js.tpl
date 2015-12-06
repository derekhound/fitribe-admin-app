'use strict';

angular.module('app')
  .factory('ConfigService', function() {
    return {
      apiServer: '<%- apiServer %>'
    };
  });

