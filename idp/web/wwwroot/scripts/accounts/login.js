$(document).ready(function () {
    if (typeof loginDisclaimer !== 'undefined' && loginDisclaimer != null && loginDisclaimer.IsEnabled == true && loginDisclaimer.IsConsentCheckboxEnabled == true) {
        $("#login-button").attr("disabled", true);
        $(".link-button").attr("disabled", true);
    }

    var showDisclaimerDialog = new ej.popups.Dialog({
        width: "500px",
        height: "auto",
        isModal: true,
        visible: false,
        showHeader: false,
        animationSettings: { effect: 'Zoom' },
        close: LoginDisclaimerDialogClose
    });
    showDisclaimerDialog.appendTo("#login-disclaimer-dialog");

    var loginForm = $("#login-form");
    if (loginForm.length) {
        loginForm.on("submit", function (event) {
            if (!FormValidate()) {
                event.preventDefault();
            }
        });
    }
    var loginEmail = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-account',
        floatLabelType: 'Always',
        created: function () {
            loginEmail.focusIn();
        }
    });
    loginEmail.appendTo('#login-email');

    var loginPassword = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-account',
        floatLabelType: 'Always'
    });
    loginPassword.appendTo('#current-password');

    if (IsAdfsUserStatus === "NotActivated") {
        $("#access-denied").css({ "display": "block", "width": "225px", "margin": "15px 28px" });
        $("#login-input-error").text(window.Server.App.LocalizationContent.AccountNotActivated);
    }
    else if (IsAdfsUserStatus === "NotFound") {
        $("#access-denied").css("display", "block");
    }

    if (IsAdfsUserNotFound === "true") {
        $("#access-denied").css("display", "block");
    }

    if (isAuthError.toLowerCase() === "true") {
        $("#validate-auth-user").css("display", "block").find(".auth-error-text").html(authMessage);
    }

    if (isAzureResetPassword.toLowerCase() === "true") {
        $("#azure-b2c-password-reset").css("display", "block");
    }


    $("#login-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) $(element).valid();

            if (element.name === "userName") {
                // Remove whitespaces from the email field's value
                $(element).val($(element).val().replace(/\s/g, ''));
            }
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
            $(element).closest(".e-outline").removeClass("e-error");
            $(element).parent().find("span.validation-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("span.validation-holder").html(error);
            $(element).parent().find("span.validation-holder").css("display", "block");
            $("#error-password").css("display", "none");
        },
        messages: {
            "email": {
                required: window.Server.App.LocalizationContent.EmailValidator
            },
            "password": {
                required: window.Server.App.LocalizationContent.PasswordValidator
            }
        }
    });

    if (typeof IsWindowADEmbedSSOAuth != 'undefined' && IsWindowADEmbedSSOAuth.toLowerCase() === "true") {
        isWindowADDefaultAuth = "false";//prevent from triggering windowsad login call again
        $("#login-button-windows").click();
    }

    if (typeof isWindowADDefaultAuth != 'undefined' && isWindowADDefaultAuth.toLowerCase() === "true") {
        $("#login-button-windows").click();
    }
});

$(document).on("click", "#login-button-windows", function () {
    showWaitingPopup('body');
    if (window.location.href.search("authorization") === -1) {
        var returnUrl = getParameterByName("ReturnUrl");
    }
    else {
        returnUrl = WindowADCallBackUrl;
    }
    $("#access-denied").html("<span class='su su-login-error'></span> " + window.Server.App.LocalizationContent.AccessDenied);
    $("#access-denied, #validate-azure-user, #validate-ad-user, #validate-auth-user, #azure-b2c-password-reset").css("display", "none");
    var redirectUrl = rootUrl + (window.location.href.search("authorization") === -1
        ? "windowsauthentication/account/login"
        : "windowsauthentication/account/oauthlogin?client_id=" + $("#external-authentication-client-id").val());
    $.ajax({
        type: "GET",
        url: redirectUrl + "?returnUrl=" + returnUrl,
        data: {},
        cache: false,
        contentType: "application/json; charset=utf-8",
        statusCode: {
            401: function () {
                hideWaitingPopup('body');
                $("#access-denied").css("display", "block");
            },
            503: function () {
                hideWaitingPopup('body');
                $("#access-denied").html("<span class='su su-login-error'></span> " + window.Server.App.LocalizationContent.SeviceUnAvailable);
                $("#access-denied").css("display", "block");
            },
            500: function () {
                hideWaitingPopup('body');
                $("#access-denied").css("display", "block");
            },
            404: function () {
                hideWaitingPopup('body');
                $("#access-denied").css("display", "block");
            },
            200: function (result) {
                hideWaitingPopup('body');
                if (result.status && result.data) {
                    window.location.href = mfaVerificationPageUrl;
                }

                if (result.status && result.data == "") {
                    if (window.location.href.search("authorization") === -1) {
                        window.location.href = getParameterByName("ReturnUrl");
                    } else {
                        if (typeof IsWindowADEmbedSSOAuth != 'undefined' && IsWindowADEmbedSSOAuth.toLowerCase() === "true") {
                            window.location.href = WindowADCallBackUrl;
                        }
                        else {
                            window.location.reload();
                        }
                    }
                } else {
                    hideWaitingPopup('body');
                    if (result.data == null || result.data == "") {
                        $("#access-denied").css("display", "block");
                    } else {
                        $("#validate-ad-user").html(result.data.replace(/[''\[\]\/]/gi, ''));
                        $("#validate-ad-user").css("display", "block");
                    }
                }
            },
            304: function (result) {
                hideWaitingPopup('body');
                if (result.responseText.toLowerCase() != "true") {
                    hideWaitingPopup('body');
                    $("#access-denied").html("<span class='su su-login-error'></span> " + window.Server.App.LocalizationContent.SeviceUnAvailable);
                    $("#access-denied").css("display", "block");
                }
            }
        },
        complete: function (result) {
            hideWaitingPopup('body');
        },
        dataType: "json",
        success: function (result) { }
    });
    return false;
});

$(document).on("click", ".auth-login-button", function () {
    $("#access-denied, #validate-azure-user, #validate-ad-user, #validate-auth-user, #azure-b2c-password-reset").css("display", "none");
});

$(document).on("click change", "#login-email", function () {
    if ($("#password-field").css("display") !== "none") {
        $(".login-options, #password-field").slideUp();
        $("#password-field").removeClass("has-error");
        $("#login-button").html(window.Server.App.LocalizationContent.ContinueButton);
        $('#current-password').val("");
    }
});

$(document).on("click", "#windows-login", function () {
    var emailId = $("#login-email").val();
    $("#azure-email").val(emailId);
});

$(document).on("click", "#azureadfs-login", function () {
    var emailId = $("#login-email").val();
    $("#external-email").val(emailId);
});

$(document).on("keyup", "#login-email", function () {
    $("#error-email").css("display", "none");
    $("#error-password").css("display", "none");
});

$(document).on("keyup", "#current-password", function () {
    $("#error-password").css("display", "none");
});

$(document).on("click", ".forgot-pwd-link", function (event) {
    event.preventDefault();
    if ($("#login-email").val() != "" && $("#login-email").val() != undefined) {
        localStorage.setItem(window.location.hostname + "_email", $("#login-email").val())
    }

    window.location.href = $(this).attr("href");
});

$(document).on("click", "#adfs-login-text", function () {
    $('#azureadfs-login').click();
});

$(document).on("click", "#adfs-login-text", function () {
    $("#windows-login").trigger("click");
});

$(document).on("click", ".popup-login-button", function () {
    showWaitingPopup('body');
    var waitingPopupMessage = window.Server.App.LocalizationContent.WaitingPopupMessage;
    $(".e-spinner-pane").append('<div class="e-spinner-message" style="font-weight:bold;color: white;font-size: 20px;padding-top: 70px;"><span id="waiting-popup-message"></span></div>');
    $("#waiting-popup-message").append(waitingPopupMessage);
    var screenWidth = $(window).width() / 2 - 250,
        screenHeight = $(window).height() / 2 - 300,
        popupFeatures = "width=500,height=600,status,resizable,left=" + screenWidth + ",top=" + screenHeight + "screenX=" + screenWidth + ",screenY=" + screenHeight;
    popup = window.open($(".popup-login-button").attr("data-login-url"), "PopupWindow", popupFeatures);
    setInterval(openLoginWindow, 300);
    setTimeout(closeLoginWindow, 10000000);
});

function openLoginWindow() {
    if (popup.window.location.href != null) {
        var currentURL = popup.window.location.href;
        var base = $('meta[name="base_url"]').attr("content");
        if (currentURL != null && currentURL.includes(base)) {
            var redirectingMessage = window.Server.App.LocalizationContent.RedirectingMessage;
            $("#waiting-popup-message").hide();
            if ($("#redirect-message").length === 0) {
                $(".e-spinner-message").append('<span id="redirect-message"></span>');
                $("#redirect-message").append(redirectingMessage);
                popup.close();
                window.location.href = currentURL;
            }
        }
    }
}

function closeLoginWindow() {
    popup.close();
}

function FormValidate() {
    $("#access-denied").css("display", "none");
    if ($("#password-field").css("display") === "none") {
        if ($("#login-form").valid()) {
            $("#password-field, .login-options").slideDown();
            $("#password-field").children(".e-float-input").removeClass("e-error");
            $("#login-button").html(window.Server.App.LocalizationContent.LoginButton);
            $("#current-password").focus();
            if (showBoldSignUp.toLowerCase() === "true") {
                $(".account-bg").css("height", "710px");
            }
        }
        else {
            return false;
        }
    } else {

        if ($("#login-form").valid()) {
            showWaitingPopup('body');
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

$("#open-login-disclaimer").click(function () {
    LoginDisclaimerDialogOpen();
});
function LoginDisclaimerDialogOpen() {
    document.getElementById("login-disclaimer-dialog").ej2_instances[0].show();
    var contentCheckElement = document.getElementById("content-check");
    if (contentCheckElement) {
        contentCheckElement.disabled = true;
    }
}

$(document).on("click", "#close-info-dialog, #close-button", function() {
    LoginDisclaimerDialogClose();
});

function LoginDisclaimerDialogClose() {
    document.getElementById("login-disclaimer-dialog").ej2_instances[0].hide();
    var contentCheckElement = document.getElementById("content-check");
    if (contentCheckElement) {
        contentCheckElement.disabled = false;
    }
}

$(document).on('change', "#content-check", function () {

    if ($("#content-check").is(":checked")) {
        LoginDisclaimerDialogOpen();
        $(".link-button").removeAttr("disabled");
        $("#login-button").removeAttr("disabled");
    }
    else {
        $(".link-button").attr("disabled", true);
        $("#login-button").attr("disabled", true);
    }
});
