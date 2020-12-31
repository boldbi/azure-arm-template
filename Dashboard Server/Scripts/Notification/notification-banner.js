serverApp.controller('NotificationBannerCtrl', ["$scope", "$window", "$http", function ($scope, $window, $http) {
    $scope.bannerObject = [];

    $scope.closeBanner = function () {
        $("#notification-banner").hide();
        var exDate = new Date($scope.bannerObject.ToTime).getDate() - new Date().getDate() + 1;
        setNotificationCookie("boldbi.notification.banner_" + $scope.bannerObject.UniqueId, $scope.bannerObject.UniqueId, exDate);
    };
    $scope.openBanner = function () {
        $("#notification-banner").show();
    };
    $window.onload = function () {
        var isBannerOpened = false;
        $http.get(bannerApiEndpoint)
            .then(function (result) {
                if (result.data != null) {
                    $.each(result.data, function (index, value) {
                        if (!isBannerOpened) {
                            var bannerCookie = getBannerCookie("boldbi.notification.banner_" + value.UniqueId);
                            if (bannerCookie == "" || bannerCookie == null) {
                                var startTime = Date.parse(new Date(value.FromTime).toLocaleString());
                                var endTime = Date.parse(new Date(value.ToTime).toLocaleString());
                                var currentTime = Date.parse(new Date().toLocaleString());
                                var isValid = currentTime > startTime && currentTime < endTime;
                                if (isValid) {
                                    $scope.bannerObject = value;
                                    $scope.openBanner();
                                    isBannerOpened = true;
                                }
                            }
                        }
                    });
                }
            });
    };
}]);

if (typeof (angularManualBootstrap) != "undefined" && angularManualBootstrap) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['serverApp']);
    });
}

function setNotificationCookie(name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays++);
    var cookie_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = name + "=" + cookie_value + ";path=/";
}

function getBannerCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}