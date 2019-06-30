var app = angular.module('myApp', ['ngRoute', 'as.sortable']);

// setting root variables
app.run(function ($rootScope) {
    $rootScope.rUsername = sessionStorage.getItem('username') || "Guest";
    $rootScope.rToken = sessionStorage.getItem('token');
    $rootScope.favorite_count = 0;
});

//  routing configurations
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/entrancePage.html',
            controller : "entranceController",
            controllerAS : "ctrl"
        })
        .when('/register', {
            templateUrl : 'pages/register.html',
            controller : 'registerController',
            controllerAs : 'ctrl'
        })
        .when('/login', {
            templateUrl : 'pages/login/new-login.html',
            controller : 'loginController',
            controllerAs : 'ctrl'
        })
        .when('/welcome', {
            templateUrl : 'pages/welcome.html',
            controller : 'welcomeController',
            controllerAs : 'ctrl'
        })
        .when('/singlePoi/:name', {
            templateUrl : 'pages/singlePoi.html',
            controller : 'singlePoiController',
            controllerAs : 'ctrl'
        })
        .when('/POIS', {
            templateUrl: 'pages/pois.html',
            controller: 'poisController',
            controllerA: 'ctrl'
        })
        .when('/userFavoritePOIs', {
            templateUrl: 'pages/favoritePois.html',
            controller: 'favoritePoisController',
            controllerAs: 'ctrl'
        })
        .when('/about', {
            templateUrl: 'pages/aboutPage.html',
            controller: 'aboutController',
            controllerAs: 'ctrl'
        })
        .otherwise({redirectTo : '/'});
});

app.service("header", function () {
    this.header = {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }
});

app.service('search', function () {
    this.value = "";
    this.setVal = function (value) {
        this.value = value;
    };
    this.getVal = function () {
        let val = this.value;
        this.value = '';
        return val;
    }
});

app.service('mainPoiService', function(header){

    let allPOIs = [];

    this.setPOIs = function(http) {
        http({
            method: "GET",
            url: "http://localhost:3000/poi",
            headers: header.header
        })
            .then(function (res) {
                allPOIs = res.data;
                console.log(res.data)
            }, function (err) {
                console.log(err);
            });
    };

    this.getPois = function(names) {
        let POINames = [];
        angular.forEach(allPOIs, function(POI) {
            POINames.push(POI.name);
        });
        let POIs = [];
        for (let i = 0; i < allPOIs.length; i++) {
            if (names.includes(POINames[i])) {
                POIs.push(allPOIs[i]);
            }
        }
        return POIs;
    };
});

//  main controller
app.controller('mainController', function ($scope, $http, $window, $rootScope, search, favoritePoiService) {

    $scope.logout = function(){
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        $rootScope.rUsername = "Guest";
        $rootScope.rToken = "";

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

        console.log("inside logout");

        $window.location.href = "#!/";

        favoritePoiService.resetFavorites();
    };

    $scope.search = function () {
        search.setVal($scope.text);
        $window.location.href = '#!/POIS'
    };

    $scope.navToggle = function () {
        $('#navItems')
    }

});

app.service('favoritePoiService', function ($rootScope) {

    let favorites = [];

    this.initFavoritePOIs = function(http) {
        http({
            method : "GET",
            url : 'http://localhost:3000/private/favoritePoi',
            headers: {'x-auth-token': sessionStorage.getItem('token')}
        })
            .then(function (response) {
                favorites = response.data;
                console.log("Favorites successfully retrieved");
                console.log(response.data)
            }, function (err) {
                console.log("Unable to retrieve favorites");
                console.log(err);
            });
    };

    this.addFavorite = function (poi) {
        favorites.push({username: $rootScope.rUsername, poi: poi.name, personalOrder: favorites.length + 1, time: new Date().toISOString()});
        if ($rootScope.favorite_count === -1) {
            let favCount = $('#fav_count');
            favCount.removeClass('badge-danger');
            favCount.addClass('badge-secondary');
        }
        else if ($rootScope.favorite_count === 0) {
            let favCount = $('#fav_count');
            favCount.removeClass('badge-secondary');
            favCount.addClass('badge-success');
        }
        $rootScope.favorite_count = $rootScope.favorite_count + 1;
    };

    this.removeFavorite = function (poi) {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].poi === poi.name) {
                favorites.splice(i, 1);
                if ($rootScope.favorite_count === 1) {
                    let favCount = $('#fav_count');
                    favCount.removeClass('badge-success');
                    favCount.addClass('badge-secondary');
                }
                else if ($rootScope.favorite_count === 0) {
                    let favCount = $('#fav_count');
                    favCount.removeClass('badge-secondary');
                    favCount.addClass('badge-danger');
                }
                $rootScope.favorite_count = $rootScope.favorite_count - 1;

            }
        }
    };

    this.isFavorite = function (poi) {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].poi === poi.name) {
                return 'darkorange';
            }
        }
        return 'black';
    };

    this.getPOITime = function (poiName) {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].poi === poiName) {
                return favorites[i].time;
            }
        }
    };

    this.changeFavorite = function ($event, item){
        let id = $event.target.id;
        let jqueryElement = $('#' + id);
        let color = jqueryElement.css('color');
        if (color === "rgb(0, 0, 0)") {
            jqueryElement.css('color', 'darkorange');
            this.addFavorite(item);
        }
        else {
            jqueryElement.css('color', 'black');
            this.removeFavorite(item);
        }
    };

    this.setFavorites = function(newFavorites) {
        favorites = newFavorites;
    };

    this.getFavorites = function() {
        return favorites;
    };

    this.resetFavorites = function() {
        favorites = [];
    };
});
