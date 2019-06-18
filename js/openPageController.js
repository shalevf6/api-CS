app.controller('mainPageController', function($scope, $http, $window){


        let request = {
            method: 'GET',
            url : 'http://localhost:3000/randomPoi',
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        };
        // ctrl.password = request.headers
        $http(request)
            .then(function success(response){
                    console.log('Entered Cite recorded!');

                    let ans = response.data;
                    $scope.randoms = ans;
                },
                function error(err){
                    console.log("error! info: " + err);
                    $scope.username = err
                })
});