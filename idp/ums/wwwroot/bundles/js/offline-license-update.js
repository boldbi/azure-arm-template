var licenseKey;
var getLicenseUrl;
var licenseToken;
$(document).ready(function () {
    $("#offline-license-update-dialog").ejDialog({
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        width: "500px",
        enableModal: true,
        showHeader: false,
        close: "uploadLicenseDialogClose",
        closeOnEscape: true
    });

    $(window).resize(function () {
        resizeLicenseDialog();
    });

    $(document).on("click", "#browse-lic, #file-name", function () {
        $("#getFile").click();
    });

    $('[data-toggle="popover"]').popover();

    $('input[type="file"]').change(function (event) {
        $(".validation-error-message").html('');
        $(".validation-error-message").addClass("display-none");
        var fileName = event.originalEvent.target.files[0].name;

        if (fileName.split('.').pop() == "lic") {
            $("#file-name").val(fileName);
            var file = event.originalEvent.target.files[0];
            var data = {};
            showWaitingPopup($("#offline-license-update-dialog"))
            readFile(file, function (content) {
                data.content = content;
                sendData(data, validateLicenseKeyUrl);
            })
            hideWaitingPopup($("#offline-license-update-dialog"));
        }
        else {
            $("#file-name").val('');
            $(".validation-error-message").html(window.TM.App.LocalizationContent.InvalidLicFileFormat);
            $(".validation-error-message").removeClass("display-none");
        }

    });

    $(document).on("click", "#offline-update-bi, #offline-update-reports, .offline-license-acion, #offline-change-subscription", function () {
        $("#offline-license-update-dialog").ejDialog("open");
        getLicenseUrl = $(this).attr("data-offlinelicense-url");
        $("#tenant-type").val($(this).attr("data-tenant-type"));
    });
});


function readFile(file, cb) {
    var content = "";
    var reader = new FileReader();

    reader.onload = function (e) {
        content = reader.result;
        cb(content);
    }

    reader.readAsText(file);
    $("#getFile")[0].value = '';
}

function sendData(data, url) {
    var validJSON = false;

    try {
        JSON.parse(data.content);
        validJSON = true;
    }
    catch {
        $(".validation-error-message").html(window.TM.App.LocalizationContent.LicenseFileCorrupt + "<a target='_blank' href='" + getLicenseUrl + "'>"+ window.TM.App.LocalizationContent.Here +"</a>");
        $(".validation-error-message").removeClass("display-none");
    }

    if (validJSON) {
        var key = JSON.parse(data.content).unlock_key;
        var boldLicenseToken = JSON.parse(data.content).license_token;
        licenseKey = key;
        licenseToken = boldLicenseToken;
        if (key !== undefined && !isEmptyOrSpaces(key)) {
            $.ajax({
                type: 'POST',
                data: { key: key, tenantType: parseInt($("#tenant-type").val()) },
                url: url,
                beforeSend: showWaitingPopup($("#offline-license-update-dialog")),
                success: function (data) {
                    if (data.Status) {
                        if (data.Email !== undefined && !isEmptyOrSpaces(data.Email)) {
                            $("#customer-email").html(data.Email);
                            $("#customer-email-container").removeClass("display-none");
                        }

                        if (data.SubscriptionId !== undefined && !isEmptyOrSpaces(data.SubscriptionId)) {
                            $("#subscription-id-offline").html(data.SubscriptionId);
                            $("#subscription-id-container").removeClass("display-none");
                        }

                        if (data.SubscriptionName !== undefined && !isEmptyOrSpaces(data.SubscriptionName)) {
                            $("#subscription-name").html(data.SubscriptionName);
                            $("#subscription-name-container").removeClass("display-none");
                        }

                        if (data.PlanName !== undefined && !isEmptyOrSpaces(data.PlanName)) {
                            $("#plan-name").html(data.PlanName);
                            $("#plan-name-container").removeClass("display-none");
                        }

                        if (!data.IsPerpetualLicense) {
                            if (data.ExpiryDate !== undefined && !isEmptyOrSpaces(data.ExpiryDate)) {
                                $("#expiry-date").html(data.ExpiryDate);
                                $("#expiry-date-container").removeClass("display-none");
                            }
                        }

                        if (data.TenantStatus !== undefined && !isEmptyOrSpaces(data.TenantStatus)) {
                            $("#tenant-status").html(data.TenantStatus);
                            $("#tenant-status-container").removeClass("display-none");

                            if (data.TenantStatus == "Active") {
                                $("#tenant-status").addClass("active-status");
                            }
                            else if (data.TenantStatus == "Trial") {
                                $("#tenant-status").addClass("trial");
                            }

                            if (data.IsPerpetualLicense) {
                                $("#tenant-status").html("Perpetual")
                                $("#tenant-status").addClass("active-status");
                            }
                        }

                        $("#offline-license-update-dialog").ejDialog({ position: { X: (window.innerWidth - 422) / 2, Y: (window.innerHeight - 494) / 2 } });
                        $("#license-details").slideDown("slow");
                        $("#confirm-license").prop('disabled', false);
                    }
                    else if (!data.Status && data.Message != undefined) {
                        $("#customer-email-container, #subscription-id-container, #subscription-name-container,#plan-name-container, #expiry-date-container, #tenant-status-container").addClass("display-none");

                        $("#license-details").slideUp("slow");
                        data.Message += "<a target='_blank' href='" + getLicenseUrl + "'> here</a>";
                        $(".validation-error-message").html(data.Message);
                        $(".validation-error-message").removeClass("display-none");
                        $("#confirm-license").prop('disabled', true);
                    }

                    hideWaitingPopup($("#offline-license-update-dialog"));
                },
                error: function () {
                    hideWaitingPopup($("#offline-license-update-dialog"));
                }
            });
        }
        else {
            $(".validation-error-message").html(window.TM.App.LocalizationContent.LicenseFileCorrupt +"<a target='_blank' href='" + getLicenseUrl + "'>" + window.TM.App.LocalizationContent.Here +"</a>");
            $(".validation-error-message").removeClass("display-none");
        }
    }
}

function uploadLicenseDialogClose() {
    $("#license-details").slideUp("slow");
    $(".validation-error-message").addClass("display-none");
    $("#confirm-license").prop('disabled', true);
    $("#file-name").val('');
    licenseKey = "";
    licenseToken = "";
    $("#tenant-type").val("");
    $("#offline-license-update-dialog").ejDialog("refresh");
    $("#offline-license-update-dialog").ejDialog("close");
}

function confirmLicenseUpdate() {
    if (licenseKey !== undefined && !isEmptyOrSpaces(licenseKey)) {
        $.ajax({
            type: "POST",
            url: updateLicenseKeyUrl,
            data: { licenseKey: licenseKey, licenseType: "2", currentUrl: window.location.origin, boldLicenseToken: licenseToken },
            beforeSend: showWaitingPopup($("#offline-license-update-dialog")),
            success: function (result) {
                if ($("#license-selection-container").length != 0) {
                    if (result.Status) {
                        $("#image-parent-container .startup-image").hide().attr("src", serverSetupImageUrl).fadeIn();
                        $(".startup-content").fadeIn();
                        $("#license-selection-container").hide();
                        $('#auth-type-dropdown').removeClass("hide").addClass("show");
                        $("#system-settings-db-selection-container").slideDown("slow");
                        uploadLicenseDialogClose();
                    }
                    else {
                        hideWaitingPopup($("#offline-license-update-dialog"));
                        WarningAlert(window.TM.App.LocalizationContent.ManageLicense, window.TM.App.LocalizationContent.LicenseUpdateFailed, 0);
                        uploadLicenseDialogClose();
                    }
                }
                else {
                    if (result.Status) {
                        hideWaitingPopup($("#offline-license-update-dialog"));
                        SuccessAlert(window.TM.App.LocalizationContent.ManageLicense, window.TM.App.LocalizationContent.LicenseUpdated, 7000);
                        uploadLicenseDialogClose();

                        setTimeout(function () {
                            window.location.reload(true);
                        }, 1000);
                    }
                    else {
                        hideWaitingPopup($("#offline-license-update-dialog"));
                        WarningAlert(window.TM.App.LocalizationContent.ManageLicense, window.TM.App.LocalizationContent.LicenseUpdateFailed, 0);
                        uploadLicenseDialogClose();
                    }
                }
            }
        });
    }
    else {
        hideWaitingPopup($("#offline-license-update-dialog"));
        WarningAlert(window.TM.App.LocalizationContent.ManageLicense, window.TM.App.LocalizationContent.LicenseUpdateFailed, 0);
    }
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function resizeLicenseDialog() {
    $("#offline-license-update-dialog").ejDialog({ position: { X: (window.innerWidth - $("#offline-license-update-dialog").width()) / 2, Y: (window.innerHeight - $("#offline-license-update-dialog").height()) / 2 } });
}