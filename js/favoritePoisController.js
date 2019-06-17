app
    .controller('favoritePoisController', ['$scope','favoritePoiService',  function ( $scope, favoritePoiService) {

        $scope.favoritePoiService = favoritePoiService;

        $scope.intro = "undef";

        $scope.sortableArray = favoritePoiService.favorites;

        $scope.uploadToServer = function() { // TODO : CHANGE TO ACTUAL HTTP REQUEST
            $http({
                method : "GET",
                url : 'http://localhost:3000/private/favoritePoi',
                headers: headers,
                data: getSortedElements()
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
        };

        let setIntro = function() {
            if (favoritePoiService.containsFavorites())
                $scope.intro = "Here are your favorite points of interest";
            else
                $scope.intro = "Looks like you don't have any favorite points of interest yet..";
        };

        $scope.getSortedElements = function() {
            let listElements = $('#sortableArray').children();
            let listValues = [];
            let i = 1;
            while (i <= listElements.length - 2) {
                let element = $('#sortableItem-' + i).children()[0];
                let picture = element.children()[0].children[0].attr('src');
                let name = element.children()[0].children[1].innerHTML;
                let category = element.children()[1].innerHTML;
                let rank = element.children()[2].innerHTML;
                let watched = element.children()[3].innerHTML; // TODO : ARRANGE INPUT FROM ORDER
                listValues.push({favorite_poi: [{username: rUsername, poi: name, personalOrder: i, time: category: category, picture: picture, description: description,
                    rank: rank, watched: watched}]});
                i++;
            }
            console.log(listValues);
        };

        let sortEventHandler = function(event, ui) {
            console.log("New Sort Order!");
        };

        $('#sortableArray').on("sortchange", sortEventHandler());
    }]);
