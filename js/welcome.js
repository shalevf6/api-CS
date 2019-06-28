app
    .controller('welcomeController', function($scope, $http, $window, favoritePoiService, pois){
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
            url : 'http://localhost:3000/private/lastSavedPoi',
            headers: headers
        })
            .then(function (response) {

                let initialTempLastSaved = response.data;

                let tempPOINames = [];
                angular.forEach(initialTempLastSaved, function(favorite) {
                    tempPOINames.push(favorite.poi);
                });

                let tempPOIs = pois.getPois(tempPOINames);

                let secondTempLastSaved = [];
                for(let i = 0; i < tempPOIs.length; i++) {
                    let color = favoritePoiService.isFavorite(tempPOIs[i]);
                    secondTempLastSaved.push({name: tempPOIs[i].name, category: tempPOIs[i].category, picture: tempPOIs[i].picture,
                        description: tempPOIs[i].description, rank: tempPOIs[i].rank, watched: tempPOIs[i].watched,
                        color: color});
                }

                $scope.saved = secondTempLastSaved;
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