$(document).ready(function () {
    $("#account-verification-code").keyup(function () {
        $("#verifiation-error").hide();
        $("#verify-code-button").prop("disabled", $("#account-verification-code").val() == "");
    });

    $('#account-verification-code').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $("#verify-code-button").click();
        }
    });

    $(document).on("click", "#mail-resend", function () {
        $("#verifiation-error").hide();
        $("#account-verification-code").val("");
        $("#verify-code-button").prop("disabled", true);
        showWaitingPopup('body');
        $.ajax({
            type: "POST",
            url: resendActivationUrl,
            data: {
                "userId": userId
            },
            success: function (result) {
                if (!result.Status) {
                    $("#tick-icon,  #account-active, #login-button").addClass("show").removeClass("hide");
                    $("#user-verification-box, #warning-icon ").addClass("hide").removeClass("show");
                }
                hideWaitingPopup('body');
            }
        });
    });

    $(document).on("click", "#verify-code-button", function () {
        $("#verify-code-button").prop("disabled", true);
        if ($("#account-verification-code").val() == "") {
            $("#verify-code-button").prop("disabled", true);
        }
        else {
            showWaitingPopup('body');
            $("#verifiation-error").html("").hide().fadeOut("slow");
            $.ajax({
                type: "POST",
                url: checkVerificationCodeUrl,
                data: {
                    "verificationCode": $("#account-verification-code").val(),
                    "userId": userId
                },
                success: function (result) {
                    if (result.Status) {
                        window.location.href = userProfileUrl;
                    }
                    else if (result.Value == "User Activated") {
                        $("#tick-icon,  #account-active, #login-button").addClass("show").removeClass("hide");
                        $("#user-verification-box, #warning-icon").addClass("hide").removeClass("show");
                        $("#verifiation-error").hide();
                    }
                    else if (result.Value == "Account Expired") {
                        $("#tick-icon, #account-active, #login-button, #user-verification-box").addClass("hide").removeClass("show");
                        $("#account-expired, #warning-icon").addClass("show").removeClass("hide");
                    }
                    else {
                        $("#verifiation-error").html(result.Value).show().fadeIn("slow");
                        $("#verify-code-button").prop("disabled", true);
                    }
                    hideWaitingPopup('body');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#verifiation-error").html("Remote connection failed.").show().fadeIn("slow");
                    hideWaitingPopup('body');
                }
            });
        }
    });
});
