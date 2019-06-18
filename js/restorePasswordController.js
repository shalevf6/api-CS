app.controller('restorePasswordController', function($scope, $http, $window){


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



});