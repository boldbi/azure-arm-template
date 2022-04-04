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

    var rules;
    $.validator.addMethod("isEditadminPassword", function (value, element) {
        var validateMethods = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);
        if ($("#new-password").data("toggle") !== "popover") {
            for (var n = 0; n < validateMethods.length; n++) {
                var currentMethodName = validateMethods[n];
                if (currentMethodName(value) != "" && currentMethodName(value) != undefined) {
                    ruleName = currentMethodName(value);
                    if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") != "su-tick") {
                        $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-tick").removeClass("su su-close");
                        $('#password_policy_rules').find('li#' + ruleName).addClass("clear-error");
                        ruleName = ""
                    }
                }
                else {
                    ruleName = name;
                    $(element).closest('div').addClass("has-error");
                    if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") == "su-tick") {
                        $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-close").removeClass("su-tick");
                        $('#password_policy_rules').find('li#' + ruleName).removeClass("clear-error");
                        ruleName = "";
                    }
                }
            }
            if ($('#password_policy_rules li>span.su-tick').length == $('#password_policy_rules').find('li>span').length)
                return true;
        }
        else {
            passwordPolicyPopover("#new-password", value);
            if ($('#password_policy_rules li>span.su-password-tick').length == $('#password_policy_rules li>span:not(.content)').length) {
                return true;
            }
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
                createPasswordPolicyRules();
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
    createPasswordPolicyRules();
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
    createPasswordPolicyRules();
    $("#new-password").valid();
});

function passwordPolicyPopover(element, value) {
    var newPassword = $(element);
    newPassword.popover("show");
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
            if (!newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").addClass("su-password-tick").removeClass("icon");
            }
        }
        else {
            ruleName = name;
            if (newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                newPassword.next().find("#password_policy_rules").find("li#" + ruleName + " span:first").removeClass("su-password-tick").addClass("icon");
            }
        }

        ruleName = "";
    });
}

function createPasswordPolicyRules() {
    if ($("#new-password").data("toggle") !== "popover") {
        if ($("#new-password").val() != '' && $("#new-password").next("ul").length == 0) {
            $("#new-password").after("<ul id='password_policy_rules'></ul>");
            $("#password_policy_rules").append("<li id='p_policy_heading'>Password must meet the following requirements:</li>")
            $("#tenant-password-policy").attr("data-policy-minimumlength") != "" ? $("#password_policy_rules").append("<li id='p_policy_length'><span class='su su-close'></span>At least " + $("#tenant-password-policy").attr("data-policy-minimumlength") + " characters.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-uppercase").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_uppercase'><span class='su su-close'></span>One uppercase.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-lowercase").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_lowercase'><span class='su su-close'></span>One lowercase.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-number").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_number'><span class='su su-close'></span>One numeric.</li>") : ""
            $("#tenant-password-policy").attr("data-policy-specialcharacter").toLowerCase() == "true" ? $("#password_policy_rules").append("<li id='p_policy_specialcharacter'><span class='su su-close'></span>One special character.</li>") : ""
        }
        if ($("#new-password").val() == '' && $("#new-password").next("ul").length != 0) {
            $("#new-password").next("ul").remove();
        }
    }
    else {
        passwordPolicyPopover("#new-password", $("#new-password").val());
    }
}

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

function passwordBoxHightlight(element) {
    var rules = "";
    $(element).closest('div').addClass("e-error");
    var isPopoverPasswordPolicy = $("#new-password").data("toggle") === "popover";
    var passwordPolicyElement = !isPopoverPasswordPolicy ? $('#password_policy_rules').find('li>span') : $('#password_policy_rules').find('li>span:not(.content)');
    var passwordPolicyClass = !isPopoverPasswordPolicy ? "su-tick" : "su-password-tick";
    if ($(element).attr('id') == "new-password") {
        for (var i = 0; i < passwordPolicyElement.length; i++) {
            if ($(passwordPolicyElement[i]).attr('class') == passwordPolicyClass)
                $(element).closest('div').removeClass("e-error");
            else
                rules = "[[[unsatisfied-rule]]]";
        }
        if (rules != "" && rules != undefined) {
            $(element).closest('div').addClass("e-error");
            rules = "";
        }
    }
}

function passwordBoxUnhightlight(element) {
    var rules = "";
    $(element).closest('div').removeClass('e-error');
    var isPopoverPasswordPolicy = $("#new-password").data("toggle") === "popover";
    var passwordPolicyElement = !isPopoverPasswordPolicy ? $('#password_policy_rules').find('li>span') : $('#password_policy_rules').find('li>span:not(.content)');
    var passwordPolicyClass = !isPopoverPasswordPolicy ? "su-tick" : "su-password-tick";

    if ($(element).attr('id') == "new-password") {
        for (var i = 0; i < passwordPolicyElement.length; i++) {
            if ($(passwordPolicyElement[i]).attr('class') != passwordPolicyClass)
                rules = "[[[unsatisfied-rule]]]";
            if ($(passwordPolicyElement[i]).attr('class') == passwordPolicyClass)
                $(element).closest('div').removeClass("e-error");
        }
        if (rules != "" && rules != undefined) {
            $(element).closest('div').addClass("e-error");
            rules = "";
        }
    }
    $(element).closest('div').find(".password-validate-holder").html("");
}

function showValidationMessage() {
    $(".validation-message").css("display", "block");
}