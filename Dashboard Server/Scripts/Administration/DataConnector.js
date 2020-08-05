var designerServiceUrl = "";
var dashboardServerUrl = "";
var designerToken = "";
var intermediateDbStatus = "";
var isAdmin = "";

$(document).ready(function () {
    designerServiceUrl = $('meta[name="designer_service:url"]').attr("content");
    dashboardServerUrl = $('meta[name="dashboard_server:url"]').attr("content")
    designerToken = $('meta[name="designer_service:access_token"]').attr("content");
    intermediateDbStatus = $('meta[name="intermediatedbstatus"]').attr("content");
    isAdmin = $('meta[name="user:is_admin"]').attr("content");
  
    renderConnectorPage();
});

function renderConnectorPage() {

    var connectionModel = {
        serviceUrl: designerServiceUrl,
        serverUrl: dashboardServerUrl,
        serviceAuthorizationToken: designerToken,        
        intermediateDbStatus: intermediateDbStatus.toLowerCase() == "true",
        environment: isSelfHosted.toLowerCase() == "true" ? "onpremise" : "cloud",
        serverSettings: {
            isAdmin: isAdmin.toLocaleLowerCase() == "true",
            dataStoreSettingURL: dataStoreSettingUrl
        },
        actionComplete: $.proxy(onSaveDatasourceSettings, this),
 

    };
    var connector = new ej.Dashboard.ejConnectionConfiguration($('#connectionDesigner'), connectionModel);
}

function onSaveDatasourceSettings(args) {
    if (args.data.Status) {
        SuccessAlert(window.Server.App.LocalizationContent.DatasourceSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);       
    }
    else {
        WarningAlert(window.Server.App.LocalizationContent.DatasourceSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
    }
}

$(document).on("click", "#update-datasource-settings", function () {
    var connectorConfiguration = $("#connectionDesigner").data('ejConnectionConfiguration');
    connectorConfiguration.saveConnectionInfo(this);
});
