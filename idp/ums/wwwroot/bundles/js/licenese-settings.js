var windowRef;
var changeSubscriptionDialog;

$(document).ready(function () {
    if (location.href.match(/boldbi/) != null) {
        history.pushState(null, '', '?product=embedded-bi');
        $("#bold-bi").tab("show");
    }

    else if (location.href.match(/boldreports/) != null) {
        history.pushState(null, '', '?product=enterprise-reporting');
        $("#bold-reports").tab("show");
    }

    else if (location.href.match(/embedded-bi/) != null) {
        history.pushState(null, '', '?product=enterprise-bi');
        $("#bold-bi").tab("show");
    }

    else if (location.href.match(/enterprise-reporting/) != null) {
        history.pushState(null, '', '?product=enterprise-reporting');
        $("#bold-reports").tab("show");
    }

    else if (location.href.match(/boldbi/) == null && location.href.match(/boldreports/) == null && location.href.match(/boldbi/) == null && location.href.match(/boldbi/) == null) {
        
        if (isBoldBiLicenseAvailable.toLowerCase() == "true" && isBoldReportsLicenseAvailable.toLowerCase() == "true") {
            history.pushState(null, '', '?product=embedded-bi');
            $("#bold-bi").tab("show");
        }
        
        else if (isBoldBiLicenseAvailable.toLowerCase() == "true" && isBoldReportsLicenseAvailable.toLowerCase() == "false") {
            history.pushState(null, '', '?product=embedded-bi');
            $("#bold-bi").tab("show");
        }

        else if (isBoldBiLicenseAvailable.toLowerCase() == "false" && isBoldReportsLicenseAvailable.toLowerCase() == "true") {
            history.pushState(null, '', '?product=enterprise-reporting');
            $("#bold-reports").tab("show");
        }
    }

    $("a[data-toggle='tab']").on('click', function (e) {
        var query = (window.location.search).toString();

        switch ($(this).attr("id")) {
            case "bold-bi":
                if (query !== "?product=embedded-bi" || query !== "?product=boldbi") {
                    history.pushState(null, '', '?product=embedded-bi');
                }
                break;

            case "bold-reports":
                if (query !== "?product=enterprise-reporting" || query !== "?product=boldreports") {
                    history.pushState(null, '', '?product=enterprise-reporting');
                }
                break;
        }
    });

    changeSubscriptionDialog = new ej.popups.Dialog({
        header: window.TM.App.LocalizationContent.ChangeSubscriptionDialogHeader,
        content: document.getElementById("change-subscription-dialog"),
        showCloseIcon: true,
        width: '599px',
        height: '275px',
        isModal: true,
        visible: false,
        beforeOpen: fnBeforeOpen,
        close: fnOnClose
    });

    changeSubscriptionDialog.appendTo('#change-subscription-content');

    $('[data-toggle="tooltip"]').tooltip();
});


function fnBeforeOpen() {
    document.getElementById('change-subscription-dialog').style.visibility = 'visible';
}

function fnOnClose() {
    $(".online-change-subscription").attr("license-service-url", "");
    $(".offline-change-subscription").attr("data-offlinelicense-url", "").attr("data-tenant-type", "");
}

$(document).on("click", "#change-subscription", function () {
    $(".online-change-subscription").attr("license-service-url", $(this).attr("license-service-url") + "&change_subscription=true");
    $(".offline-change-subscription").attr("data-offlinelicense-url", $(this).attr("data-offlinelicense-url")).attr("data-tenant-type", $(this).attr("data-tenant-type"));
    $("#change-subscription-help").attr("href", $(this).attr("data-offlinelicense-url"));

    changeSubscriptionDialog.show();
});

$(document).on("click", "#update-onpremise-plan-bi, #update-onpremise-plan-reports", function (e) {
    $("#" + $(this).next('div').attr("id")).show();
    $(this).hide();

    licenseWindow($(this), 600, 500);
});

$(document).on("click", "#online-license-reports, #online-license-bi, .online-change-subscription", function (e) {
    licenseWindow($(this), 800, 960);
});

function handleApplyLicense(addButtonObj, evt) {
    if (evt.originalEvent.data.isSuccess !== undefined) {
        if (evt.originalEvent.data.isSuccess === true) {
            var refreshToken = evt.originalEvent.data.refreshtoken != undefined ? evt.originalEvent.data.refreshtoken : "";
            var boldLicenseToken = evt.originalEvent.data.boldLicenseToken != undefined && evt.originalEvent.data.boldLicenseToken != null ? evt.originalEvent.data.boldLicenseToken : "";

            $.ajax({
                type: "POST",
                url: updateLicenseKeyUrl,
                data: { licenseKey: evt.originalEvent.data.licenseKey, refreshToken: refreshToken, licenseType: "1", boldLicenseToken: boldLicenseToken, currentUrl: window.location.origin },
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
        $("#update-onpremise-plan-bi").show();
        $("#update-license-key-notification-loader-bi").hide();
        $("#update-onpremise-plan-reports").show();
        $("#update-license-key-notification-loader-reports").hide();
        hideWaitingPopup($("#server-app-container"));
        clearInterval(timer);
    }
}

function licenseWindow(element, windowHeight, windowWidth) {
    if (windowRef !== undefined) {
        clearInterval(timer);
        windowRef.close();
    }

    addButtonObj = element;
    $(window).off('message', $.proxy(handleApplyLicense, window, addButtonObj));
    $(window).on('message', $.proxy(handleApplyLicense, window, addButtonObj));
    showWaitingPopup($("#server-app-container"));
    windowRef = window.open(element.attr("license-service-url") + "&origin=" + window.location.origin, "", "height=" + windowHeight, "width=" + windowWidth);
    timer = setInterval($.proxy(checkWindowRef, 500, addButtonObj));
}