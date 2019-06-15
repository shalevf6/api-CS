app.controller('registerController', function($scope, $http, $window){


    let request = {
        method: 'GET',
        url : 'http://localhost:3000/questions',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };
       $http(request)
        .then(function success(response){
                let ans = response.data;
                $scope.questions = ans;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            })
    let request1 = {
        method: 'GET',
        url : 'http://localhost:3000/poiCategory/:category',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };
    $http(request1)
        .then(function success(response){
                let ans = response.data;
                $scope.categories = ans;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            })
});
