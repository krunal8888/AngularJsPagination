var app=angular.module('myApp', []);
app.controller('myController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.q = '';
    
    $scope.getData = function () {
      return $filter('filter')($scope.data, $scope.q)
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }    
    $http({
    	method: 'get',
		url: 'myjson.json',
		dataType: 'json',
		contentType: "application/json"
    }).then(function (response) {
        console.log(response, 'res');
        $scope.data = response.data;
    },function (error){
        console.log(error, 'can not get data.');
    });
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
