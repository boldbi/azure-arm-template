$(document).ready(function () {
    validateDeployment();
});

function proceedAutoDeployment(result) {
    $.ajax({
        url: setSystemSettingsUrl,
        headers: {
            "CSRF-TOKEN": document.cookie.split("; ").find(row => row.startsWith("BOLD-UMS-XSRF-TOKEN=")).split("=")[1],
        },
        type: "POST",
        async: false,
        data: {
            systemSettingsData: result.systemSettingsData,
            azureData: result.azureData,
            tenantInfo: result.tenantInfo,
            globalAdminDetails: result.globalAdminDetails
        },
        success: function (setSystemSettingsResponse) {
            window.location = setSystemSettingsResponse.redirectUrl;
        },
        error: function () {
            window.location = startUpUrl + "?skipAutoDeploy=true";
        }
    });
}

function validateDeployment() {
    $.ajax({
        type: "GET",
        url: validateAutoDeploymentUrl,
        async: false,
        success: function (result) {
            if ((typeof result.validationResult != "undefined" && result.validationResult.Message == "skipautodeploy") || typeof result.validationResult == "undefined") {
                window.location = startUpUrl + "?skipAutoDeploy=true";
            }
            else if (!result.validationResult.Status) {
                $(".auto-deploy-container").show();
                $("#loader").css("display", "none");
                $(".link-section").show();
                $(".response-message-header").show();
                $(".help-link").attr("href", result.validationResult.HelpLink)
                $("#deploy-error-box").html(result.validationResult.Message);
            }
            else if (result.validationResult.Status) {
                $(".auto-deploy-container").hide();
                proceedAutoDeployment(result);
            }
        },
         error: function () {
            window.location = startUpUrl + "?skipAutoDeploy=true";
        }
    });
}