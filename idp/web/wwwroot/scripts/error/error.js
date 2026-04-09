$(document).ready(function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    $(document).on("click", "#deploy-error-copy", function (e) {
        var copyErrorMsgObj = $("#deploy-error-copy");
        var errorMsgInputObj = $("#deploy-error-box");
        errorMsgInputObj.prop("disabled", false);
        errorMsgInputObj.select();
        if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
            copyErrorMsgObj.removeClass("su su-copy");
            copyErrorMsgObj.attr("data-bs-original-title", "");
        }
        else {
            document.execCommand('copy');
            copyErrorMsgObj.attr("data-bs-original-title",window.Server.App.LocalizationContent.Copied);
            var oldTooltip = bootstrap.Tooltip.getInstance(copyErrorMsgObj);
            oldTooltip.dispose();
            var tooltip = new bootstrap.Tooltip(copyErrorMsgObj);
            errorMsgInputObj.prop("disabled", true);
            setTimeout(function () {
                copyErrorMsgObj.attr("data-bs-original-title", window.Server.App.LocalizationContent.ClickToCopy);
                tooltip.dispose();
                var newTooltip = new bootstrap.Tooltip(copyErrorMsgObj);
            }, 3000);
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