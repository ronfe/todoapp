var todoApp = angular.module('todoApp', []);

todoApp.controller('MainCtrl', function($scope, $http){
  $scope.formData = {};
  $scope.remainingCount = 0;

  var getAllTodo = function(){
    $http.get('/api/todos')
    .success(function(data){
      $scope.todos = data;
    });
  };

  $scope.createTodo = function(){
    $http.post('/api/todos', $scope.formData)
    .success(function(data){
      $scope.formData = {};
      getAllTodo();
    });
  };

  $scope.deleteTodo = function(todo){
    $http.delete('/api/todos/' + todo._id)
    .success(function(data){
      $scope.remainingCount += 1;
      getAllTodo();
    });
  };
  //
  getAllTodo();

});
