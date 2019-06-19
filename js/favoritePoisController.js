app
    .controller('favoritePoisController', ['$scope','favoritePoiService', 'pois', '$rootScope',
        function ( $scope, favoritePoiService, pois, $rootScope) {

            $scope.intro = "undef";

            let tempFavorites = favoritePoiService.favorites;
            let tempPOINames = [];
            angular.forEach(tempFavorites, function(favorite) {
                tempPOINames.push(favorite.poi);
            });

            let tempPOIs = pois.getPois(tempPOINames);

            let tempSortableArray = [];
            for(let i = 0; i < tempPOIs.length; i++) {
                let personalOrder;
                let time;
                for (let j = 0; j < tempFavorites.length; j++) {
                    if (tempPOIs[i].name === tempFavorites[j].poi) {
                        personalOrder = tempFavorites[j].personalOrder;
                        time = tempFavorites[j].time;
                        break;
                    }
                }
                tempSortableArray.push({name: tempPOIs[i].name, category: tempPOIs[i].category, picture: tempPOIs[i].picture,
                    description: tempPOIs[i].description, rank: tempPOIs[i].rank, watched: tempPOIs[i].watched,
                    personalOrder: personalOrder, time: time});
            }

            tempSortableArray.sort((a,b) =>  (a.personalOrder < b.personalOrder) ? -1 : ((b.personalOrder < a.personalOrder) ? 1 : 0));

            $scope.sortableArray = tempSortableArray;

            $scope.changeFavoriteFromFavoriteController = function($event, item) {
                favoritePoiService.changeFavorite($event,item);
            };

            $scope.dragControlListeners = {
                orderChanged: function(event) {
                    favoritePoiService.setFavorites($scope.getSortedElements());
                }};

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
                let listValues = [];
                let i = 1;
                while (i - 1 < $scope.sortableArray.length) {
                    let name = $scope.sortableArray[i-1].name;
                    let time = favoritePoiService.getPOITime(name);
                    listValues.push({username: $rootScope.rUsername, poi: name, personalOrder: i, time: time});
                    i++;
                }
                console.log(listValues);
                return listValues;
            };

            if ($scope.sortableArray.length > 0)
                $scope.intro = "Here are your favorite points of interest";
            else
                $scope.intro = "Looks like you don't have any favorite points of interest yet..";



        }]);
