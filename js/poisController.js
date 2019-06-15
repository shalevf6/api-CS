app
    .controller('poisController', function ($scope, $http, $window, $rootScope, header, search) {
        $scope.results = {};
        $scope.size = -1;
        $scope.searchVal = search.getVal();


        $http({
            method: "GET",
            url: "http://localhost:3000/poi/",
            headers: header.header
        })
            .then(function (res) {
               console.log(res);
               $scope.allPoi = res.data;
                if ($scope.searchVal)
                    $scope.updateResults();
            }, function (err) {
                console.log(err)
            });

        $http({
            method: "GET",
            url: "http://localhost:3000/categories",
            headers: header.header
        })
            .then(function (res) {
                // console.log(res);
                let cat = res.data;
                cat.unshift({name:"Show All"});
                $scope.categories = cat;
                $scope.selection = cat[0].name;
            }, function (err) {
                console.log(err)
            });


        $scope.updateResults = function () {
            var tmp = {};
            var cur = '1';

            $scope.allPoi.forEach(item => {
                let a = item.name, b = $('#selection option:selected').text().toString().toLowerCase();
                let c = $scope.searchVal;
                if ((item.category === $('#selection').val()|| b === "show all")
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

        $scope.changeInitor = function () {
            $scope.initor = false;
        };
    });