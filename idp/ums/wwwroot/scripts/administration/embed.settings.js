﻿//Get Link
var getLinkInputObj = "";
var getLinkCopyLinkobj = "";
var isChrome = navigator.userAgent.indexOf("Chrome") != -1;

$(function () {
    var getLinkInputObj = $("#secret-code");
    var getLinkCopyLinkobj = $("#secret-code-copy");
    if (!$("#restrict-embed-enabled").is(":checked")) {
        $("#import-validation-msg").html("");
    }

    if (!embedEnabled) {
        $("#trigger-file").attr("disabled", "disabled");
        $("#filename").attr("disabled", "disabled");
    }

    $(document).ready(function () {
        getLinkCopyLinkobj.tooltip("enable").attr("data-bs-original-title", window.Server.App.LocalizationContent.LinkCopy$).attr("title", window.Server.App.LocalizationContent.LinkCopy$).tooltip("enable");
    })

    $(document).on('click', '#restrict-embed-enabled', function () {
        var key = "IsEmbedEnabled";
        if ($("#restrict-embed-enabled").is(":checked")) {
            $("#get-embed-code").removeAttr("disabled");
            $("#filename").val(jsonFileName);
            if (getLinkInputObj.val() != "") {
                getLinkInputObj.removeAttr("disabled");
                getLinkCopyLinkobj.removeAttr("disabled");
            }
            var isEmbed = "true";
            $(".download-template").show();
            $("#trigger-file").removeClass("disabled");
            $("#filename").removeAttr("disabled");
            getLinkCopyLinkobj.css("cursor", "pointer");
            getLinkCopyLinkobj.tooltip("enable").attr("data-bs-original-title", window.Server.App.LocalizationContent.LinkCopy$).attr("title", window.Server.App.LocalizationContent.LinkCopy$).tooltip("enable");
        } else {
            $("#get-embed-code").attr("disabled", "disabled");
            $("#filename").val(window.Server.App.LocalizationContent.BrowseJsonFilePath);
            getLinkInputObj.val("");
            $(".secret-code-notification").hide();
            getLinkInputObj.attr("disabled", "disabled");
            getLinkCopyLinkobj.attr("disabled", "disabled");
            getLinkCopyLinkobj.tooltip("disable").attr("data-bs-original-title", window.Server.App.LocalizationContent.LinkCopy$).attr("title", window.Server.App.LocalizationContent.LinkCopy$).tooltip("enable");
            getLinkCopyLinkobj.css("cursor", "default");
            $(".download-template").hide();
            $("#trigger-file").attr("disabled", "disabled");
            $("#cs-upload").attr("disabled", "disabled");
            $("#filename").attr("disabled", "disabled");
            $("#import-validation-msg").html("");
            var isEmbed = "false";
        }
        $("#restrict-embed-enabled").attr("disabled", "disabled");
        $(".embed-loader").removeClass("embed-loading");
        $.ajax({
            type: "POST",
            url: updateSystemSettingsValueUrl,
            data: { systemSettingValue: isEmbed, key: key },
            success: function (data) {
                if (data.status) {
                    $("#restrict-embed-enabled").removeAttr("disabled");
                    $(".embed-loader").addClass("embed-loading");
                    return;
                } else {
                    $("#restrict-embed-enabled").removeAttr("disabled");
                    if ($("#restrict-embed-enabled").is(":checked")) {
                        $("#restrict-embed-enabled").attr("checked", false);
                    }
                    else {
                        $("#restrict-embed-enabled").attr("checked", true);
                    }
                    $(".embed-loader").addClass("embed-loading");
                }
            }
        });
    });

    $(document).on('click', '#restrict-embed-enabled', function () {
        if (!$('#restrict-embed-enabled').is(":checked")) {
            $("#secret-code-copy").attr("disabled", true).tooltip("enable").css("cursor", "pointer");
        }
    });

    $(document).on('click', '#secret-code-copy', function () {
        if ($('#secret-code').val() != '') {
            copyToClipboard('#secret-code', '#secret-code-copy')
        }
    });

    getLinkCopyLinkobj.removeClass("focusdiv");
    getLinkInputObj.on("focusin", function () {
        getLinkCopyLinkobj.addClass("focusdiv");
    });
    getLinkInputObj.on("focusout", function () {
        getLinkCopyLinkobj.removeClass("focusdiv");
    });
});

function getEmbedSecret() {
    if ($("#get-embed-code").html().trim() == window.Server.App.LocalizationContent.ResetHeader) {
        $(".message-content").addClass("messagebox-align");
        if (!isChrome) {
            $(".message-content").css("vertical-align", "initial");
        }
        messageBox("su su-embed", window.Server.App.LocalizationContent.ResetHeader, window.Server.App.LocalizationContent.ResetConfirmationMessage, "error", resetEmbedSecret);
    }
    else {
        $.ajax({
            type: "POST",
            url: isResetEmbedSecretUrl,
            success: function (data) {
                if (data.status) {
                    secretCodeChange(data);
                    $("#get-embed-code").html(window.Server.App.LocalizationContent.ResetHeader);
                    $("#secret-code-copy").removeAttr("disabled");
                }
            }
        });
    }
}

function resetEmbedSecret() {
    onCloseMessageBox();
    showWaitingPopup('body');
    $.ajax({
        type: "POST",
        url: isResetEmbedSecretUrl,
        success: function (data) {
            if (data.status) {
                secretCodeChange(data);
                SuccessAlert(window.Server.App.LocalizationContent.EmbedSettings, window.Server.App.LocalizationContent.ResetSecretSuccessAlert, 7000);
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.EmbedSettings, window.Server.App.LocalizationContent.ResetSecretfailureAlert, data.Message, 7000)
            }
            hideWaitingPopup('body');
        }
    });
}

function secretCodeChange(data) {
    $("#secret-code-copy").tooltip("dispose").attr("data-bs-original-title", window.Server.App.LocalizationContent.LinkCopy$).attr("title", window.Server.App.LocalizationContent.LinkCopy$);
    $("#secret-code").removeAttr("disabled");
    $("#secret-code-copy").removeAttr("disabled");
    $("#secret-code").val(data.resetEmbedSecret);
    $(".secret-code-notification").show();
}

$(document).on("click", "#trigger-file,#filename", function () {
    if ($("#restrict-embed-enabled").is(":checked")) {
        $("#csfile").trigger("click");
        $("#csfile").focus();
    }
});

$(document).on("change", "#csfile", function (e) {
    var value = $(this).val();
    if ($(this).val().substring($(this).val().lastIndexOf('.') + 1) != "json") {
        $("#cs-upload").attr("disabled", true);
        $("#filename").val(window.Server.App.LocalizationContent.JsonFileValidator);
        $("#filename,#trigger-file").addClass("validation-message");
        $(".upload-box").addClass("e-error");
    } else {
        $("#cs-upload").attr("disabled", false);
        $("#filename,#trigger-file").removeClass("validation-message");
        $("#filename").val(value);
        $(".upload-box").removeClass("e-error");
        $('#csfile').attr('title', value);
    }
});

$(document).on("click", "#get-embed-code", function () {
    getEmbedSecret();
});

$(document).on("click", "#secret-code", function () {
    this.setSelectionRange(0, this.value.length);
});

$(document).on("focus", "#filename", function () {
    this.blur()
});
