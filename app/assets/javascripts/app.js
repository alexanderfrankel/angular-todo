var todoApp = angular.module('todoApp', [
    'ngRoute',
    'ngResource',
    'todoControllers',
    'templates'
]);

todoApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: "index.html",
          controller: 'ListCtrl'
        });
    }]);

var todoControllers = angular.module('todoControllers', []);
