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