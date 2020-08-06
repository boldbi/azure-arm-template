var cookieName = "syncfusion.dashboards.server.tour";

var tour = new Tour({
    name: "serverTour",
    steps: [],
    container: "body",
    smartPlacement: true,
    keyboard: true,
    storage: window.localStorage,
    backdrop: true,
    backdropContainer: 'body',
    duration: false,
    delay: false,
    autoscroll: false,
    template: "<div class='popover tour'><div class='popover-content'></div>",
    onEnd: function (tour) {
        $("#backdropFallback").addClass("hide");
    },
    onShown: function (tour) {
        onTourStepShown(tour);
    },
    onHidden: function (tour) {
        onTourStepHidden(tour);
        $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", "");
        $("#itemsstring_ddinput_popup_list_wrapper,#item-grid-container_WaitingPopup, #item-viewer_WaitingPopup, #items_acString_suggestion").css("z-index", "9999");
    }
});

tour.addStep({
    element: "#items-menu",
    content: $("#tour-div-1").html(),
    onShown: function (tour) {
        onTourStepShown(tour);
        $(".tour-step-backdrop-parent").css("width", ($(".tour-step-backdrop-parent").outerWidth() - 1) + "px");
        $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", "2147483647");
    }
});

if (IsDashboardsPage) {
    tour.addStep({
        element: ".item-navigation",
        content: $("#tour-div-2").html(),
        placement: 'bottom',
        backdropPadding: { bottom: 4 },
        onShown: function (tour) {
            onTourStepShown(tour);
            $(".tour-step-backdrop-parent").css("width", ($(".tour-step-backdrop-parent").outerWidth() - 1) + "px");
            $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", "2147483647");
        }
    });
}

if (ShowAdminMenuTour) {
    tour.addStep({
        element: "#administration-menu>.nav-menu-settings",
        content: $("#tour-div-4").html(),
        onShown: function (tour) {
            onTourStepShown(tour);
            $(".tour-step-backdrop-parent").css("bottom", "55px");
            $(".tour-step-backdrop-parent").css("width", ($(".tour-step-backdrop-parent").outerWidth() - 1) + "px");
            $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", "2147483647");
        }
    });

    tour.addStep({
        element: "#administration-menu>.nav-menu-users",
        content: $("#tour-div-5").html(),
        onShown: function (tour) {
            onTourStepShown(tour);
            $(".tour-step-backdrop-parent").css("width", ($(".tour-step-backdrop-parent").outerWidth() - 1) + "px");
            $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", "2147483647");
        }
    });
}

if (ShowCreateMenu) {
    tour.addStep({
        element: "#upload-item-section",
        content: $("#tour-div-3").html(),
        placement: 'bottom',
        onShown: function (tour) {
            onTourStepShown(tour);
            $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", "2147483647");
        }
    });
}