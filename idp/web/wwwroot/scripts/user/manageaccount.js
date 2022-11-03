$(document).ready(function () {
    $("#download-data-action-popup").ejDialog({
        width: "476px",
        height: "290px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        title: window.Server.App.LocalizationContent.DownloadData,
        enableModal: true,
        showHeader: false
    });

    var bodyWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + bodyWaitingPopupTemplateId) });
    var downloadDataActionWaitingPopupTemplateId = createLoader("download-data-action-popup_wrapper");
    $("#download-data-action-popup_wrapper").ejWaitingPopup({ template: $("#" + downloadDataActionWaitingPopupTemplateId) });

    $("#copy-password").removeClass("focusdiv");
    $("#download-data-password").on("focusin", function () {
        $("#copy-password").addClass("focusdiv");
    });
    $("#download-data-password").on("focusout", function () {
        $("#copy-password").removeClass("focusdiv");
    });
});

function closeDownloadDataActionPopup() {
    $("#download-data-action-popup").ejDialog("close");
}

function PrepareMyData() {
    $("#body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: prepareDataUrl,
        data: {},
        success: function (result) {
            if (result.status) {
                var password = result.Password;
                $("#download-data-action-popup").ejDialog("open");
                $("#download-data-action-popup_wrapper").ejWaitingPopup("show");
                $("#download-data-password").val(password);
                $("#download-data-action-popup_wrapper").ejWaitingPopup("hide");
                downloadUserData(result.FileLink);
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.DownloadData, window.Server.App.LocalizationContent.DownloadDataFailure, 7000);
            }

            $("#body").ejWaitingPopup("hide");
        },
        error: function () {
            $("#body").ejWaitingPopup("hide");
            WarningAlert(window.Server.App.LocalizationContent.DownloadData, window.Server.App.LocalizationContent.DownloadDataFailure, 7000);
        }
    });
}

function downloadUserData(fileName) {
    window.open(downloadDataUrl + "?fileName=" + fileName, "_self");
}

$(document).on("click", "#copy-password", function () {
    var hiddenInput = document.createElement("input");
    hiddenInput.value = $("#download-data-password").val();;
    document.body.appendChild(hiddenInput);
    hiddenInput.select();

    var copyBtn = $("#copy-password");

    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        copyBtn.removeClass("su su-copy").attr("data-original-title", "");
    }
    else {
        document.execCommand("copy");
        document.body.removeChild(hiddenInput);
        copyBtn.tooltip("hide").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("fixTitle").tooltip("show");
        setTimeout(function () {
            copyBtn.attr("data-original-title", window.Server.App.LocalizationContent.PasswordCopy);
            copyBtn.tooltip();
        }, 3000);
    }
});