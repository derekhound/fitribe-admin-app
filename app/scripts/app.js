'use strict';

angular
  .module('fitribeAdminAppApp', [
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
            templateUrl: 'views/account/client/client.html'
          }
        }
      })
      .state('root.client.item', {
        url: '/:id',
        views: {
          'container@': {
            templateUrl: 'views/account/client/client.item.html'
          }
        }
      })

      ;

  });
