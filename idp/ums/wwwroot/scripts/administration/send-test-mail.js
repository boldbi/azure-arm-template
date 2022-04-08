$(document).ready(function () {
    var testMail = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-non-float',
        floatLabelType: 'Never',
    });
    testMail.appendTo('#test-mail');

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
                required: window.TM.App.LocalizationContent.EmailValidator,
                isValidEmail: window.TM.App.LocalizationContent.InvalidEmailAddress
            }
        }
    });
});

$(document).on("click", "#mail-error-detail", function () {
    $("#test-main-error-message").show();
});

function testMailTrigger() {
    if ($("#email-setting-form").valid()) {
        var createDialogId = document.createElement("div");
        createDialogId.setAttribute("id", "test-mail-dialog");
        var element = document.getElementById("content-area");
        element.appendChild(createDialogId);

        var authenticationType = parseInt($("#authentication-type input[type='radio']:checked").val());

        var mailSettingsData = {
            MailSettingsAddress: $("#mail-user-name").val(),
            MailSettingsAuthType: authenticationType,
            MailSettingsUserName: authenticationType === 1 ? $("#sender-user-name").val() : "",
            MailSettingsPassword: authenticationType === 1 ? $("#mail-password").val() : "",
            MailSettingsHost: $("#smtp-address").val(),
            MailSettingsSenderName: $("#mail-display-name").val(),
            MailSettingsPort: parseInt($("#port-number").val()),
            MailSettingsIsSecureAuthentication: $("#secure-mail-authentication").is(":checked")
        };

        var testMailDialogobj = new ejs.popups.Dialog({
            header: "Send Test Email",
            showCloseIcon: true,
            content: document.getElementById("test-mail-box"),
            buttons: [
                {
                    'click': function (e) {
                        if ($("#test-mail-form").valid()) {
                            $.ajax({
                                type: "POST",
                                url: sentTestMail,
                                data: { email: $("#test-mail").val(), mailSettingsData: JSON.stringify(mailSettingsData) },
                                beforeSend: showWaitingPopup($("#server-app-container")),
                                success: function (result) {
                                    hideWaitingPopup($("#server-app-container"));
                                    if (result.Status) {
                                        $("#test-mail").val("");
                                        $(".success-box").show();
                                        $("#test-mail-dialog .e-footer-content").find("button").hide();
                                        $("#test-mail-dialog .e-footer-content").find("button").last().show();
                                        $(".e-footer-content").css("text-align", "center");
                                        $(".test-mail-info, #test-mail-form").hide();
                                    }
                                    else {
                                        $("#test-mail").parent().addClass("e-error");
                                        $("#test-mail-validate").css("display", "block");
                                        $("#test-mail-validate").html(window.TM.App.LocalizationContent.MailSendFailureMessage1 + '<a id="mail-error-detail">' + window.TM.App.LocalizationContent.MailSendFailureMessage2 + '</a>');
                                        $("#test-main-error-message").val(result.Data);
                                    }
                                }
                            });
                        }
                    },
                    buttonModel: {
                        isPrimary: true,
                        content: window.TM.App.LocalizationContent.SendButton
                    }
                },
                {
                    'click': function () {
                        testMailDialogobj.hide();
                        $("#test-mail").val("");
                    },
                    buttonModel: {
                        content: window.TM.App.LocalizationContent.CancelButton
                    }
                },
                {
                    'click': function () {
                        testMailDialogobj.hide();
                        $("#test-mail").val("");
                    },
                    buttonModel: {
                        content: window.TM.App.LocalizationContent.DoneButton
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