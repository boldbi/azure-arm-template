$(document).on("click", "#server-mobile-navbar .server-comment", function () {
    if (!$(this).hasClass("active")) {
        $("a.active").removeClass("active");
        $(this).addClass('active');
        if ($("#comment_Type").attr("data-item-type") == "individual-widget") {
            $(".e-dbrd-banner-widget-withoutcomments, .e-dbrd-banner-widget-withcomments").click();
        } else {
            var src = $("#commentModuleContainer iframe").attr("src");
            if (src === undefined || src === "") {
                $("#commentModuleContainer iframe").attr("src", commentPageUrl + "?itemId=" + $("#commentModuleContainer_iframe").attr("data-item-id") + "&userId=" + userId + "&viewer=v2");
            }
            if ($("#commentModuleContainer").hasClass("displayNone")) {
                $("#close-container").trigger("click");
                $("#comment-module-container-loader-icon").show();
                openDashboardComment(null);
            }
            else {
                closeDashboardComment();
            }
        }
        if ($("#is_mobile").val() == "true" && window.innerWidth < 410) {
            $("#dashboard, #widget").hide();
        }
        $("#dashboard-view-toogle").removeClass("dashboard-view-toogle");
    } else {
        showRenderTab();
    }
});

$(document).on("click", "#server-mobile-navbar .su-nav-dashboard, #server-mobile-navbar .su-nav-widgets", function () {
    showRenderTab();
});

$(document).on("click", "#server-mobile-navbar .server-item-view", function (e) {
    if (!$(this).hasClass("active")) {
        $("a.active").removeClass("active");
        $("#dashboard, #widget").show();
        $("#comment_Type").attr("data-item-type") == "individual-widget" ? closeWidgetComment() : closeComment();
        $(this).addClass('active');
        $("li#filters").click();
        $("span.view-heading").css("display", "block");
    } else {
        showRenderTab();
    }
});

$(document).on("click", "#server-mobile-navbar .su-view", function (e) {
    if (!$(this).hasClass("active")) {
        $("a.active").removeClass("active");
        var dashboardViewPanelObj = $("#dashboard-view-toogle");
        if (!dashboardViewPanelObj.hasClass("dashboard-view-toogle")) {
            closeDashboardComment();
            dashboardViewPanelObj.toggleClass("dashboard-view-toogle");
            dashboardViewPanelObj.ejWaitingPopup("show");
            GetSavedFilter();
            $("#dashboard").toggleClass("dashboard");
            $(".view-heading").toggle();
            $("#dashboard-views").toggle();
            if (dashboardViewPanelObj.hasClass("dashboard-view-toogle")) {
                dashboardViewPanelObj.find("#close-container a").css("display", "block");
            }
            else {
                dashboardViewPanelObj.find("#close-container a").css("display", "none");
            }
            refreshScroller();
            dashboardViewPanelObj.find("#saved-list").length == 0 ? dashboardViewPanelObj.find("#no-filters").css("display", "block") : dashboardViewPanelObj.find("#no-filters").css("display", "none");
            dashboardViewPanelObj.ejWaitingPopup("hide");
        }
        else {
            $("#close-container").trigger("click");
        }
    } else {
        showRenderTab();
    }
});

$(document).on("click", "#server-mobile-navbar .su-nav-home", function (e) {
    if (!$(this).hasClass("active")) {
        $("a.active").removeClass("active");
        $(this).addClass('active');
    }
});

function showRenderTab() {
    $("a.active").removeClass("active");
    $(".su-nav-dashboard, .su-nav-widgets").addClass('active');
    $("#dashboard-view-toogle").removeClass("dashboard-view-toogle");
    $("#dashboard, #widget").show();
    $("#comment_Type").attr("data-item-type") == "individual-widget" ? closeWidgetComment() : closeComment();
}

$(document).on("touchend", "[data-toggle='tooltip']", function (e) {
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
        $(this).click();
    }
});

$(document).on("click", "#close-filter", function () {
    $("#filter-view").css("display", "none");

    if ($("#is_mobile").val() == "true") {
        $('#dashboard').show();
        if ($("#server-mobile-navbar .server-item-view").hasClass('active')) {
            $("#server-mobile-navbar a.active").removeClass("active");
            $("#server-mobile-navbar .su-nav-dashboard").addClass('active');
        }
    }

    $(".options").css("right", "0px");
    $(".options li").removeClass("active");
});

$(document).on("click", "#close-container", function () {
    CloseDashboardView();
    if ($("#is_mobile").val() == "true") {
        $('#dashboard').show();
        if ($("#server-mobile-navbar .su-view").hasClass('active')) {
            $("#server-mobile-navbar a.active").removeClass("active");
            $("#server-mobile-navbar .su-nav-dashboard").addClass('active');
        }
    }
    $(".options").css("right", "0px");
    $(".options li").removeClass("active");
});