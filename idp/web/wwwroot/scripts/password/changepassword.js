var isKeyUp = false;
$(document).ready(function () {
    if (isShow2FA) {

        if ($("#security-setting-container").is(":visible")) {
            if (location.href.match(/2fa/)) {
                $("#2fa").tab("show");
            }
            else {
                $("#change-password").tab("show");
                var query = (window.location.search).toString();
                if (query != "?view=change-password") {
                    history.pushState(null, '', '?view=change-password');
                }
            }
        }
    }
    else {
        if ($("#security-setting-container").is(":visible")) {
                $("#2fa").tab("show");
                var query = (window.location.search).toString();
                if (query != "?view=2fa") {
                    history.pushState(null, '', '?view=2fa');
                }
            
        }
        $("#security-setting-container, .admin-page-header").removeClass("security-header");

    }

    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "change-password") {
            var query = (window.location.search).toString();
            if (query != "?view=change-password") {
                history.pushState(null, '', '?view=change-password');
            }
        }
        else if ($(this).attr("id") == "2fa") {
            var query = (window.location.search).toString();
            if (query != "?view=2fa") {
                history.pushState(null, '', '?view=2fa');
            }
        }
        $(".success-message, .error-message").hide();
    });

    $('[data-toggle="popover"]').popover();
    var outlineEditPassword = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-non-float',
        floatLabelType: 'Never',
    });
    outlineEditPassword.appendTo('#current-password');
    outlineEditPassword.appendTo('#new-password');
    outlineEditPassword.appendTo('#confirm-password');
    createWaitingPopup('content-area');

    $.validator.addMethod("isEditadminPassword", function (value, element) {
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

    $('.change-password-form').validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            $("#success-message").html("");
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else true;
        },
        onfocusout: function (element) { $(element).valid(); $("#success-message").html(""); },
        onfocusin: function (element) {
            if (element.id === "new-password" && $("#new-password").data("toggle") === "popover" && $("#new-password").val() != undefined && $("#new-password").val() != "") {
                passwordPolicyPopover("#new-password", $("#new-password").val());
            }
        },
        rules: {
            "current-password": {
                required: true
            },
            "new-password": {
                required: true,
                isEditadminPassword: true
            },
            "confirm-password": {
                required: true,
                equalTo: "#new-password"
            }
        },
        highlight: function (element) {
            $(element).closest('span').addClass("e-error");
            $(element).closest(".e-outline").siblings(".validation-message").html("");
            passwordBoxHightlight(element);
        },
        unhighlight: function (element) {
            $(element).closest('span').removeClass('e-error');
            passwordBoxUnhightlight(element);
            $(element).closest('span').find(".password-validate-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".validation-message").css("display", "block").html(error.html());
        },
        messages: {
            "current-password": {
                required: window.Server.App.LocalizationContent.OldPasswordValidator
            },
            "new-password": {
                required: window.Server.App.LocalizationContent.NewPasswordValidator,
                isEditadminPassword: window.Server.App.LocalizationContent.InvalidPasswordValidator
            },
            "confirm-password": {
                required: window.Server.App.LocalizationContent.ConfirmPasswordValidator,
                equalTo: window.Server.App.LocalizationContent.PasswordMismatch
            }
        }
    });

    var mfaDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.Server.App.LocalizationContent.Option2fa + "</div>",
        content: document.getElementById("authenticator-application-box-content"),
        showCloseIcon: true,
        buttons: [
            { click: onMfaDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton, cssClass: 'verification-cancel-button' } },
            { click: enable2fa, buttonModel: { content: window.Server.App.LocalizationContent.Activate, isPrimary: true, cssClass: 'verification-ok-button' } }
        ],
        width: "424px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        close: onMfaDialogClose
    });
    mfaDialog.appendTo("#authenticator-application-box");

    var recoveryCodeDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.Server.App.LocalizationContent.RegenerateRecoveryCode + "</div>",
        content: document.getElementById("recovery-code-regeneration-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: onRecoveryCodeDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } },
            { click: regenerateRecoveryCode, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } }
        ],
        width: "472px",
        height: "auto",
        close: onRecoveryCodeDialogClose,
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false
    });
    recoveryCodeDialog.appendTo("#recovery-code-regeneration-confirmation");

    var disableMfaDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.Server.App.LocalizationContent.DisableMfa + "</div>",
        content: document.getElementById("disable-mfa-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: onDisableMfaDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } },
            { click: disableMfa, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true, cssClass: 'verification-ok-button' } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        close: onDisableMfaDialogClose
    });
    disableMfaDialog.appendTo("#disable-mfa-confirmation");

    var showRecoveryCodeDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.Server.App.LocalizationContent.RecoveryCode + "</div>",
        content: document.getElementById("recovery-code-box-content"),
        showCloseIcon: true,
        buttons: [
            { click: onShowRecoveryCodeDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.CloseButton } }
        ],
        width: "424px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        close: onShowRecoveryCodeDialogClose
    });
    showRecoveryCodeDialog.appendTo("#recovery-code-box");
});

$(document).on("keypress", ".password-fields-user-profile-edit", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        onChangePasswordClick();
        this.blur();
        return false;
    }
});

$(document).on("keyup", "#new-password", function () {
    if ($("#new-password").val() == $("#confirm-password").val()) {
        $("#confirm-password").closest('span').removeClass('e-error');
        $("#confirm-password").closest('div').find('span:last-child').html("");
    }
    else if ($("#confirm-password").val() != '') {
        $("#confirm-password").closest('span').addClass("e-error");
        $("#confirm-password").closest('div').next("div").find("span").html(window.Server.App.LocalizationContent.PasswordMismatch).css("display", "block");
    }

});

$(document).on("keyup", "#current-password", function () {
    showValidationMessage();
});

$(document).on("keyup", "#new-password", function () {
    showValidationMessage();
});

$(document).on("keyup", "#confirm-password", function () {
    showValidationMessage();
});

$(document).on("change", "#new-password", function () {
    passwordPolicyPopover("#new-password", $("#new-password").val());
    $("#new-password").valid();
});

function onChangePasswordClick() {
    if ($('.change-password-form').valid()) {
        $(".password-validate-holder").html("");
        $("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("e-error");

        showWaitingPopup('content-area');
        doAjaxPost('POST', updatepasswordUrl, { oldpassword: $("#current-password").val(), newpassword: $("#new-password").val(), confirmpassword: $("#confirm-password").val(), returnurl: $("#hidden-return-url").val() },
            function (result) {
                $("#current-password").val("");
                $("#current-password").closest("div").removeClass("e-valid-input").addClass("e-input-focus");
                $("#new-password").val("");
                $("#new-password").closest("div").removeClass("e-valid-input").addClass("e-input-focus");
                $("#confirm-password").val("");
                $("#confirm-password").closest("div").removeClass("e-valid-input").addClass("e-input-focus");
                $("#password_policy_rules").remove();
                $("#confirm-password-section").removeAttr("style");
                $("#change-password-btn").css("margin-top", "0px");
                if (!result.Data.status && result.Data.key == "password") {
                    hideWaitingPopup('content-area');
                    $("#old-password-validate").html(result.Data.value).css("display", "block")
                    $("#current-password").addClass("e-error");
                }
                else if (!result.Data.status && result.Data.key == "error") {
                    hideWaitingPopup('content-area');
                    WarningAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordFailure, result.Message, 7000);
                }
                else {
                    if (result.Data.isTenantUserEdit) {
                        window.location.href = result.Data.returnUrl + "?data=" + result.Data.status;
                    } else {
                        hideWaitingPopup('content-area');
                        SuccessAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordSuccess, 7000);
                    }
                }
                $(".popover").hide();
            }
        );
    }
}

function showValidationMessage() {
    $(".validation-message").css("display", "block");
}

$(document).on("click", "#mfa-button", function () {
    $.ajax({
        type: "POST",
        url: generateUserTokenUrl,
        async: false,
        success: function (result) {
            if (result.Data.status && result.Data.authenticatorUri != "" && result.Data.sharedKey != "") {
                var authenticatorUri = result.Data.authenticatorUri;
                new QRCode(document.getElementById("qrCode"),
                    {
                        text: authenticatorUri,
                        width: 150,
                        height: 150
                    });
                document.getElementById("sharedKey").value = result.Data.sharedKey;
                onMfaDialogOpen();
            }
        }
    });
});

function disableMfa() {
    var verificationCode = $("#disable-verification-code").val();
    showWaitingPopup('content-area');
    $.ajax({
        type: "POST",
        url: validateVerificationCodeUrl,
        async: false,
        data: { "verificationCode": verificationCode },
        success: function (result) {
            if (result.Data.status && result.Data.recovery != "") {
                document.getElementById("authenticator-application-box").ej2_instances[0].hide();
                $.ajax({
                    type: "POST",
                    url: disableMfaUrl,
                    async: false,
                    success: function (result) {
                        hideWaitingPopup('content-area');
                        window.location.reload();
                    }
                });
            }
            else {
                document.getElementById("disable-verification-code").value = "";
                onDisableMfaDialogOpen();
                $('#verification-code, #disable-verification-code').closest('div').addClass("has-error");
                $("#validation-error, #disable-validation-error").html(window.Server.App.LocalizationContent.VerificationCodeExpired).css("display", "block");
                $(".validation-messages").css("display", "block");
                hideWaitingPopup('content-area');
            }
        }
    });
}

function onRecoveryCodeDialogOpen() {
    document.getElementById("recovery-code-regeneration-confirmation").ej2_instances[0].show();
}

function onRecoveryCodeDialogClose() {
    document.getElementById("recovery-code-regeneration-confirmation").ej2_instances[0].hide();
    window.location.reload();
}

function copyToClip() {
    value = document.getElementById("copy-recovery").value;
    navigator.clipboard.writeText(value)
    setTimeout(function () {
        $("#recovery-code-copy").attr("data-original-title", window.Server.App.LocalizationContent.Copied);
        $("#recovery-code-copy").tooltip('show');
    }, 200);
    setTimeout(function () {
        $("#recovery-code-copy").attr("data-original-title", window.Server.App.LocalizationContent.ClicktoCopy);
        $("#recovery-code-copy").tooltip();
    }, 3000);
}


function regenerateRecoveryCode() {
    showWaitingPopup('content-area');
    $.ajax({
        type: "POST",
        url: regenerateRecoveryCodeUrl,
        success: function (result) {
            if (result.Data.status && result.Data.recovery != "") {
                onShowRecoveryCodeDialogOpen();
                $(".mfa-success-message").css("display", "none");
                let list = document.getElementById("table-recovery");
                var recoveryCode = result.Data.recovery;
                var recovery = recoveryCode.split(';');
                document.getElementById("copy-recovery").value = recovery;
                for (let i = 0; i < recovery.length; i += 2) {
                    let tr = list.insertRow();
                    for (let j = 0; j < 2; j++) {
                        var recoverList = recovery[i + j];
                        let td = tr.insertCell();
                        td.appendChild(document.createTextNode(`${recoverList}`));
                    }
                }

                hideWaitingPopup('content-area');
            }
            else {
                hideWaitingPopup('content-area');
            }
        }
    });
}

function onMfaDialogOpen() {
    $(".verification-ok-button").attr("disabled", true);
    document.getElementById("authenticator-application-box").ej2_instances[0].show();
}

function onMfaDialogClose() {
    document.getElementById("authenticator-application-box").ej2_instances[0].hide();
    document.getElementById("qrCode").innerHTML = '';
    $('#verification-code').closest('div').removeClass("has-error");
    $(".validation-messages").css("display", "none");
    document.getElementById("verification-code").value = '';
    $(".verification-ok-button").attr("disabled", true);
}

function onShowRecoveryCodeDialogOpen() {
    document.getElementById("recovery-code-box").ej2_instances[0].show();
}

function onShowRecoveryCodeDialogClose() {
    document.getElementById("recovery-code-box").ej2_instances[0].hide();
    window.location.reload();
}

function enable2fa() {
    var verificationCode = $("#verification-code").val();
   
        showWaitingPopup('content-area');
        $.ajax({
            type: "POST",
            url: enable2faUrl,
            async: false,
            data: { "verificationCode": verificationCode },
            success: function (result) {
                if (result.Data.status && result.Data.recovery != "") {
                    document.getElementById("authenticator-application-box").ej2_instances[0].hide();
                    onShowRecoveryCodeDialogOpen();
                    let list = document.getElementById("table-recovery");
                    var recoveryCode = result.Data.recovery;
                    var recovery = recoveryCode.split(';');
                    document.getElementById("copy-recovery").value = recovery;
                    for (let i = 0; i < recovery.length; i += 2) {
                        let tr = list.insertRow();
                        for (let j = 0; j < 2; j++) {
                            var recoverList = recovery[i + j];
                            let td = tr.insertCell();
                            td.appendChild(document.createTextNode(`${recoverList}`));
                        }
                    }
                    hideWaitingPopup('content-area');
                }
                else {
                    document.getElementById("verification-code").value = "";
                    $('#verification-code').closest('div').addClass("has-error");
                    $("#validation-error").html(window.Server.App.LocalizationContent.VerificationCodeExpired).css("display", "block");
                    $(".validation-messages").css("display", "block");
                    $(".verification-ok-button").attr("disabled", true);
                    hideWaitingPopup('content-area');
                }
            }
        });
}

$(document).on("keyup", "#verification-code", function (e) {
    var verificationCode = document.getElementById("verification-code").value;
    if (e.keyCode != 13) {
        validateVerificationCode(verificationCode);
    }
});

$(document).on("click", "#generate-recovery-code", function () {
    onRecoveryCodeDialogOpen();
});

function onDisableMfaDialogOpen() {
    $("#disable-mfa-confirmation").find("button.e-primary").addClass("critical-action-button");
    $(".verification-ok-button").attr("disabled", true);
    document.getElementById("disable-mfa-confirmation").ej2_instances[0].show();
}

function onDisableMfaDialogClose() {
    document.getElementById("disable-mfa-confirmation").ej2_instances[0].hide();
    window.location.reload();
}

$(document).on("keyup", "#disable-verification-code", function () {
    var disableVerificationCode = document.getElementById("disable-verification-code").value;
    document.getElementsByClassName("verification-ok-button")[0].style.cursor = "context-menu";
    validateVerificationCode(disableVerificationCode);
});

$(document).on("click", "#mfa-disable-button", function () {
    onDisableMfaDialogOpen();
});

function validateVerificationCode(verificationCode) {
    var numbersOnly = /^\d+$/;
    if (verificationCode !== '') {
        if (numbersOnly.test(verificationCode)) {
            if (verificationCode.length >= 6) {
                $(".verification-ok-button").attr("disabled", false);
                document.getElementsByClassName("verification-ok-button")[0].style.cursor = "pointer";
            }
            $('#verification-code, #disable-verification-code').closest('div').removeClass("has-error");
            $(".validation-messages").css("display", "none");
        }
        else {
            $(".verification-ok-button").attr("disabled", true);
            $('#verification-code, #disable-verification-code').closest('div').addClass("has-error");
            $("#validation-error, #disable-validation-error").html(window.Server.App.LocalizationContent.VerificationCode).css("display", "block");
            $(".validation-messages").css("display", "block");
        }
    }
    else {
        $('#verification-code, #disable-verification-code').closest('div').removeClass("has-error");
        $(".validation-messages").css("display", "none");
        $(".verification-ok-button").attr("disabled", true);
    }
}
