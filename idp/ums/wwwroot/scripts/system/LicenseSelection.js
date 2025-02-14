var windowRef;
var licenseKey;
var getLicenseUrl;
var licenseToken;
var offlineLicenseToken;

$(document).ready(function () {
    String.prototype.format = function () {
        a = this;
        for (k in arguments) {
            a = a.replace("{" + k + "}", arguments[k])
        }
        return a
    }

    $(document).on("click", "#online-license", function (e) {
        showWaitingPopup('startup-page-container-waiting-element');
        if (windowRef !== undefined) {
            clearInterval(timer);
            windowRef.close();
        }

        addButtonObj = $(this);
        $(window).off('message', $.proxy(handleApplyLicense, window, addButtonObj));
        $(window).on('message', $.proxy(handleApplyLicense, window, addButtonObj));
        windowRef = window.open($(this).attr("license-service-url") + "&origin=" + window.location.origin, "", "height=800,width=960");
        timer = setInterval($.proxy(checkWindowRef, 500, addButtonObj));
    });

    $(document).on("click", "#browse-lic, #file-name", function () {
        $("#getFile").click();
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    $('input[type="file"]').change(function (event) {
        $(".validation-error-message").html('');
        $(".validation-error-message").addClass("display-none");
        var fileName = event.originalEvent.target.files[0].name;

        if (fileName.split('.').pop() == "lic") {
            $("#file-name").val(fileName);
            var file = event.originalEvent.target.files[0];
            var data = {};
            showWaitingPopup('startup-page-container-waiting-element');
            readFile(file, function (content) {
                data.content = content;
                sendData(data, validateLicenseKeyUrl);
            })
            hideWaitingPopup('startup-page-container-waiting-element');
        }
        else {
            $("#file-name").val('');
            $(".validation-error-message").html("Invalid file type. Please select .lic format only");
            $(".validation-error-message").removeClass("display-none");
        }

    });

    $(document).on("click", "#offline-license", function () {
        getLicenseUrl = $(this).attr("data-offlinelicense-url");
        $("#tenant-type").val($(this).attr("data-tenant-type"));
        $("#system-settings-welcome-container").hide();
        $(".startup-content").addClass("display-none");
        $(".welcome-content").addClass("display-none");
        $("#image-parent-container .startup-image").addClass("offline-width")
        $("#image-parent-container .startup-image").hide().attr("src", offlineSetupImageUrl).fadeIn();
        $("#system-settings-offline-license-container").show();
    });
});

function checkWindowRef(addButtonObj) {
    if (windowRef.closed) {
        hideWaitingPopup('startup-page-container-waiting-element');
        clearInterval(timer);
    }
}

function handleApplyLicense(addButtonObj, evt) {
    if (evt.originalEvent.data.isSuccess !== undefined) {
        if (evt.originalEvent.data.isSuccess === true) {
            var currentUrl = window.location.href;
            var targetSubappName = "ums";
            var urlObject = new URL(currentUrl);
            var path = urlObject.pathname.replace(/^\/|\/$/g, '');
            var pathSegments = path.split('/');

            var targetIndex = pathSegments.indexOf(targetSubappName);
            if (targetIndex > 0) {
                var subappNameOrDomain = pathSegments[targetIndex - 1];
                currentUrl = window.location.origin + '/' + subappNameOrDomain;
            }
            else {
                currentUrl = window.location.origin;
            }

            var refreshToken = evt.originalEvent.data.refreshtoken != undefined ? evt.originalEvent.data.refreshtoken : "";
            var boldLicenseToken = evt.originalEvent.data.boldLicenseToken != undefined && evt.originalEvent.data.boldLicenseToken != null ? evt.originalEvent.data.boldLicenseToken : "";
            $.ajax({
                type: "POST",
                url: updateLicenseKeyUrl,
                data: { licenseKey: evt.originalEvent.data.licenseKey, refreshToken: refreshToken, licenseType: "1", boldLicenseToken: boldLicenseToken, currentUrl: currentUrl },
                beforeSend: showWaitingPopup('startup-page-container-waiting-element'),
                success: function (result) {
                    if (result.Status) {
                        $('meta[name=has-drm-configuration]').attr("content", "true");
                        $("#image-parent-container .startup-image").hide().attr("src", adminSetupImageUrl).fadeIn();
                        $(".startup-content").fadeIn();
                        $("#system-settings-welcome-container").hide();
                        $(".welcome-content").addClass("display-none");
                        $("#system-settings-offline-license-container").hide();
                        $('#auth-type-dropdown').removeClass("d-none").addClass("d-block");
                        $("#system-settings-user-account-container").slideDown("slow");

                        if (evt.originalEvent.data.userInfo != undefined && evt.originalEvent.data.userInfo != null) {
                            preFillUser(evt.originalEvent.data.userInfo);
                            autoFocus("new-password");
                        }
                        else {
                            autoFocus("txt-firstname");
                        }
                    }
                    hideWaitingPopup('startup-page-container-waiting-element');
                }
            });

        } else if (evt.originalEvent.data.isSuccess === false) {
        }
    }
}

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
    catch(err) {
        $(".validation-error-message").html(window.Server.App.LocalizationContent.LicenseFileCorrupt.format("<a target='_blank' href='" + getLicenseUrl + "'>", "</a>"));
        $(".validation-error-message").removeClass("display-none");
    }

    if (validJSON) {
        var key = JSON.parse(data.content).unlock_key;
        var boldLicenseToken = JSON.parse(data.content).license_token;
        offlineLicenseToken = JSON.parse(data.content).offline_license_token;
        licenseKey = key;
        licenseToken = boldLicenseToken;
        if (key !== undefined && !isEmptyOrSpaces(key)) {
            $.ajax({
                type: 'POST',
                data: { key: key, tenantType: parseInt($("#tenant-type").val()) },
                url: url,
                beforeSend: showWaitingPopup('startup-page-container-waiting-element'),
                success: function (data) {
                    if (data.Status) {

                        if (data.Email !== undefined && !isEmptyOrSpaces(data.Email)) {
                            $("#customer-email").html(data.Email);
                            $("#customer-email-container").removeClass("display-none");
                        }

                        if (data.SubscriptionId !== undefined && !isEmptyOrSpaces(data.SubscriptionId)) {
                            $("#subscription-id").html(data.SubscriptionId);
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

                        $("#confirm-license").prop('disabled', false);
                    }
                    else if (!data.Status && data.Message != undefined) {
                        $("#customer-email-container, #subscription-id-container, #subscription-name-container,#plan-name-container, #expiry-date-container, #tenant-status-container").addClass("display-none");
                        data.Message += "<a target='_blank' href='" + getLicenseUrl + "'> here</a>";
                        $(".validation-error-message").html(data.Message);
                        $(".validation-error-message").removeClass("display-none");
                        $("#confirm-license").prop('disabled', true);
                    }

                    hideWaitingPopup('startup-page-container-waiting-element');
                },
                error: function () {
                    hideWaitingPopup('startup-page-container-waiting-element');
                }
            });
        }
        else {
            $(".validation-error-message").html(window.Server.App.LocalizationContent.LicenseFileCorrupt.format("<a target='_blank' href='" + getLicenseUrl + "'>", "</a>"));
            $(".validation-error-message").removeClass("display-none");
        }
    }
}

function offlineLicenseComplete() {
    $("#image-parent-container .startup-image").removeClass("offline-width")
    $("#license-details").slideUp("slow");
    $(".validation-error-message").addClass("display-none");
    $("#confirm-license").prop('disabled', true);
    $("#file-name").val('');
    licenseKey = "";
    licenseToken = "";
    $("#tenant-type").val("");
    hideWaitingPopup('startup-page-container-waiting-element');
}

function confirmLicenseUpdate() {
    if (licenseKey !== undefined && !isEmptyOrSpaces(licenseKey)) {
        $.ajax({
            type: "POST",
            url: updateLicenseKeyUrl,
            data: { licenseKey: licenseKey, licenseType: "2", currentUrl: window.location.origin, offlineLicenseToken: offlineLicenseToken, boldLicenseToken: licenseToken },
            beforeSend: showWaitingPopup('startup-page-container-waiting-element'),
            success: function (result) {
                if (result.Status) {
                    $('meta[name=has-drm-configuration]').attr("content", "true");
                    offlineLicenseComplete();
                    $("#image-parent-container .startup-image").removeClass("offline-width")
                    $("#image-parent-container .startup-image").hide().attr("src", adminSetupImageUrl).fadeIn();
                    $(".startup-content").fadeIn();
                    $("#system-settings-welcome-container").hide();
                    $(".welcome-content").addClass("display-none");
                    $("#system-settings-offline-license-container").hide();
                    $('#auth-type-dropdown').removeClass("d-none").addClass("d-block");
                    $("#system-settings-user-account-container").slideDown("slow");
                    autoFocus("txt-firstname");
                }
                else {
                    offlineLicenseComplete();
                }
            }
        });
    }
    else {
        hideWaitingPopup('startup-page-container-waiting-element');
        WarningAlert(window.Server.App.LocalizationContent.ManageLicense, window.Server.App.LocalizationContent.LicenseUpdateFailed, result.Message, 0);
    }
}

function returnStartupHome() {
    $("#system-settings-welcome-container").show();
    $(".startup-content").addClass("display-none");
    $(".welcome-content").removeClass("display-none");
    $("#image-parent-container .startup-image").removeClass("offline-width")
    $("#image-parent-container .startup-image").hide().attr("src", startupHome).fadeIn();
    $("#customer-email-container").addClass("display-none");
    $("#subscription-id-container").addClass("display-none");
    $("#subscription-name-container").addClass("display-none");
    $("#plan-name-container").addClass("display-none");
    $("#expiry-date-container").addClass("display-none");
    $("#tenant-status-container").addClass("display-none");
    $(".validation-error-message").addClass("display-none");
    $("#file-name").val('');
    $("#confirm-license").prop('disabled', true);
    licenseKey = "";
    $("#tenant-type").val("");
    $("#system-settings-offline-license-container").hide();
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function preFillUser(obj) {
    var userInfo = JSON.parse(obj);

    document.getElementById("txt-username").ej2_instances[0].value = userInfo.email;
    document.getElementById("txt-emailid").ej2_instances[0].value = userInfo.email;
    document.getElementById("txt-firstname").ej2_instances[0].value = userInfo.first_name;
    document.getElementById("txt-lastname").ej2_instances[0].value = userInfo.last_name;
}

$(document).on("click", "#confirm-license", function () {
    validateStartup(function (result) {
        if (result) {
            messageBox("su-login-error", window.Server.App.LocalizationContent.ConfigurationError, window.Server.App.LocalizationContent.ConfigurationErrorMessage, "success", function () {
                onCloseMessageBox();
            });
        }
        else {
            confirmLicenseUpdate();
        }
    });
});

$(document).on("click", "#return-startup-home", function () {
    returnStartupHome();
});

