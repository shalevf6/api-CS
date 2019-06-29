app.controller('loginController', function($scope, $http, $window, $rootScope, header, mainPoiService, favoritePoiService){
    $scope.forgot = false;
    $scope.showAnswer = false;
    $scope.forgotUsername = "";
    $scope.forgotQuestions = [];
    $scope.forgotAnswer = "";

    $scope.login = function(){
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
                    sessionStorage.setItem('username', $scope.username);

                    mainPoiService.setPOIs($http);
                    favoritePoiService.initFavoritePOIs($http);

                    $rootScope.rUsername = $scope.username;
                    $rootScope.rToken = response.data;
                    $window.location.href = "#!/welcome"
                },
                function error(err){
                    console.log("error! info: " + err);
                    alert(JSON.stringify(err));
                })
    };


    $scope.setForgot = function (update) {
        $scope.forgot = update;
        $scope.showAnswer = $scope.forgotQuestions.length;
        if (update){
            $scope.forgotUsername = $scope.username;
        }
    };

    $scope.getQuest = function () {
        $http({
            method: "GET",
            url: "http://localhost:3000/questions",
            headers: header.header
        })
            .then(function (response) {
                $scope.forgotQuestions = response.data;
                $scope.showAnswer = true;
            }, function (err) {
                alert('Oh no...\n' + 'Seems like ' + err.data.toString());
            })
    };

    $scope.resetPass = function(){
        let quest = $('#forgotQuestions').val();
        let answer = $scope.forgotAnswer;

        $http({
            method: "POST",
            url: "http://localhost:3000/restorePassword",
            headers: header.header,
            data: {
                username: $scope.forgotUsername,
                question: quest,
                answer: answer
            }
        })
            .then(function (response) {
                alert('Your password is:\n' + "'" + response.data[0].password + "'");
                $scope.forgotAnswer = "";
                $scope.setForgot(false);
            }, function (err) {
                alert('Oh no...\n' + 'Seems like ' + err.data.toString());
            })
    };


});