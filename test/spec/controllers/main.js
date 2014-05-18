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

  it('should attach a pomodoro to the scope', function() {
    expect(scope.pomodoro).toBeDefined();
    expect(scope.pomodoro).toBe(0);
  });

  it('should have a start method', function() {
    expect(scope.start).toBeDefined();
  });
});