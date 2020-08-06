$(document).ready(function () {
    $("#mail-password").show();

    $("#email-setting-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                if (element.id !== "mail-password") {
                    $(element).valid();
                }
                else {
                    if ($(element).val() !== "") {
                        $(element).valid();
                    }
                }
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) {
            if (element.id !== "mail-password") {
                $(element).valid();
            }
            else {
                if ($(element).val() === "") {
                    $(element).valid();
                }
            }
        },
        rules: {
            "smtp_address": {
                isRequired: true
            },
            "port_number": {
                isRequired: true
            },
            "mail_display_name": {
                isRequired: true,
                isValidName: true
            },
            "mail_user_name": {
                isRequired: true,
                isValidEmail: true
            },
            "mail_password": {
                required: true
            },
            "sender_user_name": {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest(".form-group").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest(".form-group").removeClass("has-error");
            $(element).parent().find("span.validation-errors").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("span.validation-errors").html(error);
        },
        messages: {
            "smtp_address": {
                isRequired: window.Server.App.LocalizationContent.MailSMTPServerValidator
            },
            "port_number": {
                isRequired: window.Server.App.LocalizationContent.MailSMTPPortValidator
            },
            "mail_display_name": {
                isRequired: window.Server.App.LocalizationContent.SenderNameValidator
            },
            "mail_user_name": {
                isRequired: window.Server.App.LocalizationContent.SenderEmailValidator
            },
            "mail_password": {
                required: window.Server.App.LocalizationContent.PasswordValidator
            },
            "sender_user_name": {
                required: window.Server.App.LocalizationContent.UserNameValidator
            }
        }
    });

    $(".mail-settings-fields:not('#mail-password')").keyup(function (e) {
        getEmailPassword();
    });

    $("#mail-authentication-type").selectpicker("refresh");
});

$(document).on("change", "#secure-mail-authentication", function () {
    getEmailPassword();
});

$(document).on("change", "#mail-authentication-type", function () {
    var authTextBoxes = $(".mail-credentials");

    if (parseInt($(this).val()) === 1) {
        authTextBoxes.removeAttr("disabled");
    } else {
        authTextBoxes.attr("disabled", "disabled").val("").parent().parent().removeClass("has-error");
        authTextBoxes.siblings(".validation-errors").text("");
    }
});

$(document).on("change", "#mail-password , #sender-user-name", function () {
    if ($("#mail-password").val() !== "")
        $("#mail-password-error").remove();
    if ($("#sender-user-name").val() !== "")
        $("#sender-user-name-error").remove();
});

function getEmailPassword() {
    var mailPassword = $("#mail-password");
    if (mailPassword.val() === "") {
        if (parseInt($("#port-number").val()) !== window.SystemSettingsProperties.MailSettingsPort ||
            $("#smtp-address").val() !== window.SystemSettingsProperties.MailSettingsHost ||
            $("#mail-display-name").val() !== window.SystemSettingsProperties.MailSettingsSenderName ||
            $("#mail-user-name").val() !== window.SystemSettingsProperties.MailSettingsAddress ||
            $("#secure-mail-authentication").is(":checked") !== window.SystemSettingsProperties.MailSettingsIsSecureAuthentication) {
            mailPassword.attr("placeholder", window.Server.App.LocalizationContent.PasswordPlaceholder).siblings(".placeholder").html(window.Server.App.LocalizationContent.PasswordPlaceholder);
        } else {
            mailPassword.attr("placeholder", "●●●●●●●●").siblings(".placeholder").html("●●●●●●●●");
        }
    }
}