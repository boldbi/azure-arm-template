var loginApp = angular.module("loginApp", []);

loginApp.controller('loginController', ["$scope", function ($scope) {
    if ($("#login-username").val() != "") {
        $scope.uname = $("#login-username").val();
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