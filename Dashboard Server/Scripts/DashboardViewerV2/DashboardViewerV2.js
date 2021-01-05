var dashboardId = "";
var designerServiceUrl = "";
var dashboardServiceUrl = "";
var dashboardServerUrl = "";
var version = "";
var designerToken = "";
var dashboardName = "";
var categoryName = "";
var dataServiceUrl = "";
var dataServiceHostUrl = "";
var dashboardDescription = "";
var datasourceId = "";
var browser = "";
var sameOrigin = true;
var isDashboardOptionsBinded = false;
var isOptionsBundleLoaded = false;
var isSharePermissionLoaded = false;
var multiTabActionCount = 0;

$(document).ready(function () {
    browser = ej.browserInfo();
    dashboardId = $('meta[name="dashboard:id"]').attr("content");
    dashboardName = $('meta[name="dashboard:name"]').attr("content");
    categoryName = $('meta[name="category:name"]').attr("content");
    designerServiceUrl = $('meta[name="designer_service:url"]').attr("content");
    dashboardServerUrl = $('meta[name="dashboard_server:url"]').attr("content");
    dashboardServiceUrl = $('meta[name="dashboard_service:url"]').attr("content");
    version = $("meta[name='dashboard:version']").attr("content");
    designerToken = $('meta[name="designer_service:access_token"]').attr("content");
    dataServiceUrl = $("meta[name='data_service:url']").attr("content");
    dataServiceHostUrl = $("meta[name='data_service_host:url']").attr("content");
    dashboardDescription = $("meta[name='dashboard:description']").attr("content");
    datasourceId = $('meta[name="datasource:id"]').attr("content");

    try {
        sameOrigin = window.parent.location.host == window.location.host;
    }
    catch (e) {
        sameOrigin = false;
    }

    if (embedConfig.IsEmbedCode && window.top === window.self) {
        $("body").html(window.Server.App.LocalizationContent.EmbedInvalidMessage);
    }

    if (!embedConfig.IsEmbedDashboard && !isSlideshow && !($("#is_mobile").val() == "true")) {
        $("#dashboard-view-toogle").show();
    }

    if (urlHasMultiTab) {
        if (($("#is_mobile").val() == "true")) {
            $("html").width(parent.$(".e-content.e-lib.e-touch").width());
            $("html").height(parent.window.innerHeight - $("#server-mobile-navbar").height());
            $("#dashboard").width(parent.$(".e-content.e-lib.e-touch").width());
            $("#dashboard").height(parent.window.innerHeight - $("#server-mobile-navbar").height());
        } else {
            $("html").width(parent.$(".e-content.e-lib.e-touch").width());
            $("html").height(parent.window.innerHeight - parent.$(".e-tab-header.e-control.e-toolbar.e-lib.e-keyboard").height());
            $("#dashboard").width(parent.$(".e-content.e-lib.e-touch").width());
            $("#dashboard").height(parent.window.innerHeight - parent.$(".e-tab-header.e-control.e-toolbar.e-lib.e-keyboard").height());
        }
    } else {
        $("#dashboard").width($(window).width());
    }

    $("#dashboard").css("padding-left", $("#menu-area").width());

    var dateFormat = $('meta[name="globalization:date_format"]').attr("content");
    var timeFormat = $('meta[name="globalization:time_format"]').attr("content").toLowerCase() == "true" ? "HH:mm" : "hh:mm tt";

    setWidth();
    if (browser != null && browser.name === "msie" && parseFloat(browser.version) <= 8.0) {
        var divString = '<div style="top:20%;width:575px;margin:0px auto;position:relative;text-align:center">' +
            '<div style="padding:35px 68px 35px 68px;" class="e-dbrd-control-container">' +
            '<p style="font-size:18px;font-weight:bold">' + window.Server.App.LocalizationContent.UnSupportedBrowsers + '</p>' +
            '<p style="font-size:10px">' + window.Server.App.LocalizationContent.UpgradeBrowsers + '</p> ' +
            '<p style="text-align:left;margin-top:20px">' + window.Server.App.LocalizationContent.SupportedBrowsersHeader + '</p> <div class="alert-ie">' +
            '<div><span><img  src="' + commonImageIe + '" /></span><p>' + window.Server.App.LocalizationContent.InternetExplorer + ' 9 +</p > </div > ' +
            '<div><span><img  src="' + commonImageEdge + '" /> </span><p>' + window.Server.App.LocalizationContent.MicrosoftEdge + '</p></div > ' +
            '<div><span><img  src="' + commonImageFirefox + '" /></span><p>' + window.Server.App.LocalizationContent.MozillaFirefox + ' 22 +</p ></div > ' +
            '<div><span><img  src="' + commonImageChrome + '" /></span><p>' + window.Server.App.LocalizationContent.Chrome + ' 17 +</p ></div > ' +
            '<div><span><img  src="' + commonImageOpera + '" /></span><p>' + window.Server.App.LocalizationContent.Opera + ' 12 +</p ></div > ' +
            '<div><span><img  src="' + commonImageSafari + '" /></span><p>' + window.Server.App.LocalizationContent.Safari + ' 5 +</p ></div ></div ></div > ';
        var body = document.getElementById("dashboard");
        body.style.backgroundColor = "white";
        body.innerHTML = divString;
    }
    else {
        $('#dashboard').ejDashboardDesigner({
            siteUrl: baseUrl,
            serviceUrl: designerServiceUrl,
            dataServiceUrl: dataServiceUrl,
            serverUrl: dashboardServerUrl,
            cdnPath: cdnPath,
            mode: ej.dashboardDesigner.mode.view,
            enableTheme: true,
            theme: dashboardTheme,
            itemId: dashboardId,
            datasource: datasourceId,
            dashboardPath: dashboardId + "/" + version,
            dashboardName: dashboardName,
            dashboardSettings: {
                isMultiTab: urlHasMultiTab,
                parentId: multiTabId
            },
            dashboardDescription: dashboardDescription,
            serviceAuthorizationToken: designerToken,
            IsEmbed: embedConfig.IsEmbedDashboard,
            export: exportFormat,
            datasources: sharedDataSources,
            environment: isSelfHosted ? "onpremise" : "cloud",
            bannerSettings: {
                backButtonSettings: {
                    enable: showMyDashboards,
                    URL: myDashboardsUrl,
                    tooltip: window.Server.App.LocalizationContent.BacktoAllDashboards
                },
                dashboardInfo: dashboardDescription
            },
            _favoriteSettings: {
                enabled: embedConfig.IsEmbedCode ? embedConfig.IsMarkFavorite : enableComment.toLowerCase() == "true" && !embedConfig.IsEmbedDashboard,
                isFavorite: isFavorite.toLowerCase() == "true"
            },
            _onFavoriteStateChange: "updatefavorite",
            filterOverviewSettings: {
                showSaveIcon: (urlHasMultiTab && !embedConfig.CanSaveView) || isSlideshow || (!urlHasMultiTab && embedConfig.IsEmbedDashboard) || (embedConfig.IsEmbedCode && !embedConfig.CanSaveView) ? false : ($("#is_mobile").val() == "false" && (isUserAuthenticated == "true" || (!urlHasMultiTab && embedConfig.IsEmbedCode)) ? (isNullOrWhitespace(viewDetails.ViewName) || viewDetails.CanShare) : false),
                showSaveAsIcon: (isSlideshow || (!urlHasMultiTab && embedConfig.IsEmbedDashboard)) ? false : ($("#is_mobile").val() == "false" ? isUserAuthenticated == "true" || (!urlHasMultiTab && embedConfig.CanSaveView) : false),
                showViewSavedFilterIcon: !(isSlideshow || (!urlHasMultiTab && embedConfig.IsEmbedDashboard) || !embedConfig.HasViews),
                viewName: viewDetails.ViewName,
                viewId: viewId
            },
            localeSettings: {
                culture: modelLanguage,
                dateFormat: dateFormat,
                timeFormat: timeFormat
            },
            _onSaveFilter: "saveFilter",
            _onSaveAsFilter: "saveAsFilter",
            _onViewSavedFilters: "openViewSection",
            onBannerIconClick: "onBannerIconClick",
            beforeWidgetIconRendered: "beforeWidgetIconRendered",
            onWidgetIconClick: "onWidgetIconClick",
            actionBegin: "onActionBegin",
            actionComplete: "onActionCompleteOfNewDashboardViewer",
            filterParameters: (isNullOrWhitespace(viewDetails.QueryString) ? "" : decodeURI(viewDetails.QueryString) + (isNullOrWhitespace(filterQuery) ? "" : "&")) + htmlDecode(filterQuery),
            showGetLinkIcon: !isSlideshow && !embedConfig.IsEmbedCode && !embedConfig.IsEmbedDashboard,
            _isPublic: isPublic,
            isPinWidget: isWidgetRequest,
            isHideHeader: embedConfig.HideHeader,
            widgetId: widgetId,
            beforeBannerIconRender: "beforeBannerIconRender",
            beforeOtherOptionContextMenuRender: "beforeOtherOptionContextMenuRender",
            beforeControlMenuOpen: "beforeControlMenuOpen",
            onControlMenuClick: "onControlMenuClick"
        });

        if ($("#is_mobile").val() == "true") {
            if (urlHasMultiTab) {
                $("#dashboard #dashboard_designPanel .e-dashboard-banner-title").css({ "position": "relative", "left": "30px" });
                $("#dashboard #dashboard_designPanel .e-dashboarddesigner-bannerPanel .e-dynamic-title-container").css({ "left": "30px" });
                parent.$("#multi-tab-mobile-menu").show();
            }
        }
    }

    $('.preloader-wrap').fadeOut();
    $("#menu-area").removeClass("display-none");

    var feedbackWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + feedbackWaitingPopupTemplateId) });

    $("[data-toggle='tooltip']").tooltip();
    $('.help-option [second-toggle="tooltip"]').tooltip();

    if (embedConfig.IsEmbedDashboard && !urlHasMultiTab) {
        $("body").addClass("hide-embed-dashboard-icons");
    }

    if (isSlideshow) {
        $("body").addClass("hide-dashboard-icons");
        //Remove side bar
        $("#dashboard-view-toogle").css("display", "none");
        $("#dashboard").css("margin-right", "0").css("width", $(window).width() + "px");
    }

    $(window).resize(function () {
        var dashboardEle = $("#dashboard");
        ResizePopup();
        if (isSlideshow || embedConfig.IsEmbedDashboard) {
            dashboardEle.css("height", $(window).height() + "px").css("width", $(window).width() + "px");
        } else {
            if ($("#is_mobile").val() == "true") {
                dashboardEle.css("height", $(window).height() - $("#server-mobile-navbar").height() + "px");
            }
            if ((sameOrigin ? parent.$(".su-sidebar-collapse").length : $(".su-sidebar-collapse").length) <= 0) {
                setWidth();
            } else {
                if ($("#comments, #views").hasClass('active')) {
                    dashboardEle.css("width", $(window).width() - 450 + "px");
                }
            }
        }
    });
});

function beforeWidgetIconRendered(event) {
    $("#sample-data-notification").show();

    if (isSlideshow || isWidgetRequest) {
        event.iconsinformation = [];
        event.iconsinformation.length = 0;
        return;
    }

    if ((embedConfig.IsEmbedDashboard || embedConfig.IsEmbedCode) && !embedConfig.HasExport) {
        for (var iconIndex = 0; iconIndex < event.iconsinformation.length; ++iconIndex) {
            if (event.iconsinformation[iconIndex].name === 'export' || event.iconsinformation[iconIndex].name === "menu") {
                event.iconsinformation.splice(iconIndex, 1);
                iconIndex--;
            }
        }
    }

    if (enableComment.toLowerCase() == "true" && event.dashboardComment && event.enableComment && embedConfig.HasWidgetComments) {
        event.iconsinformation.push({
            "class": event.enableComment ? commentedWidgets.includes(event.uniqueId) ? "su-with-comment su-icon" : "su-without-comment su-icon" : "",
            "name": "comment",
            "tooltip": window.Server.App.LocalizationContent.Comment
        });
    } else {
        $("#comments").remove();
    }

    if (event.enablePinWidget && isUserAuthenticatedInCurrentTenant && !embedConfig.IsEmbedDashboard && !embedConfig.IsEmbedCode && !urlHasMultiTab) {
        event.iconsinformation.push({
            "class": "su-pin su-icon",
            "name": "pinwidget",
            "tooltip": window.Server.App.LocalizationContent.ToPinWidget
        });
    }
}

function beforeControlMenuOpen(args) {
    if ($("#is_mobile").val() == "false" && isUserAuthenticatedInCurrentTenant && !embedConfig.IsEmbedDashboard && !embedConfig.IsEmbedCode && !urlHasMultiTab) {
        var newOption = { id: "embed-widget", text: "Get Embed Code", parentId: null, sprite: "su su-embed" };
        args.menuItems.push(newOption);
    }
}

function onControlMenuClick(args) {
    if (typeof (args.menuItem.ID) != "undefined") {
        switch (args.menuItem.ID) {
            case "embed-widget":
                var widgetDetails = [];
                widgetDetails.Id = args.model.itemId;
                widgetDetails.widgetId = args.dataWidgetId;
                widgetDetails.Name = args.model.dashboardName;
                widgetDetails.IsPublic = dashboardItemDetail.IsPublic;
                widgetDetails.ItemType = ItemType.Widget;
                widgetDetails.CategoryName = categoryName;
                $("#embed-code").val(generateEmbedCode(widgetDetails));
                break;
            default:
                break;
        }
    }
}

function onBannerIconClick(arg) {
    if (typeof (arg.name) != "undefined" && arg.name == "editdashboard") {
        arg.event.preventDefault();
    }

    var dashboardViewerInstance = $("#dashboard").data("ejDashboardDesigner");
    if (typeof (arg.name) != "undefined" && !isWidgetRequest && isOptionsBundleLoaded || arg.name.toLowerCase() == "dashboardcomment") {
        switch (arg.name.toLowerCase()) {
            case "getlink":
                var shareLinkDlg = $("#get_item_link");
                $(".dashboard-link, .private-note").show();
                itemUrl = window.location.href;
                shareLinkDlg.find(".report-name").html(dashboardViewerInstance.model.dashboardName).attr("title", dashboardViewerInstance.model.dashboardName);
                shareLinkDlg.ejDialog("open");
                break;

            case "editdashboard":
                $("body").ejWaitingPopup({ text: 'Preparing the dashboard to edit' }).ejWaitingPopup("show");
                var loaderEle = $("#body-loader-icon");
                $("#body-loader-icon").css("top", "39%");
                loaderEle.siblings("div.e-text").css("top", "39%").css("margin-top", "30px").css("font-size", "21px").css("font-family", "Roboto");
                $("#body_WaitingPopup").addClass("bg-color-white");
                parent.window.location.href = editDashboardUrl;
                break;

            case "dashboard-info":
                var itemInfoCtrl = angular.element($('[ng-controller=ItemInfoCtrl]')).scope();
                itemInfoCtrl.openInfoDialog(dashboardItemDetail, false);
                break;

            case "fullscreen":
                //close comment window
                $("#dashboard-comment").removeClass("highlight-icon");
                closeDashboardComment();
                //close views window
                $("#close-container").trigger("click");

                switchFullscreenMode();
                break;

            case "dashboardcomment":
                var src = $("#commentModuleContainer iframe").attr("src");
                if (src === undefined || src === "") {
                    $("#commentModuleContainer iframe").attr("src", commentPageUrl + "?itemId=" + $("#commentModuleContainer_iframe").attr("data-item-id") + "&userId=" + userId + "&embed=" + embedConfig.IsEmbedCode + "&viewer=v2");
                }
                if ($("#commentModuleContainer").hasClass("displayNone")) {
                    $("#close-container").trigger("click");
                    $("#dashboard-comment").addClass("highlight-icon");
                    $("#comment-module-container-loader-icon").show();
                    openDashboardComment(null);
                    $("#dashboard").css("width", $(window).width() - 410);
                }
                else {
                    $("#dashboard-comment").removeClass("highlight-icon");
                    closeDashboardComment();
                    $("#dashboard").css("width", $(window).width());
                }

                var data = $("#dashboard").data("ejDashboardDesigner");
                data.resizeDashboard();
                break;

            case "dashboardviews":
                var dashboardViewPanelObj = $("#dashboard-view-toogle");
                if (!dashboardViewPanelObj.hasClass("dashboard-view-toogle")) {
                    $("#dashboard-comment").removeClass("highlight-icon");
                    closeDashboardComment();
                    $("#dashboard-view").addClass("highlight-icon");
                    $('body [data-toggle="tooltip"]').tooltip('hide');
                    dashboardViewPanelObj.toggleClass("dashboard-view-toogle");
                    dashboardViewPanelObj.show();
                    dashboardViewPanelObj.ejWaitingPopup("show");
                    GetSavedFilter();
                    $("#dashboard").toggleClass("dashboard");
                    $(".view-heading").toggle();
                    $("#dashboard-views").toggle();
                    if (dashboardViewPanelObj.hasClass("dashboard-view-toogle")) {
                        dashboardViewPanelObj.find("#close-container a").css("display", "block");
                    }
                    else {
                        dashboardViewPanelObj.find("#close-container a").css("display", "none");
                    }
                    refreshScroller();
                    dashboardViewPanelObj.find("#saved-list").length == 0 ? dashboardViewPanelObj.find("#no-filters").css("display", "block") : dashboardViewPanelObj.find("#no-filters").css("display", "none");
                    dashboardViewPanelObj.ejWaitingPopup("hide");
                    $("#dashboard").css("width", $(window).width() - 410);
                }
                else {
                    $("#close-container").trigger("click");
                    $("#dashboard-view").removeClass("highlight-icon");
                    $("#dashboard").css("width", $(window).width());
                }

                var data = $("#dashboard").data("ejDashboardDesigner");
                data.resizeDashboard();
                break;

            case "sharedashboard":
                if (isSharePermissionLoaded) {
                    shareDashboardPermission(dashboardItemDetail);
                }
                break;

            case "theming":
                dashboardViewerInstance.applyDashboardTheme(arg.selectedTheme);
                setThemeCookie("boldbi.dashboard.theme", arg.selectedTheme, 365);
                if ($("#is_mobile").val() == "true") {
                    applyMultiTabTheme();
                }

                if (urlHasMultiTab) {
                    parent.selectedTheme = arg.selectedTheme;
                    parent.setDefaultTheme(dashboardViewerInstance.modules.themeHelper.getBannerBackground(), dashboardViewerInstance.modules.themeHelper.getBannerTextColor(), dashboardViewerInstance.modules.themeHelper.getBannerIconColor());
                }
                updateQueryParameterInUrl("bi_theme", arg.selectedTheme)
                break;

            case "refreshdashboard":
                $("#dashboard").data("ejDashboardDesigner").updateDashboard();
                break;

            default:
                break;
        }
    }
}

function setThemeCookie(name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays++);
    var cookie_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = name + "=" + cookie_value + ";path=/";
}

function onWidgetIconClick(information) {
    if (typeof (information.name) != "undefined" && !isWidgetRequest) {
        switch (information.name) {
            case "pinwidget":
                var pinWidgetPopupEle = $("#pin-widget-popup");
                pinWidgetPopupEle.ejDialog("open");
                $("#pin-widget-popup_wrapper").ejWaitingPopup("show");
                $("#pin-widget-popup-iframe").attr("src", pinWidgetToHomepageUrl + "?itemId=" + $("#pin-widget-popup").attr("data-item-id") + "&version=" + version + "&isnewversion=true");
                pinWidgetPopupEle.attr("data-widget-id", information.widgetId).attr("data-widget-name", information.headertext);
                pinWidgetPopupEle.attr("data-widget-type", information.widgettype);
                pinWidgetPopupEle.attr("data-tab-id", information.tabId != null ? information.tabId : null);
                break;
            case "comment":
                openWidgetComment(information);
                break;
            default:
                break;
        }
    }
}

function refreshDashboarDesigner() {
    var windowHeight = $(window).innerHeight();
    var headerHeight = $("#designer-header").outerHeight();
    var containerHeight = windowHeight - headerHeight;
    $("#dashboard").height(containerHeight);
    $("#dashboard").width($(window).width());
}

function onActionBegin(arg) {
    if (typeof (arg) != "undefined") {
        switch (arg.eventType) {
            case "renderLayout":
                $(".preloader-wrap").removeClass("viewer-blue-loader");
                break;
            default:
                break;
        }
    }
}

function onActionCompleteOfNewDashboardViewer(arg) {
    if (typeof (arg) != "undefined" && !isWidgetRequest) {
        switch (arg.eventType) {
            case "dashboardRendered":
                if (!embedConfig.IsEmbedDashboard) {
                    openComments();
                    //TODO: Browser History maintenance
                    //updateNavigationHistory();
                }

                if (!isDashboardOptionsBinded) {
                    loadDashboardOptions();
                }
                break;
            case "resizeDashboard":
                if (urlHasMultiTab) {
                    $("html").height(parent.window.innerHeight);
                }
                closeCommentOnResize();
                break;
            case "maximizeDialogOpen":
            case "exportDialogOpen":
            case "filterOverViewOpen":
                if (urlHasMultiTab && $("#is_mobile").val() == "true") {
                    parent.$("#multi-tab-mobile-menu").hide();
                    multiTabActionCount = arg.eventType === "filterOverViewOpen" ? multiTabActionCount : multiTabActionCount + 1;
                }
                break;
            case "maximizeDialogClose":
            case "exportDialogClose":
            case "filterOverViewClose":
                if (urlHasMultiTab && $("#is_mobile").val() == "true" && multiTabActionCount == 1) {
                    parent.$("#multi-tab-mobile-menu").show();
                }
                multiTabActionCount--;
                break;
            case "interactionCompleted":
                if (isUserAuthenticatedInCurrentTenant && !hasDefaultView && autosaveFilter && isUserAutosaveFilter && !embedConfig.IsEmbedDashboard && !isSlideshow) {
                    var widgetFilterQuery = arg.source.data.encryptedData;

                    $.ajax({
                        url: autosaveDashboardFilterUrl,
                        data: { itemId: item_Id, queryString: widgetFilterQuery },
                        type: "POST"
                    });
                }
                break;
            default:
                break;
        }
    }
}

function updateNavigationHistory() {
    var currentUrl = parent.$("#current-url").attr("data-url");
    //var tabName = $("#dashboard").data("ejDashboardDesigner").getCurrentTab().tabName;
    var stateObj = window.top.history.state;
    if (parent.window.innerWidth >= 1041 && history.pushState != undefined) {
        if (currentUrl != undefined) {
            var currentQuery = getQueryWithoutViewCommentTab(parent.window.location.search.substring(1));
            window.top.history.replaceState(stateObj, "DashboardViewer", parent.window.location.pathname + currentQuery /*+ "&tab=" + tabName*/);
        } else {
            var currentQuery = getQueryWithoutViewCommentTab(window.location.search.substring(1));
            if (currentQuery === "") {
                window.top.history.replaceState(stateObj, "DashboardViewer", window.location.pathname /*+ "?tab=" + tabName*/);
            }
            else {
                window.top.history.replaceState(stateObj, "DashboardViewer", window.location.pathname + currentQuery /*+ "&tab=" + tabName*/);
            }
        }
    }
}

function SuccessAlert(header, content, duration) {
    var windowObj = window.parent;
    var sameOrigin = false;
    try {
        sameOrigin = windowObj.location.host == window.location.host && windowObj.$("#success-alert").length > 0;
    }
    catch (e) {
        sameOrigin = false;
    }

    windowObj = !sameOrigin ? window : windowObj;
    windowObj.$("#success-alert").css("display", "table");
    windowObj.$("#message-header").html(header);
    windowObj.$("#message-content").html(content);
    setTimeout(function () {
        windowObj.$('#success-alert').fadeOut();
    }, duration);
}

function WarningAlert(header, content, duration) {
    $("#warning-alert").css("display", "table");
    $("#warning-alert #message-header").html(header);
    $(" #warning-alert #message-content").html(content);


    if (duration != null && duration != "") {
        setTimeout(function () {
            $('#warning-alert').fadeOut();
        }, duration);
    }
    $(document).on("click", ".close-div", function () {
        $('#warning-alert').fadeOut();
    });
}

function createLoader(element) {
    var returnId = "";
    if (typeof element === "string") {
        var selector = (element.indexOf(".") === 0) ? "." : "#";
        element = (element.indexOf(".") === 0) ? element.slice(1, element.length) : (element.indexOf("#") === 0) ? element.slice(1, element.length) : element;
        returnId = element + "-loader-icon";

        if ($("#" + returnId).length == 0 && $(selector + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
        return returnId;
    }
    else {
        element = element.selector;
        var selector = (element.indexOf(".") === 0) ? "." : "#";
        element = element.slice(1, element.length);
        returnId = element + "-loader-icon";
        if ($("#" + returnId).length == 0 && $(selector + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
    }

    return returnId;
}

function setWidth() {
    var dashboardElement = $("#dashboard");
    if (urlHasMultiTab) {
        dashboardElement.css("width", parent.$(".e-content.e-lib.e-touch").width() + "px");
    } else if (isSlideshow || embedConfig.IsEmbedDashboard) {
        dashboardElement.css("width", $(window).width() + "px");
    } else {
        dashboardElement.css("width", $(window).width() + "px");
        if ($(".server-banner-icon").hasClass('highlight-icon')) {
            dashboardElement.css("width", $(window).width() - 410 + "px");
        }
    }
}

function commentImageDialogClose() {
    $("#commentImage_popup").ejDialog("close");
    $("#commentImage_popup_image").attr('src', "");
}

function getQueryWithoutViewCommentTab(queryString) {
    var returnString = '', queries, temp, i, l;
    if (queryString !== "") {
        queries = queryString.split("&");
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            if (temp[0].toLowerCase() !== "tab" && temp[0].toLowerCase() !== "viewid" && temp[0].toLowerCase() !== "comment" && temp[0] !== "filterQuery") {
                returnString += (returnString === '' ? '?' : '&') + queries[i];
            }
        }
    }
    return returnString;
}

function beforeBannerIconRender(args) {
    if ($("#is_mobile").val() == "false") {
        var filterOverviewOption = args.iconsinformation.shift();
        var hideTool = !isNullOrWhitespace(embedConfig.HideHeaderTools) ? embedConfig.HideHeaderTools.split(",") : "";
        if (hideTool.length != 0 && hideTool.includes("om")) {
            args.iconsinformation.pop();
        }
        var commentAndView = {
            groupId: "dashboard-comment-view",
            groupName: "Dashboard Comment & Views",
            items: [
                createBannerIcon("<div/>", "dashboard-refresh", "e-dbrd-banner-refresh", "Refresh", "refreshdashboard", true, false, { "font-size": "14px" })
            ]
        };

        if (!isSlideshow && !isWidgetRequest) {
            if (enableComment.toLowerCase() == "true" && args.enableComment && embedConfig.HasDashboardComments) {
                commentAndView.items.push(createBannerIcon("<div/>", "dashboard-comment", isDashboardCommented ? "su su-with-comment" : "su su-without-comment", "Comment", "dashboardcomment", true, false, { "font-size": "15px" }));
            }

            if (embedConfig.HasViews) {
                commentAndView.items.push(createBannerIcon("<div/>", "dashboard-view", "su su-view", "Views", "dashboardviews", true, false, { "font-size": "17px" }));
            }

            if (hideTool.length == 0 || (hideTool.length != 0 && !hideTool.includes("fs"))) {
                commentAndView.items.push(createBannerIcon("<div/>", "dashboard-fullscreen", "su su-maximize-1", "Fullscreen", "fullscreen", true, false, { "font-size": "14px" }));
            }

            args.iconsinformation.unshift(commentAndView);

            if ((canEdit || isAdmin || dashboardItemDetail.CreatedById == userId) && !embedConfig.IsEmbedDashboard) {

                var editShareIconGroup = {
                    groupId: "dashboard-share-edit",
                    groupName: "Dashboard Share & Edit",
                    items: []
                };

                if (canEdit) {
                    editShareIconGroup.items.push(createBannerIcon("<a/>", "dashboard-edit", "su su-edit", "Edit", "editdashboard", true, true, { "width": "65px", "font-size": "13px", "padding-left": "7px" }, editDashboardUrl));
                }

                if ((isAdmin || dashboardItemDetail.CreatedById == userId) && !embedConfig.IsEmbedCode) {
                    editShareIconGroup.items.push(createBannerIcon("<span/>", "dashboard-share", "su su-share", "Share", "sharedashboard", true, true, { "width": "70px", "font-size": "13px", "padding-left": "7px" }));
                }

                args.iconsinformation.unshift(editShareIconGroup);
            }
        } else {
            args.iconsinformation.unshift(commentAndView);
        }

        if (hideTool.length == 0 || (hideTool.length != 0 && !hideTool.includes("fo"))) {
            args.iconsinformation.unshift(filterOverviewOption);
        }
    }
    else {
        $("#server-mobile-navbar").css("background", $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerBackground());
        $(".nav-menu-label").css("color", $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerTextColor());
        $(".navbar-nav a").css("color", $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerIconColor());
    }
    if (urlHasMultiTab) {
        parent.setDefaultTheme($("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerBackground(), $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerTextColor(), $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerIconColor());
    }
}

function beforeOtherOptionContextMenuRender(args) {
    if (!embedConfig.HasExport) {
        args.iconsinformation.pop();
    }

    if (isUserAuthenticated.toLowerCase() == "true") {
        args.iconsinformation.push(
            {
                groupId: "other-option-info",
                groupName: "Info",
                items: [
                    {
                        id: "dashboard-info",
                        text: window.Server.App.LocalizationContent.Info,
                        class: ""
                    }
                ]
            }
        );
    }
}

function createBannerIcon(tag, id, className, label, dataName, dataEvent, showText, css, href) {
    if (showText) {
        return jQuery(tag, {
            id: id,
            html: jQuery('<span/>', { "class": "icon-with-label", text: label, css: { "font-family": "Roboto", "padding": "10px" } }),
            "class": "server-banner-icon e-dashboard-banner-icon e-dbrd-designer-hoverable " + className,
            "data-name": dataName,
            "data-event": dataEvent,
            "href": href,
            css: css
        });
    } else {
        return jQuery(tag, {
            id: id,
            "class": "server-banner-icon e-dashboard-banner-icon e-dbrd-designer-hoverable " + className,
            "data-tooltip": label,
            "data-name": dataName,
            "data-event": dataEvent,
            css: css
        });
    }
}

function loadDashboardOptions() {
    $.ajax({
        type: "POST",
        url: triggerDashboardRenderComplete,
        data: { itemid: dashboardId, isslidshow: isSlideshow, embedconfig: embedConfig },
        success: function (data) {
            $("body").append(data);
            isDashboardOptionsBinded = true
        }
    });
}

function ResizePopup() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var popupWidth = $("#viewShare_popup").width();
    var popupHeight = $("#viewShare_popup").height();
    var leftPostition = (parseInt(windowWidth) - parseInt(popupWidth)) / 2;
    var topPostition = (parseInt(windowHeight) - parseInt(popupHeight)) / 2;
    if (topPostition < 0) {
        topPostition = 0;
    }
    $("#viewShare_popup").css({ "left": leftPostition, "top": topPostition });
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

function applyDashboardTheme() {
    if (typeof (parent.selectedTheme) != "undefined") {
        var dashboardViewerInstance = $("#dashboard").data("ejDashboardDesigner");
        dashboardViewerInstance.applyDashboardTheme(parent.selectedTheme);
    }
}

function applyMultiTabTheme() {
    $("#server-mobile-navbar").css("background", $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerBackground());
    $(".nav-menu-label").css("color", $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerTextColor());
    $(".navbar-nav a").css("color", $("#dashboard").data("ejDashboardDesigner").modules.themeHelper.getBannerIconColor());
}

$(document).on("click", "#server-mobile-navbar #view-li", function () {
    parent.$("#multi-tab-mobile-menu").hide();
    multiTabActionCount++;
});

$(document).on("click", ".list-group.server-dashboard-view #close-container", function () {
    if (multiTabActionCount == 1) {
        parent.$("#multi-tab-mobile-menu").show();
    }
    multiTabActionCount--;
});

function updateQueryParameterInUrl(key, value) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value);
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
}