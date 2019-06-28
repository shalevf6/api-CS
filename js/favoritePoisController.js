app
    .controller('favoritePoisController', ['$scope','favoritePoiService', 'pois', 'header', '$http',
        function ( $scope, favoritePoiService, pois, header, $http) {

            $scope.intro = "undef";

            $scope.http = $http;

            $scope.changeFavoriteFromFavoriteController = function($event, item) {
                favoritePoiService.changeFavorite($event,item);
            };

            $scope.dragControlListeners = {
                orderChanged: function(event) {
                    favoritePoiService.setFavorites($scope.getSortedElements());
                }};

            $scope.uploadToServer = function() {
                $http({
                    method: "PUT",
                    url: 'http://localhost:3000/private/saveFavorites',
                    headers: {'x-auth-token': sessionStorage.getItem('token')},
                    data: {'favorite_poi': favoritePoiService.getFavorites()}
                })
                    .then(function (response) {
                        console.log(response.data);
                        console.log("Updated favorite POIs in the database");
                    }, function (err) {
                        console.log(err);
                        console.log("Failed to update favorite POIs in the database");
                    });
            };

            $scope.getSortedElements = function() {
                let listValues = [];
                let i = 1;
                while (i - 1 < $scope.sortableArray.length) {
                    let name = $scope.sortableArray[i-1].name;
                    let time = favoritePoiService.getPOITime(name);
                    listValues.push({username: sessionStorage.getItem('username'), poi: name, personalOrder: i, time: time});
                    i++;
                }
                console.log(listValues);
                return listValues;
            };

            /*******************      GETTING FAVORITE POIs BY ORDER     *****************************/

            let tempFavorites = favoritePoiService.getFavorites();
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
                    color: tempPOIs[i].color, personalOrder: personalOrder, time: time});
            }

            tempSortableArray.sort((a,b) =>  (a.personalOrder < b.personalOrder) ? -1 : ((b.personalOrder < a.personalOrder) ? 1 : 0));

            $scope.sortableArray = tempSortableArray;

            /*******************      DEFINING THE INTRO HEADLINE     *****************************/

            if ($scope.sortableArray.length > 0)
                $scope.intro = "Here are your favorite points of interest";
            else
                $scope.intro = "Looks like you don't have any favorite points of interest yet..";
        }]);
