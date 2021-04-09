$(document).ready(function () {
    $("#body").ejWaitingPopup();
    $(document).on("click", ".css-radio", function () {
        $(this).siblings("label").removeClass("notransition");
    });

    $(document).on("change", "input[name='activation']", function () {
        $("#email-required-warning").removeClass("show").addClass("hide");
        $("#email-not-required").attr("disabled", false)
        $("#label-email-not-required").removeClass("disabled-lable-color");
        if ($("#email-account-activation").is(":checked")) {
            $("#email-required-warning").removeClass("hide").addClass("show");
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
                if (result.result === "success") {
                    emailValidationMsg.addClass("hide");
                }
                else if (result.result === "failure" && result.isAdmin === true) {
                    emailValidationMsg.html(window.TM.App.LocalizationContent.ActivationMode).removeClass("hide");
                }
            }
        });
    }
    else {
        emailValidationMsg.addClass("hide");
    }
});

$(document).on("click", "#update-user-settings", function () {
    $(".confirmationMessage").html("");

    var userSettings = {
        ActivationType: $("input:radio[name=activation]:checked").val(),
        EmailRequired: $("input:radio[name=email-required]:checked").val()
    };
    $("#body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: window.saveUserSettingsUrl,
        data: { userSettingsData: userSettings },
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.TM.App.LocalizationContent.UserSettings, window.TM.App.LocalizationContent.SiteSettingsUpdated, 7000);
            } else {
                WarningAlert(window.TM.App.LocalizationContent.UserSettings, window.TM.App.LocalizationContent.SiteSettingsUpdateFalied, 7000);
            }
            $("#body").ejWaitingPopup("hide");
        }
    });
});