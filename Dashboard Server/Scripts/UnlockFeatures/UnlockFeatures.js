var haveCustomDomainAccess, haveWhiteLabelAccess, isSitesPage;
$(document).ready(function () {
    $.extend(ej, Syncfusion);

    var unlockFeatureDialogobj = new ejs.popups.Dialog({
        showCloseIcon: false,
        isModal: true,
        closeOnEscape: false,
        visible: false,
        width: isEmbedBI && !isSelfHosted ? '802px' : '400px',
        animationSettings: { effect: 'Zoom' },
        overlayClick: overLayClick,
        zIndex: 4
    });

    if (isSitesPage !== undefined && isSitesPage.toLocaleLowerCase() === "true") {
        unlockFeatureDialogobj.target = ".unlock-enterprise-features";
        $(".blur-whitelable-content").addClass("blur-content");
    }

    unlockFeatureDialogobj.appendTo('#unlock-enterprise-features-container');
    $("#contact-sales-success").addClass("display-none");
    $("#unlock-shield-divider").addClass("display-none");

    if (haveCustomDomainAccess.toLocaleLowerCase() === "false" && haveWhiteLabelAccess.toLocaleLowerCase() === "false" && haveThirdPartyLogins.toLocaleLowerCase() === "false" || !isEmbedBI) {
        if (isSitesPage == undefined || isSitesPage.toLocaleLowerCase() === "false") {
            $(".e-dlg-container").css("left", $("#menu-area").width());
            $(".e-dlg-container").css("top", $("#admin-nav").height() + 10);
            $("#unlock-enterprise-features-container").css("left", -$("#menu-area").width());
            $("#unlock-enterprise-features-container").css("top", -$("#admin-nav").height() + 10);
        }

        unlockFeatureDialogobj.show();
    }

    $(document).on("click", "#contact-sales-team", function () {
        $("#contact-sales-team").addClass("display-none");
        $("#feature-paragraph-content").addClass("display-none");
        $("#contact-sales-success").removeClass("display-none");
        $("#unlock-shield-divider").removeClass("display-none");

        $.ajax({
            type: "POST",
            url: contactSalesTeamUrl
        });
    });

    function overLayClick(arg) {
        if ($(".create-menu-open").length > 0) {
            $("#unlock-enterprise-features-container").removeClass("blur-content");
            collapseCreateMenu();
        }

        if ($(".user-notification-open").length > 0) {
            $("#unlock-enterprise-features-container").removeClass("blur-content");
            closeUserNotification();
        }
    }

    $(document).on("click", "#unlock-enterprise-features-container", function () {
        if ($(".create-menu-open").length > 0) {
            $("#unlock-enterprise-features-container").removeClass("blur-content");
            collapseCreateMenu();
        }

        if ($(".user-notification-open").length > 0) {
            $("#unlock-enterprise-features-container").removeClass("blur-content");
            closeUserNotification();
        }
    });
});