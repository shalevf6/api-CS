app
    .controller('singlePoiController', function ($scope, $http, $window, $rootScope, $routeParams, header, search) {

        /*
        needs to check if user is logged in
         */

        var name = $routeParams.name;
        $scope.loggedIn = sessionStorage.getItem('token');

        $http({
            method: 'GET',
            url: 'http://localhost:3000/poi/' + name,
            headers: header.header
        }).then(function (response) {
                console.log(response);
                $scope.poi = response.data[0];

                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/latestReview/' + name,
                    headers: header.header
                }).then(function (response) {
                    console.log(response);
                    if (response.data.length){
                        $scope.reviews = response.data;
                        $scope.reviews.forEach(item => {
                            item.time = $scope.convertToDays(item.time)
                        });
                    }

                    $scope.ready = true;
                })
            }, function (err) {
                console.log(err)
            });

        $http({
            method: 'PATCH',
            url: 'http://localhost:3000/updateWatchers',
            headers: header.header,
            data: {poi: name}
        }).then(function (res) {
            console.log("updated watches")
        }, function (err) {
            console.log('failed to update watches')
        });



        $scope.convertToDays = function(date){
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date();
            var secondeDate = new Date(date);
            let diff = Math.round(Math.abs((firstDate.getTime() - secondeDate.getTime()) / (oneDay)));
            if (diff === 0)
                return "Today";
            else if (diff === 1)
                return "Yesterday";
            else
                return diff.toString() + " days ago";
        };


        $scope.submitReview = function(){
            let rate = $('input[name=rating]:checked', '#review-form').val();
            let text = $scope.reviewText;
            let reqHeader = header.header;
            reqHeader['x-auth-token'] = sessionStorage.getItem('token');
            let poi = $scope.poi;

            $http({
                method: "POST",
                url: "http://localhost:3000/private/addReview",
                headers: reqHeader,
                data: {
                    poi: $scope.poi.name,
                    rank: rate,
                    review: text
                }
            })
                .then(function (response) {
                    console.log(response.data);
                    alert(response.data);
                    $('#closeReview').click();
                }, function (err) {
                    console.log(err);
                    alert(err.data + "\n\n" + "Notice: you cant post 2 reviews for the same point")
                });
        }
    });