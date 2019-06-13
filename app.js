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
          templateUrl : 'pages/login/login.html',
          controller : "loginController"
       })
       .when('/register', {
          templateUrl : 'pages/login/login.html',
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