
$(document).ready(function () {
   
    $("#caption").text("Notifications");    
    $("#icons-list").css("display", "none");
    $("#report-menu-items").css("display", "none");

    var notificationAreaHeight = $(window).height() - 50;    
    $("#ViewNotificationPage").css({'height': notificationAreaHeight,'overflow':"auto"}); 

    $(window).resize(function () {
        var notificationAreaHeight = $(window).height() - 50;        
        $("#ViewNotificationPage").css({ 'height': notificationAreaHeight, 'overflow': "auto" });

    });
    });
   
var homeApp = angular.module("HomeModule", ["ngSanitize"]);

homeApp.controller("NotificationController", function ($scope, $window, $http) {
    
    $scope.init = function (data) {
        $scope.notifications = data;
        if ($scope.notifications .length <= 0)
            $scope.Ishide = "true";        
    };    
    $scope.key = 1;
    $scope.timerMinutes = 0;
    $scope.getInitMinutes = function (minutes) {
        return minutes;
    };
    $scope.notificationContentWidth = window.innerWidth - 615 + "px";
    $scope.getInitHours = function (minutes,notification) {
        if (Math.floor(minutes / 60) < 24) {
            return Math.floor(minutes / 60);
        }
        else {
            notification.IsToday = false;
            notification.DaysAgo = 1;
        }
    }
    $scope.getMoreNotifications = function (count) {
        enableWaitingPopup("#main-container",window.outerHeight)
        $http.post("/Notification/GetMoreNotification", { "Count": count }).success(function (response) {
            disableWaitingPopup();
            $scope.notifications = response.Notifications;
            $scope.Displaycount = response.DisplayedNotifications;
            $scope.Totalcount = response.TotalNotifications;
            if ($scope.Displaycount >= $scope.Totalcount)
                $scope.Ishide = "true";
            else
                $scope.Ishide = "false";
        
        });      
    }
    function enableWaitingPopup(id, containerHeight) {
        var popupContainerDiv = $("<div>").attr({ "id": "notifications_popupContainerDiv" }).addClass("notifications-waitingPopup").css({ "height": containerHeight + "px" });
        var popupCenterDiv = $("<div>").attr({ "id": "notifications_popupCenterDiv" }).addClass("notifications-waitingPopup-center");
        var popupImage = $("<img>");
        popupImage.attr({ "src":"/content/images/filter_loader.gif" });
        popupCenterDiv.append(popupImage)
        popupImage.css({ "opacity": "1" });
        popupContainerDiv.append(popupCenterDiv);
        $(id).append(popupContainerDiv);
    }

    function disableWaitingPopup() {
        $(".notifications-waitingPopup").remove();
    }

    $scope.getInitDays = function (days) {
        if (days < 30) {
            if (days == 1) {
                return "1 day ago";
            }
            else {
                return days + " days ago";
            }
        }
        if (days > 30 && days < 365) {
            if (days < 60) {
                return "A month ago";
            }
            else {
                return Math.floor(days / 30)+" months ago";
            }
        }
        if (days > 365) {
            if (days < 365) {
                return "An year ago";
            }
            else {
                return Math.floor(days / 365) + " years ago";
            }
        }
    }
    $scope.setTimer = function (t) {
        $scope.timerMinutes = t;
    }
    $scope.converthtml = function (html_code)
    {
        return $window.trustAsHtml(html_code);
    }
    $scope.returnString = function (stringValue) {
        return stringValue;
    }

});
  

   
function updateAngularModel(newTime) {
    scope = angular.element("#notification-content").scope();
    scope.$apply(function () {
        scope.setTimer(newTime);
    });

}