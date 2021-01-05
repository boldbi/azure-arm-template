serverApp.controller('CustomMenuCtrl', ["$scope", "$window", function ($scope, $window) {
    $scope.menuList = getDefaultMenu();
    $scope.currentCount = 0;
    $scope.menuCount = $scope.menuCount = window.innerHeight <= 610 ? 4 : 5;

    if (customUI != null) {
        getCustomMenu();
    }   

    $scope.count = function () {
        return $scope.currentCount++;
    }

    setTimeout(function () {
        $(".default-lists").show();  
    }, 100);
}]);

function getDefaultMenu() {
    var customMenu = [
        {
            "Display": window.Server.App.LocalizationContent.Dashboards,
            "ImageLink": "su su-nav-dashboard",
            "OpenLink": dashboardPageUrl,
            "OpenBehavior": "_self",
            "ShowMenu": true,
            "Condition": true,
            "IsSelected": currentUrlLocalPath == dashboardPageUrl ? "active" : ""
        },
        {
            "Display": window.Server.App.LocalizationContent.DataSources,
            "ImageLink": "su su-nav-datasource",
            "OpenLink": dataSourcesPageUrl,
            "OpenBehavior": "_self",
            "MobileClassName": "mobile-hidden",
            "ShowMenu": true,
            "Condition": !isMobile,
            "IsSelected": currentUrlLocalPath == dataSourcesPageUrl ? "active" : ""
        },
        {
            "Display": window.Server.App.LocalizationContent.Pinboards,
            "ImageLink": "su su-pin",
            "OpenLink": homepagePageUrl,
            "OpenBehavior": "_self",
            "MobileClassName": "mobile-hidden",
            "ShowMenu": true,
            "Condition": !isMobile,
            "IsSelected": currentUrlLocalPath == homepagePageUrl ? "active" : ""
        },
        {
            "Display": window.Server.App.LocalizationContent.Slideshows,
            "ImageLink": "su su-tv",
            "OpenLink": slideshowPageUrl,
            "OpenBehavior": "_self",
            "MobileClassName": "mobile-hidden",
            "ShowMenu": true,
            "Condition": !isMobile,
            "IsSelected": currentUrlLocalPath == slideshowPageUrl ? "active" : ""
        },
        {
            "Display": window.Server.App.LocalizationContent.Schedules,
            "ImageLink": "su su-nav-schedule",
            "OpenLink": schedulePageUrl,
            "OpenBehavior": "_self",
            "ShowMenu": true,
            "Condition": true,
            "IsSelected": currentUrlLocalPath == schedulePageUrl ? "active" : ""
        },
        {
            "Display": window.Server.App.LocalizationContent.Publish,
            "ImageLink": "su su-publish",
            "OpenLink": PublishPageUrl,
            "OpenBehavior": "_self",
            "MobileClassName": "mobile-hidden",
            "ShowMenu": true,
            "Condition": !isMobile && isMaster,
            "IsSelected": currentUrlLocalPath == PublishPageUrl ? "active" : ""
        },
        {
            "Display": window.Server.App.LocalizationContent.Settings,
            "ImageLink": "su su-nav-settings",
            "OpenLink": adminPageUrl,
            "OpenBehavior": "_self",
            "MobileClassName": "mobile-hidden",
            "ShowMenu": true,
            "Condition": !isMobile && !isImageRequest && isAdmin,
            "IsSelected": currentUrlLocalPath == adminPageUrl && currentUrlLocalPath != groupPermissionUrl && currentUrlLocalPath != userPermissionUrl ? "active" : ""
        },
        {
            "Display": window.Server.App.LocalizationContent.UsersMenu,
            "ImageLink": "su su-group",
            "OpenLink": userPageurl,
            "OpenBehavior": "_self",
            "MobileClassName": "mobile-hidden",
            "ShowMenu": true,
            "Condition": !isMobile && !isImageRequest && isAdmin,
            "IsSelected": currentUrlLocalPath == userPageurl || currentUrlLocalPath == userPermissionUrl || currentUrlLocalPath == groupPermissionUrl ? "active" : ""
        }
    ]

    return customMenu;
}

function getCustomMenu() {
    var scope = angular.element('[ng-controller=CustomMenuCtrl]').scope();
    if (customUI.Profiles != null) {
        $.each(customUI.Profiles[0], function (index, val) {
            $.each(scope.menuList, function (i, value) {
                if (index == value.Display.replace(/\s+/g, "")) {
                    value.ShowMenu = val.ShowMenu;
                    value.Order = val.Order;
                }
            });
        });
    }

    var length = scope.menuList.length;
    if (customUI.CustomMenus != null) {
        $.each(customUI.CustomMenus, function (index, value) {
            value.Condition = !isMobile;
            value.MobileClassName = "mobile-hidden";
            value.ImageClassName = "custom-menu";
            value.IsSelected = currentUrlLocalPath == value.OpenLink ? "active" : "";
            scope.menuList[length++] = value;
        });
    }
}