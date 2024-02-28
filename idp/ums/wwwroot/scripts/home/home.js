$(document).ready(function () {
    generateProfileAvatar();
    if (isShowAlert.toLowerCase() == "true") {

        var siteDownAlertDialogobj = new ejs.popups.Dialog({
            content: document.getElementById("site-down-alert-content"),
            isModal: true,
            beforeOpen: showAlertContent,
            showCloseIcon: true,
            closeOnEscape: false,
            visible: false,
            width: '472px',
            height:"auto",
            animationSettings: { effect: 'Zoom' },
            zIndex: 4
        });

        siteDownAlertDialogobj.appendTo('#site-down-alert');

        siteDownAlertDialogobj.show();

        function showAlertContent() {
            $("#site-down-alert-content").show();
        }
    }


    $('#boldbi-logo')
        .on("error", function () {
            $(this).attr("src", defaultErrorImageSrc);
        });

});

$('body').on('click', 'a', function () {
    if (enableSameTabLinkTarget && $(this).attr('href') !== undefined && !($(this).attr("href").includes("redirect.boldbi.com"))) {
        $(this).attr("target", "_self");
    }
});