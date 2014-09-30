'use strict';

angular
  .module('mpokDoroTimerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule'
  ])
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('mpok-doro-timer');
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });