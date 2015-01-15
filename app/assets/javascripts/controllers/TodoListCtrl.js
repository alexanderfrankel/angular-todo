todoControllers.controller("TodoListCtrl", ['$scope', '$resource', '$routeParams', '$location', 'flash',
    function($scope, $resource, $routeParams, $location, flash) {
      var List = $resource('/lists/:listId', {listId: "@id", format: 'json'},
        {
          'save': {method: 'PUT'},
          'create': {method: 'POST'}
        });

      if($routeParams.listId) {
        List.get({listId: $routeParams.listId},
          function success(response) {
            $scope.list = response;
          },
          function err() {
            $scope.list = null;
            flash.error = "There is no list with the id:" + $routeParams.listId;
          });
      } else {
        $scope.list = {};
      }

      $scope.back = function() {
        $location.path("/");
      }

      $scope.edit = function() {
        $location.path("/lists/" + $scope.list.id + "/edit");
      }

      $scope.cancel = function() {
        if($scope.list.id) {
          $location.path("/lists/" + $scope.list.id);
        } else {
          $location.path("/");
        }
      }

      $scope.save = function() {
        var onError = function(_httpResponse) { flash.error = "something went wrong"; }
        if($scope.list.id) {
          $scope.list.$save(
              function() {
                $location.path("/lists/" + $scope.list.id);
              }, onError);
        } else {
          List.create($scope.list,
              function(newList) {
                $location.path("/lists/" + newList.id);
              }, onError);
        }
      }

      $scope.delete = function() {
        $scope.list.$delete();
        $scope.back();
      };

    }
]);
