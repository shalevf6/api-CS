var app = angular.module('myApp', ['ngRoute']);

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