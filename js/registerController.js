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

    let request3 = {
        method: 'GET',
        url : 'http://localhost:3000/countries',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request3)
        .then(function success(response){
                let countries = response.data;
                $scope.countries = countries;
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
    $scope.master = {};

    $scope.update = function(user) {
        $scope.master = angular.copy(user);
    };
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
    $scope.update = function(user) {
        $scope.master = angular.copy(user);
        var count =0;
        console.log(count);
        for(category in user.categories[1]) {
            console.log(category);
            if(category[1]!=null)
                count++;
        }
        console.log(count);
        if(master.categories.length<2){
            alert("YOU MUST CHOOSE 2 OR MORE CATEGORIES")
            reset();
        }
        console.log(user.categories)
    };
});