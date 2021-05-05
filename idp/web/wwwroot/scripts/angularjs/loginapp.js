var loginApp = angular.module("loginApp", []);

loginApp.controller('loginController', ["$scope", function ($scope) {
    if ($("#login-email").val() != "") {
        $scope.uname = $("#login-email").val();
    }
    $scope.win = true;
    $scope.dsAuth = function () {
        $scope.win = true;
        $scope.loginForm.$invalid = true;
    }

    $scope.winAuth = function () {
        $scope.win = false;
    }
}]);