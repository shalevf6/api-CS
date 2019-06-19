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
                $scope.recommended = res.data;
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
                let pois = response.data;
                $scope.saved = pois;
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

        $scope.setFavoriteFromWelcomeController = function(poi, index) {
            let color = favoritePoiService.isFavorite(poi);
            let jqueryElement = $('#fav_star_recommended-' + index);
            jqueryElement.css('color', color);
        };
    });