﻿var isKeyUp = false;
$(document).ready(function () {

    $(".field-validation-error").addClass("not-valid");
    $(".field-validation-error").closest(".input-elements").addClass("has-error");

    $.validator.addMethod("isValidPassword", function (value) {
        return IsValidPassword(value);
    }, "");

    $("#sign-up-form").find("input").change(function () {
        $(this).valid();
    });

    $("#sign-up-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.target.id.toLowerCase() === "register-password") {
                showPasswordPolicy();
            }
            if (event.keyCode != 9) $(element).valid();
            else true;

        },

        onfocusout: function (element, event) {
            if (!(event.target.id.toLowerCase() === "input-register")) {
                $(element).valid();
            }
        },
        onfocusin: function (element, event) {
            
                $(element).valid();

            if (event.target.id.toLowerCase() === "register-password") {
                showPasswordPolicy();
            }
            
        },
        
        rules: {
            "FirstName": {
                required: true
            },
            "Email": {
                required: true,
                email: true
            },
            "Password": {
                required: true,
                isValidPassword: true,
                maxlength: 128
            },
            "Company": {
                required: true
            },
            "Contact": {
                maxlength: 20
            },
            "Privacy": {
                required: true,
                minlength: 1
            }
        },

        highlight: function (element) {
            $(element).closest(".input-elements").addClass("has-error");
            if ($(element).attr("id") === "form-phone") {
                $(element).addClass("phone-invalid");
            }
            $("#register-button").prop("disabled", true);
        },

        unhighlight: function (element) {
            $(element).closest(".input-elements").removeClass("has-error");
            $(element).parents(".input-elements").find('.field-validation-error').html("");
            if ($(element).attr("id") === "form-phone") {
                $(element).removeClass("phone-invalid");
            }
        },

        errorPlacement: function (error, element) {
            $(element).parents(".input-elements").find('.field-validation-valid').html(error).css("display", "block");
        },

        success: function (label, element) {
            $(element).parents(".input-elements").find('.field-validation-error').removeClass("not-valid");
            
            if (!($(element).attr("id") == "form-phone")) {
                if (!($(element).attr("id") == "input-register")) {
                    $(element).parents(".input-elements").find('.field-validation-valid').addClass("valid");
                }
            }
            if ($(".input-elements").find(".field-validation-error").length == 0) {
                if (($(".valid").length == 4) && (!$("#form-phone").hasClass(".phone-invalid")) && $("#input-register").is(":checked")) {
                    $("#register-button").prop("disabled", false);
                }
            } else if ($(".input-elements").find(".field-validation-error").length > 0){
                if (!$(".field-validation-error").hasClass("not-valid") && (!$("#form-phone").hasClass(".phone-invalid")) && $("#input-register").is(":checked")) {
                    $("#register-button").prop("disabled", false);
                }
            }
        },

        messages: {
            "FirstName": {
                required: "Please enter first name"
            },
            "Email": {
                required: "Please enter email address",
                email: "Invalid email address"
            },
            "Password": {
                required: "Please enter password",
                isValidPassword: "Invalid password",
                maxlength: "Password is too long. Must be no more than 128 characters"
            },
            "Company": {
                required: "Please enter company name"
            },
            "Contact": {
                maxlength: "Contact Number is too long. Must be no more than 20 characters"
            }
        },
    });

    $("#sign-up-form").submit(function () {
        $("#register-button").prop("disabled", true);
        $("#body").ejWaitingPopup("show");
        if (!($("#sign-up-form").valid())) {
            $("#body").ejWaitingPopup("hide");
        }
        else {
            $("#register-button").prop("disabled", true);
        }
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
});


function IsValidPassword(password) {
    return passwordRegex.test(password);
}

function showPasswordPolicy() {
    var value = $("#register-password").val();
    var validateMethods = new Array();
    validateMethods.push(validateUserpassword.p_policy_uppercase);
    validateMethods.push(validateUserpassword.p_policy_lowercase);
    validateMethods.push(validateUserpassword.p_policy_number);
    validateMethods.push(validateUserpassword.p_policy_specialcharacter);
    validateMethods.push(validateUserpassword.p_policy_length);

    for (var n = 0; n < validateMethods.length; n++) {
        var currentMethodName = validateMethods[n];
        ruleName = currentMethodName(value);
        if (ruleName != undefined && ruleName != "") {
            if (!$("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                $("#password_policy_rules").find("li#" + ruleName + " span:first").addClass("su-password-tick").removeClass("icon");
            }
        }
        else {
            ruleName = name;
            if ($("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                $("#password_policy_rules").find("li#" + ruleName + " span:first").removeClass("su-password-tick").addClass("icon");
            }
        }

        ruleName = "";
    }
}
