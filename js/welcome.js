app
    .controller('welcomeController', function($scope, $http, $window, favoritePoiService){
            $scope.recommended = [];
            $scope.saved = [];
            $scope.intro = "undef";

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
                    $scope.intro = "Here are your saved points of interest";

                    console.log(response.data)
                }, function (err) {
                    console.log(err);
                    if (err.data === "No favorite POI found"){
                        $scope.intro = "Looks like you don't have any saved points yet..";
                    }
                });

            $scope.changeFavorite = function ($event, item){
                let color = $event.currentTarget.style.color;
                let id = $event.currentTarget.id;
                if (color === 'darkorange') {
                    $("#" + id).css('color', 'black');
                    favoritePoiService.removeFavorite(item);
                }
                else {
                    $("#" + id).css('color', 'darkorange');
                    favoritePoiService.addFavorite(item);
                }
            };

            $scope.expandPoi = function () {
                $window.openWindow($window.location)
            }
        }
    );