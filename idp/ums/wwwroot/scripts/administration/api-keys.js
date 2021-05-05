$(function () {
    $('[data-toggle="popover"]').popover();

    $(".show-client-secret").on("click", function () {
        if ($(".my-secret").is(":password")) {
            $(".my-secret").attr('type', 'text').val(clientSecret);
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(".my-secret").attr('type', 'password');
            $(".my-secret").val("");
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
    var copyText = $(inputId);
    copyText.select();
    document.execCommand("copy");
    if (copyText.val() == "") {
        navigator.clipboard.writeText(clientSecret);
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