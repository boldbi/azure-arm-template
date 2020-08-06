var designerServiceUrl = "";
var dashboardServiceUrl = "";
var dashboardServerUrl = "";
var designerToken = "";
var dataServiceUrl = "";
var scheduleUrl = "";
var editingUserList = "";
var isDraft = "";
var version = "";
var datasourceId = "";
var intermediateDbStatus = "";
var connectionList = "";
var isAdmin = "";
var parentRefUrl = (window.location != window.parent.location) ? document.referrer : document.location.href.replace(document.location.pathname + document.location.search, "");
if (parentRefUrl == "") {
    var parentUrl = "";
}
else {
    var parentUrl = parentRefUrl.match(/:\/\/(.[^/]+)/)[1];
}
var iframeRefUrl = window.location.href;
var iframeUrl = iframeRefUrl.match(/:\/\/(.[^/]+)/)[1];

$(document).ready(function () {
    designerServiceUrl = $('meta[name="designer_service:url"]').attr("content");
    dashboardServerUrl = $('meta[name="dashboard_server:url"]').attr("content")
    dashboardServiceUrl = $('meta[name="dashboard_service:url"]').attr("content");
    designerToken = $('meta[name="designer_service:access_token"]').attr("content");
    dataServiceUrl = $("meta[name='data_service:url']").attr("content");
    scheduleUrl = $("meta[name='datasource_schedule:url']").attr("content");

    datasourceId = $('meta[name="datasource:id"]').attr("content");
    isDraft = $('meta[name="isdraft"]').attr("content");
    version = $("meta[name='datasource:version']").attr("content");
    isAdmin = $('meta[name="user:is_admin"]').attr("content");

    connectionList = $('meta[name="datasource:connectionlist"]').attr("content");
    intermediateDbStatus = $('meta[name="intermediatedbstatus"]').attr("content");

    renderWebDesigner();

    $("#connectionDesigner #_new_datasetContainer").css("width", $(window).width());
    
    $("#connectionDesigner #_new_datasetContainer").css("height", $(window).height() - 44);
    if (iframeUrl == parentUrl) {
        parent.$("#connection-header").removeClass("display-none");
        parent.$("#create-connection-popup").ejWaitingPopup("hide");
    }

    $("[data-toggle='tooltip']").tooltip();
});

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
        mode: ej.dashboardDesigner.mode.connection,
        itemId: datasourceId,
        serviceAuthorizationToken: designerToken,
        intermediateDbStatus: intermediateDbStatus.toLowerCase() == "true",
        environment: isSelfHosted.toLowerCase() == "true" ? "onpremise" : "cloud",
        connectionList: connectionList,
        viewerSettings: {
            serviceUrl: dashboardServiceUrl
        },
        serverSettings: {           
            isAdmin: isAdmin.toLocaleLowerCase() == "true",
            dataStoreSettingURL: dataStoreSettingUrl
        },
        localeSettings: {
            culture: modelLanguage,
            dateFormat: dateFormat,
            timeFormat: timeFormat
        },
        actionComplete: $.proxy(onComplete, this),
        configuration: configurationPath
    };
    var designer = new ejDashboardDesigner($('#connectionDesigner'), designerModel);
}

function onComplete(args) {
    if (args.data.event === "createConnection") {
        if (iframeUrl == parentUrl) {
            parent.$("#create-connection-popup").ejWaitingPopup("show");
            parent.window.location.href = parent.window.location.origin + rootUrlAction + "/datasource-designer/" + args.data.source.data;
        }
        else {
            document.location.href = baseUrl + "/datasource-designer/" + args.data.source.data + "?isembed=" + "true";
        }
    }

    if (args.eventType === "ConnectionModeDialogClose") {
        collapseCreateBar();
        parent.$("#create-connection-popup").ejDialog("close");
    }

}

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        var dialogData = parent.$("#create-connection-popup").data("ejDialog");
        if (dialogData != undefined) {
            collapseCreateBar();
            window.parent.$("#create-connection-popup").ejDialog("close");
            parent.$("#create-connection-popup").ejWaitingPopup("hide");
        }
    }
});

function openDatasource() {
    var item = getQueryVariable("itemType");
    if (item != null) {
        var idName = "#connectionDesigner_" + item + "_img";
        $(idName).trigger('click');
    }
    console.log(item);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return null;
}

function collapseCreateBar() {
    if (parent.$(".create-menu-open").length === 1) {
        parent.$("#create-item-container").toggleClass("create-menu-effect").toggleClass("create-menu-open");
        parent.$("#create-menu-backdrop").hide();
        parent.$("#header-area, #menu-area, #content-area, footer, .cookie-notification").css("filter", "");
        parent.$("#server-app-container").css("overflow", "");
    }
}