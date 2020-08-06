var windowRef;

$(document).ready(function () {
    if (location.href.match(/boldbi/) != null && isBoldBiLicenseAvailable.toLowerCase() == "true") {
        $("#bold-bi").tab("show");
    }
    else if (location.href.match(/boldreports/) != null && isBoldReportsLicenseAvailable.toLowerCase() == "true") {
        $("#bold-reports").tab("show");
    }

    if (location.href.match(/boldbi/) == null && location.href.match(/boldreports/) == null) {
        if (isBoldBiLicenseAvailable.toLowerCase() == "true" && isBoldReportsLicenseAvailable.toLowerCase() == "true") {
            history.pushState(null, '', '?product=boldbi');
            $("#bold-bi").tab("show");
        }
        else if (isBoldBiLicenseAvailable.toLowerCase() == "true" && isBoldReportsLicenseAvailable.toLowerCase() == "false") {
            history.pushState(null, '', '?product=boldbi');
            $("#bold-bi").tab("show");
        }
        else if (isBoldBiLicenseAvailable.toLowerCase() == "false" && isBoldReportsLicenseAvailable.toLowerCase() == "true") {
            history.pushState(null, '', '?product=boldreports');
            $("#bold-reports").tab("show");
        }
    }

    $("a[data-toggle='tab']").on('click', function (e) {
        var query = (window.location.search).toString();

        switch ($(this).attr("id")) {
            case "bold-bi":
                if (query !== "?product=boldbi") {
                    history.pushState(null, '', '?product=boldbi');
                }
                break;

            case "bold-reports":
                if (query !== "?product=boldreports") {
                    history.pushState(null, '', '?product=boldreports');
                }
                break;
        }
    });
});

$(document).on("click", "#update-onpremise-plan", function (e) {
    $("#update-license-key-notification-loader").show();
    $("#update-onpremise-plan").hide();
    if (windowRef !== undefined) {
        clearInterval(timer);
        windowRef.close();
    }

    addButtonObj = $(this);
    $(window).off('message', $.proxy(handleApplyLicense, window, addButtonObj));
    $(window).on('message', $.proxy(handleApplyLicense, window, addButtonObj));
    windowRef = window.open($(this).attr("license-service-url") + "&origin=" + window.location.origin, "", "height=600,width=500");
    timer = setInterval($.proxy(checkWindowRef, 500, addButtonObj));
});

function handleApplyLicense(addButtonObj, evt) {
    if (evt.originalEvent.data.isSuccess !== undefined) {
        if (evt.originalEvent.data.isSuccess === true) {
            $.ajax({
                type: "POST",
                url: updateLicenseKeyUrl,
                data: { licenseKey: evt.originalEvent.data.licenseKey },
                beforeSend: showWaitingPopup($("#server-app-container")),
                success: function (result) {
                    if (result.Status) {
                        hideWaitingPopup($("#server-app-container"));
                        SuccessAlert(window.TM.App.LocalizationContent.ManageLicense, window.TM.App.LocalizationContent.LicenseUpdated, 7000);
                        window.location.reload();
                    }
                    else {
                        hideWaitingPopup($("#server-app-container"));
                        WarningAlert(window.TM.App.LocalizationContent.ManageLicense, window.TM.App.LocalizationContent.LicenseUpdateFailed, 0);
                    }
                }
            });

        } else if (evt.originalEvent.data.isSuccess === false) {
            WarningAlert(window.TM.App.LocalizationContent.ManageLicense, window.TM.App.LocalizationContent.LicenseUpdateFailed, 0);
        }
    }
}

function checkWindowRef(addButtonObj) {
    if (windowRef.closed) {
        $("#update-onpremise-plan").show();
        $("#update-license-key-notification-loader").hide();
        clearInterval(timer);
    }
}