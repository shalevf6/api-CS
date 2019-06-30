var locations = {
    'Atla': {x:40.727, y: -73.992 },
    'American Museum of Natural History' : {x:40.7812266, y:-73.972 },
    'Apollo Theatre': {x:40.810089, y: -73.949989 },
    "Atomix": {x:40.744304, y: -73.982804 },
    "Brooklyn Bridge": {x:40.706102, y: -73.996778 },
    "China Chalet": {x:40.706564, y: -74.012882 },
    "Chrysler Building": {x:40.751640, y: -73.975389 },
    "Cielo": {x:40.739811, y: -74.007056 },
    "Empire State Building": {x:40.748577, y: -73.985670 },
    "House of Yes": {x:40.706801, y:  -73.923611 },
    "Intrepid Sea, Air and Space Museum": {x:40.764504, y:  -73.999545 },
    "Le Coucou": {x:40.719128, y: -74.000239 },
    "Masa": {x:40.768560, y: -73.983027 },
    "Museum of Modern Art": {x:40.743731, y: -73.932405 },
    "Nowadays": {x:40.692508, y: -73.901569 },
    "Statue of Liberty": {x:40.689241, y: -74.044552 },
    "The Metropolitan Museum of Art": {x:40.779369, y: -73.963482 },
    "The National 9-11 Memorial and Museum": {x:40.711550, y: -74.013333 },
    "Via Carota": {x:40.733139, y: -74.003612 },
    "Good Room": {x:40.726929, y: -73.952897 },
};

app
    .controller('singlePoiController', function ($scope, $http, $window, $rootScope, $routeParams, header, search, favoritePoiService) {
        var name = $routeParams.name;
        $scope.loggedIn = sessionStorage.getItem('token');

        $http({
            method: 'GET',
            url: 'http://localhost:3000/poi/' + name,
            headers: header.header
        }).then(function (response) {
                console.log(response);
                let tempPoi = response.data[0];
                let poiColor = favoritePoiService.isFavorite(tempPoi);
                $scope.poi = {name: tempPoi.name, picture: tempPoi.picture, category: tempPoi.category, description: tempPoi.description,
                    watched: tempPoi.watched, rank: tempPoi.rank, color: poiColor};
                console.log($scope.poi);

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
        };

        $scope.changeFavoriteFromSinglePoiController = function($event, item) {
            favoritePoiService.changeFavorite($event,item);
        };

        $scope.initMap23 = function () {
            const mymap = L.map('mapid').setView([locations[name].x, locations[name].y], 16);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiaGFna2FsIiwiYSI6ImNqeDNsN2JvNjAwNzA0YW1yYnRyY2xrdWoifQ.aPOzAIe78JUEzYxdaq5dcg'
            }).addTo(mymap);
            const marker = L.marker([locations[name].x, locations[name].y]).addTo(mymap);
            marker.bindPopup("<div style='text-align: center'><b>I'm here!</b><br>" + name + "</div>").openPopup();
        };

        $scope.changeFavoriteFromSinglePoiController = function($event, item) {
            favoritePoiService.changeFavorite($event,item);
        };
    });