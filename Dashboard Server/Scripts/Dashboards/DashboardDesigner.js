var dashboardId = "";
var designerServiceUrl = "";
var dashboardServiceUrl = "";
var dashboardServerUrl = "";
var scheduleUrl = "";
var version = "";
var designerToken = "";
var dashboardName = "";
var isUrlChange = "";
var isDraft = "";
var isPublic = "";
var canMarkDashboardAsPublic = "";
var isAdmin = "";
var categoryName = "";
var dataServiceUrl = "";
var dashboardDescription = "";
var editingUserList = "";
var datasourceId = "";
var datasourceVersion = "";
var intermediateDbStatus = "";
var connectionList = "";
var currentCulture = "";

$(document).ready(function () {
    refreshDashboarDesigner();
    dashboardId = $('meta[name="dashboard:id"]').attr("content");
    dashboardName = $('meta[name="dashboard:name"]').attr("content");
    categoryName = $('meta[name="category:name"]').attr("content");
    designerServiceUrl = $('meta[name="designer_service:url"]').attr("content");
    dashboardServerUrl = $('meta[name="dashboard_server:url"]').attr("content");
    scheduleUrl = $("meta[name='datasource_schedule:url']").attr("content");
    dashboardServiceUrl = $('meta[name="dashboard_service:url"]').attr("content");
    version = $("meta[name='dashboard:version']").attr("content");
    designerToken = $('meta[name="designer_service:access_token"]').attr("content");
    isUrlChange = $('meta[name="isurlchange"]').attr("content");
    isDraft = $('meta[name="isdraft"]').attr("content");
    isPublic = $('meta[name="ispublic"]').attr("content");
    canMarkDashboardAsPublic = $('meta[name="dashboards:allow_public_dashboards"]').attr("content");
    isAdmin = $('meta[name="user:is_admin"]').attr("content");
    dataServiceUrl = $("meta[name='data_service:url']").attr("content");
    dashboardDescription = $("meta[name='dashboard:description']").attr("content");
    datasourceId = $('meta[name="datasource:id"]').attr("content");
    datasourceVersion = $("meta[name='datasource:version']").attr("content");
    connectionList = $('meta[name="datasource:connectionlist"]').attr("content");
    intermediateDbStatus = $('meta[name="intermediatedbstatus"]').attr("content");
    currentCulture = $('meta[name="user:culture"]').attr("content");


    if (isUrlChange.toLowerCase() != "false") {
        updateURL(categoryName, dashboardName, dashboardId, datasourceId);
    }

    $("#dashboardDesigner").width($(window).width() - $("#menu-area").width());


    if (isEmbed == "true") {
        $("#dashboardDesigner").css({ "width": '100%', "padding-left": '0px' });
    }
    else {
        $("#dashboardDesigner").css("padding-left", $("#menu-area").width());
        $("#menu-area").css("display", "block");
    }

    renderWebDesigner();

    $('.preloader-wrap').fadeOut();

    // Declare a proxy to reference the hub.
    var connectedUser = $.connection.connectedUsersHub;

    connectedUser.client.sendNotification = function (userlist) {
        if ($("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar ul #users-container #users").find("li").length == 0) {
            for (var i = 0; userlist.length > i; i++) {
                if (userlist[i].DisplayName != displayName) {
                    editingUserList += "<li data-connectionid='" + userlist[i].ConnectionId + "'><img title='" + userlist[i].DisplayName + "' src='" + idpUrl + "/User/Avatar?id=" + userlist[i].IdpReferenceId + "'> <span class='user-name-padding'>" + userlist[i].DisplayName + "</span></li>";
                }
            }

            if (editingUserList != "") {
                $("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar").append('<ul class="e-reportdesigner-toolbarul e-ul e-horizontal" style="float: right;"><div id="users-container"><span class="dropdown-toggle su su-group-1" data-toggle="dropdown"></span><span class="users-count"></span><ul class="dropdown-menu" id="users" role="menu"><li class="editing-message">' + window.Server.App.LocalizationContent.OtherUsers + '</li><li class="users-list"><ul id="editing-users"></li></ul><li role="separator" class="divider"></li><li class="notification-message">' + window.Server.App.LocalizationContent.EditingUserNotification + '</li></ul></div></ul>');
                document.getElementById("editing-users").innerHTML += editingUserList;
                var length = $("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar ul #users-container #users #editing-users").find("li:not(.editing-message)").length;
                $("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar ul #users-container .users-count").html(length);
            }
        }
        else {
            editingUserList = "";
            for (var i = 0; userlist.length > i; i++) {
                if (userlist[i].DisplayName != displayName) {
                    editingUserList += "<li data-connectionid='" + userlist[i].ConnectionId + "'><img title='" + userlist[i].DisplayName + "' src='" + idpUrl + "/User/Avatar?id=" + userlist[i].IdpReferenceId + "'> <span class='user-name-padding'>" + userlist[i].DisplayName + "</span></li>";
                }
            }

            document.getElementById("editing-users").innerHTML = '';
            document.getElementById("editing-users").innerHTML += editingUserList;
            var length = $("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar ul #users-container #users #editing-users").find("li:not(.editing-message)").length;
            $("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar ul #users-container .users-count").html(length);
        }
    };

    connectedUser.client.sendRemovedNotification = function (user) {
        for (var i = 0; i < $("#editing-users").find("li").length; i++) {
            if ($("#editing-users").find("li").eq(i).attr('data-connectionid') == user.ConnectionId) {
                $("#editing-users").find("li").eq(i).remove();
            }
        }

        var length = $("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar ul #users-container #users #editing-users").find("li:not(.editing-message)").length;
        if (length == 0) {
            $("#users-container").remove();
            editingUserList = "";
        }
        else {
            $("#dashboardDesigner_designerContainer #dashboardDesigner_toolBar ul #users-container .users-count").html(length);
        }
    }

    $.connection.hub.start().done(function () {
        connectedUser.server.adduserToGroup(dashboardId, idpreferenceId, displayName);
    });

    $(window).resize(function () {
        refreshDashboarDesigner();
    });
    var feedbackWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + feedbackWaitingPopupTemplateId) });

    if (showFeedbackDialog.toLowerCase() == "true") {
        $("#do-not-show-button").removeClass("display-none");
        $("#show-later-button").removeClass("display-none");
        $("#cancel-button").addClass("display-none");
        $("#close-general-feedback").attr("data-feedback-close", false);
        openFeedbackWindow();
    }

    $("[data-toggle='tooltip']").tooltip();
    $('.help-option [second-toggle="tooltip"]').tooltip();
});

window.onload = function () {
    var mapUrls = document.getElementsByName("dashboard_designer:maps:shapes");

    for (i = 0; i < mapUrls.length; i++) {
        if (mapUrls[i].content != "") {
            var script = document.createElement('script');
            script.src = mapUrls[i].content;
            script.async = true;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }
};

function refreshDashboarDesigner() {
    var windowHeight = $(window).innerHeight();
    $("#dashboardDesigner").height(windowHeight);
    $("#dashboardDesigner").width($(window).width() - $("#menu-area").width());
}

function renderWebDesigner() {
    /*
    When user opens the draft dashboards, we will set itemId and left the dashboardPath and dashboardName as empty since we have not yet saved the dashboard. When saving the dashboard, designer team will call the Update Dashboard API.

    var designerModel  = {
        itemId: "e7fa3fe7-29a5-4775-a441-62a523d852ac", //Sample Item Id
        dashboardPath: "",
        dashboardName: ""
    };


    When user opens already published dashboard in designer, we will set itemId ,itemPath and dashboardName properties. When saving the dashboard, designer team will call the Update Dashboard API.

    var designerModel  = {
        itemId: "e7fa3fe7-29a5-4775-a441-62a523d852ac", //Sample Item Id
        dashboardPath: "e7fa3fe7-29a5-4775-a441-62a523d852ac/2" //Here itemPath is set as itemId/latestVersion.
        dashboardName: saveddashboardname //Samplename
    };
    */
    var dateFormat = $('meta[name="globalization:date_format"]').attr("content");
    var timeFormat = $('meta[name="globalization:time_format"]').attr("content").toLowerCase() == "true" ? "HH:mm" : "hh:mm tt";

    var designerModel = {
        siteUrl: baseUrl,
        serviceUrl: designerServiceUrl,
        dataServiceUrl: dataServiceUrl,
        serverUrl: dashboardServerUrl,
        schedule: {
            endPoint: scheduleUrl,
            summaryText: ''
        },
        mode: ej.dashboardDesigner.mode.design,
        itemId: dashboardId,
        datasource: datasourceId,
        dashboardPath: isDraft.toLowerCase() == "true" ? "" : dashboardId + "/" + version,
        dashboardName: dashboardName,
        isPublic: isPublic.toLowerCase() == "true" ? true : false,
        IsEmbed: isEmbed == "true" ? true : false,
        dashboardDescription: dashboardDescription,
        serviceAuthorizationToken: designerToken,
        intermediateDbStatus: intermediateDbStatus.toLowerCase() == "true",
        environment: isSelfHosted.toLowerCase() == "true" ? "onpremise" : "cloud",
        connectionList : connectionList,
        export: exportFormat,
        serverSettings: {
            isPublic: canMarkDashboardAsPublic.toLowerCase() == "true" && isPublic.toLowerCase() == "true",
            enableMarkAsPublic: canMarkDashboardAsPublic.toLowerCase() == "true",
            warningMessage: isAdmin.toLocaleLowerCase() == "true" ? window.Server.App.LocalizationContent.DisabledPublicDashboards + "<a href='" + rootUrlAction + "/administration/dashboard-settings' target='_blank' >" + window.Server.App.LocalizationContent.DashboardSettingsContent : window.Server.App.LocalizationContent.ContactSystemAdministrator,
            isAdmin: isAdmin.toLocaleLowerCase() == "true",
            dataStoreSettingURL: dataStoreSettingUrl
        },
        viewerSettings: {
            serviceUrl: dashboardServiceUrl
        },
        localeSettings: {
            culture: modelLanguage,
            dateFormat: dateFormat,
            timeFormat: timeFormat
        },
        actionComplete: $.proxy(onSaveDashboard, this),
        configuration: configurationPath,
        isAllowUserToCreateDatasource: canCreateDatasource
    };
    var designer = new ejDashboardDesigner($('#dashboardDesigner'), designerModel);
}

//After completing 'save' and 'saveas' action in designer
function onSaveDashboard(args) {
    var savedDashboardDetails = args.data;
    if (args.eventType == "SaveAs") {
        isDraft = "false";
        var designer = $('#dashboardDesigner').data('ejDashboardDesigner');
        var newTitle = savedDashboardDetails.dashboardName + " - " + window.Server.App.LocalizationContent.DesignDashboard + " - " + organizationName;
        document.title = newTitle;
        $('.edit-dashboard').html(savedDashboardDetails.dashboardName);
        $('.dashboard-status').html('(Saved)');
        updateURL(savedDashboardDetails.categoryName, savedDashboardDetails.dashboardName, savedDashboardDetails.dashboardId);

        //Initializing saved itemId and dashboardPath to designer model
        designer.model.itemId = savedDashboardDetails.dashboardId;
        designer.model.dashboardPath = savedDashboardDetails.dashboardId + "/" + savedDashboardDetails.version;
        $("#journey-ripple").addClass("circle-ripple");
    }
    if (args.eventType == "Save") {
        if (savedDashboardDetails.categoryName != "") {
            categoryName = savedDashboardDetails.categoryName;
        }
        updateURL(categoryName, savedDashboardDetails.dashboardName, savedDashboardDetails.dashboardId, undefined, savedDashboardDetails.version);
        var newTitle = savedDashboardDetails.dashboardName + " - " + window.Server.App.LocalizationContent.DesignDashboard + " - " + organizationName;
        document.title = newTitle;
        $('.edit-dashboard').html(savedDashboardDetails.dashboardName);
        $('.dashboard-status').html('(Saved)');

        $("#journey-ripple").addClass("circle-ripple");
    }
}

function updateURL(categoryName, dashboardName, dashboardId, datasourceId, version) {
    if (history.pushState != undefined) {
        // Getting the culture info from requested url
        var culture = currentUrl.split("/");
        var newdesignerurl = rootUrlAction.split("/bi/")[0] + "/bi/" + currentCulture + "/" + rootUrlAction.split("/bi/")[1];
        if (isSelfHosted.toLowerCase() === "false") {
            newdesignerurl = newdesignerurl.substring(0, newdesignerurl.length - 1);
        }

        categoryName = isDraft.toLowerCase() == "true" ? "draft" : categoryName;

        if (datasourceId != undefined) {
            if (version != undefined) {
                newdesignerurl = newdesignerurl + "/dashboard-designer/" + dashboardId + "/" + categoryName + "/" + dashboardName + "?v=" + version + "&datasourceId=" + datasourceId;
            }
            else {
                newdesignerurl = newdesignerurl + "/dashboard-designer/" + dashboardId + "/" + categoryName + "/" + dashboardName + "?datasourceId=" + datasourceId;
            }
        }
        else {
            if (version != undefined) {
                newdesignerurl = newdesignerurl + "/dashboard-designer/" + dashboardId + "/" + categoryName + "/" + dashboardName + "?v=" + version;
            }
            else {
                newdesignerurl = newdesignerurl + "/dashboard-designer/" + dashboardId + "/" + categoryName + "/" + dashboardName;
            }
        }

        history.pushState({}, "", newdesignerurl);

    }
}

function SuccessAlert(header, content, duration) {
    window.top.$("#success-alert").css("display", "table");
    window.top.$("#message-header").html(header);
    window.top.$("#message-content").html(content);
    setTimeout(function () {
        window.top.$('#success-alert').fadeOut();
    }, duration);
}

function WarningAlert(header, content, duration) {
    parent.$("#warning-alert").css("display", "table");
    parent.$("#warning-alert #message-header").html(header);
    parent.$(" #warning-alert #message-content").html(content);
    if (duration != null && duration != "") {
        setTimeout(function () {
            parent.$('#warning-alert').fadeOut();
        }, duration);
    }
    $(document).on("click", ".close-div", function () {
        parent.$('#warning-alert').fadeOut();
    });
}
