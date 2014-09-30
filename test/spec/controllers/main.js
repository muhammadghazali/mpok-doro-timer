'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('mpokDoroTimerApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a workInProgress to maintain the pomodoro status', function() {
    expect(scope.workInProgress).toBeDefined();
  });

  it('should have a start method', function() {
    expect(scope.start).toBeDefined();
  });

  it('should have a stop method', function() {
    expect(scope.stop).toBeDefined();
  });
});