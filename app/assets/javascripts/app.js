var todoApp = angular.module('todoApp', [
    'ngRoute',
    'ngResource',
    'todoControllers',
    'templates',
    'angular-flash.service',
    'angular-flash.flash-alert-directive'
]);

todoApp.config(['$routeProvider', 'flashProvider',
    function($routeProvider, flashProvider) {
      flashProvider.errorClassnames.push("alert-danger");
      flashProvider.warnClassnames.push("alert-warning");
      flashProvider.infoClassnames.push("alert-info");
      flashProvider.successClassnames.push("alert-success");

      $routeProvider.
        when('/', {
          templateUrl: "index.html",
          controller: 'TodoListsCtrl'
        }).
        when('/lists/new', {
          templateUrl: "form.html",
          controller: 'TodoListCtrl'
        }).
        when('/lists/:listId', {
          templateUrl: "show.html",
          controller: 'TodoListCtrl'
        }).
        when('/lists/:listId/edit', {
          templateUrl: "form.html",
          controller: 'TodoListCtrl'
        });
    }]);

var todoControllers = angular.module('todoControllers', []);
