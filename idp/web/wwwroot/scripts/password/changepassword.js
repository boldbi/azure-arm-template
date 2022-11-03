var isKeyUp = false;
$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    var outlineEditPassword = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom',
        floatLabelType: 'Never',
    });
    outlineEditPassword.appendTo('#current-password');
    outlineEditPassword.appendTo('#new-password');
    outlineEditPassword.appendTo('#confirm-password');
    createWaitingPopup('content-area');

    $.validator.addMethod("isEditadminPassword", function (value, element) {
        var validateMethods = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);
        passwordPolicyPopover("#new-password", value);
        if ($('#password_policy_rules li>span.su-password-tick').length == $('#password_policy_rules li>span:not(.content)').length) {
            return true;
        }
    }, "");

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
        onfocusin: function (element) {
            if (element.id === "new-password" && $("#new-password").data("toggle") === "popover" && $("#new-password").val() != undefined && $("#new-password").val() != "") {
                passwordPolicyPopover("#new-password", $("#new-password").val());
            }
        },
        rules: {
            "current-password": {
                required: true
            },
            "new-password": {
                required: true,
                isEditadminPassword: true
            },
            "confirm-password": {
                required: true,
                equalTo: "#new-password"
            }
        },
        highlight: function (element) {
            $(element).closest('span').addClass("e-error");
            $(element).closest(".e-outline").siblings(".validation-message").html("");
            passwordBoxHightlight(element);
        },
        unhighlight: function (element) {
            $(element).closest('span').removeClass('e-error');
            passwordBoxUnhightlight(element);
            $(element).closest('span').find(".password-validate-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".validation-message").css("display", "block").html(error.html());
        },
        messages: {
            "current-password": {
                required: window.Server.App.LocalizationContent.OldPasswordValidator
            },
            "new-password": {
                required: window.Server.App.LocalizationContent.NewPasswordValidator,
                isEditadminPassword: window.Server.App.LocalizationContent.InvalidPasswordValidator
            },
            "confirm-password": {
                required: window.Server.App.LocalizationContent.ConfirmNewPassword,
                equalTo: window.Server.App.LocalizationContent.PasswordMismatch
            }
        }
    });
});

$(document).on("keypress", ".password-fields-user-profile-edit", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        onChangePasswordClick();
        this.blur();
        return false;
    }
});

$(document).on("keyup", "#new-password", function () {
    if ($("#new-password").val() == $("#confirm-password").val()) {
        $("#confirm-password").closest('span').removeClass('e-error');
        $("#confirm-password").closest('div').find('span:last-child').html("");
    }
    else if ($("#confirm-password").val() != '') {
        $("#confirm-password").closest('span').addClass("e-error");
        $("#confirm-password").closest('div').next("div").find("span").html(window.Server.App.LocalizationContent.PasswordMismatch).css("display", "block");
    }

});

$(document).on("keyup", "#current-password", function () {
    showValidationMessage();
});

$(document).on("keyup", "#new-password", function () {
    showValidationMessage();
});

$(document).on("keyup", "#confirm-password", function () {
    showValidationMessage();
});

$(document).on("change", "#new-password", function () {
    passwordPolicyPopover("#new-password", $("#new-password").val());
    $("#new-password").valid();
});

function onChangePasswordClick() {
    if ($('.change-password-form').valid()) {
        $(".password-validate-holder").html("");
        $("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("e-error");

        showWaitingPopup('content-area');
        doAjaxPost('POST', updatepasswordUrl, { oldpassword: $("#current-password").val(), newpassword: $("#new-password").val(), confirmpassword: $("#confirm-password").val(), returnurl: $("#hidden-return-url").val() },
            function (result) {
                $("#current-password").val("");
                $("#current-password").closest("div").removeClass("e-valid-input").addClass("e-input-focus");
                $("#new-password").val("");
                $("#new-password").closest("div").removeClass("e-valid-input").addClass("e-input-focus");
                $("#confirm-password").val("");
                $("#confirm-password").closest("div").removeClass("e-valid-input").addClass("e-input-focus");
                $("#password_policy_rules").remove();
                $("#confirm-password-section").removeAttr("style");
                $("#change-password-btn").css("margin-top", "0px");
                if (!result.Data.status && result.Data.key == "password") {
                    hideWaitingPopup('content-area');
                    $("#old-password-validate").html(result.Data.value).css("display", "block")
                    $("#current-password").addClass("e-error");
                }
                else if (!result.Data.status && result.Data.key == "error") {
                    hideWaitingPopup('content-area');
                    WarningAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordFailure, 7000);
                }
                else {
                    if (result.Data.isTenantUserEdit) {
                        window.location.href = result.Data.returnUrl + "?data=" + result.Data.status;
                    } else {
                        hideWaitingPopup('content-area');
                        SuccessAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordSuccess, 7000);
                    }
                }
                $(".popover").hide();
            }
        );
    }
}

function showValidationMessage() {
    $(".validation-message").css("display", "block");
}