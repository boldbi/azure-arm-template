var serverApp = angular.module("serverApp", []);

serverApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
}]);

serverApp.controller("menuItemsController", function () {
    //$scope.categories = window.categories;
});

serverApp.directive("navItem", function () {
    return {
        restrict: "E",
        replace: true,
        template: function (elem, attr) {
            return "<a class='" + (attr.href === attr.url ? "active" : "") + "' href='" + attr.href + "'><span class='su " + attr.icon + "'></span></a>";
        }
    };
});

serverApp.service("ajaxService", ["$http", "$q", function ($http, $q) {

    return ({
        getData: function (requestUrl, data) {
            var request = $http({
                method: "post",
                url: requestUrl,
                data: data
            });

            return (request.then(handleSuccess, handleError));
        },

        postJsonData: function (requestUrl, data) {
            var request = $http({
                method: "post",
                url: requestUrl,
                data: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            return (request.then(handleSuccess, handleError));
        }
    });

    function handleError(response) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return ($q.reject("An unknown error occurred."));
        }

        return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
        return (response.data);
    }
}]);