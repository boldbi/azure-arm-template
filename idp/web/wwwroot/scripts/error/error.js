$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(document).on("click", "#deploy-error-copy", function (e) {
        var copyErrorMsgObj = $("#deploy-error-copy");
        var errorMsgInputObj = $("#deploy-error-box");
        errorMsgInputObj.prop("disabled", false);
        errorMsgInputObj.select();
        if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
            copyErrorMsgObj.removeClass("su su-copy");
            copyErrorMsgObj.attr("data-original-title", "");
        }
        else {
            document.execCommand('copy');
            copyErrorMsgObj.attr("data-original-title",window.Server.App.LocalizationContent.Copied);
            copyErrorMsgObj.tooltip("hide").attr("data-original-title",window.Server.App.LocalizationContent.Copied).tooltip("fixTitle").tooltip("show");
            errorMsgInputObj.prop("disabled", true);
            setTimeout(function () { copyErrorMsgObj.attr("data-original-title",window.Server.App.LocalizationContent.LinkCopy); copyErrorMsgObj.tooltip(); }, 3000);
        }
    });

    $(document).on("focusin", "#deploy-error-box", function () {
        var copyErrorMsgObj = $("#deploy-error-copy");
        copyErrorMsgObj.addClass("focusdiv");
    });

    $(document).on("focusout", "#deploy-error-box", function () {
        var copyErrorMsgObj = $("#deploy-error-copy");
        copyErrorMsgObj.removeClass("focusdiv");
    });
});