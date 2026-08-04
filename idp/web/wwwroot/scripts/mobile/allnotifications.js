$(document).ready(function () {
    $("#caption").text("Notifications");
    $("#icons-list").css("display", "none");
    $("#report-menu-items").css("display", "none");

    function resizeNotificationArea() {
        var notificationAreaHeight = $(window).height() - 50;
        $("#ViewNotificationPage").css({ height: notificationAreaHeight, overflow: "auto" });
    }

    resizeNotificationArea();
    $(window).resize(resizeNotificationArea);
});

var notificationState = {
    notifications: [],
    isHide: true,
    key: 1,
    timerMinutes: 0,
    displayCount: 0,
    totalCount: 0,
    notificationContentWidth: window.innerWidth - 615 + "px"
};

function initializeNotifications(data) {
    notificationState.notifications = Array.isArray(data) ? data : [];
    notificationState.isHide = notificationState.notifications.length <= 0;
    return notificationState;
}

function getInitMinutes(minutes) {
    return minutes;
}

function getInitHours(minutes, notification) {
    if (Math.floor(minutes / 60) < 24) {
        return Math.floor(minutes / 60);
    }

    if (notification) {
        notification.IsToday = false;
        notification.DaysAgo = 1;
    }

    return undefined;
}

function enableWaitingPopup(id, containerHeight) {
    var popupContainerDiv = $("<div>")
        .attr({ id: "notifications_popupContainerDiv" })
        .addClass("notifications-waitingPopup")
        .css({ height: containerHeight + "px" });
    var popupCenterDiv = $("<div>")
        .attr({ id: "notifications_popupCenterDiv" })
        .addClass("notifications-waitingPopup-center");
    var popupImage = $("<img>").attr({ src: "/content/images/filter_loader.gif" }).css({ opacity: "1" });

    popupCenterDiv.append(popupImage);
    popupContainerDiv.append(popupCenterDiv);
    $(id).append(popupContainerDiv);
}

function disableWaitingPopup() {
    $(".notifications-waitingPopup").remove();
}

function getMoreNotifications(count) {
    enableWaitingPopup("#main-container", window.outerHeight);

    return $.ajax({
        type: "POST",
        url: "/Notification/GetMoreNotification",
        data: { Count: count }
    }).done(function (response) {
        disableWaitingPopup();
        notificationState.notifications = response && response.Notifications ? response.Notifications : [];
        notificationState.displayCount = response && response.DisplayedNotifications ? response.DisplayedNotifications : 0;
        notificationState.totalCount = response && response.TotalNotifications ? response.TotalNotifications : 0;
        notificationState.isHide = notificationState.displayCount >= notificationState.totalCount;

        // Emit update signal for any page-level render hook.
        $(document).trigger("notifications:updated", [notificationState]);
    }).fail(function () {
        disableWaitingPopup();
    });
}

function getInitDays(days) {
    if (days < 30) {
        if (days === 1) {
            return "1 day ago";
        }

        return days + " days ago";
    }

    if (days > 30 && days < 365) {
        if (days < 60) {
            return "A month ago";
        }

        return Math.floor(days / 30) + " months ago";
    }

    if (days > 365) {
        if (days < 365) {
            return "An year ago";
        }

        return Math.floor(days / 365) + " years ago";
    }

    return undefined;
}

function setTimer(value) {
    notificationState.timerMinutes = value;
}

function converthtml(htmlCode) {
    return htmlCode;
}

function returnString(stringValue) {
    return stringValue;
}

function updateAngularModel(newTime) {
    setTimer(newTime);
}

window.notificationState = notificationState;
window.notificationActions = {
    initializeNotifications: initializeNotifications,
    getInitMinutes: getInitMinutes,
    getInitHours: getInitHours,
    getMoreNotifications: getMoreNotifications,
    getInitDays: getInitDays,
    setTimer: setTimer,
    converthtml: converthtml,
    returnString: returnString,
    updateAngularModel: updateAngularModel
};

// Backward-compatible globals for existing view bindings.
window.init = initializeNotifications;
window.getInitMinutes = getInitMinutes;
window.getInitHours = getInitHours;
window.getMoreNotifications = getMoreNotifications;
window.getInitDays = getInitDays;
window.setTimer = setTimer;
window.converthtml = converthtml;
window.returnString = returnString;
