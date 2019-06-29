app
    .controller('favoritePoisController', ['$scope','favoritePoiService', 'mainPoiService', 'header', '$http', '$rootScope',
        function ( $scope, favoritePoiService, mainPoiService, header, $http, $rootScope) {

            $scope.intro_head = "undef";
            $scope.intro_content = "undef";
            $scope.had_favorites = false;

            $scope.http = $http;

            $scope.rUsername = sessionStorage.getItem('username');

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

                        let favCount = $('#fav_count');
                        if ($rootScope.favorite_count > 0) {
                            favCount.removeClass('badge-success');
                            favCount.addClass('badge-secondary');
                        }
                        if ($rootScope.favorite_count < 0) {
                            favCount.removeClass('badge-danger');
                            favCount.addClass('badge-secondary');
                        }
                        $rootScope.favorite_count = 0;

                        $('#upload_success_modal').modal('show');
                    }, function (err) {
                        console.log(err);
                        console.log("Failed to update favorite POIs in the database");
                        $('#upload_failure_modal').modal('show');
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

            $scope.sortByCategory = function() {
                $scope.sortableArray.sort((a,b) =>  (a.category < b.category) ? -1 : ((b.category < a.category) ? 1 : 0));
                favoritePoiService.setFavorites($scope.getSortedElements());
            };

            $scope.sortByRank = function() {
                $scope.sortableArray.sort((a,b) =>  (a.rank < b.rank) ? 1 : ((b.rank < a.rank) ? -1 : 0));
                favoritePoiService.setFavorites($scope.getSortedElements());
            };

            /*******************      GETTING FAVORITE POIs BY ORDER     *****************************/

            let tempFavorites = favoritePoiService.getFavorites();
            let tempPOINames = [];
            angular.forEach(tempFavorites, function(favorite) {
                tempPOINames.push(favorite.poi);
            });

            let tempPOIs = mainPoiService.getPois(tempPOINames);

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

            if ($scope.sortableArray.length > 0) {
                $scope.intro_head = "Here are your favorite points of interest!";
                $scope.intro_content = "Feel free to drag them and change their order";
                $scope.has_favorites = true;
            }
            else {
                $scope.intro_head = "Looks like you don't have any favorite points of interest yet..";
                $scope.intro_content = "Go ahead and add some!";
            }
        }]);
