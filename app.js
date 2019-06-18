var app = angular.module('myApp', ['ngRoute', 'as.sortable']);

// setting root variables
app.run(function ($rootScope) {
   $rootScope.rUsername = sessionStorage.getItem('username') || "Guest";
   $rootScope.rToken = sessionStorage.getItem('token');;
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



//  main controller
app.controller('mainController', function ($scope, $http, $window, $rootScope, search) {

   $scope.logout = function(){
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
      $rootScope.rUsername = "Guest";
      $rootScope.rToken = "";

      console.log("inside logout");

      $window.location.href = "#!/"
  };

  $scope.search = function () {
      search.setVal($scope.text);
      $window.location.href = '#!/POIS'
  };
   
});

app.service('favoritePoiService', function () {

    this.favorites = [];

    this.addFavorite = function (poi) {
        // // TODO : MAKE SURE THE time VALUE IS CORRECT
        // this.favorites.push({username: rUsername, poi: poi.name, personalOrder: poi.personalOrder, time: new Date().toISOString()});
        this.favorites.push({name: poi.name, category: poi.category, picture: poi.picture, description: poi.description,
            rank: poi.rank, watched: poi.watched});
    };

    this.removeFavorite = function (poi) {
        angular.forEach(this.favorites, function (favorite, index, obj) {
            if (favorite.name === poi.name) {
                obj.splice(index, 1);
            }
        });
    };

    this.isFavorite = function (poi) {
        angular.forEach(this.favorites, function(favorite, index) {
            if (favorite.name === poi.name) {
                return 'color: rgb(100, 55, 0)';
            }
        });
        return 'color: rgb(0, 0, 0)';
    };

    this.getPOITime = function (poi) {
        // TODO : COMPLETE THE FUNCTION
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
});
