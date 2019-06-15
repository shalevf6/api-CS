var app = angular.module('myApp', ['ngRoute']);

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
       .when('/favoritePoi', {
           templateUrl : 'pages/favoritePoi.html',
           controller : 'favoritePoiController',
           controllerAs : 'ctrl'
       });
       // .otherwise({redirectTo : '/'});
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
app.controller('mainController', function ($scope, $http, $window) {

   $scope.logout = function(){
      sessionStorage.removeItem('curUser');
      $rootScope.rUsername = "Guest";
      $rootScope.rToken = "";

      console.log("inside logout");

      $window.location.href = "#!/register"
  }
   
});

app.service('favoritePoiService', function ($scope, $http, $window) {
    $scope.favorites = [];

    $scope.addFavorite = function(poi) {
        favorites.push(poi);
    };

    $scope.removeFavorite = function(poi) {
        angular.forEach(favorites, function(favorite, index) {
            if(favorite.name === poi.name) {
                favorites.splice(index, 1);
            }
        });
    };

    $http({
        method : 'GET',
        url : "http://localhost:3000/private/favoritePoi",
        headers : headers
    })
        .then(function (res) {
            $scope.recomended = res.data;
            console.log(res.data)
        }, function (err) {
            console.log(err);
        });
});