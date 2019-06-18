var app = angular.module('myApp', ['ngRoute', 'as.sortable']);

// setting root variables
app.run(function ($rootScope) {
   $rootScope.rUsername = "Guest";
   $rootScope.rToken = "";
});

//  routing configurations
app.config(function ($routeProvider) {
   $routeProvider
       .when('/', {
          templateUrl : 'pages/mainPage.html',
          controller : "mainPageController",
           controllerAS : "ctrl"
       })
       .when('/register', {
          templateUrl : 'pages/register.html',
          controller : 'registerController',
          controllerAs : 'ctrl'
       })
       .when('/login', {
          templateUrl : 'pages/login/login.html',
          controller : 'loginController',
          controllerAs : 'ctrl'
       })
       .when('/welcome', {
           templateUrl : 'pages/welcome.html',
           controller : 'welcomeController',
           controllerAs : 'ctrl'
       })
       .when('singlePoi/:name', {
           templateUrl : 'pages/singlepage.html',
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
       });
       // .otherwise({redirectTo : '/'});
});

app.service("header", function () {
    this.header = {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }
});

app.directive('tabber', function() {
    return {
        compile: function (element) {
            var elems = (element.prop("tagName") === 'A') ? element : element.find('a');
            elems.attr("target", "_blank");
        }
    };
});


//  main controller
app.controller('mainController', function ($scope, $http, $window, $rootScope) {

   $scope.logout = function(){
      sessionStorage.removeItem('curUser');
      $rootScope.rUsername = "Guest";
      $rootScope.rToken = "";

      console.log("inside logout");

      $window.location.href = "#!/"
  };

  $scope.search = function () {
      if (!$scope.text){
          alert('fuck off');
          return;
      }

      $http.get("http://localhost:3000/poi/" + $scope.text, {headers: {"Content-Type" : "application/json",
              "Access-Control-Allow-Origin" : "*"}})
          .then(function (res) {
              console.log(res)
          }, function (err) {
              console.log(err)
          })
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
                return 'color: darkorange';
            }
        });
        return 'color: black';
    };

    this.getTime = function (poi) {
        angular.forEach(favorites, function(favorite, index) {
            if (favorite.name === poi.name) {
                return 'color: darkorange';
            }
        });
        return 'color: black';
    };

    this.changeFavorite = function ($event, item){
        let x = $event.target;
        let y = x.style;
        let z = y.color;
        let color = angular.element($event.target.closest('i')).style.color;
        let id = $event.target.id;
        if (color === 'darkorange') {
            $("#" + id).css('color', 'black');
            this.removeFavorite(item);
        }
        else {
            $("#" + id).css('color', 'darkorange');
            this.addFavorite(item);
        }
    };
});
