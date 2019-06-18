app.controller('entranceController', function($scope, $http, $window){


    let request = {
        method: 'GET',
        url : 'http://localhost:3000/randomPoi',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };
    $http(request)
        .then(function success(response){
                $scope.randPois = response.data;
            },
            function error(err){
                console.log("error! info: " + err.data);
            });


    $scope.poiClicked = function (event) {
        let name = event.currentTarget.id;
        $window.location.href = "#!/singlePoi/" + name;
    }
});