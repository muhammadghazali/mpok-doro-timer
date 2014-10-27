'use strict';

angular.module('mpokDoroTimerApp')
  .controller('MainCtrl', ['$scope', '$interval', '$window',
    'localStorageService', 'hotkeys',
    function($scope, $interval, $window, localStorageService, hotkeys) {

      // 25 minutes is equal to 1500 seconds
      // 25 minutes is equal to 1500 * 1000 milliseconds
      var timebox = 1500 * 1000,
        timer = {};

      // initialization
      (function(scope) {
        scope.workInProgress = false;

        var pomodoro = parseInt(localStorageService.get('pomodoro'), 10);

        if (isNaN(pomodoro)) {
          scope.pomodoro = 0;
        } else if (pomodoro > 0) {
          scope.pomodoro = pomodoro;
        }

        // bind a keyboard shortcut
        hotkeys.bindTo(scope)
          .add({
            combo: 'g s',
            description: 'Start pomodoro',
            callback: function() {
              scope.start();
            }
          })
          .add({
            combo: 'g b',
            description: 'Stop pomodoro',
            callback: function() {
              scope.stop();
            }
          })
          .add({
            combo: 'g r',
            description: 'Stop pomodoro',
            callback: function() {
              scope.reset();
            }
          });
      })($scope);

      /**
       * Start pomodoro. When we hit the start button, it will hide the start
       * button and show the stop button.
       * Once the pomodoro started we track the timebox and will notify the user
       * when we hit 25 minutes.
       */
      $scope.start = function() {
        console.log('start');
        $scope.workInProgress = true;

        timer = $interval(function() {
          // record the pomodoro
          $scope.pomodoro += 1;

          localStorageService.set('pomodoro', $scope.pomodoro.toString());

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

      /**
       * Reset the pomodoro count
       */
      $scope.reset = function() {
        localStorageService.clearAll();
        $scope.pomodoro = 0;
      };
    }
  ]);