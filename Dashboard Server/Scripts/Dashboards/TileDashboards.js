var displayCategory = {
    AllCategory: 1,
    FavouriteItems: 2,
    PublicItems: 3,
    RecentItems: 4,
    AllDashboards: 5,
    PublicWidgets: 6,
    AllWidgets: 7,
    AllReports: 8,
    DraftItems: 9,
    OwnedByMe: 10,
    SharedWithMe: 11,
    SpecificCategory: 100
};
var defaultSkipDashboardCount = 0;
var defaultTakeDashboardCount = 50;
var skipDashboardCount = defaultSkipDashboardCount;
var isVirtualRequested = false;
var searchValue = "";

$(document).on("touchend", "[data-toggle='dashboard-list-tooltip']", function (e) {
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
        $(this).click();
    }
});

$(document).ready(function () {
    intializeGetLinkDialog();
    if (parseInt(dashboardItemCount) === 0) {
        $('.preloader-wrap').fadeOut();
    }
});

serverApp.controller('DashboardCtrl', ["$scope", "$http", "$timeout", "$window", "ajaxService", function ($scope, $http, $timeout, $window, ajaxService) {
    $scope.activeMenu = displayCategory.AllDashboards;
    $scope.activeMenuLabel = window.Server.App.LocalizationContent.AllDashboardInCategory;
    $scope.selectedSort = "ModifiedDate";
    $scope.sortDirection = "descending";
    if (searchKey != "") {
        searchValue = "datasource:" + searchKey;
        $("#dashboard-search-items").val(searchValue);
    }

    if (searchValue != "") {
        $scope.dashboardSearchQuery = searchValue;
    }
    else {
        $scope.dashboardSearchQuery = '';
    }

    $scope.selectedSortLabel = window.Server.App.LocalizationContent.RecentlyUpdated;
    $scope.selectedFilter = displayCategory.AllDashboards;
    $scope.selectedFilterLabel = window.Server.App.LocalizationContent.All;
    $scope.canCreateDashboard = typeof (canCreateDashboard) != "undefined" ? canCreateDashboard : false;
    $scope.currentUserId = currentUserId;
    $scope.isAdmin = isAdmin;
    $scope.isMarkItemsPublic = isMarkItemsPublic;
    $scope.isMaster = isMaster;
    $scope.isSelfHosted = isSelfHosted;
    $scope.isAppendLoading = false;

    //Mobile
    $scope.expandCatSec = false;

    updateFilterParameter($scope.selectedFilter, undefined, undefined, $scope.dashboardSearchQuery, 0);

    $scope.isTablet = window.innerWidth <= 1040;
    $scope.isMobile = window.innerWidth <= 768;
    $scope.samePagePreview = samePagePreview;

    $scope.setActive = function (value, label, $event) {
        $event.preventDefault();
        $scope.dashboardSearchQuery = '';
        $scope.selectedFilter = $scope.selectedFilter != displayCategory.DraftItems ? $scope.selectedFilter : displayCategory.AllDashboards;
        $scope.expandCatSec = false;
        if ($(this)[0].categoryItem != undefined) {
            if ($($event.target).hasClass("category-name") || $($event.target).hasClass("category-count")) {
                $scope.activeMenu = value;
                $scope.activeMenuLabel = label;
                $scope.categoryCreatedBy = $(this)[0].categoryItem.CreatedByDisplayName;
                var filerSettings = [{ 'PropertyName': "CategoryName", 'FilterType': "equal", 'FilterKey': $(this)[0].categoryItem.Name }];
                updateFilterParameter($scope.selectedFilter, undefined, undefined, undefined, filerSettings);
                $scope.refreshDashboardList();
            }
        } else {
            $scope.activeMenu = value;
            $scope.activeMenuLabel = label;
            $scope.categoryCreatedBy = "";
            if (value == displayCategory.DraftItems) {
                updateFilterParameter(displayCategory.DraftItems, undefined, undefined, undefined, 0);
            } else {
                updateFilterParameter($scope.selectedFilter, undefined, undefined, undefined, 0);
            }
            $scope.refreshDashboardList();
            $('.preloader-wrap').fadeOut();
        }

        historyPush();
    };

    $scope.setSelectedSort = function ($event, value, sortOrder) {
        $scope.selectedSort = value;
        $scope.sortDirection = sortOrder;
        $scope.selectedSortLabel = $event.target.textContent;
        var sortSettings = [{ Name: value, Direction: $scope.sortDirection }];
        updateFilterParameter(undefined, undefined, undefined, $scope.dashboardSearchQuery, undefined, sortSettings);
        $scope.refreshDashboardList();
    };

    $scope.setSelectedFilter = function ($event, value) {
        $scope.selectedFilter = value;
        $scope.selectedFilterLabel = $event.target.textContent;
        updateFilterParameter(value, undefined, undefined, $scope.dashboardSearchQuery, undefined, undefined);
        $scope.refreshDashboardList();
        historyPush();
    };

    $scope.dashboardDataBindComplete = false;
    $scope.doDashboardComplete = function () {
        $scope.dashboardDataBindComplete = true;
        $scope.isAppendLoading = false;
        $timeout(function () {
            refreshToolTip("dashboard-list-tooltip");
            refreshDashboardScroll();
        }, 100);

        if (typeof ($("#dashboard-rendering-iframe").attr("src")) == "undefined" && !$(this)[0].dashboardItem.IsDraft && !$scope.isMobile) {
            $("#dashboard-rendering").show();
            var dashboardUrl = viewDashboardUrlAction + "/" + $(this)[0].dashboardList[0].Id + "/" + $(this)[0].dashboardList[0].CategoryName + "/" + $(this)[0].dashboardList[0].Name;
            $("#dashboard-rendering-iframe, #dashboard-rendering").css("width", $("#content-area").width() - 330);
            $("#dashboard-rendering-iframe").attr("src", encodeURI(dashboardUrl));
            $(".dashboard-list-section li:first-child").addClass("active");
        }
        $('.preloader-wrap').fadeOut();
    }

    $scope.categoryDataBindComplete = false;
    $scope.doCategoryComplete = function () {
        $scope.categoryDataBindComplete = true;
        $timeout(function () {
            refreshToolTip("category-list-tooltip");
            $scope.refreshCategoryScroll();
        }, 100);
    }

    $scope.toggleFavorite = function () {
        var currentDashboardItem = $(this)[0].dashboardItem;
        toggleFavorite(currentDashboardItem, $http);
    }

    $scope.preventDefault = function (e) {
        if ($scope.samePagePreview && !$scope.isMobile) {
            e.preventDefault();
            var dashboardUrl = viewDashboardUrlAction + "/" + $(this)[0].dashboardItem.Id + "/" + $(this)[0].dashboardItem.CategoryName + "/" + $(this)[0].dashboardItem.Name;
            $("#dashboard-rendering-iframe").attr("src", encodeURI(dashboardUrl));
        }
    }

    $scope.expandCategoryList = function () {
        $scope.expand = !$scope.expand;
        $scope.refreshCategoryScroll();
    }

    $scope.viewDashboardUrl = function (id, categoryName, name) {
        var iframeUrl = $("#dashboard-rendering-iframe").attr("src");
        if (typeof (iframeUrl) != "undefined" && iframeUrl.contains("/" + id + "/") && !$(this)[0].dashboardItem.IsDraft) {
            $(".dashboard-tile").eq($(this)[0].$index).addClass("active");
        } 
        return encodeURI(viewDashboardUrlAction + "/" + id + "/" + categoryName + "/" + name + "?showmydashboards=1");
    }

    $scope.editDraftDashboardUrl = function (id, name) {
        return encodeURI(editDashboardUrl + "/" + id + "/draft/" + name);
    }

    $scope.doDashboardSearch = function () {
        updateFilterParameter(undefined, defaultSkipDashboardCount, defaultTakeDashboardCount, $scope.dashboardSearchQuery, undefined, undefined);
        $scope.dashboardDataBindComplete = false;
        $scope.totalDashboardCount = $scope.totalDashboardCount == 0 ? 1 : $scope.totalDashboardCount;
        ajaxService.getData(getItemUrl, $.param($scope.filterParameter)).then(function (response) {
            if (response.count != undefined) {
                $scope.dashboardList = response.result;
                $scope.totalDashboardCount = response.count;
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.Error, window.Server.App.LocalizationContent.ErrorGettingDashboard, 7000);
            }
        });
    };

    $scope.onDashboardSearchClear = function () {
        $scope.dashboardSearchQuery = '';
        $scope.doDashboardSearch();
        $timeout(function () {
            $("#dashboard-search-items").focus();
        }, 100);
    }

    $scope.onCategorySearchClear = function () {
        $scope.categorySearchQuery = '';
        $scope.refreshCategoryScroll();
        $timeout(function () {
            $(".category-search-box").focus();
        }, 100);
    }

    $scope.refreshDashboardList = function (isAppend) {
        $scope.dashboardDataBindComplete = isAppend;
        $scope.totalDashboardCount = $scope.totalDashboardCount == 0 ? 1 : $scope.totalDashboardCount;
        if (isAppend) {
            $timeout(function () {
                refreshDashboardScroll();
            }, 1000);
        }

        ajaxService.getData(getItemUrl, $.param($scope.filterParameter)).then(function (response) {
            if (response.count != undefined) {
                if (isAppend) {
                    $scope.dashboardList = $scope.dashboardList.concat(response.result);
                } else {
                    $scope.dashboardList = response.result;
                }
                $scope.totalDashboardCount = response.count;
                isVirtualRequested = false;
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.Error, window.Server.App.LocalizationContent.ErrorGettingDashboard, 0);
            }

            if ($scope.totalDashboardCount == 0) {
                $('.preloader-wrap').fadeOut();
            }
        });
    }

    $scope.refreshCategoryList = function (categoryId) {
        $http({
            method: "post",
            url: getCategories,
            data: ""
        }).then(function (response) {
            $scope.categoryList = response.data;
            if (categoryId !== null && categoryId !== undefined) {
                setCategorySection(categoryId)
            }
        }, function () {
            WarningAlert(window.Server.App.LocalizationContent.Error, window.Server.App.LocalizationContent.ErrorGettingCategory, 0);
        });
    }

    if (categoryList != "" && categoryList.length != 0) {
        $scope.categoryList = categoryList;
    } else {
        $scope.refreshCategoryList();
    }

    $scope.setWidthForDashboardName = function () {
        if ($scope.activeMenu == displayCategory.AllDashboards) {
            if ($scope.isTablet) {
                if ($scope.isMobile) {
                    return "col-xs-12";
                }

                return "col-xs-9";
            } else {
                return "col-xs-6";
            }
        } else {
            if ($scope.isTablet) {
                return "col-xs-12";
            } else {
                return "col-xs-8";
            }
        }
    }

    //Routing
    applyRouting();

    $scope.refreshDashboardList();

    angular.element($window).bind('resize', function () {
        $scope.isTablet = window.innerWidth <= 1040;
        $scope.isMobile = window.innerWidth <= 768;
        $scope.$apply();
        refreshCategoryScroll();
        refreshDashboardScroll();
        refreshCustomUI();
    });

    $scope.refreshCategoryScroll = function () {
        $timeout(function () {
            refreshCategoryScroll();
        }, 1000);
    }

    $scope.onMobileSearchClicked = function () {
        $scope.showSearch = true;
        $timeout(function () {
            $("#dashboard-search-items").focus();
        }, 100);
    }

    $scope.onSearchFocusOut = function () {
        $scope.isFocus = false;

        if (($scope.isTablet || $scope.samePagePreview) && $scope.dashboardSearchQuery == "") {
            $scope.showSearch = false;
        };
    }

    $scope.getItemSettingsDialog = function () {
        var itemDetail = $(this)[0].dashboardItem;
        $itemSettings = openItemSettingsDialog(itemDetail);
    }

    $scope.getPublishSiteDetailDialog = function () {
        var itemDetail = $(this)[0].dashboardItem;
        publishSiteDetailDialog(itemDetail);
    }

    //Actions
    $scope.openInfo = function ($event) {
        var itemInfoCtrl = angular.element('[ng-controller=ItemInfoCtrl]').scope();
        itemInfoCtrl.openInfoDialog($(this)[0].dashboardItem, true);
    };

    $scope.openDashboard = function ($event) {
        if (($($event.target.parentElement).hasClass('open-link') || $($event.target).hasClass('open-link')) && !($($event.target.parentElement).hasClass('context-menu') || $($event.target).hasClass('context-menu'))) {
            var currentDashboardItem = $(this)[0].dashboardItem;
            var url = viewDashboardUrlAction + "/" + currentDashboardItem.Id + "/" + currentDashboardItem.CategoryName + "/" + currentDashboardItem.Name;
            window.open(url, "_blank");
        }
    };

    $scope.editDashboard = function () {
        var currentDashboardItem = $(this)[0].dashboardItem;
        if (currentDashboardItem.IsMultiDashboard) {
            geteditSlideshowDetail(currentDashboardItem.Id, true);
        } else {
            var url = editDashboardUrl + "/" + currentDashboardItem.Id + "/" + currentDashboardItem.CategoryName + "/" + currentDashboardItem.Name;
            window.open(url, "_blank");
        }
    };

    $scope.editDraftDashboard = function () {
        var currentDashboardItem = $(this)[0].dashboardItem;
        var url = editDashboardUrl + "/" + currentDashboardItem.Id + "/draft/" + currentDashboardItem.Name;
        window.open(url, "_blank");
    };

    $scope.makePublic = function () {
        makePublic($(this)[0].dashboardItem);
    };

    $scope.makePrivate = function () {
        makePrivate($(this)[0].dashboardItem);
    };

    $scope.getItemLink = function () {
        GetLink($(this)[0].dashboardItem);
    };

    $scope.getEmbedCode = function () {
        EmbedCode($(this)[0].dashboardItem);
    };

    $scope.getDashboardViews = function ($event) {
        getDashboardViews($(this)[0].dashboardItem, $event.currentTarget.parentElement);
    };

    $scope.viewSchedules = function () {
        var currentDashboardItem = $(this)[0].dashboardItem;
        var url = viewSchedulesUrl + "?dashboard=" + currentDashboardItem.Name;
        window.open(url, "_blank");
    };

    $scope.copyDashboard = function () {
        isMultiTab = false;
        CopyDashboardItem($(this)[0].dashboardItem, 'Copy');
    };

    $scope.cloneDashboard = function () {
        isMultiTab = false;
        CopyDashboardItem($(this)[0].dashboardItem, 'Clone');
    };

    $scope.moveDashboard = function () {
        isMultiTab = false;
        MoveDashboardItem($(this)[0].dashboardItem, 'Move');
    };

    $scope.scheduleDashboard = function () {
        ScheduleDashboard($(this)[0].dashboardItem);
    };

    $scope.shareDashboardPermission = function () {
        shareDashboardPermission($(this)[0].dashboardItem);
    };

    $scope.sharePermission = function () {
        shareDashboardPermission($(this)[0].categoryItem);
    };

    $scope.versionHistory = function () {
        var currentDashboardItem = $(this)[0].dashboardItem;
        VersionHistory(currentDashboardItem.Id, currentDashboardItem.Name, currentDashboardItem.IsMultiDashboard);
    };

    $scope.updateDashboard = function () {
        EditDashboard($(this)[0].dashboardItem.Id);
    };

    $scope.updateDashboardDataSource = function () {
        UpdateDashboardDataSource($(this)[0].dashboardItem.Id);
    };

    $scope.deleteItem = function () {
        DeleteItem($(this)[0].dashboardItem);
    };

    //Category actions
    $scope.editCategory = function ($event) {
        EditCategory($(this)[0].categoryItem.Id, $(this)[0].categoryItem.Name, $(this)[0].categoryItem.Description);
    };

    $scope.deleteCategory = function () {
        deleteCategory($(this)[0].categoryItem);
    };

    //Mobile
    $scope.expandCategorySection = function () {
        $scope.expandCatSec = !$scope.expandCatSec;
        $scope.refreshCategoryScroll();
    }
}]);

serverApp.directive('myPostRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            scope.$eval('doDashboardComplete()');
        }
    };
})

serverApp.directive('categoryRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            scope.$eval('doCategoryComplete()');
        }
    };
})

serverApp.animation('.category-slide', function () {
    var NG_HIDE_CLASS = 'ng-hide';
    return {
        beforeAddClass: function (element, className, done) {
            if (className === NG_HIDE_CLASS) {
                element.slideUp(done);
            }
        },
        removeClass: function (element, className, done) {
            if (className === NG_HIDE_CLASS) {
                element.hide().slideDown(done);
            }
        }
    }
});

serverApp.controller('MobileViewSortCtrl', ["$scope", function ($scope) {
    $scope.selectedSort = "ModifiedDate";
    $scope.sortDirection = "descending";

    $scope.updateSortSelection = function ($event, value, sortOrder) {
        $scope.selectedSort = value;
        $scope.sortDirection = sortOrder;
    }

    $scope.onSortApplyClicked = function () {
        var dashboardCtrl = angular.element('[ng-controller=DashboardCtrl]').scope();
        dashboardCtrl.selectedSort = $scope.selectedSort;
        dashboardCtrl.sortDirection = $scope.sortDirection;
        var sortSettings = [{ Name: dashboardCtrl.selectedSort, Direction: dashboardCtrl.sortDirection }];
        updateFilterParameter(undefined, undefined, undefined, dashboardCtrl.dashboardSearchQuery, undefined, sortSettings);
        dashboardCtrl.refreshDashboardList();
    }
}]);

function toggleFavorite(dashboardItem, $http) {
    dashboardItem.IsFavorite = !dashboardItem.IsFavorite;
    $http({
        method: "post",
        url: favoriteItemUrl,
        data: $.param({ itemId: dashboardItem.Id, favoriteValue: dashboardItem.IsFavorite })
    }).then(function (response) {
        if (!response.data.Success) {
            dashboardItem.IsFavorite = !dashboardItem.IsFavorite;
            WarningAlert(window.Server.App.LocalizationContent.MarkFavoriteError, window.Server.App.LocalizationContent.InternalServerError, 7000);
        }
    }, function () {
        WarningAlert(window.Server.App.LocalizationContent.MarkFavoriteError, window.Server.App.LocalizationContent.InternalServerError, 7000);
    });
}

function refreshCategoryScroll() {
    $('.tooltip').tooltip('hide');
    var headerHeight = ($("#header-area").is(":visible") ? $("#header-area").outerHeight() : 0) + ($(".mobile-header").is(":visible") ? $(".mobile-header").outerHeight() : 0);
    var scrollerHeight = $(window).outerHeight() - (headerHeight + $(".category-bar-ul").outerHeight() + $(".category-search-area").outerHeight(true));
    $("#parent-category-scroll-element").ejScroller({
        height: scrollerHeight,
        width: "100%",
        scrollerSize: 7,
        buttonSize: 0,
        enableTouchScroll: true,
        autoHide: true,
        scrollOneStepBy: 30,
        scroll: function () { $('.tooltip').tooltip('hide'); }
    });

    var scrollercontrol = $("#parent-category-scroll-element").ejScroller("instance");
    scrollercontrol.model.height = scrollerHeight;
    scrollercontrol.refresh();
    $("#parent-category-scroll-element .e-scrollbar").show();
    refreshToolTip("category-list-tooltip");
}

function refreshDashboardScroll() {
    $('.tooltip').tooltip('hide');
    var headerHeight = ($("#header-area").is(":visible") ? $("#header-area").outerHeight() : 0) + ($(".mobile-header").is(":visible") ? $(".mobile-header").outerHeight() : 18);
    var scrollerHeight = $(window).outerHeight() - (headerHeight  + $(".dashboard-action-container").outerHeight() + $(".dashboard-list-separator").outerHeight(true) + $(".dashboard-list-header").outerHeight());
    var scrollerWidth = $(window).innerWidth() - ((window.innerWidth <= 1040 ? 0 : $("#menu-area").outerWidth()) + ($("#category-panel").is(":visible") ? $("#category-panel").outerWidth() : 0) + 31);
    $("#parent-dashboard-scroll-element").ejScroller({
        height: scrollerHeight,
        width: "100%",
        scrollerSize: 7,
        buttonSize: 0,
        enableTouchScroll: true,
        autoHide: true,
        scrollOneStepBy: 40,
        scroll: "onDashboardScrolling"
    });

    var scrollercontrol = $("#parent-dashboard-scroll-element").ejScroller("instance");
    scrollercontrol.model.height = scrollerHeight;
    scrollercontrol.model.width = scrollerWidth;
    scrollercontrol.refresh();
    $("#parent-dashboard-scroll-element .e-scrollbar").show();
}

function onDashboardScrolling(e) {
    $('.tooltip').tooltip('hide');
    var scrollerObj = $("#parent-dashboard-scroll-element").ejScroller("instance");
    if (scrollerObj) {
        scrollerPositon = e.scrollTop;
        if (document.querySelectorAll("#dashboard-scroll-content")[0].scrollHeight - (e.scrollTop + 5) <= scrollerObj.option("height")) {
            var $scope = angular.element('[ng-controller=DashboardCtrl]').scope();
            if ($scope.totalDashboardCount > skipDashboardCount + defaultTakeDashboardCount && !isVirtualRequested) {
                $scope.isAppendLoading = true;
                isVirtualRequested = true;
                updateFilterParameter(undefined, skip = skipDashboardCount + defaultTakeDashboardCount, undefined, $scope.dashboardSearchQuery, undefined, undefined);
                $scope.refreshDashboardList(true);
            }
        }
    }
}

function updateFilterParameter(displayCategory, skip, take, searchKey, filterCollection, sortSettings) {
    if (skip == undefined) {
        skip = defaultSkipDashboardCount
    }

    if (take == undefined) {
        take = defaultTakeDashboardCount
    }

    if (searchKey == undefined) {
        searchKey = ""
    }

    var $scope = angular.element('[ng-controller=DashboardCtrl]').scope();
    skipDashboardCount = skip;
    if ($scope.filterParameter != undefined) {
        if (displayCategory != undefined) {
            $scope.filterParameter.displayCategory = displayCategory;
        }
        if (skip != undefined) {
            $scope.filterParameter.skip = skip;
        }
        if (take != undefined) {
            $scope.filterParameter.take = take;
        }
        if (searchKey != undefined) {
            $scope.filterParameter.searchKey = searchKey;
        }
        if (filterCollection != undefined) {
            $scope.filterParameter.filterCollection = filterCollection;
        }

        if (sortSettings != undefined) {
            $scope.filterParameter.sorted = sortSettings;
        }
    } else {
        $scope.filterParameter = { displayCategory: displayCategory, requiresCounts: true, skip: skip, take: take, searchKey: searchKey };
        $scope.filterParameter["filterCollection"] = filterCollection;
    }
}

function ResetItemList(itemType) {
    var $scope = angular.element('[ng-controller=DashboardCtrl]').scope();
    if (itemType == ItemType.Dashboard) {
        $scope.refreshDashboardList();
    }
    else {
        $scope.refreshCategoryList();
    }
}

function RefreshCategorySection(toCategoryId) {
    var $scope = angular.element('[ng-controller=DashboardCtrl]').scope();
    $scope.refreshCategoryList(toCategoryId);
}

$(document).on('shown.bs.dropdown', '#dashboard-scroll-content .dashboard-tile', function () {
    $(".tooltip").hide();
    if ($(this).find(".context-menu").length > 0) {
        var availableTopHeight = $(this).offset().top + $(this).outerHeight(true) / 2 - $("#parent-dashboard-scroll-element").offset().top;
        var availableBottomHeight = $("#dashboard-scroll-content").height() - $(this).offset().top - $(this).outerHeight(true) / 2;
        var dropDownHeight = $(this).find(".dashboard-options").outerHeight(true);
        if (availableBottomHeight <= dropDownHeight && availableTopHeight >= dropDownHeight) {
            $(this).find(".context-menu").removeClass("dropdown").addClass("dropup");
        } else {
            refreshDashboardScroll();
        }
    }
});

$(document).on('hidden.bs.dropdown', '#dashboard-scroll-content .dashboard-tile', function () {
    refreshDashboardScroll();
});

$(document).on('shown.bs.dropdown', '#category-scroll-content .category-item', function () {
    $(".tooltip").hide();
    if ($(this).find(".category-context-menu").length > 0) {
        var parentCategoryScrollElement = $("#parent-category-scroll-element");
        var availableTopHeight = $(this).offset().top + $(this).outerHeight(true) / 2 - parentCategoryScrollElement.offset().top;
        var availableBottomHeight = parentCategoryScrollElement.height() - ($(this).offset().top - parentCategoryScrollElement.offset().top + $(this).outerHeight(true) / 2);
        var dropDownHeight = $(this).find(".category-context-menu .dropdown-menu").outerHeight(true);
        if (availableBottomHeight <= dropDownHeight && availableTopHeight >= dropDownHeight) {
            $(this).find(".category-context-menu").removeClass("dropdown").addClass("dropup");
        } else {
            refreshCategoryScroll();
        }
    }
});

$(document).on('hidden.bs.dropdown', '#dashboard-scroll-content .dashboard-tile', function () {
    refreshCategoryScroll();
});

function historyPush() {
    var $scope = angular.element('[ng-controller=DashboardCtrl]').scope();
    var urlViewSearchQuery = "";
    switch ($scope.filterParameter.displayCategory) {
        case displayCategory.AllDashboards:
            urlViewSearchQuery += "view=all"
            break;
        case displayCategory.FavouriteItems:
            urlViewSearchQuery += "view=favorites"
            break;
        case displayCategory.PublicItems:
            urlViewSearchQuery += "view=public"
            break;
        case displayCategory.OwnedByMe:
            urlViewSearchQuery += "view=owned"
            break;
        case displayCategory.SharedWithMe:
            urlViewSearchQuery += "view=shared"
            break;
        case displayCategory.DraftItems:
            urlViewSearchQuery += "view=drafts"
            break;
    }

    var urlCategorySearchQuery = "";
    if ($scope.filterParameter.filterCollection != undefined && $scope.filterParameter.filterCollection != 0 && $scope.filterParameter.filterCollection[0].FilterKey != undefined) {
        urlCategorySearchQuery += "category=" + $scope.filterParameter.filterCollection[0].FilterKey;
    }

    var clickedSearchQuery = "";
    if (!isNullOrWhitespace(urlCategorySearchQuery)) {
        clickedSearchQuery += "?" + urlCategorySearchQuery;
        if (!isNullOrWhitespace(urlViewSearchQuery)) {
            clickedSearchQuery += "&" + urlViewSearchQuery;
        }
    } else if (!isNullOrWhitespace(urlViewSearchQuery)) {
        clickedSearchQuery += "?" + urlViewSearchQuery;
    }

    if (!isNullOrWhitespace(clickedSearchQuery)) {
        var clickedUrl = window.location.pathname + clickedSearchQuery;
        var currentUrl = window.location.pathname + window.location.search;
        if (currentUrl != clickedUrl && window.innerWidth >= 1041) {
            if (history.pushState != undefined && clickedUrl != "") {
                history.pushState({}, "", clickedUrl);
            }
        }
    }
}

function applyRouting() {
    var $scope = angular.element('[ng-controller=DashboardCtrl]').scope();
    $scope.activeMenu = displayCategory.AllDashboards;
    $scope.activeMenuLabel = window.Server.App.LocalizationContent.AllDashboardInCategory;
    $scope.selectedFilter = displayCategory.AllDashboards;
    $scope.selectedFilterLabel = window.Server.App.LocalizationContent.All;
    var currentView = decodeURI(getQueryVariable("view"));
    if (!isEmptyOrWhitespace(currentView)) {
        switch (currentView.toLowerCase()) {
            case ("favorites"):
                $scope.selectedFilter = displayCategory.FavouriteItems;
                $scope.selectedFilterLabel = window.Server.App.LocalizationContent.Favorites;
                break;
            case ("public"):
                $scope.selectedFilter = displayCategory.PublicItems;
                $scope.selectedFilterLabel = window.Server.App.LocalizationContent.Public;
                break;
            case ("owned"):
                $scope.selectedFilter = displayCategory.OwnedByMe;
                $scope.selectedFilterLabel = window.Server.App.LocalizationContent.OwnedByMe;
                break;
            case ("shared"):
                $scope.selectedFilter = displayCategory.SharedWithMe;
                $scope.selectedFilterLabel = window.Server.App.LocalizationContent.SharedWithMe;
                break;
            case ("drafts"):
                $scope.activeMenu = displayCategory.DraftItems;
                $scope.activeMenuLabel = window.Server.App.LocalizationContent.Drafts;
                $scope.selectedFilter = displayCategory.DraftItems;
                break;
            case ("categories"):
                $scope.expand = true;
                break;
        }

        updateFilterParameter($scope.selectedFilter, undefined, undefined, $scope.dashboardSearchQuery, 0);
    }

    var currentCategory = decodeURI(getQueryVariable("category"));
    if (!isEmptyOrWhitespace(currentCategory)) {
        $scope.expand = true;
        if ($scope.categoryList != undefined) {
            var currentCategoryObject = $scope.categoryList.filter(function (a) { return a.Name.toLowerCase() === currentCategory.toLowerCase(); })[0];
            if (currentCategoryObject != undefined && currentCategoryObject.Id != undefined && currentCategoryObject.Name != undefined) {
                $scope.activeMenu = currentCategoryObject.Id;
                $scope.activeMenuLabel = currentCategoryObject.Name;
                $scope.categoryCreatedBy = currentCategoryObject.CreatedByDisplayName;
                var filerSettings = [{ 'PropertyName': "CategoryName", 'FilterType': "equal", 'FilterKey': currentCategoryObject.Name }];
                updateFilterParameter($scope.selectedFilter, undefined, undefined, undefined, filerSettings);
            } else {
                updateFilterParameter($scope.selectedFilter, undefined, undefined, undefined, 0);
            }
        }
    }
}

window.onpopstate = function () {
    applyRouting();
    ResetItemList(ItemType.Dashboard);
}

function setCategorySection(toCategoryId) {
    var $scope = angular.element('[ng-controller=DashboardCtrl]').scope();
    var toCategoryObject = $scope.categoryList.filter(function (a) { return a.Id == toCategoryId; })[0];
    if (toCategoryObject != undefined) {
        $scope.activeMenu = toCategoryId;
        $scope.activeMenuLabel = toCategoryObject.Name;
        $scope.categoryCreatedBy = toCategoryObject.CreatedByDisplayName;
        var filerSettings = [{ 'PropertyName': "CategoryName", 'FilterType': "equal", 'FilterKey': toCategoryObject.Name }];
        updateFilterParameter($scope.selectedFilter, undefined, undefined, undefined, filerSettings);
        $scope.refreshDashboardList();
        $scope.refreshCategoryScroll();
    }
}

$(document).on('mousedown touchstart', '#parent-dashboard-scroll-element .e-scrollbar, #parent-category-scroll-element .e-scrollbar', function () {
    $(this).addClass('active');
});

$(document).on('mouseup touchend mouseleave', '#server-app-container', function () {
    $("#parent-dashboard-scroll-element .e-scrollbar, #parent-category-scroll-element .e-scrollbar").removeClass('active');
});

$(document).on('click', '.dashboard-tile', function () {
    $(".dashboard-list-section li").removeClass("active");
    $(this).addClass('active');
});

function refreshCustomUI() {
    $("#dashboard-rendering-iframe, #dashboard-rendering").css("width", $("#content-area").width() - 330);
}