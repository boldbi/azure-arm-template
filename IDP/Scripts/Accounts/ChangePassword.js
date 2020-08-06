var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");

$(document).ready(function () {
    $.validator.addMethod("isValidPassword", function (value, element) {
        return IsValidPassword(value);
    }, "");

    $("#update-password-form").validate({
        onkeyup: function (element, event) {
            if (event.target.id.toLowerCase() === "password") {
                showPasswordPolicy();
            }
            if (event.keyCode != 9) {
                $(element).valid();

                if ($("#re-password").val() != "") {
                    $("#re-password").valid();
                }
            }
            else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        onfocusin: function (element, event) {
            if (event.target.id.toLowerCase() === "password") {
                showPasswordPolicy();
            }
        },
        rules: {
            "password": {
                required: true,
                isValidPassword: true
            },
            "re-password": {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            "password": {
                required: window.IdP.App.LocalizationContent.NewPasswordValidator,
                isValidPassword: window.IdP.App.LocalizationContent.InvalidPasswordValidator
            },
            "re-password": {
                required: window.IdP.App.LocalizationContent.ConfirmNewPassword,
                equalTo: window.IdP.App.LocalizationContent.PasswordMismatch
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            $(element).nextAll('div.validation-holder').find('span').html("");
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            $(element).nextAll('div.validation-holder').find('span').html(error.html());
            $("body").ejWaitingPopup("hide");
        }
    });
});

function IsValidPassword(password) {
    if (passwordRegex.test(password)) {
        return true;
    }
    else {
        return false;
    }
}

function showPasswordPolicy() {
    var value = $("#password").val().trim();
    var validateMethods = new Array();
    validateMethods.push(validateUserpassword.p_policy_uppercase);
    validateMethods.push(validateUserpassword.p_policy_lowercase);
    validateMethods.push(validateUserpassword.p_policy_number);
    validateMethods.push(validateUserpassword.p_policy_specialcharacter);
    validateMethods.push(validateUserpassword.p_policy_length);

    $.each(validateMethods, function (i) {
        var currentMethodName = validateMethods[i];
        ruleName = currentMethodName(value);
        if (ruleName != undefined && ruleName != "") {
            if (!$("#password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                $("#password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").addClass("su-password-tick").removeClass("icon");
            }
        }
        else {
            ruleName = name;
            if ($("#password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                $("#password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").removeClass("su-password-tick").addClass("icon");
            }
        }

        ruleName = "";
    });
}

function changePasswordValidation() {
    $("body").ejWaitingPopup("show");
    return $("#update-password-form").valid();
}

