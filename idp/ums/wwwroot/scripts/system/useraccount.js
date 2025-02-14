$(document).ready(function () {
    $(".admin-account-fields-container").validate({
        focusInvalid: false,
        errorElement: "span",
        onkeyup: function (element, event) {
            if ($(element).attr('id') == "txt-username") {
                $("#user-details").attr("data-username", $("#txt-username").val());
            }
            if ($(element).attr('id') == "txt-emailid") {
                $("#user-details").attr("data-email", $("#txt-emailid").val());
            }
            if ($(element).attr('id') == "txt-firstname" || $(element).attr('id') == "txt-lastname") {
                $("#user-details").attr("data-displayname", $("#txt-firstname").val() + " " + $("#txt-lastname").val());
            }
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) {
            $(element).valid();
        },
        onfocusin: function (element) {
            if (element.id === "new-password" && $("#new-password").data("toggle") === "popover" && $("#new-password").val() != undefined && $("#new-password").val() != "") {
                passwordPolicyPopover("#new-password", $("#new-password").val());
            }
        },
        rules: {
            username: {
                isRequired: true,
                hasWhiteSpace: true,
                isValidName: true,
                isValidUser: true,
                additionalSpecialCharValidation: false
            },
            firstname: {
                isRequired: true,
                isValidName: true,
                additionalSpecialCharValidation: true
            },
            lastname: {
                isValidName: true,
                additionalSpecialCharValidation: true
            },
            username: {
                isRequired: true,
                isValidUsernameLength: true,
                isValidUsername: true
            },
            email: {
                isRequired: true,
                isValidName: true,
                isValidEmail: true
            },
            password: {
                required: true,
                isValidPassword: true
            },
            confirm: {
                required: true,
                equalTo: "#new-password"
            }
        },
        highlight: function (element) {
            $(element).closest(".e-outline").siblings(".startup-validation").show();
            passwordBoxHightlight(element);
        },
        unhighlight: function (element) {
            passwordBoxUnhightlight(element);
         
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
        },
        messages: {
            username: {
                isRequired: window.Server.App.LocalizationContent.UserNameValidator
            },
            firstname: {
                isRequired: window.Server.App.LocalizationContent.FirstNameValidator
            },
            lastname: {
                isValidName: window.Server.App.LocalizationContent.AvoidSpecailCharacters
            },
            email: {
                isRequired: window.Server.App.LocalizationContent.EmailValidator
            },
            password: {
                required: window.Server.App.LocalizationContent.PasswordValidator,
                isValidPassword: window.Server.App.LocalizationContent.InvalidPassword
            },
            confirm: {
                required: window.Server.App.LocalizationContent.ConfirmPasswordValidator,
                equalTo: window.Server.App.LocalizationContent.PasswordsMismatch
            }
        }
    });

    $("#new-password").bind("keyup", function (e) {
        if ($("#new-password").val() == $("#txt-confirm-password").val()) {
            $("#txt-confirm-password").closest(".form-group").removeClass("has-error");
            $("#txt-confirm-password").parent().find(">.startup-validation").hide();
        }
        passwordPolicyPopover("#new-password", $("#new-password").val());
    });

    $("#new-password").on("change", function () {
        passwordPolicyPopover("#new-password", $("#new-password").val());
        $("#new-password").valid();
    });

    $(document).on("input", "#txt-username", function () {
        if (IsValidUsername($("#txt-username").val())) {
            $(".admin-form-email").css("padding-top", "24px")
        }
        else {
            if ($("#txt-username").val() != "") {
                $(".admin-form-email").css("padding-top", "40px")
            }
        }
    });

    $("#admin-account-fields-container").on("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#user-account-proceed").click();
        }
    }); 

    $("#user-account-proceed").on("click", function () {
        validateStartup(function (result) {
            if (result) {
                messageBox("su-login-error", window.Server.App.LocalizationContent.ConfigurationError, window.Server.App.LocalizationContent.ConfigurationErrorMessage, "success", function () {
                    onCloseMessageBox();
                });
            }
            else {
                if ($(".admin-account-fields-container").valid()) {
                    
                    $(".startup-waiting-popup").removeClass("storage-page-content");
                    $("#system-settings-user-account-container").hide(); 
                    $("#image-parent-container .startup-image").hide().attr("src", serverSetupImageUrl).fadeIn();

                    $(".startup-waiting-popup").addClass("storage-page-content");
                    $(".startup-content span.first-content").hide().text(window.Server.App.LocalizationContent.YourDatabaseConfiguration).slideDown();
                    $(".startup-content span.second-content").hide().text(window.Server.App.LocalizationContent.YourDatabaseConfiguration2 + displayName + ".").slideDown();
                    $("#help-link").attr("href", databaseConfigurationUrl);
                    $("#system-settings-configuration-mode-container").show();
                    if (!useSingleTenantDb) {
                        $("#database-per-tenant").prop("checked", true);
                    }
                    
                    $(".report-content").hide();
                }
                $('.popover').hide();
            }
        });
    });
});

