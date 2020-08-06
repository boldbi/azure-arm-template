var itemUrl;
var browser = ej.browserInfo();
var isFirstRequest = false;
var isAjaxRequested = true;

$(function () {
    addPlacehoder("#input-div");
    $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".item-list-panel").width() });
    $("#item-viewer #initial-item-message").css("display", "block");
    $("#dashboard_render_iframe").css("display", "none");
    $("#create-new-category").css("width", $(".item-list-panel").outerWidth());
    $("#input-div").find(".placeholder").hide();
    var itemGridWaitingPopupTemplateId = createLoader("item-grid-container");
    $("#item-grid-container").ejWaitingPopup({ template: $("#" + itemGridWaitingPopupTemplateId) });
    var itemListPanelWaitingPopupTemplateId = createLoader("item-list-panel");
    $("#item-list-panel").ejWaitingPopup({ template: $("#" + itemListPanelWaitingPopupTemplateId) });
    var itemViewerWaitingPopupTemplateId = createLoader("item-viewer");
    $("#item-viewer").ejWaitingPopup({ template: $("#" + itemViewerWaitingPopupTemplateId) });
    $(".search-area").removeClass("focusdiv");
    var ScheduleId, ItemId, ItemName, CategoryName, MultiDashboardName;
    $(".item-list-panel").css("height", window.innerHeight - $("#header-area").outerHeight());
    $("#datasource-popup").ejDialog({
        width: "650px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "onDataSourceDialogClose",
        open: "onDataSourceDialogOpen"
    });

    $("#widget_popup").ejDialog({
        width: "651px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "onWidgetDialogClose",
        open: "onWidgetDialogOpen"
    });

    $("#popup-container").ejDialog({
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        showOnInit: false,
        close: "onSchedulerDialogClose",
        open: "onSchedulerDialogOpen",
        width: "1000px"
    });

    var popupContainerWaitingPopupTemplateId = createLoader("popup-container_wrapper");
    $("#popup-container_wrapper").ejWaitingPopup({ template: $("#" + popupContainerWaitingPopupTemplateId) });

    $("#select_datasource_popup").ejDialog({
        width: "800px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        height: "530px",
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: 'closeNewDataSourcePopup'
    });

    $("#file-popup").ejDialog({
        width: "650px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "382px",
        title: window.Server.App.LocalizationContent.AddFile,
        enableModal: true,
        showHeader: false,
        open: "onNewFileDialogOpen",
        close: "onNewFileDialogClose"
    });

    $("#item-delete-confirmation").ejDialog({
        width: "450px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.DeleteItem,
        showHeader: false,
        enableModal: true,
        close: "onDeleteItemDialogClose",
        open: "onDeleteItemDialogOpen"
    });

    $("#ItemAction").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "525px",
        title: window.Server.App.LocalizationContent.copyDataSource,
        showHeader: false,
        enableModal: true,
        close: "itemActionEmpty",
        closeOnEscape: true
    });
    $("#permission-popup").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "900px",
        title: "",
        showHeader: false,
        enableModal: true,
        close: "DialogBoxClose",
        closeOnEscape: true
    });

    $("#make_item_public").ejDialog({
        width: window.innerWidth > 460 ? "450px" : window.innerWidth - 10,
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.MakePublic,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: "onMakePublicDialogClose",
        open: "onMakePublicDialogOpen"
    });

    $("#remove_item_public").ejDialog({
        width: window.innerWidth > 460 ? "450px" : window.innerWidth - 10,
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.RemovePublic,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: "onRemovePublicDialogClose",
        open: "onRemovePublicDialogOpen"
    });


    $("#create-datasource-popup").ejDialog({
        width: "650px",
        height: "auto",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "onCreateDataSourceDialogClose",
        open: "onCreateDataSourceDialogOpen"

    });

    var createDatasourceWaitingPopupTemplateId = createLoader("create-datasource-popup_wrapper");
    $("#create-datasource-popup_wrapper").ejWaitingPopup({ template: $("#" + createDatasourceWaitingPopupTemplateId) });
    var widgetWaitingPopupTemplateId = createLoader("widget_popup_wrapper");
    $("#widget_popup_wrapper").ejWaitingPopup({ template: $("#" + widgetWaitingPopupTemplateId) });
    var selectDatasourceWaitingPopupTemplateId = createLoader("select_datasource_popup_wrapper");
    $("#select_datasource_popup_wrapper").ejWaitingPopup({ template: $("#" + selectDatasourceWaitingPopupTemplateId) });
    var fileWaitingPopupTemplateId = createLoader("file-popup_wrapper");
    $("#file-popup_wrapper").ejWaitingPopup({ template: $("#" + fileWaitingPopupTemplateId) });
    var itemDeleteConformationWaitingPopupTemplateId = createLoader("item-delete-confirmation_wrapper");
    $("#item-delete-confirmation_wrapper").ejWaitingPopup({ template: $("#" + itemDeleteConformationWaitingPopupTemplateId) });
    var datasourceWaitingPopupTemplateId = createLoader("datasource-popup_wrapper");
    $("#datasource-popup_wrapper").ejWaitingPopup({ template: $("#" + datasourceWaitingPopupTemplateId) });
    var itemActionWaitingPopupTemplateId = createLoader("ItemAction_wrapper");
    $("#ItemAction_wrapper").ejWaitingPopup({ template: $("#" + itemActionWaitingPopupTemplateId) });
    var permissionWaitingPopupTemplateId = createLoader("permission-popup_wrapper");
    $("#permission-popup_wrapper").ejWaitingPopup({ template: $("#" + permissionWaitingPopupTemplateId) });
    var makeItemPuplicWaitingPopupTemplateId = createLoader("make_item_public_wrapper");
    $("#make_item_public_wrapper").ejWaitingPopup({ template: $("#" + makeItemPuplicWaitingPopupTemplateId) });

    var removeItemPublicWaitingPopupTemplateId = createLoader("remove_item_public_wrapper");
    $("#remove_item_public_wrapper").ejWaitingPopup({ template: $("#" + removeItemPublicWaitingPopupTemplateId) });

    $(document).on("click", "#context-menu", function (e) {
        refreshScrollerForCategory();
    });

    $(document).on("click", ".options-area", function (e) {
        setTimeout(function () { $(".tooltip").hide(); }, 50);
    });

    $("#search-home-page").on("focusin", function () {
        $(".search-area").addClass("focusdiv");
    });
    $("#search-home-page").on("focusout", function () {
        $(".search-area").removeClass("focusdiv");
    });

    $(document).on("click", ".item-delete", function (e) {
        $("#delete-item-name").html($(this).attr("data-name"));
        $("#delete-item").attr("data-item-id", $(this).attr("data-item-id"));
        var itemId = $(this).attr("data-item-id");
        var itemName = $(this).attr("data-name");
        var itemTypeId = $(this).attr("data-itemtype");
        var datasourceType = "";
        if (itemTypeId == "4") {
            datasourceType = $(this).attr("data-datasource-type");
        }
        $("#item-delete-confirmation").ejDialog("open");
        $("#item-delete-confirmation_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: deleteConfirmationUrl,
            data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName, datasourceType: datasourceType },
            success: function (data) {
                $("#item-delete-confirmation").html(data);
                $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
            }
        });
    });

    $(document).on("click", "#delete-item", function (e) {
        $("#item-delete-confirmation_wrapper").ejWaitingPopup("show");
        var itemId = $(this).attr("data-item-id");
        var itemtype = $(this).attr("data-itemtype");
        var datasourceType = "";
        if (itemtype == "Datasource") {
            datasourceType = $(this).attr("data-datasource-type");
        }
        var type = itemtype == "Category" ? window.Server.App.LocalizationContent.Categoy : itemtype == "Dashboard" ? window.Server.App.LocalizationContent.Dashboard : itemtype;
        $.ajax({
            type: "POST",
            url: deleteItemUrl,
            data: { itemId: itemId, datasourceType: datasourceType },
            success: function (data) {
                if (data.Success) {
                    $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
                    SuccessAlert(type + window.Server.App.LocalizationContent.Deleted, $("#delete-item-name").html() + window.Server.App.LocalizationContent.DeleteSuccess, 7000);
                    if (itemtype == "Category" || $(".all-items").hasClass("active")) {
                        if ($(".all-items").hasClass("active")) {
                            $(".all-items").trigger("click");
                        }
                        else {
                            var categoryScope = parent.angular.element(parent.document.getElementById("server-items-container")).scope();
                            categoryScope.refreshCategorySection();
                        }
                    }
                    else if (itemtype == "Dashboard") {
                        onSuccessDeleteItem();
                        $("#favoriteitemCount").text(data.Value);
                    }
                    else if (itemtype == "Datasource") {
                        if (data.DatasourceCount > 0 && data.DatasourceCount != undefined) {
                            onSuccessDeleteItem();
                        }
                        else {
                            parent.$("#body").ejWaitingPopup("show");
                            location.reload();
                        }
                    }
                    else {
                        onSuccessDeleteItem();
                    }
                }
                else if (data.Permission == false) {
                    $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
                    WarningAlert(window.Server.App.LocalizationContent.DeleteFail, window.Server.App.LocalizationContent.DeletePermissionMessage + $("#delete-item-name").html(), 7000);
                }
                else {
                    $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
                    WarningAlert(window.Server.App.LocalizationContent.DeleteFail, $("#delete-item-name").html() + window.Server.App.LocalizationContent.DeleteFailMessage, 7000);
                }
                $("#item-delete-confirmation").ejDialog("close");
            }
        });
    });
    addPlacehoder("#search-area");

    $(document).on("click", ".version-button", function () {
        var itemId = $(this).attr("data-item-id");
        var itemName = $(this).attr("data-itemname");
        var versionGrid = $("#grid").data("ejGrid");
        var logGrid = $("#loggrid").data("ejGrid");
        var hasVersionDialog = $("#version-window-container").data("ejDialog");

        if (hasVersionDialog != null) {
            $("#version-window-container").ejDialog("open");
        }
        else {
            $("#version-window-container").ejDialog({
                showOnInit: true,
                allowDraggable: true,
                enableResize: false,
                width: "900px",
                title: "",
                showHeader: false,
                enableModal: true,
                close: "DialogBoxClose",
                closeOnEscape: true
            });
        }
        $(".modal-header .modal-title").html(itemName);
        $("#version-tab").parent("li").addClass("active");
        $("#item-log-tab").parent("li").removeClass("active");
        $("#item-version-container").removeClass("hidden").addClass("show");
        $("#item-log-container").removeClass("show").addClass("hidden");
        var dataManager_version = ej.DataManager({ url: itemVersionUrl + "?ItemId=" + itemId, adaptor: new ej.UrlAdaptor() });
        versionGrid.dataSource(dataManager_version);
        var dataManager_log = ej.DataManager({ url: itemLogsUrl + "?ItemId=" + itemId, adaptor: new ej.UrlAdaptor() });
        logGrid.dataSource(dataManager_log);
    });

    //dummy click event added for move dashboard issue
    $(document).on("click", ".layout", function () {
        $("#container iframe").attr("src", window.location.href + "?itemId=" + $(this).attr("data-item-id") + "&itemAction=" + $(this).attr("data-action"));
    });

    $(document).on("click", ".moveItem", function () {
        var itemId = $(this).attr("data-itemId");
        var itemAction = $(this).attr("data-action");
        $("#ItemAction").ejDialog("open");
        $("#ItemAction_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: moveIframeUrl,
            data: { itemId: itemId, itemAction: itemAction },
            success: function (data) {
                $("#ItemAction").html(data);
                $("#ItemAction_wrapper .e-dialog-scroller").attr("style", "overflow:inherit; border:none");
                $("#ItemAction_wrapper").ejWaitingPopup("hide");
            }
        });
    });

    $(document).on("click", ".copyItem", function () {
        var itemId = $(this).attr("data-itemId");
        var itemAction = $(this).attr("data-action");

        $("#ItemAction").ejDialog("open");
        $("#ItemAction_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: copyIframeUrl,
            data: { itemId: itemId, itemAction: itemAction },
            success: function (data) {
                $("#ItemAction").html(data);
                $("#ItemAction_wrapper .e-dialog-scroller").attr("style", "overflow:inherit;border:none");
                $("#ItemAction_wrapper").ejWaitingPopup("hide");
            }
        });
    });

    $(document).on("click", ".favorite-item", function (e) {
        $("#items").ejWaitingPopup("show");
        var gridObj = $("#items").data("ejGrid");
        var itemId = $(this).attr("data-itemid");
        var value = $(this).attr("data-value");
        $.ajax({
            type: "POST",
            url: favoriteItemUrl,
            data: { itemId: itemId, favoriteValue: value, },
            success: function (data) {
                if (data.Success) {
                    var currentData = $(".favorite-item").filter("[data-itemid='" + itemId + "']");
                    if (value == "True") {
                        $(currentData[0]).addClass("favorite");
                        $(currentData[0]).attr("data-value", "False");
                        $(currentData[0]).attr("data-original-title", window.Server.App.LocalizationContent.RemoveFavorite);
                    }
                    else {
                        $(currentData[0]).removeClass("favorite");
                        $(currentData[0]).attr("data-value", "True");
                        $(currentData[0]).attr("data-original-title", window.Server.App.LocalizationContent.MarkFavorite);
                    }
                    if ($("#item-grid-container").data("gridName") === "dashboards") {
                        var dashboardScope = angular.element(document.getElementById("server-items-container")).scope();
                        gridObj.model.query._params.push({
                            key: "displayCategory",
                            value: dashboardScope.itemRequestType
                        });

                    }
                    if (dashboardScope.itemRequestType == "100") {
                        gridObj.model.filterSettings.filteredColumns = [{ field: "CategoryName", operator: "equal", value: dashboardScope.category }];
                    }
                    gridObj.refreshContent();
                }
                else {
                    messageBox("", window.Server.App.LocalizationContent.MarkFavoriteError, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                        onCloseMessageBox();
                    });
                }
            }
        });
    });

    $(window).resize(function () {
        var versionDialogObj = $("#version-window-container").data("ejDialog");
        if (versionDialogObj != null && versionDialogObj.isOpened()) {
            versionDialogObj._dialogPosition();
        }
        var gridObj = $("#items").data("ejGrid");
        if (gridObj != null) {
            if (window.innerWidth < 1041) {
                gridObj.hideColumns("Description");
                gridObj.hideColumns("Last Modified");
            } else {
                gridObj.showColumns("Description");
                gridObj.showColumns("Last Modified");
            }
            if ($("#clear-search").css("display") == "block" || $("#clear-search").css("display") == "inline-block") {
                $("#search-items").css("display", "block");
            }
            $(".item-list-panel").css("height", window.innerHeight - $("#header-area").outerHeight());
            $("#create-new-category").css("width", $(".item-list-panel").outerWidth());

            var gridHeight = $(window).height() - ($(".item-navigation").outerHeight() + $("#header-area").outerHeight() + $("#category-listing").outerHeight());

            gridObj.option({ scrollSettings: { height: gridHeight } });

            if (!$(".su-sidebar-collapse").is(":visible")) {
                $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".su-sidebar-expand.category-collapse").width(), "top": $("#header-area").height() });
                return false;
            }
            else {
                $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".item-list-panel").width() });
                return false;
            }
        }
    });

    $(window).load(function () {
        refreshScrollerForCategory();
    });

    $(document).on("click", ".make-public", function (e) {
        $("#item_name").html($(this).attr("data-name"));
        itemUrl = $(this).attr("data-url");
        var itemId = $(this).attr("data-item-id");
        var itemName = $(this).attr("data-name");
        var itemTypeId = $(this).attr("data-itemtype");
        load();
        $("#make_item_public").ejDialog("open");
        $("#make_item_public_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: makePublicUrl,
            data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName },
            success: function (data) {
                $("#make_item_public").html(data);
                $("#make_item_public_wrapper").ejWaitingPopup("hide");
                $("#make-public").attr("data-itemtype", itemTypeId);
                $("#make-public").attr("data-url", itemUrl);
            }
        });
    });


    $(document).on("click", "#make-public", function (e) {
        $("#item_name").html($(this).attr("data-name"));
        itemUrl = $(this).attr("data-url");
        var itemId = $(this).attr("data-item-id");
        var itemName = $(this).attr("data-name");
        var itemTypeId = $(this).attr("data-itemtype");
        var itemType = $(this).attr("data-item-type").trim();
        $("#make_item_public_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: makeItemPublicUrl,
            data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName },
            success: function (data) {
                if (data.validation && data.result) {
                    onMakePublicDialogClose();
                    onGetLinkDialogOpen();
                    $(".report-name").html(itemName);
                    $(".report-name").attr("title", itemName);
                    $("." + itemType.toLowerCase() + "-link").show();
                    $(".private-note").hide();
                    $(".public-note").show();
                    ResetGrid();
                } else {
                    $("#makepublicitem").hide();
                    $("#select-area").hide();
                    $("#close").show();
                    $(".error-msg").show();
                    ResetGrid();
                }
                $("#make_item_public_wrapper").ejWaitingPopup("hide");

            }
        });
    });

    $(document).on("click", ".remove-public", function (e) {
        $("#item_name").html($(this).attr("data-name"));
        itemUrl = $(this).attr("data-url");
        var itemId = $(this).attr("data-item-id");
        var itemName = $(this).attr("data-name");
        var itemTypeId = $(this).attr("data-itemtype");
        load();
        $("#remove_item_public").ejDialog("open");
        $("#remove_item_public_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: removePublicUrl,
            data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName },
            success: function (data) {
                $("#remove_item_public").html(data);
                $("#remove_item_public_wrapper").ejWaitingPopup("hide");
                $("#remove-public").attr("data-itemtype", itemTypeId);
                $("#remove-public").attr("data-url", itemUrl);
            }
        });
    });
    $(document).on("click", "#remove-public", function (e) {
        $("#item_name").html($(this).attr("data-name"));
        itemUrl = $(this).attr("data-url");
        var itemId = $(this).attr("data-item-id");
        var itemName = $(this).attr("data-name");
        var itemTypeId = $(this).attr("data-itemtype");
        $("#remove_item_public_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: removeItemPublicUrl,
            data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName },
            success: function (data) {
                if (data.validation && data.result) {
                    $("#removepublicitem").hide();
                    $("#remove-select-area").hide();
                    $("#remove-close").show();
                    $("#success-msg").show();
                    ResetGrid();
                } else {
                    $("#removepublicitem").hide();
                    $("#remove-select-area").hide();
                    $("#success-msg").hide();
                    $("#remove-close").show();
                    $("#error-msg").show();
                    ResetGrid();
                }
                $("#remove_item_public_wrapper").ejWaitingPopup("hide");
            }
        });
    });

    $(document).on("click", ".get-link", function (e) {
        itemUrl = $(this).attr("data-url").trim();
        var itemType = $(this).attr("data-itemtype").trim();
        if (itemType.toLowerCase() == "2") {
            $(".dashboard-link").show();
        }
        else if (itemType.toLowerCase() == "6") {
            $(".file-link").show();
            $("#compressed-link").prop("checked", true);
        }
        else if (itemType.toLowerCase() == "8") {
            $(".widget-link").show();
        }
        else {
            $(".link").show();
        }

        var shareUrl = "";

        var itemName = $(this).attr("data-name");
        var isPublic = $(this).attr("ispublic");

        var itemId = $(this).attr("data-item-id");

        var iframe = document.getElementById("dashboard_render_iframe");

        if (iframe != null) {
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            var renderedDashboard = $(innerDoc).find("#favorite_Item").attr("data-item-id");
            var parentDashbaord = $(innerDoc).find("#favorite_Item").attr("data-parent-id");
            var dashboardQuery = "";
            if (parentDashbaord !== "" && parentDashbaord !== undefined) {
                dashboardQuery = "tab=" + document.getElementById("dashboard_render_iframe").contentWindow.$("#dashboard").data("ejDashboardViewer").getCurrentTab().tabName.trim();
            }
            if ($(innerDoc).find("#favorite_Item").length > 0 && document.getElementById("dashboard_render_iframe").contentWindow.getcurrentfilters() !== null) {
                dashboardQuery += (dashboardQuery === "" ? "" : "&") + document.getElementById("dashboard_render_iframe").contentWindow
                    .getcurrentfilters().encryptedData;
            }

            if ((renderedDashboard === itemId || parentDashbaord === itemId) && dashboardQuery !== "") {
                if (browser.name.toLowerCase() === "msie") {
                    shareUrl = window.location.href.replace(window.location.pathname + window.location.search, "") +
                        itemUrl.trim() +
                        "?" +
                        dashboardQuery;
                } else {
                    shareUrl = window.location.origin + itemUrl + "?" + dashboardQuery;
                }
            } else {
                if (browser.name.toLowerCase() === "msie") {
                    shareUrl = window.location.href.replace(window.location.pathname + window.location.search, "") +
                        itemUrl.trim();
                }
                else {
                    shareUrl = window.location.origin + itemUrl;
                }
            }
        }
        else {
            if (browser.name.toLowerCase() === "msie") {
                shareUrl = window.location.href.replace(window.location.pathname + window.location.search, "") +
                    itemUrl.trim();
            }
            else {
                shareUrl = window.location.origin + itemUrl;
            }
        }

        $("#get_item_link").ejDialog("open");
        $("#get_item_link").show();
        $("#get_item_link_wrapper").ejWaitingPopup("show");
        $(".get_link").show();
        if (isPublic == "true") {
            $(".private-note").hide();
            $(".public-note").show();
        }
        else {
            $(".private-note").show();
            $(".public-note").hide();
        }
        if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
            $("#item-link-copy").removeClass("su su-copy");
            $("#item-link-copy").hide();
            $("#item-link").css({ width: "100%", borderRadius: "4px" });
            $("#item-link-copy").attr("data-original-title", "");
        }
        else {
            $("#item-link-copy").tooltip({
                animation: false
            });
        }
        $(".report-name").html(itemName);
        $(".report-name").attr("title", itemName);

        $("#item-link").val(shareUrl);

        $("#item-link").select();
        $(".modal-footer .validation-area").css("display", "block");
        $("#get_item_link_wrapper").ejWaitingPopup("hide");
    });

    $(document).on("click", "#compressed-link", function () {
        var link = $("#item-link").val().split("?")[0];
        if ($(this).prop("checked") == true) {
            link += "?compress=true";
        }
        $("#item-link").val(link);
        $(".update-link").css("visibility", "visible");
        if (timer != 0) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            $(".update-link").css("visibility", "hidden");
            timer = 0;
        }, 7000);
    });
});

function onSuccessDeleteItem() {
    var gridObj = $("#items").data("ejGrid");
    gridObj.model.sortSettings.sortedColumns = [];
    gridObj.model.filterSettings.filteredColumns = [];
    $("#search-items").find("input[type=text]").val('');
    var currentPage = gridObj.model.pageSettings.currentPage;
    var pageSize = gridObj.model.pageSettings.pageSize;
    var totalRecordsCount = gridObj.model.pageSettings.totalRecordsCount;
    var lastPageRecordCount = gridObj.model.pageSettings.totalRecordsCount % gridObj.model.pageSettings.pageSize;

    if (lastPageRecordCount != 0 && lastPageRecordCount <= 1) {
        gridObj.model.pageSettings.currentPage = currentPage - 1;
    }

    if ($("#item-grid-container").attr("data-grid-name").toLowerCase() === "dashboards") {
        var dashboardScope = parent.angular.element(parent.document.getElementById("server-items-container")).scope();
        gridObj.model.query._params.push({
            key: "displayCategory",
            value: dashboardScope.itemRequestType
        });
    }

    gridObj.refreshContent();
    $("#dashboard_render_iframe").attr("src", "");
    $("#initial-item-message").css("display", "block");
    $("#dashboard_render_iframe").css("display", "none");
}
function onNewFileDialogOpen() {
    $("#file-popup-iframe").attr("src", addFileIframeUrl);
}

function onSchedulerDialogClose() {
    $("#popup-container").find("iframe").contents().find("html").html("");
}
function onSchedulerDialogOpen() {
    $("#scheduler-popup-iframe").attr("src", schedulerIframeUrl + "?itemName=" + ItemName + "&&itemId=" + ItemId + "&&categoryName=" + CategoryName + "&&categoryId=" + CategoryId + "&&scheduleId=" + ScheduleId + "&&multiDashboardName=" + MultiDashboardName + "&&actionType=Create");
    $("#popup-container_wrapper").ejWaitingPopup("show");
}
function onNewFileDialogClose() {
    $("#file-popup").find("iframe").contents().find("html").html("");
    $("#file-popup").ejDialog("close");
}

function openNewDataSourcePopup() {
    $("#datasource-popup-iframe").addClass("add-datasource-frame");
    $("#datasource-popup").ejDialog("open");
    $("#datasource-popup_wrapper").ejWaitingPopup("show");
}

function openNewFilePopup() {
    $("#file-popup").ejDialog("open");
    $("#file-popup_wrapper").ejWaitingPopup("show");
}

function onDataSourceDialogOpen() {
    $("#datasource-popup-iframe").attr("src", addDatasourceIframeUrl).addClass("add-datasource-frame");
}

function onDataSourceDialogClose() {
    $("#datasource-popup").find("iframe").contents().find("html").html("");
    $("#datasource-popup").ejDialog("close");
}

function onWidgetDialogOpen() {
    $("#widget_popup_iframe").attr("src", addWidgetUrl);
}

function onWidgetDialogClose() {
    $("#widget_popup").find("iframe").contents().find("html").html("");
    $("#widget_popup").ejDialog("close");
}

function onDeleteItemDialogClose() {
    $("#item-delete-confirmation").ejDialog("close");
}

function onDeleteItemDialogOpen() {
    $("#item-delete-confirmation").ejDialog("open");
    $('#item-delete-confirmation').focus();
}

function onReportDialogOpen() {
    //$("#report_popup_wrapper").ejWaitingPopup("hide");
}

function openNewWidgetPopup() {
    $("#widget_popup").ejDialog("open");
    $("#widget_popup_wrapper").ejWaitingPopup("show");
}

function openNewCreateDataSourcePopup() {
    $("#create-datasource-popup").ejDialog("open");
    $("#create-datasource-popup_wrapper").ejWaitingPopup("show");
}

function onCreateDataSourceDialogOpen() {
    $("#create-datasource-iframe").attr("src", createDatasourceUrl)
}

function onCreateDataSourceDialogClose() {
    $("#create-datasource-popup").ejDialog("close");
}

function fnActionBegin(args) {
    var itemGridWaitingPopupTemplateId = createLoader("items");
    this.element.ejWaitingPopup({ template: $("#" + itemGridWaitingPopupTemplateId) });
    if (args.requestType == "refresh" && !this.initialRender)
        $("#items").find(".e-gridcontent").css("visibility", "hidden");
    var datagridName = $("#item-grid-container").data("gridName");

    if (datagridName.toLowerCase() === "dashboards" || datagridName.toLowerCase() === "widgets") {
        if ($('#server-items-container .category-collapse').css('display') == 'none') {
            $("#item-grid-container").ejWaitingPopup("show");
        }
    }

    var searchValue = "";
    if ($("#search-home-page").is(":visible")) {
        searchValue = $("#search-home-page").val();
    }
    else {
        searchValue = $("#search-items").val();
    }
    if (searchValue !== "Search") {
        this.model.query._params.push({ key: "searchKey", value: searchValue });
    }
    var filerSettings = [], i;

    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ "PropertyName": column.field, "FilterType": column.operator, "FilterKey": column.value });
            this.model.query._params.push({ key: "filterCollection", value: filerSettings });
        }
    }
    if (datagridName === "dashboards" || datagridName === "widgets") {
        var dashboardScope = angular.element(document.getElementById("server-items-container")).scope();
        args.model.query._params.push({
            key: "displayCategory",
            value: dashboardScope.itemRequestType

        });
    }
}

function fnActionFailure(args) {
    setTimeout(function () {
        $("#item-grid-container").ejWaitingPopup("show");
        $("#item-list-panel > .item-navigation, #item-list-panel > #category-listing").css("visibility", "visible");
    }, 500);
}

function fnActionComplete(args) {
    $("#item-list-panel > .item-navigation, #item-list-panel > #category-listing").css("visibility", "visible");
    $("[data-toggle='tooltip']").tooltip();
    var gridObj = $("#items").data("ejGrid");
    if (gridObj._gridRecordsCount == 0) {
        if (gridName = $('#item-grid-container').attr("data-grid-name") == 'datasources') {
            var message = "";
            message = window.Server.App.LocalizationContent.NoDataSources;
        }
        else if (gridName = $('#item-grid-container').attr("data-grid-name") == 'files') {
            var message = "";
            message = window.Server.App.LocalizationContent.NoFilesToDisplay;
        }
        else {
            var message = "";
            if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'favorite dashboards') {
                message = window.Server.App.LocalizationContent.NoFavoriteDashboards;
            }
            else if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'recent dashboards') {
                message = window.Server.App.LocalizationContent.NoRecentDashboards;
            }
            else if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'public dashboards') {
                message = window.Server.App.LocalizationContent.NoPublicDashboards;
            }
            else if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'all dashboards') {
                message = window.Server.App.LocalizationContent.NoDashboards;
            }
            else if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'all widgets') {
                message = window.Server.App.LocalizationContent.NoWidgets;
            }
            else if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'public widgets') {
                message = window.Server.App.LocalizationContent.NoPublicWidgets;
            }
            else if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'all categories') {
                message = window.Server.App.LocalizationContent.NoDashboards;
            }
            else if ($("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'draft dashboards') {
                message = window.Server.App.LocalizationContent.NoDrafts;
            }
        }
        this.getContentTable().find("tbody .emptyrecord").html(message);
    }
    var gridName = $('#item-grid-container').attr("data-grid-name");
    var publicWidget = $("ul.item-navigation li.public-widgets").hasClass("active");
    var publicDashboard = $("ul.item-navigation li.public-items").hasClass("active");
    var isMarkItemsPublic = $("#isMarkItemspublic").val();
    if (gridName.toLowerCase() == "dashboards" || gridName.toLowerCase() == "widgets") {
        if (!navigator.userAgent.match(/Windows Phone/i)) { // To avoid tooltips in windows phone.
            $("[data-toggle='tooltip']").tooltip();
        }

        if ($(".e-content").height() != $(".e-scrollbar").height()) {
            $(".e-scrollbar .e-vscroll").css("height", $(".e-content").height());
        }

        if ($("#items .e-gridcontent").data("ejScroller"))
            $("#items .e-gridcontent").ejScroller("refresh");

        if ($("ul.item-navigation li.active").length > 0 && $("ul.item-navigation li.active").attr("data-section").toLowerCase() == 'draft dashboards') {
            $(".item-link").each(function () {
                $(this).attr("href", rootUrlAction + "/dashboard-designer/" + $(this).attr("data-itemid") + "/draft/" + $(this).attr("data-name"));
            });
        }
        else if (gridName.toLowerCase() == "dashboards" && window.innerWidth >= 1041) {
            $(".item-link").each(function () {
                $(this).attr("href", rootUrlAction + "/dashboards/" + $(this).attr("data-itemid") + "/" + $(this).attr("data-category-name") + "/" + $(this).attr("data-name"));
            });
        }

        var gridHeight = $(window).height() - ($(".item-navigation").outerHeight() + $("#header-area").outerHeight() + $("#category-listing").outerHeight());

        gridObj.option({ scrollSettings: { height: gridHeight } });
        if (publicWidget == true && gridObj._gridRecordsCount > 0 && isMarkItemsPublic == "False") {
            $(".tool-tip").show();
        }
        else if (publicDashboard == true && gridObj._gridRecordsCount > 0 && isMarkItemsPublic == "False") {
            $(".tool-tip").show();
        }
        else {
            $(".tool-tip").hide();
        }
        setTimeout(function () { $("#item-grid-container").ejWaitingPopup("hide"); }, 500);

        $(".tooltip").hide();
    }
    if (args.requestType == "refresh" && !this.initialRender)
        $("#items").find(".e-gridcontent").css("visibility", "visible");

    showOrHideGridPager("#items");
}

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
        if (location.pathname.toLowerCase() === "/" || location.pathname.split("/")[location.pathname.split("/").length - 1].toLowerCase() == "dashboards") {
            refreshScroller();
        }
    }
}

$(document).on("click", ".category-link", function (e) {
    $('.e-filtericon').removeClass('e-filteredicon e-filternone');
    e.preventDefault();
});

$(document).on("click", ".item-navigation li:not(:last)", function (e) {
    e.preventDefault();
    var gridObj = $("#items").data("ejGrid");
    if ($(this).hasClass("active") == false) {
        $(".item-navigation li").removeClass("active");
        $(this).addClass("active");
    }
    if ($(this).hasClass("all-items")) {
        $("#category-listing").addClass("category-section");
    }
    else {
        $("#category-listing").removeClass("category-section");
    }

    var gridHeight = $(window).height() - ($(".item-navigation").outerHeight() + $("#header-area").outerHeight() + $("#category-listing").outerHeight());
    var gridObj = $("#items").data("ejGrid");
    gridObj.option({ scrollSettings: { height: gridHeight } });

    var url = $(this).attr("href");
    var currentUrl = window.location.pathname + window.location.search;
    if (currentUrl != url && window.innerWidth >= 1041) {
        if (history.pushState != undefined && $("#item-grid-container").data("gridName") === "dashboards") {
            history.pushState({}, "", url);
        }
    }
});

$(document).on("click", ".popup-close", function () {
    window.parent.$("#item-delete-confirmation").ejDialog("close");
});

$(document).on("click", "#open-dashboard, #open-widget", function (e) {
    if ($(this).attr("id") == "open-dashboard") {
        if ($(this).attr("data-href").indexOf("?") == -1) {
            window.open($(this).attr("data-href") + "?showmydashboards=1", "_blank");
        }
        else {
            window.open($(this).attr("data-href") + "&showmydashboards=1", "_blank");
        }
    }
    else {
        window.open($(this).attr("data-href"), "_blank");
    }
});

function ResetGrid() {
    var gridObj = $("#items").data("ejGrid");
    gridObj.model.sortSettings.sortedColumns = [];
    gridObj.model.filterSettings.filteredColumns = [];
    $("#search-items").find("input[type=text]").val('');
    gridObj.refreshContent();
    $(".e-filtericon").removeClass('e-filteredicon e-filternone');
}

$(document).on("click", ".search-item", function (e) {
    e.stopPropagation();
    if ($(".search-area").hasClass("add-background")) {
        if ($(".search-home-section").val() !== "") {
            $(".search-home-section").val("");
            if (!$("#category-list").is(":visible") || $("#category-list").length <= 0) {
                gridObj = $("#items").data("ejGrid");
                gridObj.model.pageSettings.currentPage = 1;
                gridObj.refreshContent();
            }
            else {
                $(".category").trigger("click");
            }
        }
        $(".search-area").removeClass("add-background");
        $(".placeholder, .close-icon").hide();
        if ($(".all-items").hasClass("active") && !$("#category-list").is(":visible")) {
            setTimeout(function () {
                $(".search-area").prevAll().show().parent().removeClass("pull-right");
                $("#category-section-name").show();
                var isMarkItemsPublic = $("#isMarkItemspublic").val();
                if (($("ul.item-navigation li.public-items").hasClass("active") || $("ul.item-navigation li.public-widgets").hasClass("active")) && $("#items").data("ejGrid")._gridRecordsCount > 0 && isMarkItemsPublic == "False") {
                    $(".tool-tip").show();
                }
                else {
                    $(".tool-tip").hide();
                }
            }, 300);
        }
        else {
            setTimeout(function () {
                $(".search-area").prevAll(":not(#back-icon)").show().parent().removeClass("pull-right");
                $("#category-section-name").show();
                var isMarkItemsPublic = $("#isMarkItemspublic").val();
                if (($("ul.item-navigation li.public-items").hasClass("active") || $("ul.item-navigation li.public-widgets").hasClass("active")) && $("#items").data("ejGrid")._gridRecordsCount > 0 && isMarkItemsPublic == "False") {
                    $(".tool-tip").show();
                }
                else {
                    $(".tool-tip").hide();
                }
            }, 300);
        }
        setTimeout(function () { $(".search-home-section:visible").removeClass("show"); }, 300);
    }
    else {
        $(".search-area").addClass("add-background");
        $(".placeholder").show();
        setTimeout(function () { $(".close-icon").show() }, 300);
        if ($(".all-items").hasClass("active") && !$("#category-list").is(":visible")) {
            $(".search-area").prevAll().hide().parent().addClass("pull-right");
            $("#category-section-name").hide();
            var isMarkItemsPublic = $("#isMarkItemspublic").val();
            if (($("ul.item-navigation li.public-items").hasClass("active") || $("ul.item-navigation li.public-widgets").hasClass("active")) && $("#items").data("ejGrid")._gridRecordsCount > 0 && isMarkItemsPublic == "False") {
                $(".tool-tip").show();
            }
            else {
                $(".tool-tip").hide();
            }
        }
        else {
            $(".search-area").prevAll(":not(#back-icon)").hide().parent().addClass("pull-right");
            $("#category-section-name").hide();
            var isMarkItemsPublic = $("#isMarkItemspublic").val();
            if (($("ul.item-navigation li.public-items").hasClass("active") || $("ul.item-navigation li.public-widgets").hasClass("active")) && $("#items").data("ejGrid")._gridRecordsCount > 0 && isMarkItemsPublic == "False") {
                $(".tool-tip").show();
            }
            else {
                $(".tool-tip").hide();
            }
        }
        $("#search-home-page").focus();
        setTimeout(function () { $(".search-home-section:visible").addClass("show"); }, 300);
    }
    setTimeout(function () { $(".clear-search").hide(); }, 300);
    return false;
});

$(document).on("click", ".schedule-dashboards", function () {
    ItemId = $(this).attr("data-item-id")
    ItemName = $(this).attr("data-itemname");
    CategoryName = $(this).attr("data-category-name");
    CategoryId = $(this).attr("data-category-id");
    ScheduleId = "";
    MultiDashboardName = $(this).attr("data-multidashboard-name");
    $("#popup-container").ejDialog("open");
});

$(document).on("click", "#create_schedule, .create-schedule", function () {
    ItemId = "";
    ItemName = "";
    CategoryName = "";
    ScheduleId = "";
    CategoryId = "";
    MultiDashboardName = $(this).attr("data-multidashboard-name");;
    $("#popup-container").ejDialog("open");
});

function onMakePublicDialogClose() {
    $("#make_item_public").ejDialog("close");
}
function onMakePublicDialogOpen() {
    load();
    $("#make_item_public").ejDialog("open");
    $('#make_item_public').focus();
}
function onRemovePublicDialogClose() {
    $("#remove_item_public").ejDialog("close");
}
function onRemovePublicDialogOpen() {
    load();
    $("#remove_item_public").ejDialog("open");
    $('#remove_item_public').focus();
}
function onGetLinkDialogClose() {
    $("#get_item_link").ejDialog("close");
}
function onGetLinkDialogOpen() {
    $("#get_item_link").ejDialog("open");
    $("#get_item_link").show();
    $('#get_item_link').focus();
    $("#item-link").select();
    $(".get_link").show();
    if (browser.name.toLowerCase() == "msie") {
        $("#item-link").val(window.location.href.replace(window.location.pathname + window.location.search, "") + itemUrl.trim());
    }
    else {
        $("#item-link").val(window.location.origin + itemUrl.trim());
    }
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").hide();
        $("#item-link-copy").attr("data-original-title", "");
    }
}

function fnAdjustRowHeight(args) {
    var gridName = $('#item-grid-container').attr("data-grid-name");
    if (gridName == "dashboards") {
        if (args.model.currentViewData.length == 0) {
            rowBound();
        }
    }
}


$(document).on("click", "#item-link-copy", function (e) {
    $("#item-link").select();
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").attr("data-original-title", "");
    }
    else {
        document.execCommand('copy');
        $("#item-link-copy").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess);
        $("#item-link-copy").tooltip("hide").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("fixTitle").tooltip("show");
        setTimeout(function () { $("#item-link-copy").attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy); $("#item-link-copy").tooltip(); }, 3000);
    }
});

$(document).on("click", ".item-link", function (e) {
    e.preventDefault();
    var isDraft = $(this).attr("data-isdraft");
    if (isDraft.toLowerCase() == "true") {
        window.open($(this).attr("href"), "_self");
    }
    else {
        var iframe = document.getElementById("dashboard_render_iframe");
        if (window.innerWidth < 1041 || e.target.id == "open-dashboard" || e.target.id == "open-widget" || e.target.id == "context-menu" || $(e.target).hasClass("favorite-item")) {
            e.stopPropagation();
        }
        else {
            iframe.contentWindow.location.replace(decodeURI($(this).find("span").attr("data-href")));
            $("#item-viewer").ejWaitingPopup("show");
            $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".item-list-panel").width() });
            $("#initial-item-message").css("display", "none");
            $("#dashboard_render_iframe").css("display", "block");

            var url = $(this).attr("href");
            var currentUrl = window.location.pathname + window.location.search;
            if (currentUrl != url) {
                var validQuery = window.location.search.indexOf('?category=') > -1 ? "?view=categories" : "?view=" + $(".item-navigation li.active").attr("data-value");
                var validUrl = url + (url.indexOf('?') > -1 ? validQuery.replace("?", "&") : validQuery);
                $("#current-url").attr("data-url", validUrl);
                if (history.pushState != undefined && $("#item-grid-container").data("gridName") === "dashboards") {
                    history.pushState({}, "", validUrl);
                }
            }
        }
        if ($(this).parents("td").hasClass("active") == false) {
            $(".item-link").parents("td").removeClass("active");
            $(this).parents("td").addClass("active");
        }
        else {
            if (window.innerWidth < 1041) {
                $(".item-link").parents("td").removeClass("active");
                $(".tooltip").hide();
            }
        }
    }
});

$(document).on("click", ".category-collapse", function (e) {
    if ($(".su-sidebar-collapse").is(":visible")) {
        $("#item-viewer").css("width", "100%");
        $(".item-list-panel, .su-sidebar-collapse").css({ "display": "none" });
        $(".su-sidebar-expand").css({ "display": "block" });
        $("#item-viewer").addClass("expanded");
        $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".su-sidebar-expand.category-collapse").width(), "top": $("#header-area").height() });
        var windowwidth = $("#dashboard_render_iframe").width();
        $("#dashboard_render_iframe").contents().find("#dashboard").css("width", windowwidth - 30);
        $("#item-viewer").ejWaitingPopup('refresh').css("width", windowwidth);
        return false;
    }
    else {
        if ($("#dashboard_render_iframe").contents().find("#dashboard-view-toogle").hasClass("dashboard-view-toogle")) {
            CloseDashboardView();
        }
        $("#dashboard_render_iframe").contents().find("#filter-view").hide();
        $("#dashboard_render_iframe").contents().find("#commentModuleContainer").addClass("displayNone")
        $("#dashboard_render_iframe").contents().find("ul.options").css("right", "0px")
        $("#item-viewer").css({ "left": "initial" });
        $("#dashboard_render_iframe").contents().find("ul.options li").removeClass("active");
        $("#item-viewer").css({ "width": "70%" });
        $(".item-list-panel, .su-sidebar-collapse").css({ "display": "block" });
        $(".su-sidebar-expand").css({ "display": "none" });
        $("#item-viewer").removeClass("expanded");
        $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".item-list-panel").width() });
        var windowwidth = $("#dashboard_render_iframe").width();
        $("#dashboard_render_iframe").contents().find("#dashboard").css("width", windowwidth - 30);
        $("#item-viewer").ejWaitingPopup('refresh').css("width", windowwidth);
        return false;
    }
});

$(document).on('show.bs.dropdown', '#listing, #items .e-row', function () {
    if ($(this).find("#context-menu").length > 0) {
        var availableTopHeight = $(this).offset().top + $(this).outerHeight(true) / 2 - $("#header-area").outerHeight(true) - $(".item-navigation").outerHeight(true) - $("#category-listing").outerHeight(true);
        var availableBottomHeight = $(window).height() - $(this).offset().top - $(this).outerHeight(true) / 2;
        var dropDownHeight = $(this).find(".dashboard-options").outerHeight(true);
        if (availableBottomHeight <= dropDownHeight && availableTopHeight >= dropDownHeight) {
            $(this).find("#context-menu").removeClass("dropdown").addClass("dropup");
        }
    }

    if ($(this).hasClass("e-row")) {
        $(".item-link").each(function () {
            $(this).removeClass("active-category-setting");
            if ($(this).find(".open").length > 0) {
                $(this).addClass("active-category-setting");
            }
        });
    }
    else {
        $(".category-section").each(function () {
            $(this).removeClass("active-category-setting");
            if ($(this).find(".open").length > 0) {
                $(this).addClass("active-category-setting");
            }
        });
    }
    refreshScrollerForCategory();
});

$(document).on('hide.bs.dropdown', '#listing, #items .e-row', function () {
    if ($(this).find("#context-menu").length > 0) {
        $(this).find("#context-menu").removeClass("dropup").addClass("dropdown");
    }

    if ($(this).hasClass("e-row")) {
        $(".item-link").removeClass("active-category-setting");
    }
    else {
        $(".category-section").removeClass("active-category-setting");
    }
    refreshScrollerForCategory();
});

$(document).on('shown.bs.dropdown', '#scroll-content li, #items .e-row', function () {
    var gridName = $('#item-grid-container').attr("data-grid-name");
    if ($("#category-list").is(":visible")) {
        refreshScrollerForCategory();
        return false;
    }
    else if (gridName.toLowerCase() == "dashboards" || gridName.toLowerCase() == "widgets") {
        $(".e-gridcontent").ejScroller();
        $(".e-gridcontent").ejScroller("refresh");
    }
});

$(document).on('hidden.bs.dropdown', '#scroll-content li, #items .e-row', function () {
    var gridName = $('#item-grid-container').attr("data-grid-name");
    if ($("#category-list").is(":visible")) {
        refreshScrollerForCategory();
        return false;
    }
    else if (gridName.toLowerCase() == "dashboards" || gridName.toLowerCase() == "widgets") {
        $(".e-gridcontent").ejScroller();
        $(".e-gridcontent").ejScroller("refresh");
    }
});

$(document).on('mouseenter', ".category-section, #items .e-row", function () {
    if ($(this).hasClass("e-row")) {
        $(".item-link").each(function () {
            $(this).removeClass("active-category-setting");
            if ($(this).find(".open").length > 0) {
                $(this).addClass("active-category-setting");
            }
        });
    }
    else {
        $(".category-section").each(function () {
            $(this).removeClass("active-category-setting");
            if ($(this).find(".open").length > 0) {
                $(this).addClass("active-category-setting");
            }
        });
    }
});

$(document).on('mouseleave', ".category-section, #items .e-row", function () {
    if ($(this).hasClass("e-row")) {
        $(".item-link").each(function () {
            $(this).removeClass("active-category-setting");
            if ($(this).find(".open").length > 0) {
                $(this).addClass("active-category-setting");
            }
        });
    }
    else {
        $(".category-section").each(function () {
            $(this).removeClass("active-category-setting");
            if ($(this).find(".open").length > 0) {
                $(this).addClass("active-category-setting");
            }
        });
    }
});

$(document).on('mouseenter', "#open-dashboard, #open-widget", function () {
    $(this).parents("a").tooltip('hide');
});

$(document).on('mouseleave', "#open-dashboard, #open-widget", function () {
    $(this).parents("a").tooltip('show');
});

$(document).on("mouseenter", ".dashboard-views", function (e) {
    if (e.target.className != "view-name") {
        var itemId = $(this).find(".views").attr("data-item-id");
        var element = $(this).find("ul");
        var options = "";
        var isChildDashboard = $(this).find(".views").attr("data-is-childdashboard");
        var parentCategoryName = $(this).find(".views").attr("data-parent-category-name");
        var parentDashboardName = $(this).find(".views").attr("data-parent-itemname");
        var parentDashboardId = $(this).find(".views").attr("data-parent-item-id");
        var childDashboardName = isChildDashboard != undefined && isChildDashboard.toLowerCase() == "true" ? $(this).find(".views").attr("data-child-dashboard-name") : "";
        if (isAjaxRequested == true) {
            $(".dashboard-views").addClass("views-loader");
            isAjaxRequested = false;
            $.ajax({
                type: "POST",
                url: getViewsByItemIdUrl,
                data: { itemId: itemId },
                success: function (data) {
                    if (data != null && data.result != null && data.result.length > 0) {
                        if (isChildDashboard != undefined && isChildDashboard != null && isChildDashboard.toLowerCase() == "true") {
                            for (i = 0; i < data.result.length; i++) {
                                options += "<li><a class='view-name' href='" + dashboards + "/" + parentDashboardId + "/" + parentCategoryName + "/" + parentDashboardName + "?tab=" + childDashboardName + "&viewid=" + data.result[i].ViewId + "' target='_blank' data-toggle='tooltip' data-placement='top' data-original-title='" + data.result[i].ViewName + "' data-itemid='" + data.result[i].ItemId + "'>" + data.result[i].ViewName + "</a></li>";
                            }
                        }
                        else {
                            for (i = 0; i < data.result.length; i++) {
                                options += "<li><a class='view-name' href='" + dashboards + "/" + itemId + "/" + data.result[i].CategoryName + "/" + data.result[i].ItemName + "?viewid=" + data.result[i].ViewId + "' target='_blank' data-toggle='tooltip' data-placement='top' data-original-title='" + data.result[i].ViewName + "' data-itemid='" + data.result[i].ItemId + "'>" + data.result[i].ViewName + "</a></li>";
                            }
                        }
                    } else {
                        options = "<li><span class='view-name' href='javascript:void(0);'><span>" + window.Server.App.LocalizationContent.NoViews + "</span></span></li>";
                    }
                    element.html(options);
                    $(".dashboard-views").removeClass("views-loader");
                    $(".dashboard-views").addClass("no-loader");
                    $('[data-toggle="tooltip"]').tooltip();
                }
            }).always(function () {
                isAjaxRequested = true;
            });
        }
    }
});

$(document).on("click", ".dashboard-options li > span", function (e) {
    e.stopPropagation();
    return false;
});

$(document).on("click", ".download-item", function (e) {
    window.location = $(this).attr("href");
});

$(document).on("click", ".open-item", function (e) {
    var url = $(this).attr("href") + "?showmydashboards=1";
    window.open(url, "_blank");
});

$(document).on("click", ".option-click", function () {
    $(this).closest(".dropdown-menu").prev().dropdown("toggle");
});

$(document).on("click", ".dropdown-backdrop", function (e) {
    e.stopPropagation();
    return false;
});


$(document).on("show.bs.tooltip", function () {
    $(".tooltip").not(this).hide();
});

//Web Designer option in "Edit"
$(document).on("click", ".web-designer", function (e) {
    window.location.href = $(this).attr("href");
});

$(document).on("click", ".view-schedule", function (e) {
    var url = $(this).attr("href");
    window.open(url, "_blank");
});

function DashboardRender(absolutePath, itemId, category, itemName, section, tabName) {
    absolutePath = decodeURI(absolutePath);
    category = decodeURI(category);
    itemName = decodeURI(itemName);
    tabName = decodeURI(tabName);

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var queryStringUrl = "?";
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] !== "category" && pair[0] !== "dashboard" && pair[0] !== "view") {
            if (i !== vars.length - 1) {
                queryStringUrl += pair[0] + "=" + pair[1] + "&";
            } else {
                queryStringUrl += pair[0] + "=" + pair[1];
            }
        }
    }

    var iFrame = document.getElementById("dashboard_render_iframe");
    tabName = tabName != "" && tabName != null && tabName != "null" ? "?tab=" + tabName : "";
    $("#current-url").attr("data-url", absolutePath + "/" + itemId + "/" + category + "/" + itemName + "?view=" + section);

    if ($(".item-navigation li[data-value='" + section + "']").hasClass("active") == false) {
        $(".item-navigation li").removeClass("active");
        $(".item-navigation li[data-value='" + section + "']").addClass("active");

        var dashboardScope = parent.angular.element(parent.document.getElementById("server-items-container")).scope();
        dashboardScope.onClickDisplayCategory("", section);
    }

    if ($(".item-navigation li[data-value='" + section + "']").hasClass("all-items")) {
        $("#category-listing").addClass("category-section");
    }
    else {
        $("#category-listing").removeClass("category-section");
    }

    if (section == "categories") {
        var dashboardScope = parent.angular.element(parent.document.getElementById("server-items-container")).scope();
        dashboardScope.getItemsInCategory("", category);

        $("#search-home-page").focus();
        setTimeout(function () { $(".search-home-section:visible").addClass("show"); }, 300);

        iFrame.contentWindow.location.replace(absolutePath + "/" + itemId + "/" + category + "/" + itemName + queryStringUrl);

        $("#item-viewer").ejWaitingPopup("show");
        $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".item-list-panel").width() });
        $("#initial-item-message").css("display", "none");
        $("#dashboard_render_iframe").css("display", "block");
    }
    else if ((itemName != "")) {
        $("#search-home-page").focus();
        setTimeout(function () { $(".search-home-section:visible").addClass("show"); }, 300);

        iFrame.contentWindow.location.replace(absolutePath + "/" + itemId + "/" + category + "/" + itemName + queryStringUrl);

        $("#item-viewer").ejWaitingPopup("show");
        $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".item-list-panel").width() });
        $("#initial-item-message").css("display", "none");
        $("#dashboard_render_iframe").css("display", "block");
    }

    if ($(".item-navigation li").hasClass("all-items")) {
        $("#category-listing").addClass("category-section");
    }
    else {
        $("#category-listing").removeClass("category-section");
    }

    var currentItem = $(".item-link[data-name='" + itemName + "']");
    if (currentItem.parents("td").hasClass("active") == false) {
        $(".item-link").parents("td").removeClass("active");
        currentItem.parents("td").addClass("active");
    }
    else {
        if (window.innerWidth < 1041) {
            $(".item-link").parents("td").removeClass("active");
            $(".tooltip").hide();
        }
    }

    if ($('#server-items-container .category-collapse').css('display') == 'block') {
        $("#item-viewer").css("width", "100%");
        $("#item-viewer").addClass("expanded");
        $("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - $("#main-nav").width() - $(".su-sidebar-expand.category-collapse").width(), "top": $("#header-area").height() });
        var windowwidth = $("#dashboard_render_iframe").width();
        $("#dashboard_render_iframe").contents().find("#dashboard").css("width", windowwidth - 30);
    }

    return false;
}

$(document).on("mousedown", "#items .e-gridcontent .e-vscrollbar", function () {
    $("#item-viewer iframe").addClass("pointer-event");
    var isEdge = (navigator.userAgent.indexOf("Edge") != -1);
    if (isEdge) {
        $("#item-viewer iframe").addClass("display");
    }
});

$(document).on('mouseup', function () {
    if ($("#item-viewer iframe").hasClass("pointer-event")) {
        $("#item-viewer iframe").removeClass("pointer-event");
        var isEdge = (navigator.userAgent.indexOf("Edge") != -1);
        if (isEdge) {
            $("#item-viewer iframe").removeClass("display");
        }
    }
});

$(document).on("click", ".blank-dashboard-link-box, #start-from-templates", function () {
    $("#CreateDashboard").trigger("click");
});