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
            $("#confirm-password").closest('div').next("div").find("span").html(window.TM.App.LocalizationContent.PasswordMismatch).css("display", "block");
        }
        createPasswordPolicyRules();
    });

    $.validator.addMethod("isEditadminPassword", function (value, element) {
        var validateMethods = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);
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
            "old-password": {
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
                required: window.TM.App.LocalizationContent.OldPasswordValidator
            },
            "new-password": {
                required: window.TM.App.LocalizationContent.NewPasswordValidator,
            },
            "confirm-password": {
                required: window.TM.App.LocalizationContent.ConfirmPasswordValidator,
                equalTo: window.TM.App.LocalizationContent.PasswordMismatch
            }
        }
    });
});

$('#new-password').on("change", function () {
    createPasswordPolicyRules();
    $("#new-password").valid();
});

function createPasswordPolicyRules() {
    if ($("#new-password").val() != '' && $("#new-password").next("ul").length == 0) {
        $("#new-password").after("<ul id='password_policy_rules'></ul>");
        $("#password_policy_rules").append("<li id='p_policy_heading'>" + window.TM.App.LocalizationContent.PasswordRule1 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_length'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule2 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_uppercase'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule3 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_lowercase'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule4 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_number'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule5 + "</li>")
        $("#password_policy_rules").append("<li id='p_policy_specialcharacter'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule6 + "</li>")
        $("#confirm-password-section").css("margin-top", "-53px")
        $(".button-section").css("margin-top", "-20px");
        $(".button-section").addClass("top-margin");
    }
    if ($("#new-password").val() == '' && $("#new-password").next("ul").length != 0) {
        $("#new-password").next("ul").remove();
        $("#confirm-password-section").css("margin-top", "25px")
        $(".button-section").css("margin-top", "20px");
    }
}

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

    ShowWaitingProgress("#content-area", "show");
    doAjaxPost('POST', updatepasswordUrl, { oldpassword: $("#old-password").val(), newpassword: $("#new-password").val(), confirmpassword: $("#confirm-password").val() },
        function (result) {
            $("input[type='password']").val("");
            ShowWaitingProgress("#content-area", "hide");
            $("#password_policy_rules").remove();
            $("#confirm-password-section").removeAttr("style");
            $("#change-password-btn").css("margin-top", "0px");
            if (!result.Data.status && result.Data.key == "password") {
                $("#old-password-validate").html(result.Data.value);
                $("#old-password-validate").closest("div").prev("div").addClass("has-error");
            }
            else {
                SuccessAlert(window.TM.App.LocalizationContent.UpdatePassword, window.TM.App.LocalizationContent.PasswordSuccess, 7000);
            }
        }
    );
}