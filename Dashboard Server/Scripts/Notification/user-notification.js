var userNotificationContainer = "";
var userNotificationObj = "";
var notificationListDOM = "";
var notificationBackDrop = "";
var notificationScrollFlag = false;

serverApp.controller('UserNotificationController', ['$scope', '$window', '$http', '$sce', function ($scope, $window, $http, $sce) {
    $scope.notifications = [];
    $scope.totalNotifications = 0;
    $scope.skip = 0;
    $scope.isFinal = $scope.skip == $scope.totalNotifications;
    $scope.timerMinutes = 0;
    $scope.isNotificationLoading = false;
    $scope.isNotificationLoaded = false;

    $scope.getInitMinutes = function (minutes) {
        return minutes;
    };
    $scope.getInitHours = function (minutes, notification) {
        if (Math.floor(minutes / 60) < 24) {
            return Math.floor(minutes / 60);
        } else {
            notification.IsToday = false;
            notification.DaysAgo = 1;
        }
    };
    $scope.getInitDays = function (item) {
        return "Yesterday " + item.UpdatedTimeString;
    };
    $scope.setTimer = function (t) {
        $scope.timerMinutes = t;
    }
    $scope.converthtml = function (htmlCode) {
        return $window.trustAsHtml(htmlCode);
    }
    $scope.returnString = function (stringValue) {
        return stringValue;
    }

    $scope.getNotificationUrl = function (notificationObj) {
        var notificationUrl = notificationObj.Url.replace("/widgets", viewWidgetUrl).replace("/dashboards", viewUrl);
        notificationUrl += (notificationObj.Url.indexOf("?") > 0 ? "&comment=" : "?comment=") + notificationObj.TargetFieldId;
        generateProfileAvatar();
        return encodeURI(notificationUrl);
    }

    $scope.getUserSystemNotification = function (event) {
        $http({
            url: userSystemnotificationUrl,
            method: "POST",
            data: $.param({ skip: $scope.skip, take: 20 }),
        }).success(function (data, status, headers, config) {
            var skip = $scope.skip;
            for (var i = 0; i < data.LogList.length; i++) {
                $scope.notifications.push(data.LogList[i]);
            }
            $scope.isNotificationLoaded = true;
            $scope.skip = $scope.skip + data.LogList.length;
            $scope.isFinal = data.LogCount == $scope.notifications.length;

            if ($scope.notifications.length == 0) {
                ejs.popups.hideSpinner(document.getElementById('user-notification-container'));
            }
        })
    }

    $scope.valueGroupBy = function (item) {
        return item.TimeAgo;
    }

    $scope.doNotificationBindComplete = function () {
        notificationScrollFlag = false;
        $scope.isNotificationLoading = false;
        notificationListDOM = $("#notification-list-ul");
        if (notificationListDOM.outerHeight() > userNotificationObj.innerHeight()) {
            userNotificationObj.css("overflow-y", "scroll");
        }
        ejs.popups.hideSpinner(document.getElementById('user-notification-container'));
        setTimeout(function () {
            $('#notification-content [data-toggle="tooltip"]').tooltip();
        }, 200);
    }

    userNotificationContainer = $("#user-notification-container");
    userNotificationObj = $("#notification-content");
    notificationBackDrop = $("#user-notification-backdrop");

    ejs.popups.createSpinner({
        target: document.getElementById('user-notification-container')
    });
    ejs.popups.setSpinner({ type: 'Material' });
}]);

serverApp.directive('notificationRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            scope.$eval('doNotificationBindComplete()');
        }
    };
})

$(document).on("click", "#user-notification-backdrop", function () {
    closeUserNotification();
});

function onNotificationScroll(event) {
    var totalNotificationListHeight = 0;
    userNotificationObj.children().each(function () {
        totalNotificationListHeight += $(this).height();
    });
    if ((notificationListDOM.position().top + totalNotificationListHeight - 130) < userNotificationObj.height()) {
        if (!notificationScrollFlag) {
            notificationScrollFlag = true;
            var notificationController = angular.element(userNotificationObj).scope();
            if (!notificationController.isFinal) {
                notificationController.isNotificationLoading = true;
                notificationController.getUserSystemNotification();
            }
        }
    }
}

function openUserNotification() {
    userNotificationContainer.show().removeClass("user-notification-close").addClass("user-notification-open");
    ejs.popups.showSpinner(document.getElementById('user-notification-container'));
    blurServerAppContainer();

    setTimeout(function () {
        notificationBackDrop.css("width", ($(window).width() - userNotificationContainer.width()) + "px").show();
        var notificationController = angular.element(userNotificationObj).scope();
        notificationController.getUserSystemNotification();
        $("#user-system-notification").find("#notification-indicator").remove();
    }, 800);

}

function closeUserNotification() {
    userNotificationContainer.removeClass("user-notification-open").addClass("user-notification-close");
    unblurServerAppContainer();
    notificationBackDrop.hide();
    setTimeout(function () {
        var notificationController = angular.element(userNotificationObj).scope();
        notificationController.skip = 0;
        notificationController.notifications = [];
        notificationController.isNotificationLoaded = false;
    }, 800);
}

$(window).resize(function () {
    if (notificationBackDrop.is(":visible")) {
        notificationBackDrop.css("width", ($(window).width() - userNotificationContainer.width()) + "px");
    }
});
