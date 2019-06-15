app.controller('registerController', function($scope, $http, $window){


    let request = {
        method: 'GET',
        url : 'http://localhost:3000/categories',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request)
        .then(function success(response){
                let categories = response.data;
                $scope.categories = categories;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            })


    let request1 = {
        method: 'GET',
        url : 'http://localhost:3000/questions',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request1)
        .then(function success(response){
                let questions = response.data;
                $scope.questions = questions;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            })


    let request2 = {
        method: 'GET',
        url : 'http://localhost:3000/categories',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request2)
        .then(function success(response){
                let categories = response.data;
                $scope.categories = categories;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            })
});