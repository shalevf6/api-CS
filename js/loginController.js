app.controller('loginController', function($scope, $http, $window, $rootScope, pois, favoritePoiService){
    var ctrl = $scope;
    ctrl.login = function(){
        let cred = {
            username : $scope.username,
            password : $scope.password
        };
        let request = {
            method: 'POST',
            url : 'http://localhost:3000/login',
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            },
            data : cred

        };
        // ctrl.password = request.headers
        $http(request)
            .then(function success(response){
                    console.log('logged in!');
                    console.log('token: ' + response);

                    sessionStorage.setItem('token', response.data);
                    sessionStorage.setItem('username', ctrl.username);

                    pois.setPOIs($http);
                    favoritePoiService.initFavoritePOIs($http);

                    $rootScope.rUsername = $scope.username;
                    $rootScope.rToken = response.data;
                    $window.location.href = "#!/welcome"
                },
                function error(err){
                    console.log("error! info: " + err);
                    alert(JSON.stringify(err))
                })
    }

});