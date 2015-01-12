var lists = [
  { name: "cool" },
  { name: "cool 2" },
  { name: "cool 3" },
  { name: "not" }
];

todoControllers.controller("TodoListCtrl", ['$scope', '$routeParams', '$location', '$resource',
    function($scope, $routeParams, $location, $resource) {
      $scope.search = function(keywords) {
       $location.path("/").search('keywords', keywords);
    }

    if ($routeParams.keywords) {
      keywords = $routeParams.keywords.toLowerCase();
      $scope.lists = lists.filter(function(list) {
        return list.name.indexOf(keywords) != -1;
      });
    } else {
      $scope.lists = [];
    }
}]);
