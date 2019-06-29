app.controller('registerController', function($scope, $http, $window){

    $scope.emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    $scope.user = {
        username :"",
        password : "",
        fname : "",
        lname : "",
        city : "",
        country : "",
        email : " ",
        favoriteCat : [],
        questions : [{quest: "",ans : "",quest1:"",ans1:""},]
    };
    let request = {
        method: 'GET',
        url : 'http://localhost:3000/categories',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request)
        .then(function success(response){
                let categories = response.data;
                $scope.categories = categories;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            });

    let request3 = {
        method: 'GET',
        url : 'http://localhost:3000/countries',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request3)
        .then(function success(response){
                let countries = response.data;
                $scope.countries = countries;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            });


    let request1 = {
        method: 'GET',
        url : 'http://localhost:3000/questions',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request1)
        .then(function success(response){
                let questions = response.data;
                $scope.questions = questions;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            });


    let request2 = {
        method: 'GET',
        url : 'http://localhost:3000/categories',
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    };

    $http(request2)
        .then(function success(response){
                let categories = response.data;
                $scope.categories = categories;
            },
            function error(err){
                console.log("error! info: " + err);
                $scope.username = err
            });


    $scope.master = {};


    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
    $scope.register = function(user) {
        $scope.master = angular.copy(user);
        var ok =true;
        var categories = $scope.master.favoriteCat;
        var catTosend = Array();
        var count =0;
        console.log(count);
        angular.forEach(categories,function (category , index , obj) {
            if(category !=null) {
                if (index === "0") {
                    if (category === categories[1] || category === categories[2] || category === categories[3]) {
                        alert("Cant choose two similar categories ");
                        ok = false;
                    }
                } else if (index === "1") {
                    if (category === categories[0] || category === categories[2] || category === categories[3]) {
                        alert("Cant choose two similar categories ");
                        ok = false;
                    }
                } else if (index === "2") {
                    if (category === categories[1] || category === categories[0] || category === categories[3]) {
                        alert("Cant choose two similar categories ");
                        ok = false;
                    }
                }
                else if (index === "3") {
                    if (category === categories[1] || category === categories[2] || category === categories[0]) {
                        alert("Cant choose two similar categories ");
                        ok = false;
                    }
                }
                if (ok) {
                    catTosend.push(category);
                    count++
                }
            }
        });
        console.log(count);
        if (count < 2) {
            alert("YOU MUST CHOOSE 2 OR MORE CATEGORIES");
            ok = false;
        }
        else if(ok) {
            var catCat = {};
            if (count === 2) {
                let request2 = {
                    method: 'POST',
                    url: 'http://localhost:3000/signUp',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    data: {
                        "username": user.username.toString(),
                        "password": user.password.toString(),
                        "fName": user.fname.toString(),
                        "lName": user.lname.toString(),
                        "city": user.city.toString(),
                        "country": user.country.toString(),
                        "email": user.email.toString(),
                        "favoriteCat": [catTosend[0].toString(), catTosend[1].toString()],
                        "questions": [{"quest": user.questions.quest.toString(), "ans": user.questions.ans.toString()},{"quest": user.questions.quest1.toString(), "ans": user.questions.ans1.toString()}]
                    }
                };
                $http(request2)
                    .then(function success(response) {
                            alert(user.username + " you have registered successfully!");
                            $window.location.href = "#!/login"

                        },
                        function error(err) {
                            console.log("error! info: " + err);
                            alert(err.data.toString());
                        })
            }
            if (count === 3) {
                let request2 = {
                    method: 'POST',
                    url: 'http://localhost:3000/signUp',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    data: {
                        "username": user.username.toString(),
                        "password": user.password.toString(),
                        "fname": user.fname.toString(),
                        "lname": user.lname.toString(),
                        "city": user.city.toString(),
                        "country": user.country.toString(),
                        "email": user.email.toString(),
                        "favoriteCat": [catTosend[0].toString(), catTosend[1].toString(), catTosend[2].toString()],
                        "questions": [{"quest": user.questions.quest.toString(), "ans": user.questions.ans.toString()}]

                    }
                };
                $http(request2)
                    .then(function success(response) {
                            alert(user.username + " you have registered successfully!");
                            $window.location.href = "#!/login"
                        },
                        function error(err) {
                            console.log("error! info: " + err);
                            alert(err);
                        })
            }
            if (count === 4) {
                let request2 = {
                    method: 'POST',
                    url: 'http://localhost:3000/signUp',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    data: {
                        "username": user.username.toString(),
                        "password": user.password.toString(),
                        "fname": user.fname.toString(),
                        "lname": user.lname.toString(),
                        "city": user.city.toString(),
                        "country": user.country.toString(),
                        "email": user.email.toString(),
                        "favoriteCat": [catTosend[0].toString(), catTosend[1].toString(), catTosend[2].toString(), catTosend[3].toString()],
                        "questions": [{"quest": user.questions.quest.toString(), "ans": user.questions.ans.toString()}]
                    }
                };
                $http(request2)
                    .then(function success(response) {
                            alert(user.username + " you have registered successfully!");
                            $window.location.href = "#!/login"
                        },
                        function error(err) {
                            console.log("error! info: " + err);
                            alert(err);
                        })
            }
        }
    };
    $scope.submitForm = function(isValid, event) {

        let email = $scope.user.email;
        isValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(email);

        let tmp = $scope.user.questions;
        let validQuest = $scope.user.questions ? (Object.keys($scope.user.questions).length >= 4) : false;
        let differentQuest = tmp.quest !== tmp.quest1;


        // check to make sure the form is completely valid
        if (isValid && validQuest && differentQuest) {
            $scope.register($scope.user)
        }
        else{
            let str = !isValid ? "Invalid Email.\nPlease insert a valid Email!\n" : "";
            !validQuest ? str+="Please set 2 security questions" : str;
            !differentQuest ? str+="Security questions must be different" : str;
            alert(str)
        }

        event.preventDefault();
    };

    $scope.resetForm = function () {
        $('#regForm').trigger('reset');
    }
});