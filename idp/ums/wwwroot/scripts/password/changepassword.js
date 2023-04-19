var isKeyUp = false;
$(document).ready(function () {
    var rules;

    $(".password-fields-user-profile-edit").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            onChangePasswordClick();
            this.blur();
            return false;
        }
    });
    $("#new-password").bind("keyup", function () {
        if ($("#new-password").val() == $("#confirm-password").val()) {
            $("#confirm-password").closest('div').removeClass('has-error');
            $("#confirm-password").closest('div').find('span:last-child').html("");
        }
        else if ($("#confirm-password").val() != '') {
            $("#confirm-password").closest('div').addClass("has-error");
            $("#confirm-password").closest('div').next("div").find("span").html(window.Server.App.LocalizationContent.PasswordMismatch).css("display", "block");
        }
        passwordPolicyPopover("#new-password", $("#new-password").val());
    });

    $('.change-password-form').validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            $("#success-message").html("");
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else true;
        },
        onfocusout: function (element) { $(element).valid(); $("#success-message").html(""); },
        rules: {
            "old-password": {
                required: true
            },
            "new-password": {
                required: true,
                isValidPassword: true
            },
            "confirm-password": {
                required: true,
                equalTo: "#new-password"
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("has-error");
                    else
                        rules = "unsatisfied-rule";
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("has-error");
                    rules = "";
                }
            }
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') != "su-tick")
                        rules = "unsatisfied-rule";
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("has-error");
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("has-error");
                    rules = "";
                }
            }
            $(element).closest('div').find(".password-validate-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find(".password-validate-holder").html(error.html());
        },
        messages: {
            "old-password": {
                required: window.Server.App.LocalizationContent.OldPasswordValidator
            },
            "new-password": {
                required: window.Server.App.LocalizationContent.NewPasswordValidator,
            },
            "confirm-password": {
                required: window.Server.App.LocalizationContent.ConfirmPasswordValidator,
                equalTo: window.Server.App.LocalizationContent.PasswordMismatch
            }
        }
    });
});

$('#new-password').on("change", function () {
    passwordPolicyPopover("#new-password", $("#new-password").val());
    $("#new-password").valid();
});

function onChangePasswordClick() {
    $(".password-validate-holder").html("");
    $("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("has-error");
    var isValid = true;
    isValid = $('.change-password-form').valid();

    if (isValid && $("#new-password").val() != $("#confirm-password").val()) {
        $("#confirm-password-validate").html("Passwords mismatch");
        $("#confirm-password-validate").closest("div").prev("div").addClass("has-error");
        isValid = false;
    }

    if (isValid == false) {
        return;
    }

    showWaitingPopup('content-area');
    doAjaxPost('POST', updatepasswordUrl, { oldpassword: $("#old-password").val(), newpassword: $("#new-password").val(), confirmpassword: $("#confirm-password").val() },
        function (result) {
            $("input[type='password']").val("");
            hideWaitingPopup('content-area');
            $("#password_policy_rules").remove();
            $("#confirm-password-section").removeAttr("style");
            $("#change-password-btn").css("margin-top", "0px");
            if (!result.Data.status && result.Data.key == "password") {
                $("#old-password-validate").html(result.Data.value);
                $("#old-password-validate").closest("div").prev("div").addClass("has-error");
            }
            else {
                SuccessAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordSuccess, 7000);
            }
        }
    );
}