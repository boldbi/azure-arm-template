$(document).ready(function () {
    $(document).on("click", ".css-radio", function () {
        $(this).siblings("label").removeClass("notransition");
    });

    $(document).on("change", "input[name='activation']", function () {
        $("#email-required-warning").removeClass("d-block").addClass("d-none");
        $("#email-not-required").attr("disabled", false)
        $("#label-email-not-required").removeClass("disabled-lable-color");
        if ($("#email-account-activation").is(":checked")) {
            $("#email-required-warning").removeClass("d-none").addClass("d-block");
            $("#email-not-required").attr("disabled", true)
            $("#label-email-not-required").addClass("disabled-lable-color");
            $("#email-required").prop("checked", true);
        }
    });
});

$(document).on("change", "input[name='activation']", function () {
    var checkedVal = $("input[name='activation']:checked").val().toLowerCase();
    var emailValidationMsg = $(".email-settings-validation");

    if (checkedVal === "emailactivation") {
        $.ajax({
            type: "POST",
            url: window.checkMailSettingUrl,
            success: function (result) {
                if (result.result) {
                    emailValidationMsg.addClass("d-none");
                }
                else if (!result.result && result.isAdmin === true) {
                    emailValidationMsg.html(window.Server.App.LocalizationContent.ActivationMode).removeClass("d-none");
                }
            }
        });
    }
    else {
        emailValidationMsg.addClass("d-none");
    }
});

$(document).on("click", "#update-user-settings", function () {
    $(".confirmationMessage").html("");
    var isSystemUserEnabled= $("#system-user-switch").is(":checked");
    var userSettings = {
        ActivationType: $("input:radio[name=activation]:checked").val(),
        EmailRequired: $("input:radio[name=email-required]:checked").val(),
        IsSystemUserEnabled : isSystemUserEnabled
    };
    showWaitingPopup('body');
    $.ajax({
        type: "POST",
        url: window.saveUserSettingsUrl,
        data: { userSettingsData: userSettings },
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.Server.App.LocalizationContent.UserSettings, window.Server.App.LocalizationContent.SiteSettingsUpdated, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.UserSettings, window.Server.App.LocalizationContent.SiteSettingsUpdateFalied, result.Message, 7000);
            }
            hideWaitingPopup('body');
        }
    });
});