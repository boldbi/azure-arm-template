var ScheduleId, ItemId, ItemName, CategoryName, MultiDashboardName;

$(document).ready(function () {
    $("#popup-container").ejDialog({
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        showOnInit: false,
        close: "onSchedulerDialogClose",
        open: "onSchedulerDialogOpen",
        width: "1000px"
    });

    var popupContainerWaitingPopupTemplateId = createLoader("popup-container_wrapper");
    $("#popup-container_wrapper").ejWaitingPopup({ template: $("#" + popupContainerWaitingPopupTemplateId) });
});

function ScheduleDashboard(itemDetail) {
    ItemId = itemDetail.Id;
    ItemName = itemDetail.Name;
    CategoryName = itemDetail.CategoryName;
    CategoryId = itemDetail.CategoryId;
    ScheduleId = "";
    MultiDashboardName = itemDetail.IsMultiDashboard ? itemDetail.CategoryName : "";
    $("#popup-container").ejDialog("open");
}

$(document).on("click", "#create_schedule, .create-schedule", function () {
    ItemId = "";
    ItemName = "";
    CategoryName = "";
    ScheduleId = "";
    CategoryId = "";
    MultiDashboardName = $(this).attr("data-multidashboard-name");;
    $("#popup-container").ejDialog("open");
});

function onSchedulerDialogClose() {
    $("#popup-container").find("iframe").contents().find("html").html("");
}

function onSchedulerDialogOpen() {
    $("#scheduler-popup-iframe").attr("src", schedulerIframeUrl + "?itemName=" + ItemName + "&&itemId=" + ItemId + "&&categoryName=" + CategoryName + "&&categoryId=" + CategoryId + "&&scheduleId=" + ScheduleId + "&&multiDashboardName=" + MultiDashboardName + "&&actionType=Create");
    $("#popup-container_wrapper").ejWaitingPopup("show");
}