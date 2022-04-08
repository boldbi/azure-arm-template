var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");

$(document).ready(function () {

    var changePassword = new ejs.inputs.TextBox({
        cssClass: 'e-outline',
        floatLabelType: 'Auto',
    });
    changePassword.appendTo('#firstname');
    changePassword.appendTo('#lastname');
    changePassword.appendTo('#companyname');
    changePassword.appendTo('#phone');
    changePassword.appendTo('#new-password');
    changePassword.appendTo('#confirm-password');

    var recoverEmail = new ejs.inputs.TextBox({
        cssClass: 'e-outline',
        floatLabelType: 'Always',
        created: function () {
            outlineEmail.focusIn();
        }
    });
    recoverEmail.appendTo('#key-input');

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("additionalSpecialCharValidation", function (value, element) {
        if (/^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/.test(value) || value === "") {
            return true;
        }
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isValidPassword", function (value, element) {
        return IsValidPassword(value);
    }, "");

    $("#update-password-form").validate({
        onkeyup: function (element, event) {
            if (event.target.id.toLowerCase() === "new-password") {
                showPasswordPolicy();
            }
            if (event.keyCode != 9) {
                $(element).valid();

                if ($("#confirm-password").val() != "") {
                    $("#confirm-password").valid();
                }
            }
            else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        onfocusin: function (element, event) {
            if (event.target.id.toLowerCase() === "new-password") {
                showPasswordPolicy();
            }
        },
        rules: {
            "first-name": {
                required: true,
                isValidName: true,
                additionalSpecialCharValidation: true
            },
            "last-name": {
                isValidName: true,
                additionalSpecialCharValidation: true
            },
            "company-name": {
                required: true,
            },
            "password": {
                required: true,
                isValidPassword: true
            },
            "re-password": {
                required: true,
                equalTo: "#new-password"
            }
        },
        messages: {
            "first-name": {
                required: window.Server.App.LocalizationContent.FirstNameValidator
            },
            "company-name": {
                required: window.Server.App.LocalizationContent.CompanyNameValidator
            },
            "password": {
                required: window.Server.App.LocalizationContent.NewPasswordValidator,
                isValidPassword: window.Server.App.LocalizationContent.InvalidPasswordValidator
            },
            "re-password": {
                required: window.Server.App.LocalizationContent.ConfirmNewPassword,
                equalTo: window.Server.App.LocalizationContent.PasswordMismatch
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass('e-error');
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).parents(".update-form-input-field").find('div.validation-holder').find('span').html("");
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            $(element).parents(".update-form-input-field").find('div.validation-holder').find('span').html(error.html());
            hideWaitingPopup('body');
        }
    });
});

$(document).on("change", "#agreement", function () {
    if ($("#agreement").is(":checked")) {
        $(".proceed-button").removeAttr("disabled");
    } else {
        $(".proceed-button").attr("disabled", "disabled");
    }
});

function IsValidName(validationType, inputString) {
    var regex;
    if (validationType.toLowerCase() === "username") {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\&\?\'\"\@\;\,]/);
    }
    else {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\?\'\"\;\,]/);
    }
    return !regex.test(inputString);
}

function IsValidPassword(password) {
    if (passwordRegex.test(password)) {
        return true;
    }
    else {
        return false;
    }
}

function showPasswordPolicy() {
    var value = $("#new-password").val().trim();
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
            if (!$("#new-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                $("#new-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").addClass("su-password-tick").removeClass("icon");
            }
        }
        else {
            ruleName = name;
            if ($("#new-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                $("#new-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").removeClass("su-password-tick").addClass("icon");
            }
        }

        ruleName = "";
    });
}

function changePasswordValidation() {
    showWaitingPopup('body');
    return $("#update-password-form").valid();
}

