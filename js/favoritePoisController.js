app
    .controller('favoritePoisController', ['$scope','favoritePoiService',  function ( $scope, favoritePoiService) {

        $scope.favoritePoiService = favoritePoiService;

        $scope.intro = "undef";

        $scope.sortableArray = favoritePoiService.favorites;

        $scope.changeFavoriteFromFavoriteController = function(event, item) {
            $scope.favoritePoiService.changeFavorite(event.currentTarget,item);
        };

        $scope.isFavoriteFromFavoriteController = function(poi) {
            return $scope.favoritePoiService.isFavorite(poi);
        };

        // TODO : CHANGE TO ACTUAL HTTP REQUEST
        // $scope.uploadToServer = function() {
        //     $http({
        //         method : "GET",
        //         url : 'http://localhost:3000/private/favoritePoi',
        //         headers: headers,
        //         data: getSortedElements()
        //     })
        //         .then(function (response) {
        //             let pois = response.data;
        //             $scope.saved = pois;
        //             $scope.intro = "Here are your saved points of interest";
        //
        //             console.log(response.data)
        //         }, function (err) {
        //             console.log(err);
        //             if (err.data === "No favorite POI found"){
        //                 $scope.intro = "Looks like you don't have any saved points yet..";
        //             }
        //         });

            $scope.getSortedElements = function() {
                let listElements = $('#sortableArray').children();
                let listValues = [];
                let i = 1;
                while (i <= listElements.length - 2) {
                    let element = $('#sortableItem-' + i).children()[0];
                    let name = element.children()[0].children[1].innerHTML;
                    let time;
                    if ($scope.favoritePoiService.isFavorite({name: name})) {

                    }

                    // TODO : CHECK IF TIME ALREADY EXIST. IF SO, GET FROM ARRAY
                    listValues.push({username: rUsername, poi: name, personalOrder: i, time: i});
                    i++;
                }
                console.log(listValues);
            };

            if ($scope.sortableArray.length > 0)
                $scope.intro = "Here are your favorite points of interest";
            else
                $scope.intro = "Looks like you don't have any favorite points of interest yet..";

    }]);
