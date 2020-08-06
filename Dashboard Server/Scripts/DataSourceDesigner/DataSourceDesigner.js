var designerServiceUrl = "";
var dashboardServiceUrl = "";
var dashboardServerUrl = "";
var designerToken = "";
var dataServiceUrl = "";
var scheduleUrl = "";
var editingUserList = "";
var isUrlChange = "";
var isDraft = "";
var version = "";
var datasourceId = "";
var datasourceName = "";
var datasourceDescription = "";
var intermediateDbStatus = "";
var connectionList = "";

$(document).ready(function () {
    refreshDashboarDesigner();
    designerServiceUrl = $('meta[name="designer_service:url"]').attr("content");
    dashboardServerUrl = $('meta[name="dashboard_server:url"]').attr("content");
    dashboardServiceUrl = $('meta[name="dashboard_service:url"]').attr("content");
    designerToken = $('meta[name="designer_service:access_token"]').attr("content");
    dataServiceUrl = $("meta[name='data_service:url']").attr("content");
    scheduleUrl = $("meta[name='datasource_schedule:url']").attr("content");

    datasourceId = $('meta[name="datasource:id"]').attr("content");
    datasourceName = $('meta[name="datasource:name"]').attr("content");
    isUrlChange = $('meta[name="isurlchange"]').attr("content");
    isDraft = $('meta[name="datasource:is_draft"]').attr("content");
    version = $("meta[name='datasource:version']").attr("content");
    datasourceDescription = $("meta[name='datasource:description']").attr("content");

    connectionList = $('meta[name="datasource:connectionlist"]').attr("content");
    intermediateDbStatus = $('meta[name="intermediatedbstatus"]').attr("content");

    updateURL(datasourceName, datasourceId);

    $("#datasourceDesigner").width($(window).width() - $("#menu-area").width());

    if (isEmbed == "true") {
        $("#datasourceDesigner").css({ "width": '100%', "padding-left": '0px' });
    }
    else {
        $("#datasourceDesigner").css("padding-left", $("#menu-area").width());
        $("#menu-area").css("display", "block");
    }

    renderWebDesigner();

    $('.preloader-wrap').fadeOut();

    // Declare a proxy to reference the hub.
    var connectedUser = $.connection.connectedUsersHub;

    connectedUser.client.sendNotification = function (userlist) {
        if ($("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar ul #users-container #users").find("li").length == 0) {
            for (var i = 0; userlist.length > i; i++) {
                if (userlist[i].DisplayName != displayName) {
                    editingUserList += "<li data-connectionid='" + userlist[i].ConnectionId + "'><img title='" + userlist[i].DisplayName + "' src='" + idpUrl + "/User/Avatar?id=" + userlist[i].IdpReferenceId + "'> <span class='user-name-padding'>" + userlist[i].DisplayName + "</span></li>";
                }
            }

            if (editingUserList != "") {
                $("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar").append('<ul class="e-reportdesigner-toolbarul e-ul e-horizontal" style="float: right;"><div id="users-container"><span class="dropdown-toggle su su-group-1" data-toggle="dropdown"></span><span class="users-count"></span><ul class="dropdown-menu" id="users" role="menu"><li class="editing-message">' + window.Server.App.LocalizationContent.OtherUsers + '</li><li class="users-list"><ul id="editing-users"></li></ul><li role="separator" class="divider"></li><li class="notification-message">' + window.Server.App.LocalizationContent.EditingUserNotification + '</li></ul></div></ul>');
                document.getElementById("editing-users").innerHTML += editingUserList;
                var length = $("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar ul #users-container #users #editing-users").find("li:not(.editing-message)").length;
                $("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar ul #users-container .users-count").html(length);
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
            var length = $("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar ul #users-container #users #editing-users").find("li:not(.editing-message)").length;
            $("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar ul #users-container .users-count").html(length);
        }
    };

    connectedUser.client.sendRemovedNotification = function (user) {
        for (var i = 0; i < $("#editing-users").find("li").length; i++) {
            if ($("#editing-users").find("li").eq(i).attr('data-connectionid') == user.ConnectionId) {
                $("#editing-users").find("li").eq(i).remove();
            }
        }

        var length = $("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar ul #users-container #users #editing-users").find("li:not(.editing-message)").length;
        if (length == 0) {
            $("#users-container").remove();
            editingUserList = "";
        }
        else {
            $("#datasourceDesigner_designerContainer #datasourceDesigner_toolBar ul #users-container .users-count").html(length);
        }
    }

    $.connection.hub.start().done(function () {
        connectedUser.server.adduserToGroup(datasourceId, idpreferenceId, displayName);
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
        $("#close-general-feedback").attr("data-feedback-close", false)
        openFeedbackWindow();
    }

    $("[data-toggle='tooltip']").tooltip();
    $('.help-option [second-toggle="tooltip"]').tooltip();
});

function refreshDashboarDesigner() {
    var windowHeight = $(window).innerHeight();
    $("#datasourceDesigner").height(windowHeight);
    $("#datasourceDesigner").width($(window).width() - $("#menu-area").width());
}

function renderWebDesigner() {
    var dateFormat = $('meta[name="globalization:date_format"]').attr("content");
    var timeFormat = $('meta[name="globalization:time_format"]').attr("content").toLowerCase() == "true" ? "HH:mm" : "hh:mm tt";

    var designerModel = {
        serviceUrl: designerServiceUrl,
        dataServiceUrl: dataServiceUrl,
        serverUrl: dashboardServerUrl,
        schedule: {
            endPoint: scheduleUrl,
            summaryText: ''
        },
        itemId: datasourceId,
        mode: ej.dashboardDesigner.mode.datasource,
        datasource: datasourceId,
        isDraft: isDraft.toLowerCase() == "true",
        IsEmbed: isEmbed == "true" ? true : false,
        datasourceName: datasourceName,
        datasourceDescription: datasourceDescription,
        serviceAuthorizationToken: designerToken,
        intermediateDbStatus: intermediateDbStatus.toLowerCase() == "true",
        environment: isSelfHosted.toLowerCase() == "true" ? "onpremise" : "cloud",
        connectionList: connectionList,
        viewerSettings: {
            serviceUrl: dashboardServiceUrl
        },
        localeSettings: {
            culture: modelLanguage,
            dateFormat: dateFormat,
            timeFormat: timeFormat
        },
        actionComplete: $.proxy(onComplete, this),
        configuration: configurationPath
    };
    var designer = new ejDashboardDesigner($('#datasourceDesigner'), designerModel);
}

function onComplete(args) {
    if (args.data.event === "saveDataSource") {
        window.location.href = dataSourcesPageUrl + "?datasourceName=" + args.model.datasourceName + "&datasourceId=" + args.data.source.data;
    }
    else if (args.data.event === "ContinueToDashboard") {
        if (isEmbed == "true") {
            window.location.href = dashboardDesignerUrl + "?datasourceId=" + args.data.source.data + "&isembed=true";
        }
        else {
            window.location.href = dashboardDesignerUrl + "?datasourceId=" + args.data.source.data;
        }
    }
    else if (args.data.event === "cancelDataSource") {
        window.location.href = dataSourcesPageUrl;
    }
}

function updateURL(datasourceName, datasourceId, version) {
    if (history.pushState != undefined) {
        // Getting the culture info from requested url
        var culture = currentUrl.split("/");

        var newdesignerurl = rootUrlAction;

        if (version != undefined) {
            newdesignerurl = newdesignerurl + "/datasource-designer/" + datasourceId + "/" + datasourceName + "?v=" + version;
        }
        else {
            newdesignerurl = newdesignerurl + "/datasource-designer/" + datasourceId + "/" + datasourceName;
        }

        history.pushState({}, "", newdesignerurl);

    }
}

function SuccessAlert(header, content, duration) {
    window.top.$("#success-alert").css("display", "table");
    window.top.$("#message-header").html(header);
    window.top.$("#message-content").html(content);
    setTimeout(function () {
        window.top.$('#success-alert').fadeOut()
    }, duration);
}

function WarningAlert(header, content, duration) {
    parent.$("#warning-alert").css("display", "table");
    parent.$("#warning-alert #message-header").html(header);
    parent.$(" #warning-alert #message-content").html(content);
    if (duration != null && duration != "") {
        setTimeout(function () {
            parent.$('#warning-alert').fadeOut()
        }, duration);
    }
    $(document).on("click", ".close-div", function () {
        parent.$('#warning-alert').fadeOut()
    });
}
