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
        if (userpassword.length >= $('meta[name="password_policy:minlength"]').attr("content"))
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
                rules = "unsatisfied-rule";
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
                rules = "unsatisfied-rule";
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

$.validator.addMethod("isValidPassword", function (value, element) {
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