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
       .when('/POIS', {
           templateUrl: 'pages/pois.html',
           controller: 'poisController',
           controllerA: 'ctrl'
       })
        .when('/restorePassword', {
        templateUrl: 'pages/restorePassword.html',
        controller: 'restorePasswordController',
        controllerA: 'ctrl'
    });

       // .otherwise({redirectTo : '/'});
});

app.service("header", function () {
    this.header = {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }
})

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