var isKeyUp = false;
$(document).ready(function () {

    var outlineEditPassword = new ejs.inputs.TextBox({
        cssClass: 'e-outline',
        floatLabelType: 'Auto',
    });
    outlineEditPassword.appendTo('#current-password');
    outlineEditPassword.appendTo('#new-password');
    outlineEditPassword.appendTo('#confirm-password');

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
            $("#confirm-password").closest('div').removeClass('e-error');
            $("#confirm-password").closest('div').find('span:last-child').html("");
        }
        else if ($("#confirm-password").val() != '') {
            $("#confirm-password").closest('div').addClass("e-error");
            $("#confirm-password").closest('div').next("div").find("span").html(window.Server.App.LocalizationContent.PasswordMismatch).css("display", "block");
        }
        createPasswordPolicyRules();
    });

    $('#current-password').keyup(function () {
        $(".validation-message").css("display", "none");
    });

    $('#new-password').keyup(function () {
        $(".validation-message").css("display", "none");
    });

    $('#confirm-password').keyup(function () {
        $(".validation-message").css("display", "none");
    });

    $.validator.addMethod("isEditadminPassword", function (value, element) {
        var validateMethods = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);
        for (var n = 0; n < validateMethods.length ; n++) {
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
                $(element).closest('div').addClass("e-error");
                if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") == "su-tick") {
                    $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-close").removeClass("su-tick");
                    $('#password_policy_rules').find('li#' + ruleName).removeClass("clear-error");
                    ruleName = "";
                }
            }
        }
        if ($('#password_policy_rules li>span.su-tick').length == $('#password_policy_rules').find('li>span').length)
            return true;
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
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".validation-message").html("");
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("e-error");
                    else
                        rules = "unsatisfied-rule";
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("e-error");
                    rules = "";
                }
            }
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') != "su-tick")
                        rules = "unsatisfied-rule";
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("has-error");
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("e-error");
                    rules = "";
                }
            }
            $(element).closest('div').find(".password-validate-holder").html("");
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
            },
            "confirm-password": {
                required: window.Server.App.LocalizationContent.ConfirmNewPassword,
                equalTo: window.Server.App.LocalizationContent.PasswordMismatch
            }
        }
    });
});

$('#new-password').on("change", function () {
    createPasswordPolicyRules();
    $("#new-password").valid();
});

function createPasswordPolicyRules() {
    var newPasswordObj = $("#new-password");

    if (newPasswordObj.val() != '' && newPasswordObj.next("ul").length == 0) {
        newPasswordObj.after("<ul id='password_policy_rules'></ul>");

        var passwordPolicyRules = $("#password_policy_rules");
        passwordPolicyRules.append("<li id='p_policy_heading'>" + window.Server.App.LocalizationContent.PasswordRule1 + "</li>")
        passwordPolicyRules.append("<li id='p_policy_length'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule2 + "</li>")
        passwordPolicyRules.append("<li id='p_policy_uppercase'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule3 + "</li>")
        passwordPolicyRules.append("<li id='p_policy_lowercase'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule4 + "</li>")
        passwordPolicyRules.append("<li id='p_policy_number'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule5 + "</li>")
        passwordPolicyRules.append("<li id='p_policy_specialcharacter'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule6 + "</li>")
        $(".button-section").addClass("top-margin");
        $("#confirm-password-section").css("margin-top", "-47px")
    }

    if (newPasswordObj.val() == '' && newPasswordObj.next("ul").length != 0) {
        newPasswordObj.next("ul").remove();
        $("#confirm-password-section").css("margin-top", "25px")
        $(".button-section").css("margin-top", "20px");
    }
}

function onChangePasswordClick() {
    $(".password-validate-holder").html("");
    $("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("e-error");
    var isValid = true;
    isValid = $('.change-password-form').valid();

    if (isValid && $("#new-password").val() != $("#confirm-password").val()) {
        $("#confirm-password-validate").html(window.Server.App.LocalizationContent.PasswordMismatch);
        $("#confirm-password-validate").closest("div").prev("div").addClass("e-error");
        isValid = false;
    }

    if (isValid == false) {
        return;
    }

    ShowWaitingProgress("#content-area", "show");
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
                ShowWaitingProgress("#content-area", "hide");
                $("#old-password-validate").html(result.Data.value).css("display", "block")
                $("#current-password").closest("div").addClass("e-error");
            }
            else if (!result.Data.status && result.Data.key == "error") {
                ShowWaitingProgress("#content-area", "hide");
                WarningAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordFailure, 7000);
            }
            else {
                if (result.Data.isTenantUserEdit) {
                    $("<form action='" + result.Data.returnUrl + "'><input type='hidden' name='data' value='" + result.Data.status + "'></form>").appendTo('body').submit().remove();
                } else {
                    ShowWaitingProgress("#content-area", "hide");
                    SuccessAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordSuccess, 7000);
                }
            }
        }
    );
}