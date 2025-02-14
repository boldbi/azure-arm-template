﻿$(document).ready(function () {
    var testMail = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-non-float',
        floatLabelType: 'Never',
    });
    testMail.appendTo('#test-mail');

    String.prototype.format = function () {
        a = this;
        for (k in arguments) {
            a = a.replace("{" + k + "}", arguments[k])
        }
        return a
    }

    $("#test-mail-form").validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else true;
        },
        onfocusout: function (element) { $(element).valid(); $("#success-message").html(""); },
        rules: {
            "test_mail": {
                required: true,
                isValidEmail: true
            }
        },
        highlight: function (element) {
            $(element).closest('span').addClass("e-error");
            $("#test-mail-validate").css("display", "block");
            $(element).closest(".e-outline").siblings(".validation-message").html("");
        },

        unhighlight: function (element) {
            $(element).closest('span').removeClass('e-error');
            $("#test-mail-validate").css("display", "none");
            $("#test-main-error-message").hide();
        },

        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".validation-message").css("display", "block").html(error.html());
        },
        messages: {
            "test_mail": {
                required: window.Server.App.LocalizationContent.EmailValidator,
                isValidEmail: window.Server.App.LocalizationContent.InvalidEmailAddress
            }
        }
    });
});

$(document).on("click", "#mail-error-detail", function () {
    $("#test-main-error-message").show();
});

function testMailTrigger() {
    if ($("#email-setting-form").valid()) {
        if (document.getElementById("test-mail-dialog") == null) {
            var createDialogId = document.createElement("div");
            createDialogId.setAttribute("id", "test-mail-dialog");
            var element = document.getElementById("content-area");
            element.appendChild(createDialogId);
            createWaitingPopup('test-mail-dialog');

            var testMailDialogobj = new ejs.popups.Dialog({
                header: window.Server.App.LocalizationContent.SendTestMail,
                showCloseIcon: true,
                content: document.getElementById("test-mail-box"),
                buttons: [
                    {
                        'click': function () {
                            testMailDialogobj.hide();
                            $("#test-mail").val("");
                        },
                        buttonModel: {
                            content: window.Server.App.LocalizationContent.CancelButton
                        }
                    },
                    {
                        'click': function (e) {
                            var authenticationType = parseInt($("#authentication-type input[type='radio']:checked").val());
                            var mailSettings = {
                                MailSettingsAddress: $("#mail-user-name").val(),
                                MailSettingsAuthType: authenticationType,
                                MailSettingsUserName: authenticationType === 1 ? $("#sender-user-name").val() : "",
                                MailSettingsPassword: authenticationType === 1 ? $("#mail-password").val() : "",
                                MailSettingsHost: $("#smtp-address").val(),
                                MailSettingsSenderName: $("#mail-display-name").val(),
                                MailSettingsPort: parseInt($("#port-number").val()),
                                MailSettingsIsSecureAuthentication: $("#secure-mail-authentication").is(":checked"),
                                MachineName: $("#machineName").val(),
                                HostDomain: $("#hostDomain").val(),
                                MailSettingsAccount: document.getElementById("mail-account").ej2_instances[0].value != undefined && !isNullOrWhitespace(document.getElementById("mail-account").ej2_instances[0].value) ? parseInt(document.getElementById("mail-account").ej2_instances[0].value) : 0,
                                MailSettingsTenantId: $("#tenant-id").val(),
                                MailSettingsClientId: $("#client-id").val(),
                                MailSettingsClientSecret: $("#client-secret").val(),
                            };

                            var mailSettingsData = {
                                MailSettings: mailSettings
                            };

                            if ($("#test-mail-form").valid()) {
                                showWaitingPopup('test-mail-dialog');
                                $.ajax({
                                    type: "POST",
                                    url: sentTestMail,
                                    data: { email: $("#test-mail").val(), mailSettingsData: JSON.stringify(mailSettingsData) },
                                    beforeSend: showWaitingPopup('server-app-container'),
                                    success: function (result) {
                                        hideWaitingPopup('server-app-container');
                                        if (result.Status) {
                                            $("#test-mail").val("");
                                            $(".success-box").show();
                                            $("#test-mail-dialog .e-footer-content").find("button").hide();
                                            $("#test-mail-dialog .e-footer-content").find("button").last().show();
                                            $(".e-footer-content").css("text-align", "center");
                                            $(".test-mail-info, #test-mail-form").hide();
                                        }
                                        else {
                                            $("#test-mail").closest('span').addClass("e-error");
                                            $("#test-mail-validate").css("display", "block");
                                            $("#test-mail-validate").html(window.Server.App.LocalizationContent.MailSendFailureMessage1.format("<a id='mail-error-detail'>", "</a>"));
                                            $("#test-main-error-message").val(result.Data);
                                        }
                                        hideWaitingPopup('test-mail-dialog');
                                    }
                                });
                            }
                        },
                        buttonModel: {
                            isPrimary: true,
                            content: window.Server.App.LocalizationContent.SendButton
                        }
                    },
                    {
                        'click': function () {
                            testMailDialogobj.hide();
                            $("#test-mail").val("");
                        },
                        buttonModel: {
                            content: window.Server.App.LocalizationContent.DoneButton
                        }
                    }
                ],
                animationSettings: { effect: 'Zoom' },
                beforeOpen: showTestMailBox,
                width: '400px',
                isModal: true,
            });
            testMailDialogobj.appendTo(createDialogId);
        }
        else {
            $(".success-box").hide();
            $(".test-mail-info, #test-mail-form").show();
            $(".e-footer-content").css("text-align", "right");
            $("#test-mail-dialog .e-footer-content").find("button").show();
            $("#test-mail-dialog .e-footer-content").find("button").last().hide();
            var sendMailTest = document.getElementById("test-mail-dialog").ej2_instances;
            sendMailTest[0].refresh();
            sendMailTest[0].show();
        }
    }
}

function showTestMailBox() {
    $("#test-mail").val("");
    $("#test-mail").parent().removeClass("e-error");
    $(".e-footer-content").css("text-align", "right");
    $("#test-mail-validate, #test-main-error-message, .success-box").hide();
    $("#test-mail-dialog .e-footer-content").find("button").show();
    $("#test-mail-dialog .e-footer-content").find("button").last().hide();
    $(".test-mail-info, #test-mail-form, #test-mail-box").show();
}

$(document).on("click", "#test-mail-button", function () {
    testMailTrigger();
});