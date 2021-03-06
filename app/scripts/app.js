'use strict';

angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngFileUpload',     // ng-file-upload
    'ui.router',        // angular-ui-router
    'ui.bootstrap',     // angular-bootstrap
    'ngStorage',
    'lbServices'        // loopback-service
  ])

  /*
  .config(['$resourceProvider', function($resourceProvider) {
    // set default REST API
    $resourceProvider.defaults.actions = {
      query:  {method: 'GET', isArray: true},
      get:    {method: 'GET'},
      save:   {method: 'POST'},
      update: {method: 'PUT'},
      delete: {method: 'DELETE'}
    };

    // strip trailing slashes and set the url
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }])
  */

  .config(['LoopBackResourceProvider', 'API_SERVER', function(LoopBackResourceProvider, API_SERVER) {
    LoopBackResourceProvider.setUrlBase(API_SERVER);
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .config(function ($stateProvider, $urlRouterProvider) {

    // for any unmatched url, redirect it
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');

    // setup states
    $stateProvider

      // home
      .state('portal', {
        url: '/',
        resolve: {
          autologin: ['$q', '$timeout', '$state', 'MyUser', function($q, $timeout, $state, MyUser) {
            var s = 'root.signin';
            if (MyUser.isAuthenticated()) {
              s = 'root.home.feed';
            }
            $timeout(function() {
              $state.go(s);
            });
            return $q.reject();
          }]
        }
      })

      // root
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'views/header.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'views/footer.html'
          }
        }
      })

      // auth
      .state('root.signin', {
        url: '/signin',
        views: {
          'container@': {
            templateUrl: 'views/auth/signin.html',
            controller: 'AuthSigninCtrl'
          }
        }
      })
      .state('root.signup', {
        url: '/signup',
        views: {
          'container@': {
            templateUrl: 'views/auth/signup.html',
            controller: 'AuthSignupCtrl'
          }
        }
      })

      // setting
      .state('root.settings', {
        url: '/settings',
        views: {
          'container@': {
            templateUrl: 'views/settings/index.html',
            controller: 'SettingsIndexCtrl'
          }
        }
      })
      .state('root.settings.profile', {
        url: '/profile',
        views: {
          'middle': {
            templateUrl: 'views/settings/profile/index.html',
            controller: 'SettingsProfileIndexCtrl'
          }
        }
      })
     .state('root.settings.account', {
        url: '/account',
        views: {
          'middle': {
            templateUrl: 'views/settings/account/index.html',
            controller: 'SettingsAccountIndexCtrl'
          }
        }
      })

      // home
      .state('root.home', {
        url: '/home',
        views: {
          'container@': {
            templateUrl: 'views/home/index.html',
            controller: 'HomeIndexCtrl'
          }
        }
      })
      .state('root.home.feed', {
        url: '/feed',
        views: {
          'middle': {
            templateUrl: 'views/home/feed/index.html',
            controller: 'HomeFeedIndexCtrl'
          }
        }
      })




      // client
      .state('root.client', {
        url: '/client',
        views: {
          'container@': {
            templateUrl: 'views/account/client/client.html',
            controller: 'ClientCtrl'
          }
        }
      })
      .state('root.client.item', {
        url: '/:clientId',
        views: {
          'container@': {
            templateUrl: 'views/account/client/client-item.html',
            controller: 'ClientItemCtrl'
          }
        }
      })

      // user
      .state('root.user', {
        url: '/user',
        views: {
          'container@': {
            templateUrl: 'views/system/user/index.html',
            controller: 'UserIndexCtrl'
          }
        }
      })
      .state('root.user.item', {
        url: '/:id',
        views: {
          'container@': {
            templateUrl: 'views/system/user/item.html',
            controller: 'UserItemCtrl'
          }
        }
      })

      ;

  });
