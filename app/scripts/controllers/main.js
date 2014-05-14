'use strict';

angular.module('mpokDoroTimerApp')
  .controller('MainCtrl', ['$scope', '$interval', '$window',
    function($scope, $interval, $window) {

      // 25 minutes is equal to 1500 seconds
      // 25 minutes is equal to 1500 * 1000 milliseconds
      var timebox = 1500 * 1000;

      var timer;

      $scope.pomodoro = 0;

      $scope.start = function() {
        timer = $interval(function() {
          var START = $scope.pomodoro !== 0;
          // Every four pomodorO take a longer break
          var FOURTH_POMODORO = $scope.pomodoro % 4 === 0;

          if (START && FOURTH_POMODORO) {
            $window.alert('Come on take a long break for 20 minutes!');
          } else {
            $window.alert('Come on take a short break for 5 minutes!');
          }

          // record the pomodoro
          $scope.pomodoro += 1;

          // Cancels a task associated with the `timer`
          $interval.cancel(timer);
        }, timebox);
      };
    }
  ]);