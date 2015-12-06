(function(window, angular, undefined) {

'use strict';

var urlBase = "http://10.1.201.191:3000/api";
var authHeader = 'authorization';

var module = angular.module("lbServices", ['ngResource']);

module
  .factory('User',
  ['LoopBackResource', 'LoopBackAuth', '$injector',
  function(Resource, LoopBackAuth, $injector) {

    var R = Resource(
      urlBase + "/Users/:id",
      { 'id': '@id' },
      {
        "create": {
          url: urlBase + "/Users",
          method: "POST"
        },
        "upsert": {
          url: urlBase + "/Users",
          method: "PUT"
        },
        "exists": {
          url: urlBase + "/Users/:id/exists",
          method: "GET"
        },
        "findById": {
          url: urlBase + "/Users/:id",
          method: "GET"
        },
        "find": {
          url: urlBase + "/Users",
          method: "GET",
          isArray: true
        },
        "findOne": {
          url: urlBase + "/Users/findOne",
          method: "GET"
        },
        "updateAll": {
          url: urlBase + "/Users/update",
          method: "POST"
        },
        "deleteById": {
          url: urlBase + "/Users/:id",
          method: "DELETE"
        },
        "count": {
          url: urlBase + "/Users/count",
          method: "GET"
        },
        "login": {
          url: urlBase + "/Users/login",
          method: "POST",
          params: {
            include: "user"
          },
          interceptor: {
            response: function(res) {
              var accessToken = res.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = res.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return res.resource;
            }
          }
        },
        "logout": {
          url: urlBase + "/Users/logout",
          method: "POST",
          interceptor: {
            response: function(res) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return res.resource;
            }
          }
        },
        "confirm": {
          url: urlBase + "/Users/confirm",
          method: "GET"
        },
        "resetPassword": {
          url: urlBase + "/Users/reset",
          method: "POST"
        },
        "getCurrent": {
          url: urlBase + "/Users" + "/:id",
          method: "GET",
          params: {
            id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(res) {
              LoopBackAuth.currentUserData = res.data;
              return res.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );

    R.getCachedCurrent = function() {
      var data = LoopBackAuth.currentUserData;
      return data ? new R(data) : null;
    };

    R.isAuthenticated = function() {
      return this.getCurrentId() != null;
    };

    R.getCurrentId = function() {
      return LoopBackAuth.currentUserId;
    };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }]);


  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
module
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
