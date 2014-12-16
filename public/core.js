var myTodo = angular.module('myTodo', []);

function mainController($scope, $http){
    $scope.formData = {};
    
    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
        });
    
    $scope.remainingCount = 0;
    
    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.todos = data;
            });
    };
    
    $scope.deleteTodo = function(id){
        $http.delete('/api/todos/' + id)
            .success(function(data){
                $scope.todos = data;
                $scope.remainingCount += 1;
            });
    };
    

}