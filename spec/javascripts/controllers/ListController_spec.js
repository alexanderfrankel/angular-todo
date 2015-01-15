describe("TodoListCtrl", function() {
  var scope = null;
  var ctrl = null;
  var routeParams = null;
  var httpBackend = null;
  var location = null;
  var flash = null;
  var listId = 42;

  var fakeList = {
    id: listId,
    name: 'fakeList'
  }

  var setupController = function(listExists, listId) {
    if(typeof listExists === 'undefined') { listExists = true; }
    if(typeof listId === 'undefined') { listId = 42; }
    inject(function($location, $routeParams, $rootScope, $httpBackend, $controller, _flash_) {
      scope = $rootScope.$new();
      location = $location;
      httpBackend = $httpBackend;
      routeParams = $routeParams;
      if(listId) { routeParams.listId = listId; }
      flash = _flash_;

      if(listId) {
        var request = new RegExp("\/lists/" + listId);
        if(listExists) {
          var results = [200, fakeList];
        } else {
          var results = [404];
        }
        httpBackend.expectGET(request).respond(results[0],results[1]);
      }

      ctrl = $controller('TodoListCtrl', {$scope: scope});
    });
  };

  beforeEach(module('todoApp'));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('controller initialization', function() {
    describe('list found', function() {
      beforeEach(function() { setupController(); });
      it('loads the list', function() {
        httpBackend.flush();
        expect(scope.list).toEqualData(fakeList);
      });
    });

    describe('list not found', function() {
      beforeEach(function() { setupController(false); });
      it('loads nothing', function() {
         httpBackend.flush();
         expect(scope.list).toBe(null);
         expect(flash.error).toBe("There is no list with the id:" + listId);
      });
    });
  });

  describe('create', function() {
    var newList = { id: 42, name: 'cool' }
    beforeEach(function() {
      setupController(false, false)
      var request = new RegExp("\/lists");
      httpBackend.expectPOST(request).respond(201, newList);
    });

    it('posts to the backend', function() {
      scope.list.name = newList.name;
      scope.save();
      httpBackend.flush();
      expect(location.path()).toBe("/lists/" + newList.id);
    });
  });

  describe('update', function() {
    var updatedList = { name: "updated" }
    beforeEach(function() {
      setupController();
      httpBackend.flush();
      var request = new RegExp("\/lists");
      httpBackend.expectPUT(request).respond(204);
    });

    it('posts to the backend', function() {
      scope.list.name = updatedList.name;
      scope.save();
      httpBackend.flush();
      expect(location.path()).toBe("/lists/" + scope.list.id);
    });
  });

  describe('delete', function() {
    beforeEach(function() {
      setupController();
      httpBackend.flush();
      var request = new RegExp("\/lists/" + scope.list.id);
      httpBackend.expectDELETE(request).respond(204);
    });

    it('posts to the server', function() {
      scope.delete();
      httpBackend.flush();
      expect(location.path()).toBe("/");
    });
  });
});
