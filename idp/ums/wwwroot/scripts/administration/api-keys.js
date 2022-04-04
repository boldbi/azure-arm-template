$(function () {
    $(".show-client-secret").on("click", function () {
        if ($(".my-secret").is(":password")) {
            $(".my-secret").attr('type', 'text').val();
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(".my-secret").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    $(".show-client-secret").bind("touch", function () {
        if ($(".my-secret").is(":password")) {
            $(".my-secret").attr('type', 'text');
            $(this).removeClass('su-show').addClass('su-hide');
        }
        else {
            $(".my-secret").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show');
        }
    });
});

function fnCopyClientCredentials(inputId, buttonId) {
    if (typeof (navigator.clipboard) != 'undefined') {
        var value = $(inputId).val();
        navigator.clipboard.writeText(value)
    }
    else {
        var copyText = $(inputId);
        copyText.attr("type", "text").select();
        document.execCommand("copy");
        if (buttonId == "#api-copy-client-secret" || buttonId == "#copy-client-secret") {
            copyText.attr("type", "password");
        }
    }
    setTimeout(function () {
        $(buttonId).attr("data-original-title", window.TM.App.LocalizationContent.Copied);
        $(buttonId).tooltip('show');
    }, 200);
    setTimeout(function () {
        $(buttonId).attr("data-original-title", window.TM.App.LocalizationContent.ClickToCopy);
        $(buttonId).tooltip();
    }, 3000);
}