$(document).ready(function () {

    var loginEmail = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-input-focus',
        floatLabelType: 'Always',
        created: function () {
            loginEmail.focusIn();
        }
    });
    loginEmail.appendTo('#login-email');

    var loginPassword = new ejs.inputs.TextBox({
        cssClass: 'e-outline',
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
                required: window.Server.App.LocalizationContent.EnterPassword
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
    $("#access-denied").html("<span class='su su-login-error'></span> " + window.Server.App.LocalizationContent.AccessDenied);
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
                if (result.status) {
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
    $("#access-denied, #validate-azure-user, #validate-ad-user, #validate-auth-user").css("display", "none");
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

function FormValidate() {
    $("#access-denied").css("display", "none");
    if ($("#password-field").css("display") === "none") {
        if ($("#login-form").valid()) {
            $(".mail-loader-div").addClass("email-loader");
            $("#login-button").attr("disabled", "disabled");
            var userName = $("#login-email").val();
            $.ajax({
                type: "POST",
                url: validateEmailUrl,
                data: { userName: userName, callBackUri: callBackUri },
                success: function (result) {
                    if (result.Value != null && result.Value != undefined) {
                        window.location.href = result.Value;
                    } else {
                        $(".mail-loader-div").removeClass("email-loader");
                        $("#login-button").removeAttr("disabled");
                        if (result.Status != null) {
                            if (result.DirectoryTypeName === "oauth2"
                                || result.DirectoryTypeName === "openidconnect"
                                || result.DirectoryTypeName === "jwtsso"
                                || result.DirectoryTypeName === "windowsad") {
                                $("#external-email").val(userName);
                                $("#" + result.DirectoryTypeName + "-login").trigger("click");
                            }
                            else if (result.DirectoryTypeName === "azuread") {
                                $("#external-email").val(userName);
                                $("#azureadfs-login").trigger("click");
                            }
                            else {
                                $("#password-field, .login-options").slideDown();
                                $("#password-field").children(".e-float-input").removeClass("e-error");
                                $("#login-button").html(window.Server.App.LocalizationContent.LoginButton);
                                $("#current-password").focus();
                                if (showBoldSignUp.toLowerCase() === "true") {
                                    $(".account-bg").css("height", "710px");
                                }
                            }
                        }
                    }
                }
            });
        }
        return false;
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



var windowRef;
var timer;
var obj;

function checkWindowRef() {
    if (windowRef.closed) {
        clearInterval(timer);
        privacyRedirection();
    }
}

$(document).on("click", "#syncfusion-login-text", function () {
    $("#syncfusion-login").trigger("click");
});

$(document).on("click", "#syncfusion-login", function (e) {
    showWaitingPopup('body');
    if (windowRef != undefined) {
        clearInterval(timer);
        windowRef.close();
    }
    obj = $(this);
    $(window).off('message', $.proxy(handleAuthorizeMessage, window, obj));
    $(window).on('message', $.proxy(handleAuthorizeMessage, window, obj));
    var left = ($(window).width() / 2) - (500 / 2);
    var top = ($(window).height() / 2) - (600 / 2);
    var windowFeatures = "width=" + 500 + ",height=" + 600 + ",status,resizable,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
    windowRef = window.open($(this).attr("data-login-url"), '', windowFeatures);
    timer = setInterval($.proxy(checkWindowRef, 500, obj));
});

function handleAuthorizeMessage(addButtonObj, evt) {
    $(window).off('message', $.proxy(handleAuthorizeMessage, window, addButtonObj));
}

function privacyRedirection() {
if ($("#login-button").is(":disabled")) {
        $("#login-button").attr("disabled", false);
    }

    if (window.parent.isValidAccount !== undefined && window.parent.privacyAccepted !== undefined) {
        if (window.parent.isValidAccount.toLocaleLowerCase() === 'true' && window.parent.privacyAccepted.toLocaleLowerCase() === 'false') {
            window.location.href = window.parent.privacyUrl;
        }
        else if (window.parent.isValidAccount.toLocaleLowerCase() === 'true' && window.parent.privacyAccepted.toLocaleLowerCase() === 'true') {
            window.location.href = window.parent.returnUrl;
        }
        else if (window.parent.isValidAccount.toLocaleLowerCase() === 'false' && window.parent.accessDeniedForTenant.toLocaleLowerCase() === 'true') {
            window.location.href = window.parent.accessDeniedUrl;
        }
        else {
            hideWaitingPopup('body');   
        }

        window.parent.isValidAccount = false;
        window.parent.privacyAccepted = true;
    } else {
        hideWaitingPopup('body');
    }
}

function onSyncfusionFormSubmit() {
    $("#syncfusion-login-button").attr("disabled", true);
}

function onSyncfusionFormChange() {
    if ($("#syncfusion-login-email").val().trim().length > 0 && $("#syncfusion-login-password").val().trim().length > 0) {
        $("#syncfusion-login-button").attr("disabled", false);
    }
    else {
        $("#syncfusion-login-button").attr("disabled", true);
    }
}
$(function () {
    $(document).on("click", ".show-hide-password", function () {
        if ($(this).siblings().find("input").is(":password")) {
            $(this).siblings().find("input").attr('type', 'text');
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.Server.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(this).siblings().find("input").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.Server.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    $(document).on("touch", ".show-hide-password", function () {
        if ($(this).siblings().find("input").is(":password")) {
            $(this).siblings().find("input").attr('type', 'text');
            $(this).removeClass('su-show');
            $(this).addClass('su-hide');

        }
        else {
            $(this).siblings().find("input").attr('type', 'password');
            $(this).removeClass('su-hide');
            $(this).addClass('su-show');

        }
    });
});
