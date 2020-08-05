var cookieName = "syncfusion.dashboards.designer.tour";
var filterContent = '';
var saveContent = '';

var tour = new Tour({
    name: "designerTour",
    steps: [
        {
            element: "#dashboardDesigner_itemPanelContainer",
            content: $("#tour-div-2").html()
        },
        {
            element: "#dashboardDesigner_toolbar_li_Filter",
            content: $("#tour-div-4").html(),
            placement: 'bottom',
            onShow: function (tour) {
                filterContent = $("#dashboardDesigner_toolbar_li_Filter").attr("data-content");
                $("#dashboardDesigner_toolbar_li_Filter").removeAttr("data-content");
            },
            onHide: function (tour) {
                $("#dashboardDesigner_toolbar_li_Filter").attr("data-content", filterContent);
            }
        },
        {
            element: "#dashboardDesigner_div_publish_btn",
            content: $("#tour-div-6").html(),
            placement: 'bottom',
            onShow: function (tour) {
                saveContent = $("#dashboardDesigner_div_publish_btn").attr("data-content");
                $("#dashboardDesigner_div_publish_btn").removeAttr("data-content");
            },
            onHide: function (tour) {
                $("#dashboardDesigner_div_publish_btn").attr("data-content", saveContent);
            }
        },
        {
            element: "#dashboardDesigner_previewButton",
            content: $("#tour-div-5").html(),
            placement: 'bottom',
            backdropPadding: { top: 2, left: 2, right: 4, bottom: 4 }
        },
        {
            element: "#dashboardDesigner_Properties_wrapper",
            content: $("#tour-div-3").html(),
            placement: 'left'
        },
        {
            element: "#dashboardDesigner_DataSource_wrapper",
            content: $("#tour-div-1").html(),
            placement: 'left'
        }, 
    ],
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
        $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", ej.getMaxZindex() + 1);
    },
    onHidden: function (tour) {
        onTourStepHidden(tour);
    }
});

var datasourceTour = new Tour({
    name: "datasourceTour",
    steps: [
        {
            element: "#dashboardDesigner_DataSource_wrapper",
            content: $("#datasource-tour-div").html(),
            placement: 'left'
        }
    ],
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
        $(".popover.tour, .tour-backdrop, .tour-step-backdrop-parent").css("z-index", ej.getMaxZindex() + 1);
    },
    onHidden: function (tour) {
        onTourStepHidden(tour);
    }
});

$(document).on("click", ".add-datasource-button", function () {
    datasourceTour.end();
    $("#dashboardDesigner_DataSource_wrapper").click();
});