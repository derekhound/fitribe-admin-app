'use strict';

angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
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

  /*
  .config(['LoopBackResourceProvider', 'ConfigService', function(LoopBackResourceProvider, ConfigService) {
    LoopBackResourceProvider.setUrlBase(ConfigService.apiServer);
  }])
  */

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
          autologin: ['$q', '$timeout', '$state', 'User', function($q, $timeout, $state, User) {
            var s = 'root.signin';
            if (User.isAuthenticated()) {
              s = 'root.user';
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
