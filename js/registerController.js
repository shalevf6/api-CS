app.controller('registerController', function ($scope) {
    //TODO add registration form

    let brs = [];
    for (let index = 0; index < 100; index++) {
        brs.push(index);
    }

    $scope.brs = brs;


});