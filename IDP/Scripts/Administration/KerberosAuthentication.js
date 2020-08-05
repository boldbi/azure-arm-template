var isKeyUp = false;
$(document).ready(function () {
    $.validator.addMethod("IsValidDomainName", function (value, element) {
        if (isKeyUp)
            return true;
        else
            return IsValidDomainName(value);
    }, "Invalid host domain name.");

    $("#kerberos-setting").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) $(element).valid();
            else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "machineName": {
                required: true
            },
            "hostDomain": {
                required: true,
                IsValidDomainName: true
            }
        },
        highlight: function (element) {
            $(element).closest(".form-input-field").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest(".form-input-field").removeClass("has-error");
            $(element).parent().find("span.validation-message").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("span.validation-message").html(error);
        },
        messages: {
            "machineName": {
                required: "Please enter machine name."
            },
            "hostDomain": {
                required: "Please enter host domain name."
            }
        }
    });
});

function IsValidDomainName(domainName) {
    var filter = /^(?!:\/\/|www\.)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
    if (filter.test(domainName)) {
        return true;
    }
    else {
        return false;
    }
}
function KerberosEnable(t) {
    var checked = t.checked;
    if (checked) {
        $("#kerberos-setting input:not('#has-kerberos')").removeAttr("disabled");
    }
    else
        $("#kerberos-setting input:not('#has-kerberos')").attr("disabled", true);
}

function DownloadBatFile() {
    var machineName = $("#machine-name").val().trim();
    var hostDomain = $("#host-domain").val().trim();

    if ($("#kerberos-setting").valid()) {
        var postData = {
            machineName: machineName,
            hostDomain: hostDomain
        };

        $.ajax({
            type: "POST",
            url: updateKerberosSettingsUrl,
            data: { systemSettingsData: JSON.stringify(postData) },
            beforeSend: showWaitingPopup($("#server-app-container")),
            error: handleAjaxError(),
            success: function (data) {
                hideWaitingPopup($("#server-app-container"));
                SuccessAlert("Kerberos Authentication Settings", "Settings have been updated successfully.", 7000);
                $(".error-message, .success-message").css("display", "none");
                window.location.href = downloadBatchUrl + "?machineName=" + machineName + "&hostDomain=" + hostDomain;
            }
        });
    }
}