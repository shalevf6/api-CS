app
    .controller('poisController', function ($scope, $http, $window, $rootScope, header, search, favoritePoiService) {

        $scope.results = {};
        $scope.size = -1;
        $scope.fetched = false;
        let ser = search.getVal();
        if (ser){
            $scope.searchVal = ser;
        }
        else {
            $scope.searchVal = "";
        }

        $http({
            method: "GET",
            url: "http://localhost:3000/poi/",
            headers: header.header
        })
            .then(function (res) {
               console.log(res);
               let firstTempPOIArr = res.data.sort((a,b) => (a.rank<b.rank) ? 1 : (a.rank>b.rank ? -1 : 0));
               let tempPOIArr = [];
               for (let i = 0; i < firstTempPOIArr.length; i++) {
                   let color = favoritePoiService.isFavorite(firstTempPOIArr[i]);
                   tempPOIArr.push({name: firstTempPOIArr[i].name, category: firstTempPOIArr[i].category, picture: firstTempPOIArr[i].picture,
                       description: firstTempPOIArr[i].description, rank: firstTempPOIArr[i].rank, watched: firstTempPOIArr[i].watched,
                       color: color});
               }
               $scope.allPoi = tempPOIArr;
               $http({
                    method: "GET",
                    url: "http://localhost:3000/categories",
                    headers: header.header
               })
                    .then(function (res) {
                        // console.log(res);
                        let cat = res.data;
                        cat.unshift({name:"All"});
                        $scope.categories = cat;
                        $scope.selection = cat[0].name;
                        $scope.fetched = true;
                        $scope.updateResults();
                    }, function (err) {
                        console.log(err)
                    });

            }, function (err) {
                console.log(err)
            });




        $scope.updateResults = function () {
            var tmp = {};
            var cur = '1';

            $scope.allPoi.forEach(item => {
                let a = item.name, b = $scope.selection.toLowerCase(); //$('#selection option:selected').text().toString().toLowerCase()
                let c = $scope.searchVal;
                if ((item.category === $('#selection').val()|| b === "all")
                    && a.toLowerCase().includes(c)
                ){
                    if (tmp[cur] === undefined){
                        tmp[cur] = [];
                        tmp[cur].push(item);
                    }
                    else{
                        tmp[cur].push(item);
                        if (tmp[cur].length === 4)
                            cur += '1';
                    }
                }
            });
            $scope.results = tmp;
            $scope.size = Object.keys(tmp).length;
            console.log($scope.results)
        };

        $scope.poiClicked = function (event) {
            let name = event.currentTarget.id;
            $window.location.href = "#!/singlePoi/" + name;
        };

        $scope.changeFavoriteFromPoisController = function($event, item) {
            favoritePoiService.changeFavorite($event,item);
        };
    });