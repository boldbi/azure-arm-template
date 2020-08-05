$(document).ready(function () {
    var childDashboards = [];
    $(document).on("click", ".dashboard-sort-options, #order", function (e) {
        var orderChange;
        if ($(this).attr("id") != "order") {
            $('.dashboard-sort-options').removeClass("selected");
            $(this).addClass("selected");
        }
        $(this).parents("ul").prevAll().find("span.selected").text($(this).text()).attr("data-value", $(this).attr("data-value"));
        if (e.target.id.toLowerCase() == "order" || e.target.parentElement.id.toLowerCase() == "order") {
            orderChange = true;
            $(".sorting-icon.path1").toggleClass("opacity");
            $(".sorting-icon.path2").toggleClass("opacity");
        }
        var gridObj = $("#items").data("ejGrid");
        var fieldValue = $(".selected-field:visible").text().toLowerCase().trim();
        var orderValue = $("#order").attr("data-value").toLowerCase().trim();
        var order;
        if (orderChange) {
            if (orderValue == "descending") {
                order = "ascending";
            }
            else
                order = "descending";
        }
        else
            order = orderValue;
        $("#order").attr("data-value", order);
        gridObj.model.sortSettings.sortedColumns = [{ field: $(".selected-field:visible").attr("data-value"), direction: order }];
        gridObj.refreshContent();
    });

    $(document).on("click", "#item-search", function (e) {
        var gridItem = $("#items").attr("data-grid-type").toLowerCase();
        if ($(".search-area").hasClass("add-background")) {
            if ($(".search-home-section").val() !== "") {
                $(".search-home-section").val("");
                gridObj = $("#items").data("ejGrid");
                gridObj.model.pageSettings.currentPage = 1;
                gridObj.refreshContent();
            }
            $(".search-area").removeClass("add-background");
            $(".placeholder, .close-icon").hide();
            if (gridItem == "") {
                setTimeout(function () { $("#sort-container, #order, #item-type").show(); }, 400);
            }
            else if (gridItem == "child-dashboard") {
                setTimeout(function () { $("#back-button, #item-type").show(); }, 400);
                searchDashboardWidgets("", "#childdashboard");
            }
        }
        else {
            if (gridItem == "") {
                $("#sort-container, #order, #item-type").hide();
            }
            else if (gridItem == "child-dashboard") {
                $("#item-type, #back-button").hide();
            }
            $(".search-area").addClass("add-background");
            setTimeout(function () { $(".close-icon").show() }, 300);
            $("#search-home-page").focus();
            setTimeout(function () { $(".search-home-section:visible").addClass("show"); }, 300);
        }
        setTimeout(function () { $(".clear-search").hide(); }, 300);
    });

    $(document).on("click", "#search-clear", function () {
        var gridItem = $("#items").attr("data-grid-type").toLowerCase();
        if (gridItem == "") {
            if ($("#search-home-page").val() == "") {
                $("#search-clear").css("display", "none");
                $(".search-area").removeClass("add-background");
                setTimeout(function () { $("#sort-container, #order, #item-type").show(); }, 400);
            }
            else {
                $("#search-home-page").val("");
            }
            PerformSearch("#search-home-page");
        }
        else if (gridItem == "child-dashboard") {
            if ($("#search-child-dashboard").val() == "") {
                $("#search-clear").css("display", "none");
                $(".search-area").removeClass("add-background");
                setTimeout(function () { $("#back-button, #item-type").show(); }, 400);
            }
            else {
                $("#search-child-dashboard").val("");
            }
            searchDashboardWidgets("", "#childdashboard");
        }
    });

    $(document).on("click", "#item-list td", function () {
        var gridType = $("#items").attr("data-grid-type").toLowerCase();
        var parentName = "";
            var isMultiTabbedDashboard = $(this).find(".item-link").attr("data-multi-dashboard").toLowerCase();
            parent.$("#homepage-action-popup_wrapper").ejWaitingPopup("show");
            var itemType = $("#item-container").attr("data-item-type");
            var itemId = $(this).find(".item-link").attr("data-item-id");
            $("#item-container").attr("data-widget-id", "").attr("data-dashboard-id", "");
            if (itemType.toLowerCase() == "widget") {
                $("#item-container").attr("data-widget-id", itemId);
            }
            else if (itemType.toLowerCase() == "dashboard") {
                $("#item-container").attr("data-dashboard-id", itemId);
                if (gridType == "child-dashboard") {
                    var parentId = $(this).find(".item-link").attr("data-parent-id");
                    parentName = $(this).find(".item-link").attr("data-parent-name");
                    $("#item-container").attr("data-parent-id", parentId);
                    $("#item-container").attr("data-parent-name", parentName);
                }
            }
            if (parentName != "") {
                $("#preview-item-name").text(parentName);
            }
            else {
                $("#preview-item-name").text($(this).find(".item-name").text().trim());
            }
            if (gridType != "child-dashboard") {
                $("#preview-owner-name").text($(this).find(".owner-name").text());
                $("#preview-modified-date").text("Last modified on : " + $(this).find(".modified-time").text());
            }
            else {
                $("#preview-owner-name, #preview-modified-date, #disabled-preview, #preview-container #buttons").show();
            }
            $("#preview").removeClass().contents().remove();
            if (isMultiTabbedDashboard == "true") {
                $("#disabled-preview, #preview-container #buttons, #view-denied").hide();
                $("#sort-container, #order").hide();
                $("#sort-options").css("width", "auto");
                if ($(".search-area").hasClass("add-background")) {
                    $("#search-clear").css("display", "none");
                    $("#search-home-page").val("");
                    $(".search-area").removeClass("add-background");
                    setTimeout(function () { $("#item-type").show(); }, 400);
                }
                $("#back-button").removeClass("display-none");
                $("#items").attr("data-grid-type", "child-dashboard");
                $("#item-type").removeClass().addClass("col-lg-9 col-md-9 col-sm-9 col-xs-9");
                $("#item-type").text($(this).find(".item-name").text().trim());
                $("#search-home-page").attr("id", "search-child-dashboard");
                $("#preview-item-name").text("");
                $("#preview-owner-name, #preview-modified-date").hide();
                $("#select-item").show();
                $("#items").ejWaitingPopup("show");
                getChildDashboard(itemId);
            }
            else {
                $("#select-item, #view-denied").hide();
                $("#disabled-preview, #preview-container #buttons").show();
            }
    });

    $(document).on("keyup", "#search-child-dashboard", function () {
        var searchKey = $("#search-child-dashboard").val().toLowerCase();
        var gridType = $("#items").attr("data-grid-type");
        searchDashboardWidgets(searchKey, gridType);
    });

    $(document).on("click", "#back-button", function () {
        getItems(dashboardsUrl);
        $(this).addClass("display-none");
        $("#preview").removeClass().contents().remove();
        $("#preview-item-name, #preview-owner-name, #preview-modified-date").text("");
        $("#preview-owner-name, #preview-modified-date").show();
        $("#disabled-preview, #preview-container #buttons, #view-denied").hide();
        $("#sort-container, #order, #select-item").show();
        $("#sort-options").css("width", "");
        $("#items").attr("data-grid-type", "");
        $("#item-type").removeClass().addClass("col-lg-5 col-md-5 col-sm-5 col-xs-5");
        $("#item-type").text("All Dashboards");
        parent.window.ParentName = "";
        $("#search-child-dashboard").attr("id", "search-home-page");
    });

    $(document).on("click", "#load-preview", function () {
        $("#disabled-preview").hide();
        var gridType = $("#items").attr("data-grid-type").toLowerCase();
        var currentItemId = $("#item-container").attr("data-dashboard-id") != "" ? $("#item-container").attr("data-dashboard-id") : $("#item-container").attr("data-widget-id");
        if (gridType != "child-dashboard") {
            if (currentItemId != "") {
                previewItem(currentItemId, "");
            }
        }
        else {
            var parentId = $("#item-container").attr("data-parent-id") != undefined ? $("#item-container").attr("data-parent-id") : "";
            if (parentId != "") {
                previewItem(parentId, currentItemId);
            }
            else {
                previewItem(currentItemId, "");
            }
        }
    });

    $(document).on("click", "#add-button", function () {
        parent.$("#add-item-popup_wrapper").ejWaitingPopup("show");
        var itemType = $("#item-container").attr("data-item-type").toLowerCase();
        parent.$("#success-alert, #warning-alert").hide();
        if (parent.window.IsPinWidget && itemType == "widget") {

            var homepageItemId = $("#item-container").attr("data-homepage-id");
            var widgetItemId = $("#item-container").attr("data-widget-id");

            if (homepageItemId != "" && widgetItemId != "") {
                $.ajax({
                    type: "POST",
                    url: pinWidgetUrl,
                    data: { homepageId: homepageItemId, widgetId: widgetItemId != undefined || "" ? widgetItemId : null, dashboardId: null, tabId: null, column: parent.window.PinColumn != undefined || "" ? parent.window.PinColumn : null },
                    success: function (result) {
                        if (result.Success) {
                            SuccessAlert(window.Server.App.LocalizationContent.PinWidget, window.Server.App.LocalizationContent.PinWidgetsuccess, 7000);
                            $.ajax({
                                type: "POST",
                                url: getHomepageDetails,
                                async: true,
                                data: { homepageId: homepageItemId },
                                success: function (result) {
                                    parent.$("#widget-container").contents().remove();
                                    parent.createHomepageDom(result);
                                    parent.renderItem(result);
                                }
                            });
                        }
                        else if (!result.Success && result.Value.toLowerCase() == "pinned widgets limit exceeded") {
                            WarningAlert(window.Server.App.LocalizationContent.PinWidget, window.Server.App.LocalizationContent.WidgetLimitExceed, 7000);
                        }
                        else {
                            WarningAlert(window.Server.App.LocalizationContent.PinWidget, window.Server.App.LocalizationContent.PinWidgetError, 7000);
                        }
                    }
                });
            }
        }
        else {
            if (parent.window.IsPinDashboard && itemType == "dashboard") {
                var gridType = $("#items").attr("data-grid-type").toLowerCase();
                var dashboardViewerObject = $('#preview-container #preview').data("ejDashboardViewer") != undefined ? $('#preview-container #preview').data("ejDashboardViewer") : null;
                    var dashboardName = $("#preview-item-name").text().trim();
                    parent.window.GetDashboardHomepageName = true;
                    parent.window.IsNewHomepageName = dashboardName.length < 255 ? dashboardName : dashboardName.substring(0, 250);
                    if (gridType != "child-dashboard") {
                        parent.window.ParentId = "";
                        parent.window.ParentName = "";
                    }
                    else{
                        parent.window.ParentId = $("#item-container").attr("data-parent-id") != undefined ? $("#item-container").attr("data-parent-id") : "";
                        parent.window.ParentName = $("#item-container").attr("data-parent-name") != undefined ? $("#item-container").attr("data-parent-name") : "";
                    }
                    parent.window.DashboardId = $("#item-container").attr("data-dashboard-id");
                    parent.$("#homepage-action-popup").ejDialog("open");
                    parent.homepageActionPopup("newdashboardhomepage", dashboardViewerObject);
            }
        }
        parent.$("#add-item-popup_wrapper").ejWaitingPopup("hide");
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            parent.closeHomepageAddItemPopup();
        }
    });
});

function getItems(url) {
    var filters = { filterType: "menu" };
    $("#items").ejGrid({
        dataSource: ej.DataManager({ url: url, adaptor: "UrlAdaptor" }),
        allowScrolling: true,
        scrollSettings: { height: 548, allowVirtualScrolling: true, virtualScrollMode: ej.Grid.VirtualScrollMode.Normal, buttonSize: 0, autoHide: true },
        gridLines: ej.Grid.GridLines.Horizontal,
        pageSettings: { pageSize: 100 },
        allowSorting: true,
        enableAltRow: false,
        allowSearching: true,
        allowFiltering: true,
        filterSettings: filters,
        actionBegin: "fnActionBegin",
        actionComplete: "fnActionComplete",
        rowSelecting: function (args) {
        },
        rowDataBound: function () {
        },
        dataBound: function (args) {
            $("[data-toggle='tooltip']").tooltip();
        },
        enableRowHover: true,
        columns: [
            {
                template: true,
                templateID: "#itemname",
                field: "",
                type: "string"
            }
        ]
    });
}

function fnActionComplete(args) {
    ShowWaitingProgress("#items", "hide");
    $("[data-toggle='tooltip']").tooltip();

    showOrHideGridPager("#items");
}

function fnActionBegin(args) {
    var itemsWaitingPopupTemplateId = createLoader("items");
    this.element.ejWaitingPopup({ template: $("#" + itemsWaitingPopupTemplateId) });
    ShowWaitingProgress("#items", "show");
    var searchValue = "";
    if ($("#search-home-page").is(":visible")) {
        searchValue = $("#search-home-page").val();
    }
    if (searchValue.toLowerCase() !== "search") {
        this.model.query._params.push({ key: "searchKey", value: searchValue });
    }
}

function previewItem(itemId, tabId) {
    ShowWaitingProgress("#preview", "show");
    $.ajax({
        type: "POST",
        url: getPreviewItemUrl,
        data: { itemId: itemId },
        success: function (result) {
            if (result.Success) {
                if (result.Value.toLowerCase() == "viewpermissiondenied") {
                    $("#view-denied").show();
                }
                else {
                    $("#preview").ejDashboardViewer({
                        accessToken: accessToken,
                        serviceUrl: dashboardServiceUrl,
                        serverUrl: dashboardServerUrl,
                        _enableHyperLinkOnErrorMessage: false,
                        dashboardPath: result.Value,
                        cdnFilePath: isUseCdn ? cdnLink + "/scripts/viewer" : "",
                        reportName: "",
                        reportDescription: "",
                        enableExport: true,
                        enablePrint: false,
                        enableWidgetMode: false,
                        showGetLinkIcon: false,
                        showTab: tabId == "" ? true : false,
                        _selectedTabGuid: tabId,
                        interactionSettings: {
                            allowHistoryMaintenance: false,
                            handleHistoryEvent: false
                        },
                        beforeContextMenuOpen: function (e) {
                            var removeByAttr = function(arr, attr, value) {
                                var i = arr.length;
                                while (i--) {
                                    if (arr[i] &&
                                        arr[i].hasOwnProperty(attr) &&
                                        (arguments.length > 2 && arr[i][attr] === value)) {
                                        arr.splice(i, 1);
                                    }
                                }
                                return arr;
                            };
                            removeByAttr(e.menuData, "text", "Export");
                        }
                    });
                }
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.PreviewItem, window.Server.App.LocalizationContent.InternalServerError, 7000);
            }
        }
    });
    ShowWaitingProgress("#preview", "hide");
}

function getChildDashboard(parentId) {
    if (parentId != "" && parentId != null) {
        $.ajax({
            type: "POST",
            url: getChildDashboardsUrl,
            data: { parentItemId: parentId },
            success: function (result) {
                if (result.Success) {
                    var parentId = result.Value[0].ParentId;
                    var parentName = result.Value[0].Name;
                    var parentDashboardValue = { DesignerId: parentId, DisplayName: "All", ParentName: parentName, IsParentId: true };
                    result.Value.unshift(parentDashboardValue);
                    childDashboards = result.Value;
                    getDashboardWidgets(result.Value);
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.PinDashboard, window.Server.App.LocalizationContent.MultiDashboardsError, 7000);
                }
            }
        });
        $("#items").ejWaitingPopup("hide");
    }
}

function searchDashboardWidgets(searchKey, gridType) {
    var tempArr = [];
    $.each(childDashboards, function (i) {
        if (childDashboards[i].DisplayName.toLowerCase().indexOf(searchKey.toLowerCase()) >= 0) {
            tempArr.push(childDashboards[i]);
        }
    });
    getDashboardWidgets(tempArr);
}

function getDashboardWidgets(datasource) {
    var filters = { filterType: "menu" };
    $("#items").ejGrid({
        dataSource: datasource,
        allowScrolling: true,
        scrollSettings: { height: 548, allowVirtualScrolling: true, virtualScrollMode: ej.Grid.VirtualScrollMode.Normal, buttonSize: 0, autoHide: true },
        gridLines: ej.Grid.GridLines.Horizontal,
        pageSettings: { pageSize: 20 },
        allowSorting: true,
        enableAltRow: false,
        allowSearching: true,
        allowFiltering: true,
        filterSettings: filters,
        actionBegin: "fnActionBegin",
        actionComplete: "fnActionComplete",
        rowSelecting: function (args) {
        },
        rowDataBound: function () {
        },
        dataBound: function (args) {
        },
        enableRowHover: true,
        columns: [
            {
                template: true,
                templateID: "#child",
                field: "",
                type: "string"
            }
        ]
    });
}