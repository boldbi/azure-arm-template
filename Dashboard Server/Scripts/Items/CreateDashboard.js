var windowRef;
var timer;
var addButtonObj;
var progressNotifier;
var eTag;
var createTemplateDashboardDialog;
var isTemplateDashboardAdded;

var templateDashboard = angular.module('serverApp');

templateDashboard.controller('templateDashboardController', ["$scope", function ($scope) {
    $scope.templatedashboards = window.templatedashboardsList;
    $scope.orderList = "Provider";
    $scope.selectedDataSource = '';
    $scope.accessToken = '';
    $scope.searchQuery = "";
    $scope.canCreateDataSource = window.canCreateDataSource;
    $scope.categories = ['Domain', 'Name'];
    $scope.filter = {};
    $scope.showLoader = true;

    $scope.filterByDatasource = function (templatedashboards) {
        $('[data-toggle="tooltip"]').tooltip();
        var matchesAND = true;
        for (var obj in $scope.filter) {
            if ($scope.filter.hasOwnProperty(obj)) {
                if (noSubFilter($scope.filter[obj])) continue;
                if (!$scope.filter[obj][templatedashboards[obj]]) {
                    matchesAND = false;
                    break;
                }
            }
        }
        return matchesAND;
    };

    $scope.getItems = function (obj, array) {
        return (array || []).map(function (w) {
            return w[obj];
        }).filter(function (w, idx, arr) {
            if (typeof w === 'undefined') {
                return false;
            }
            return arr.indexOf(w) === idx;
        });
    };

    $scope.IsNullorWhitespace = function (name) {
        return (name == null || name == undefined || $.trim(name) == "");
    };

    function noSubFilter(obj) {
        for (var key in obj) {
            if (obj[key]) return false;
        }
        return true;
    }
}]);

$(document).ready(function () {
    isTemplateDashboardAdded = false;

    createTemplateDashboardDialog = new ejs.popups.Dialog({
        header: window.Server.App.LocalizationContent.CreateDashboardHeader,
        height: '100%',
        showCloseIcon: true,
        visible: false,
        isModal: true,
        close: onTemplateDashboardDialogClose,
        animationSettings: { effect: 'zoom' },
    });
    createTemplateDashboardDialog.appendTo('#create-dashboard-popup');

    var createDashboardWaitingPopupTemplateId = createLoader("create-dashboard-popup_wrapper");    
    $("#create-dashboard-popup_wrapper").ejWaitingPopup({ template: $("#" + createDashboardWaitingPopupTemplateId) });
    $('[data-toggle="tooltip"]').tooltip();

    progressNotifier = $.connection.progressHub;
    progressNotifier.client.sendMessage = function (message) {
        var data = jQuery.parseJSON(message);
        var id = "#progress-alert_" + data.ETag;
        $(id).remove();
        if (data.Status) {
            isTemplateDashboardAdded = true;
            var itemLink = '<a target="_blank" href="' + rootUrlAction + '/dashboards/' + data.ItemId + '/' + data.CategoryName + '/' + data.ItemName + '?showmydashboards=1">' + data.ItemName + '</a>';
            ProgressAlert(data.ETag, window.Server.App.LocalizationContent.TemplateDashboardReady, itemLink, 0, true);
        }
        else {
            parent.$('#progress-alert').fadeOut();
            WarningAlert(window.Server.App.LocalizationContent.TemplateDashboard, window.Server.App.LocalizationContent.TemplateDashboardWarningAlert, 7000);
        }
        var className = ".ItemDiv_" + data.ETag;
        var obj = $(document).find(className);
        obj.parent(".template-dashboard-buttons-div").show();
        obj.removeClass(className);
    };

    $.connection.hub.start();
});

$(document).on("click", "#CreateDashboard, .create-dashboard", function (e) {
    GetTemplateDashboards();
    createTemplateDashboardDialog.show();
    $("#create-dashboard-popup").removeClass("display-none");
});

$(document).on("click", ".deploy-template-dashboard", function (e) {
    GetTemplateDashboards();
    createTemplateDashboardDialog.show();
    $("#create-dashboard-popup").removeClass("display-none");
    $(".template-dashboard-section").click();
    $(".cookie-notification").addClass("cookie-margin");
});

//$(document).on("click", "#close-create-dashboard-popup", function (e) {
//    createTemplateDashboardDialog.show();
    
//});

function onTemplateDashboardDialogClose() {
    $(".fluent-popup-body").css("background-color", "#efefef");
    $("#popup-header-title").text(window.Server.App.LocalizationContent.CreateDashboardHeader);
    $("#create-dashboard-popup").addClass("display-none");
    $("#nav-backdrop").css("display", "none");
    intializeCheckBoxList();
    var $scope = angular.element('[ng-controller=templateDashboardController]').scope();
    $scope.filter = {};
    $scope.query = "";
    $(".clear-search").css("display", "none");
    $(".search-item").css("display", "block");
    $(".cookie-notification").removeClass("cookie-margin");

    if ((window.location.href.indexOf("/dashboards") > 0) && (parseInt(dashboardItemCount) === 0) && isTemplateDashboardAdded)
    {
        $("body").ejWaitingPopup("show");
        location.reload();
    }
}

$(document).on("click", ".template-dashboard-section", function (e) {
    if (!$(".template-dashboard-content-outer-div").length > 0) {
        $("#create-dashboard-popup_wrapper").ejWaitingPopup("show");
    }
    $("#popup-header-title").text(window.Server.App.LocalizationContent.TemplateDashboardHeader);
    $(".fluent-popup-body").css("background-color", "#ffffff");
});

$(document).on("click", ".datasource-list-group-item", function (e) {
    $(".datasource-list-group-item").removeClass("highlight-list-item");
    $(this).addClass("highlight-list-item");
});

function GetTemplateDashboards() {
    $("#create-dashboard-popup_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "GET",
        url: getTemplateDashboardUrl,
        data: {},
        success: function (data) {
            if (data.Status) {
                var scope = angular.element($("#template-listing-container")).scope();
                scope.$apply(function () {
                    scope.templatedashboards = data.Data;
                    scope.accessToken = data.AccessToken;
                    scope.showLoader = false;
                    $("#create-dashboard-popup_wrapper").ejWaitingPopup("show");
                });

                intializeCheckBoxList();
            }

            $('[data-toggle="tooltip"]').tooltip();
            $("#create-dashboard-popup_wrapper").ejWaitingPopup("hide");
        },
        error: function (e) {
            if ($("#template-listing-container").is(":visible")) {
                WarningAlert(window.Server.App.LocalizationContent.TemplateDashboard, window.Server.App.LocalizationContent.TemplateDashboardRetrieveWarningAlert, 7000);
            }
            $("#create-dashboard-popup_wrapper").ejWaitingPopup("hide");
        }
    });
}

function intializeCheckBoxList() {
    var $scope = angular.element('[ng-controller=templateDashboardController]').scope();
    $scope.categories.forEach(function (cat) {
        var i = 0;
        $scope.getItems(cat, $scope.templatedashboards).forEach(function (tempDashboard) {
            i = i + 1;
            var className = "template-dashboard-" + cat + "-checkbox-" + i;
            if (!$("." + className)[0].classList.contains("e-checkbox")) {
                var checkBoxObj = new ejs.buttons.CheckBox({ label: tempDashboard, cssClass: 'e-small' });
                checkBoxObj.appendTo('.' + className);
            }
            else {
                var checkboxInstance = document.getElementsByClassName(className)[0].ej2_instances[0];
                if (checkboxInstance.checked) {
                    checkboxInstance.checked = false;
                }
            }
        });
    });
}

function checkboxFilter(args) {
    if (args.checked) {
        var $scope = angular.element('[ng-controller=templateDashboardController]').scope();
        var value = $(this)[0].element.attributes[0].value;
        $scope.selectedDataSource = value;
    }
}

function noSubFilter(subFilterObj) {
    for (var key in subFilterObj) {
        if (subFilterObj[key]) return false;
    }
    return true;
}

$(document).on("click", ".template-dashboard-add-button", function (e) {
    if (windowRef !== undefined) {
        addButtonObj.parent(".template-dashboard-buttons-div").show();
        $(".process-notify").addClass("display-none");
        addButtonObj.parent(".template-dashboard-buttons-div").siblings('.loader-gif').hide();
        clearInterval(timer);
        windowRef.close();
    }

    addButtonObj = $(this);
    $(window).off('message', $.proxy(handleAuthorizeMessage, window, addButtonObj));
    $(window).on('message', $.proxy(handleAuthorizeMessage, window, addButtonObj));
    windowRef = window.open($(this).attr("data-authorize-url") + "&origin=" + window.location.origin, "", "height=600,width=500");
    timer = setInterval($.proxy(checkWindowRef, 500, addButtonObj));
    addButtonObj.parent(".template-dashboard-buttons-div").hide();
    addButtonObj.parent().parent(".template-dashboard-content").append($("<span class='col-sm-4 no-padding loader-gif'><div class='loader-blue loader-icon' id='loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='12' fill='none' stroke-width='3' stroke-miterlimit='10'></circle></svg></div></span>"));
    addButtonObj.parent().parent().find(".process-notify").removeClass("display-none");
});

$(document).on("click", ".add-sample-data-dashboard", function (e) {
    eTag = generateUUID();
    var categoryName = $(this).attr("data-category-name");
    var itemName = $(this).attr("data-template-name");
    var description = $(this).attr("data-template-description");
    var fileName = $(this).attr("data-template-filename");
    var accessToken = $(this).attr("data-access-token");
    var connectionProvider = $(this).attr("data-connection-provider");
    var connectedService = $(this).attr("data-connection-service");
    progressNotifier.server.addTemplateDashboard(itemName, description, fileName, categoryName, "", accessToken, eTag, true, connectionProvider, connectedService);
    ProgressAlert(eTag, window.Server.App.LocalizationContent.TemplateDashboard, window.Server.App.LocalizationContent.TemplateDashboardNotify, 0, false);
    SetMaxZindexForProgressNotifier();
    $(this).parent(".template-dashboard-buttons-div").hide();
    var className = "ItemDiv_" + eTag;
    $(this).addClass(className);
});

function handleAuthorizeMessage(addButtonObj, evt) {
    if (evt.originalEvent.origin === dataServiceUrl) {
        eTag = generateUUID();
        var categoryName = addButtonObj.attr("data-category-name");
        var itemName = addButtonObj.attr("data-template-name");
        var description = addButtonObj.attr("data-template-description");
        var fileName = addButtonObj.attr("data-template-filename");
        var accessToken = addButtonObj.attr("data-access-token");
        var connectionProvider = addButtonObj.attr("data-connection-provider");
        var connectedService = addButtonObj.attr("data-connection-service");
        progressNotifier.server.addTemplateDashboard(itemName, description, fileName, categoryName, jQuery.parseJSON(evt.originalEvent.data).Code, accessToken, eTag, false, connectionProvider, connectedService);
        ProgressAlert(eTag, window.Server.App.LocalizationContent.TemplateDashboard, window.Server.App.LocalizationContent.TemplateDashboardNotify, 0, false);
        SetMaxZindexForProgressNotifier();
        addButtonObj.parent(".template-dashboard-buttons-div").show();
        $(".process-notify").addClass("display-none");
        addButtonObj.siblings('.loader-gif').hide();   
        $(window).off('message', $.proxy(handleAuthorizeMessage, window, addButtonObj));
    }
}

function checkWindowRef(addButtonObj) {
    if (windowRef.closed) {
        addButtonObj.parent(".template-dashboard-buttons-div").show();
        $(".process-notify").addClass("display-none");
        addButtonObj.parent(".template-dashboard-buttons-div").siblings('.loader-gif').hide();
        clearInterval(timer);
    }
}

$(document).on('click', ".temp-image-maximize", function () {
    var maxZindex = getMaxZIndex();
    $('#create-dashboard-image-popup').show().css("z-index", maxZindex + 1);
    $("#create-dashboard-image-popup-content").attr("src", $(this).parent().find("img").attr("src"));
    createTemplateDashboardDialog.closeOnEscape = false;
});

$(document).on('click', ".template-dashboard-image img", function () {
    var maxZindex = getMaxZIndex();
    $('#create-dashboard-image-popup').show().css("z-index", maxZindex + 1);
    $("#create-dashboard-image-popup-content").attr("src", $(this).attr("src"));
    createTemplateDashboardDialog.closeOnEscape = false;
});

$(document).on('click', ".create-dashboard-image-popup-close", function () {
    $("#create-dashboard-image-popup").hide().css("z-index", "0");
    createTemplateDashboardDialog.closeOnEscape = true;
});

$(document).on("keyup", "body", function (event) {
    if ($("#create-dashboard-image-popup-content").is(":visible") && event.keyCode === 27) {
        createTemplateDashboardDialog.closeOnEscape = true;
        $("#create-dashboard-image-popup").hide().css("z-index", "0");
    }
});

function SetMaxZindexForProgressNotifier() {
    var maxZindex = getMaxZIndex();
    $("#progress-alert-container").css("z-index", maxZindex + 1);
    $("#warning-alert").css("z-index", maxZindex + 1);
    $("#success-alert").css("z-index", maxZindex + 1);
}