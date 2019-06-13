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
          template : "<h1> this is a test </h1>",
          controller : "mainController"
       })
       .when('/register', {
          templateUrl : 'pages/register.html',
          controller : 'registerController',
          controllerAs : 'ctrl'
       })
       .when('/login', {
          templateUrl : 'pages/login.html',
          controller : 'loginController',
          controllerAs : 'ctrl'
       })
       .when('/welcome', {
           templateUrl : 'pages/welcome.html',
           controller : 'welcomeController',
           controllerAs : 'ctrl'
       })
       .otherwise({redirectTo : '/'});
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