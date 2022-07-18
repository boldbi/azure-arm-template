$(document).ready(function () {
    var numericBox = new ejs.inputs.NumericTextBox({
        cssClass: 'e-outline e-custom',
        min:6,
        max:64,
        format: '###.##'
    });
    numericBox.appendTo("#min-len");
    document.getElementById("min-len").ej2_instances[0].value = passwordLength;
});

$(document).on("click", "#update-password-settings", function () {
    var securitySettings = {
        PasswordSettings:
        {
            LowerCaseRequired: $("#enable-lower-case").is(":checked"),
            UpperCaseRequired: $("#enable-upper-case").is(":checked"),
            NumberRequired: $("#enable-numeric").is(":checked"),
            SpecialCharactersRequired: $("#enable-special-char").is(":checked"),
            MinimumLength: $("#min-len").val()
        },
        LockUserAccounts: $("#enable-user-restrict").is(":checked")
    };
    showWaitingPopup('body');
    $.ajax({
        type: "POST",
        url: updateSecuritySettingsUrl,
        data: { securitySettingsData: securitySettings },
        success: function (data) {
            if (data.result) {
                SuccessAlert(window.TM.App.LocalizationContent.SecuritySettings, window.TM.App.LocalizationContent.SiteSettingsUpdated, 7000);
            } else {
                WarningAlert(window.TM.App.LocalizationContent.SecuritySettings, window.TM.App.LocalizationContent.SiteSettingsUpdateFalied, 7000);
            }
            hideWaitingPopup('body');
        },
        error: function () {
            WarningAlert(window.TM.App.LocalizationContent.SecuritySettings, window.TM.App.LocalizationContent.SiteSettingsUpdateFalied, 7000);
            hideWaitingPopup('body');
        }
    });
});

$(document).on("keyup", "#min-len", function () {
    if ($("#min-len").val() == 0) {
        $('#min-len').closest('div').addClass("has-error");
        $("#min-len-validation").html(window.TM.App.LocalizationContent.MinLengthEmpty).css("display", "block");
        $(".min-len-validation-messages").css("display", "block");
        $('#update-password-settings').attr("disabled", "disabled");
    }
    else if (($("#min-len").val() > 0 && $("#min-len").val() < 6) || $("#min-len").val() < 0) {
        $('#min-len').closest('div').addClass("has-error");
        $("#min-len-validation").html(window.TM.App.LocalizationContent.MinLengthNeeded).css("display", "block");
        $(".min-len-validation-messages").css("display", "block");
        $('#update-password-settings').attr("disabled", "disabled");
    }
    else {
        $(".min-len-validation-messages").css("display", "none");
        $('#update-password-settings').removeAttr("disabled");
    }
});

document.querySelector("html").onclick = check;
function check(e) {
    var s = $("#min-len").val();
    if (s >= 6) {
        $(".min-len-validation-messages").css("display", "none");
        $('#update-password-settings').removeAttr("disabled");
    }
}