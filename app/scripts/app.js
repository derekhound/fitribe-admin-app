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
  ])

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

  .config(function ($stateProvider, $urlRouterProvider) {

    // for any unmatched url, redirect it
    //$urlRouterProvider.when('', '/');
    //$urlRouterProvider.otherwise('/');


    // setup states
    $stateProvider

      // root layout
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'views/header.html'
          },
          'footer': {
            templateUrl: 'views/footer.html'
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
            templateUrl: 'views/account/user/user.html',
            controller: 'UserCtrl'
          }
        }
      })
      .state('root.user.item', {
        url: '/:userId',
        views: {
          'container@': {
            templateUrl: 'views/account/user/user-item.html',
            controller: 'UserItemCtrl'
          }
        }
      })

      ;

  });
