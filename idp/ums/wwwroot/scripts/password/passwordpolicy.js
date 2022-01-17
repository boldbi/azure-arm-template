var validateUserpassword = {
    p_policy_uppercase: function (userpassword) {
        this.name = "p_policy_uppercase";
        var re = /^(?=.*[A-Z]).+$/;
        if (re.test(userpassword))
            return "p_policy_uppercase"
    },
    p_policy_lowercase: function (userpassword) {
        this.name = "p_policy_lowercase";
        var re = /^(?=.*[a-z]).+$/;
        if (re.test(userpassword))
            return "p_policy_lowercase";
    },
    p_policy_number: function (userpassword) {
        this.name = "p_policy_number";
        var re = /^(?=.*\d).+$/;
        if (re.test(userpassword))
            return "p_policy_number"
    },
    p_policy_specialcharacter: function (userpassword) {
        this.name = "p_policy_specialcharacter";
        var re = /^(?=.*(_|[^\w])).+$/;
        if (re.test(userpassword))
            return "p_policy_specialcharacter"
    },
    p_policy_length: function (userpassword) {
        this.name = "p_policy_length";
        var re = /^(?=.{6,}).+$/
        if (re.test(userpassword))
            return "p_policy_length"
    }
};

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

$.validator.addMethod("isValidPassword", function (value, element) {
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