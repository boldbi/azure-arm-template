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
            width: '584px',
            height:"350px",
            animationSettings: { effect: 'Zoom' },
            zIndex: 4
        });

        siteDownAlertDialogobj.appendTo('#site-down-alert');

        siteDownAlertDialogobj.show();

        function showAlertContent() {
            $("#site-down-alert-content").show();
        }
    }
});