app
    .controller('welcomeController', function($scope, $http, $window){
        $scope.recomended = [];
        $scope.saved = [];

        let headers = {
            "x-auth-token" : JSON.parse(sessionStorage.getItem("curUser")).token,
            "Access-Control-Allow-Origin" : "*"
        };

        $http({
            method : 'GET',
            url : "http://localhost:3000/private/recommendedPoi",
            headers : headers
        })
            .then(function (res) {
                $scope.recomended = res.data;
                console.log(res.data)
            }, function (err) {
                console.log(err);
            });




        $scope.expandPoi = function () {
            $window.openWindow($window.location)
        }
        }
    );