describe("TodoListCtrl", function() {
  var scope = null;
  var ctrl = null;
  var location = null;
  var routeParams = null;
  var resource = null;

  var setupController = function(keywords) {
    inject(function($location, $routeParams, $rootScope, $resource, $controller) {
      scope = $rootScope.$new();
      location = $location;
      resource = $resource;
      routeParams = $routeParams
      routeParams.keywords = keywords;

      ctrl = $controller('TodoListCtrl', {$scope: scope, $location: location});
    });
  };

  beforeEach(module('todoApp'));
  beforeEach(function() {
    setupController();
  });

  it('defaults to no lists', function() {
    expect(scope.lists).toEqualData([]);
  });
});
