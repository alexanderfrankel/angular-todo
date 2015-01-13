todoControllers.controller("TodoListCtrl", ['$scope', '$routeParams', '$location', '$resource',
    function($scope, $routeParams, $location, $resource) {
      $scope.search = function(keywords) {
       $location.path("/").search('keywords', keywords);
      }

      var List = $resource('/lists/:listId', {listId: "@id", format: 'json'} );

      if ($routeParams.keywords) {
        List.query({keywords: $routeParams.keywords}, function(response) {
          $scope.lists = response;
        });
      } else {
        $scope.lists = [];
      }
}]);
