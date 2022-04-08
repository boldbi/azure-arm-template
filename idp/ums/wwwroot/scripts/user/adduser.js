$(document).ready(function () {
    addPlacehoder("#user-add-dialog");
    $("#user-add-dialog").ejDialog({
        width: "500px",
        height: "auto",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        title: window.TM.App.LocalizationContent.AddUser,
        showHeader: false,
        enableModal: true,
        close: "onUserAddDialogClose",
        closeOnEscape: true,
        open: "onUserAddDialogOpen"
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.EnterName);

    $.validator.addMethod("hasWhiteSpace", function (value, element) {
        return hasWhiteSpace(value)
    }, window.TM.App.LocalizationContent.UserNameHasWhiteSpace);

    $.validator.addMethod("isValidUsername", function (value, element) {
        return IsValidUsername(value);
    }, window.TM.App.LocalizationContent.UserNameSpecialCharacterValicator);

    $.validator.addMethod("isValidUsernameLength", function (value, element) {
        return IsValidUsernameLength(value);
    }, window.TM.App.LocalizationContent.UsernameExceeds);

    $.validator.addMethod("isValidEmail", function (value, element) {
        if (value.trim() == "") {
            return true;
        } else {
            return IsEmail(value);
        }
    }, window.TM.App.LocalizationContent.InvalidEmailAddress);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("additionalSpecialCharValidation", function (value, element) {
        if (/^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/.test(value) || value === "") {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $("#dialog-container").validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "user-name": {
                isRequired: true,
                isValidUsernameLength: true,
                isValidUsername: true
            },
            "email-address": {
                isValidName: true,
                isValidEmail: true
            },
            "first-name": {
                isRequired: true,
                isValidName: true,
                additionalSpecialCharValidation: true
            },
            "last-name": {
                isValidName: true,
                additionalSpecialCharValidation: true
            },
            "user-password": {
                required: true,
                isUserPasswordValid: true
            },
        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            $(element).closest('div').find("span").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find("span").html(error.html()).css("display", "block");
        },
        messages: {
			"email-address": {
                isRequired: window.TM.App.LocalizationContent.EmailValidator
            },
            "username": {
                isRequired: window.TM.App.LocalizationContent.UserNameValidator
            },
            "first-name": {
                isRequired: window.TM.App.LocalizationContent.FirstNameValidator
            }
        }
    });

    $.validator.addMethod("isUserPasswordValid", function (value, element) {
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

    $(document).on("keyup", "#dialog-container", function (e) {
        if (e.keyCode == 13) {
            if ($("#cancel-user").is(":focus")) {
                onUserAddDialogClose();
            } else if ($("#add-user").is(":focus")) { e.preventDefault(); }
            else {
                $("input#add-user").trigger("click");
            }
        }
    });

    $(document).on("click", "#create-user", function () {
        $("#add-user").removeAttr("disabled");
        $(".form input[type='text']").val('');
        var usergrid = $('#user_grid').data("ejGrid");
        usergrid.clearSelection();
        $("#add-user-in-group").removeClass("show").addClass("hide");
        $(".validation").closest("div").removeClass("has-error");
        $(".useradd-validation-messages").css("display", "none");
    });

    $(document).on("keyup", "#new-password", function () {
        createPasswordPolicyRules();
        $("#new-password").valid();
    });

    function createPasswordPolicyRules() {
        if ($("#new-password").val() != '' && $("#new-password").next("ul").length == 0) {
            $("#new-password").after("<ul id='password_policy_rules'></ul>");
            $("#password_policy_rules").append("<li id='p_policy_heading'><p>" + window.TM.App.LocalizationContent.PasswordRule1 + "</p></li>");
            $("#password_policy_rules").append("<li id='p_policy_length'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule2 + "</li>");
            $("#password_policy_rules").append("<li id='p_policy_uppercase'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule3 + "</li>");
            $("#password_policy_rules").append("<li id='p_policy_lowercase'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule4 + "</li>");
            $("#password_policy_rules").append("<li id='p_policy_number'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule5 + "</li>");
            $("#password_policy_rules").append("<li id='p_policy_specialcharacter'><span class='su su-close'></span>" + window.TM.App.LocalizationContent.PasswordRule6 + "</li>");
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

    function hasWhiteSpace(value) {
        if (/\s/g.test(value)) {
            return false;
        }
        else {
            return true;
        }
    }
});

function onUserAddDialogClose() {
    $("#user-add-dialog").ejDialog("close");
    $("#password_policy_rules").remove();
}

function onUserAddDialogOpen() {
    $("#add-user").removeAttr("disabled");
    $(".dropdown").removeClass("open");
    $("#user-add-dialog").ejDialog("open");
    $("#new-password").val("");
    $(".show-hide-password").removeClass("su-hide").addClass("su-show");
    $(".e-dialog-icon").attr("title", "Close");
    $(".validation").closest("div").removeClass("has-error");
    $(".useradd-validation-messages").css("display", "none");
    CheckMailSettingsAndNotify(window.TM.App.LocalizationContent.ToSendAccountActivation, $(".validation-message"), "");
}