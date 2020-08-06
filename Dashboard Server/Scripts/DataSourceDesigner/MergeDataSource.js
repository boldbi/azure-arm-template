var designerServiceUrl = "";
var dashboardServiceUrl = "";
var dashboardServerUrl = "";
var designerToken = "";
var dataServiceUrl = "";
var intermediateDbStatus = "";
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
    intermediateDbStatus = $('meta[name="intermediatedbstatus"]').attr("content");

    renderWebDesigner();

    if (iframeUrl == parentUrl) {
        parent.$("#connection-header").removeClass("display-none");
        parent.$("#create-merge-datasource-popup").ejWaitingPopup("hide");
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
        mode: ej.dashboardDesigner.mode.mergedatasource,
        serviceAuthorizationToken: designerToken,
        intermediateDbStatus: intermediateDbStatus.toLowerCase() == "true",
        environment: isSelfHosted.toLowerCase() == "true" ? "onpremise" : "cloud",
        localeSettings: {
            culture: modelLanguage,
            dateFormat: dateFormat,
            timeFormat: timeFormat
        },
        actionComplete: $.proxy(onComplete, this)
    };

    var designer = new ejDashboardDesigner($('#mergeDatasource'), designerModel);
}

function onComplete(args) {
    if (args.eventType === "afterMergeSuccess") {
        if (iframeUrl == parentUrl) {
            parent.$("#create-merge-datasource-popup").ejWaitingPopup("show");
            parent.window.location.href = parent.window.location.origin + rootUrlAction + "/datasource-designer/" + args.data.Data;
        }
    }
    else if (args.data.event === "saveDataSource") {
        window.location.href = dataSourcesPageUrl + "?datasourceName=" + args.model.datasourceName + "&datasourceId=" + args.data.Data;
    }
    else if (args.data.event === "ContinueToDashboard") {
        window.location.href = dashboardDesignerUrl + "?datasourceId=" + args.data.Data;
    }
    else if (args.data.event === "cancelDataSource") {
        window.location.href = dataSourcesPageUrl;
    }
    else if (args.eventType === "afterMergeClose") {
        collapseCreateBar();
        parent.$("#create-merge-datasource-popup").ejDialog("close");
    }
}

function collapseCreateBar() {
    if (parent.$(".create-menu-open").length === 1) {
        parent.$("#create-item-container").toggleClass("create-menu-effect").toggleClass("create-menu-open");
        parent.$("#create-menu-backdrop").hide();
        parent.$("#header-area, #menu-area, #content-area, footer, .cookie-notification").css("filter", "");
        parent.$("#server-app-container").css("overflow", "");
    }
}