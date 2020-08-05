$(document).ready(function () {
    if (IsAdfsUserNotFound === "true") {
        $("#access-denied").css("display", "block");
    }

    if (isAuthError.toLowerCase() === "true") {
        $("#validate-auth-user").css("display", "block").find(".auth-error-text").html(authMessage);
    }

    $('#login-email').on("click change", function () {
        if ($("#password-field").css("display") !== "none") {
            $(".login-options, #password-field").slideUp();
            $("#password-field").removeClass("has-error");
            $("#login-button").html(window.IdP.App.LocalizationContent.ContinueButton);
            $('#login-password').val("");
        }
    });

    $('#windows-login').on("click", function () {
        var emailId = $("#login-email").val();
        $("#azure-email").val(emailId);
    });

    $('#login-email').keyup(function () {
        $("#error-email").css("display", "none");
    });

    $('#login-password').keyup(function () {
        $("#error-password").css("display", "none");
    });

    $(document).on("click", ".forgot-pwd-link", function (event) {
        event.preventDefault();
        if ($("#login-email").val() != "" && $("#login-email").val() != undefined) {
            localStorage.setItem(window.location.hostname + "_email", $("#login-email").val())
        }

        window.location.href = $(this).attr("href");
    });

    $("#login-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) $(element).valid();
            else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "email": {
                required: true
            },
            "password": {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest(".input-field-form").addClass("has-error");
            $("#error-email").css("display", "none");
        },
        unhighlight: function (element) {
            $(element).closest(".input-field-form").removeClass("has-error");
            $(element).parent().find("span.validation-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("span.validation-holder").html(error);
            $(element).parent().find("span.validation-holder").css("display", "block");
            $("#error-password").css("display", "none");
        },
        messages: {
            "email": {
                required: window.IdP.App.LocalizationContent.EmailValidator
            },
            "password": {
                required: window.IdP.App.LocalizationContent.EnterPassword
            }
        }
    });

    $(document).on("click", "#login-button-windows", function () {
        $("body").ejWaitingPopup("show");
        $("#access-denied").html("<span class='su su-login-error'></span> " + window.IdP.App.LocalizationContent.AccessDenied);
        $("#access-denied, #validate-azure-user, #validate-ad-user, #validate-auth-user").css("display", "none");
        var redirectUrl = rootUrl + (window.location.href.search("authorization") === -1
            ? "/windowsauthentication/account/login"
            : "/windowsauthentication/account/oauthlogin?client_id=" + $("#external-authentication-client-id").val());
        $.ajax({
            type: "GET",
            url: redirectUrl,
            data: {},
            cache: false,
            contentType: "application/json; charset=utf-8",
            statusCode: {
                401: function () {
                    $("body").ejWaitingPopup("hide");
                    $("#access-denied").css("display", "block");
                },
                503: function () {
                    $("body").ejWaitingPopup("hide");
                    $("#access-denied").html("<span class='su su-login-error'></span> " + window.IdP.App.LocalizationContent.SeviceUnAvailable);
                    $("#access-denied").css("display", "block");
                },
                500: function () {
                    $("body").ejWaitingPopup("hide");
                    $("#access-denied").css("display", "block");
                },
                404: function () {
                    $("body").ejWaitingPopup("hide");
                    $("#access-denied").css("display", "block");
                },
                200: function (result) {
                    $("body").ejWaitingPopup("hide");
                    if (result.Data.Status.toString().toLowerCase() == "true") {
                        if (window.location.href.search("authorization") === -1) {
                            window.location.href = getParameterByName("ReturnUrl");
                        } else {
                            window.location.reload();
                        }
                    } else {
                        $("body").ejWaitingPopup("hide");
                        if (result.Data.Data == null || result.Data.Data == "") {
                            $("#access-denied").css("display", "block");
                        } else {
                            $("#validate-ad-user").html(result.Data.Data.replace(/[''\[\]\/]/gi, ''));
                            $("#validate-ad-user").css("display", "block");
                        }
                    }
                },
                304: function (result) {
                    $("body").ejWaitingPopup("hide");
                    if (result.responseText.toLowerCase() != "true") {
                        $("body").ejWaitingPopup("hide");
                        $("#access-denied").html("<span class='su su-login-error'></span> " + window.IdP.App.LocalizationContent.SeviceUnAvailable);
                        $("#access-denied").css("display", "block");
                    }
                }
            },
            complete: function (result) {
                $("body").ejWaitingPopup("hide");
            },
            dataType: "json",
            success: function (result) { }
        });
        return false;
    });

    $(document).on("click", ".auth-login-button", function () {
        $("#access-denied, #validate-azure-user, #validate-ad-user, #validate-auth-user").css("display", "none");
    });
});

function FormValidate() {
    $("#access-denied").css("display", "none");
    if ($("#password-field").css("display") === "none") {
        if ($("#login-form").valid()) {
            $(".mail-loader-div").addClass("email-loader");
            $("#login-button").attr("disabled", "disabled");
            var emailId = $("#login-email").val();
            $.ajax({
                type: "POST",
                url: validateEmailUrl,
                data: { email: emailId, callBackUri: callBackUri },
                success: function (result) {
                    if (result.Value != null && result.Value != undefined) {
                        window.location.href = result.Value;
                    } else {
                        if (result.Status === true) {
                            if (result.DirectoryType === 2) {
                                $("#azure-email").val(emailId);
                                $("#windows-login").trigger("click");
                                $(".mail-loader-div").removeClass("email-loader");
                                $("#login-button").removeAttr("disabled");
                            }
                            else if (result.DirectoryType === 5) {
                                $("#syncfusion-login").trigger("click");
                                $(".mail-loader-div").removeClass("email-loader");
                            }
                            else {
                                $(".mail-loader-div").removeClass("email-loader");
                                $("#login-button").removeAttr("disabled");
                                $("#password-field, .login-options").slideDown();
                                $("#login-button").html(window.IdP.App.LocalizationContent.LoginButton);
                                $("#login-password").focus();
                            }
                        } else {
                            $(".mail-loader-div").removeClass("email-loader");
                            $("#login-button").removeAttr("disabled");
                            $(".login-fields .email").addClass("has-error");
                            $("#error-email").css("display", "block").html(window.IdP.App.LocalizationContent.InvalidAccount);
                        }
                    }
                }
            });
        }
        return false;
    } else {
        if ($("#login-form").valid()) {
            $("body").ejWaitingPopup("show");
        }
        return $("#login-form").valid();
    }
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    var urlValue = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    if (urlValue == null)
        urlValue = homeUrl;
    return urlValue;
}

$(document).on("click", "#adfs-login-text", function () {
    $("#windows-login").trigger("click");
});