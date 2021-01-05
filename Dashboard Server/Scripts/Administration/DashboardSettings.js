var isFreshLoad = true;

$(document).ready(function () {
    var bodyWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + bodyWaitingPopupTemplateId) });
	
    if (isSelfHosted.toLowerCase() == "false") {
        $("#dashboard-settings-body").addClass("border-class");
    }

    if ($("#dashboards-tab-nav").children().length == 1) {
        $("#dashboards-tab-nav").children().hide();
    }
    var query = window.location.search;
    if (query.contains("?tab=dashboard-settings")) {
        $('a[href="#dashboard-settings-tab"]').tab("show");
        $("#dashboard-settings-header").show();
        $("#site-attribute-header").hide();
        $("#deployment-header").hide();
    }
    else if (query.contains("?tab=attributes")) {
        $('a[href="#custom-attribute-tab"]').tab("show");
        $("#dashboard-settings-header").hide();
        $("#site-attribute-header").show();
        $("#deployment-header").hide();
    }
    else if (query.contains("?tab=deployment-dashboards")) {
        $('a[href="#deployment-ad-tab"]').tab("show");
        $("#deployment-header").show();
        $("#dashboard-settings-header").hide();
        $("#site-attribute-header").hide();
    }
    else {
        $('a[href="#dashboard-settings-tab"]').tab("show");
        $("#dashboard-settings-header").show();
        $("#site-attribute-header").hide();
        $("#deployment-header").hide();
      }
});

$(document).on("click", "#update-dashboard-settings", function () {
    $(".confirmationMessage").html("");

    var dashboardSettings = {
        IsMarkItemsPublic: $("#restrict-makepublic-dashboard").is(":checked"),
        IsEnableDefaultView: $("#restrict-default-view-dashboard").is(":checked"),
        IsEnableAutosaveFilter: $("#restrict-auto-save-filter").is(":checked"),
        IsIsolationCodeEnabled: $("#enable-isolate-code").is(":checked")
    };
    $("#body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: $(this).data("url"),
        data: { dashboardSettingsData: dashboardSettings },
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.Server.App.LocalizationContent.DashboardSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.DashboardSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
            }
            $("#body").ejWaitingPopup("hide");
        }
    });
});

$(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function (e) {
    var target = $(e.target).attr("href"); // activated tab
    var data;

    if (target.indexOf("#dashboard-settings-tab") !== -1) {
        data = "dashboard-settings";
        $("#dashboard-settings-header").show();
        $("#site-attribute-header").hide();
        $("#deployment-header").hide();
    }
    else if (target.indexOf("#custom-attribute-tab") !== -1) {
        data = "attributes";
        $("#dashboard-settings-header").hide();
        $("#site-attribute-header").show();
        $("#deployment-header").hide();
    }
    else if (target.indexOf("#deployment-ad-tab") !== -1) {
        data = "deployment-dashboards";
        $("#deployment-header").show();
        $("#dashboard-settings-header").hide();
        $("#site-attribute-header").hide();
    }
    pushUrl(data);
});

function pushUrl(data) {
    if (isFreshLoad) {
        history.replaceState(data, null, window.location.pathname + "?tab=" + data);
        isFreshLoad = false;
    }
    else {
        history.pushState(data, null, window.location.pathname + "?tab=" + data);
    }
}