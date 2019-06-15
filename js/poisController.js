app
    .controller('poisController', function ($scope, $http, $window, $rootScope, header) {
        $scope.results = [];
        $scope.searchVal = "";


        $http({
            method: "GET",
            url: "http://localhost:3000/poi/",
            headers: header.header
        })
            .then(function (res) {
               console.log(res);
               $scope.allPoi = res.data;
            }, function (err) {
                console.log(err)
            });

        $http({
            method: "GET",
            url: "http://localhost:3000/categories",
            headers: header.header
        })
            .then(function (res) {
                console.log(res);
                $scope.categories = res.data;
            }, function (err) {
                console.log(err)
            });


        $scope.updateResults = function () {
            $scope.results.length = 0;
            $scope.allPoi.forEach(item => {
                let a = item.name, b = $('#selection option:selected').text().toString().toLowerCase();

                let c = $scope.searchVal;
                if ((item.category === $('#selection').val()|| b === "show all")
                    && a.toLowerCase().includes($scope.searchVal)
                 ){
                    $scope.results.push(item);
                }
            });
            console.log($scope.results)
        }
    });