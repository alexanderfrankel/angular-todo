describe("TodoListCtrl", function() {
  var scope = null;
  var ctrl = null;
  var location = null;
  var routeParams = null;
  var resource = null;
  var httpBackend = null;

  var setupController = function(keywords, results) {
    inject(function($location, $routeParams, $rootScope, $resource, $httpBackend, $controller) {
      scope = $rootScope.$new();
      location = $location;
      resource = $resource;
      routeParams = $routeParams
      routeParams.keywords = keywords;
      httpBackend = $httpBackend;

      if(results) {
        var request = new RegExp("\/lists.*keywords=" + keywords)
        httpBackend.expectGET(request).respond(results);
      };

      ctrl = $controller('TodoListCtrl', {$scope: scope, $location: location});
    });
  };

  beforeEach(module('todoApp'));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('controller initialization', function() {
    describe('when no keywords present', function() {
      beforeEach(function() { setupController(); });

      it('defaults to no lists', function() {
        expect(scope.lists).toEqualData([]);
      });
    });

    describe('with keywords', function() {
      var lists = [
        { id: 1, name: 'cool' },
        { id: 2, name: 'cool 2' },
        { id: 3, name: 'not' }
      ]

      beforeEach(function() {
        setupController('cool', lists);
        httpBackend.flush();
      });

      it('calls the backend', function() {
        expect(scope.lists).toEqualData(lists);
      });
    });
  });

  describe('search()', function() {
    beforeEach(function() {
      setupController();
    });

    it('redirects to itself with a keyword params', function() {
      scope.search('foo');
      expect(location.path()).toBe('/');
      expect(location.search()).toEqualData({keywords: 'foo'});
    });
  });

});
