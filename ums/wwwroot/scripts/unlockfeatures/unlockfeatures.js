var haveCustomDomainAccess, haveWhiteLabelAccess, isSitesPage;
$(document).ready(function () {
    $.extend(ej, Syncfusion);

    var unlockFeatureDialogobj = new ejs.popups.Dialog({
        showCloseIcon: false,
        isModal: true,
        closeOnEscape: false,
        visible: false,
        width: '400px',
        height: '420px',
        animationSettings: { effect: 'Zoom' },
        zIndex: 4
    });

    if (isSitesPage !== undefined && isSitesPage.toLocaleLowerCase() === "true") {
        unlockFeatureDialogobj.target = ".unlock-enterprise-features";
        $(".blur-whitelable-content").addClass("blur-content");
    }

    unlockFeatureDialogobj.appendTo('#unlock-enterprise-features-container');

    if (haveCustomDomainAccess.toLocaleLowerCase() === "false" && haveWhiteLabelAccess.toLocaleLowerCase() === "false" && haveThirdPartyLogins.toLocaleLowerCase() === "false") {
        if (isSitesPage === undefined || isSitesPage.toLocaleLowerCase() === "false") {
            $(".e-dlg-container").css("left", $("#menu-area").width());
            $(".e-dlg-container").css("top", $("#admin-nav").height());
            $("#unlock-enterprise-features-container").css("left", -$("#menu-area").width());
            $("#unlock-enterprise-features-container").css("top", -$("#admin-nav").height());
            $(".blur-whitelable-content").addClass("blur-content");
        }

        unlockFeatureDialogobj.show();
    }
});