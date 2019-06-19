app
    .controller('welcomeController', function($scope, $http, $window, favoritePoiService){
        $scope.recommended = [];
        $scope.saved = [];
        $scope.hasFav = false;

        let headers = {
            "x-auth-token" : sessionStorage.getItem('token'),
            "Access-Control-Allow-Origin" : "*"
        };

        $http({
            method : 'GET',
            url : "http://localhost:3000/private/recommendedPoi",
            headers : headers
        })
            .then(function (res) {
                let initialTempRecommended = res.data;
                let secondTempRecommended = [];
                for (let i = 0; i < initialTempRecommended.length; i++) {
                    let color = favoritePoiService.isFavorite(initialTempRecommended[i]);
                    secondTempRecommended.push({name: initialTempRecommended[i].name, category: initialTempRecommended[i].category,
                        picture: initialTempRecommended[i].picture, description: initialTempRecommended[i].description,
                        rank: initialTempRecommended[i].rank, watched: initialTempRecommended[i].watched,
                        color: color});
                }
                $scope.recommended = secondTempRecommended;
                console.log(res.data)
            }, function (err) {
                console.log(err);
            });

        $http({
            method : "GET",
            url : 'http://localhost:3000/private/favoritePoi',
            headers: headers
        })
            .then(function (response) {
                let initialTempRecommended = response.data;
                let secondTempRecommended = [];
                for (let i = 0; i < initialTempRecommended.length; i++) {
                    let color = favoritePoiService.isFavorite(initialTempRecommended[i]);
                    secondTempRecommended.push({name: initialTempRecommended[i].name, category: initialTempRecommended[i].category,
                        picture: initialTempRecommended[i].picture, description: initialTempRecommended[i].description,
                        rank: initialTempRecommended[i].rank, watched: initialTempRecommended[i].watched,
                        color: color});
                }
                $scope.saved = secondTempRecommended;
                $scope.hasFav = true;
                $('#savedPois').addClass('alert-success');
                console.log(response.data)
            }, function (err) {
                console.log(err);
                $scope.hasFav = false;
                $('#savedPois').addClass('alert-danger');
            });

        $scope.changeFavoriteFromWelcomeController = function($event, item) {
            favoritePoiService.changeFavorite($event,item);
        };
    });