'use strict';

angular.module('mpokDoroTimerApp')
  .controller('MainCtrl', ['$scope', '$interval', '$window',
    function($scope, $interval, $window) {

      // 25 minutes is equal to 1500 seconds
      // 25 minutes is equal to 1500 * 1000 milliseconds
      var timebox = 1500 * 1000;

      var timer;

      $scope.pomodoro = 0;
      $scope.workInProgress = false;

      /**
       * Start pomodoro. When we hit the start button, it will hide the start
       * button and show the stop button.
       * Once the pomodoro started we track the timebox and will notify the user
       * when we hit 25 minutes.
       */
      $scope.start = function() {
        $scope.workInProgress = true;

        timer = $interval(function() {
          // record the pomodoro
          $scope.pomodoro += 1;

          var START = $scope.pomodoro !== 0;
          // Every four pomodoro take a longer break
          var FOURTH_POMODORO = $scope.pomodoro % 4 === 0;

          if (START && FOURTH_POMODORO) {
            $window.alert('Come on take a long break for 20 minutes!');
          } else {
            $window.alert('Come on take a short break for 5 minutes!');
          }

          // Cancels a task associated with the `timer`
          $interval.cancel(timer);

          $scope.workInProgress = false;
        }, timebox);
      };

      /**
       * Stop pomodoro. When we hit the stop button, it will hide the stop
       * button and show the start button.
       */
      $scope.stop = function() {
        $interval.cancel(timer);
        $scope.workInProgress = false;
      };
    }
  ]);