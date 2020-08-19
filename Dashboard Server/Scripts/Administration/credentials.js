
function fnCopyClientCredentials(inputId, buttonId) {
    if (inputId === "#my-secret") {
        $("#secret-code-message").show();
    } else {
        $("#secret-code-message").hide();
    }
    var copyText = $(inputId);
    copyText.select();
    document.execCommand("copy");
    if (copyText.val() == "") {
        navigator.clipboard.writeText(clientSecret);
    }
    setTimeout(function () {
        $(buttonId).attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess);
        $(buttonId).tooltip('show');
    }, 200);
    setTimeout(function () {
        $(buttonId).attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy);
        $(buttonId).tooltip();
    }, 3000);
}

$(document).on("mousedown", ".show-hide-password", function () {
    $(this).siblings("input").attr('type', 'text');
    $("#my-secret").val(clientSecret);
    $("#secret-code-message").show();
});

$(document).on("mouseup", ".show-hide-password", function () {
    $("#my-secret").val("");
});