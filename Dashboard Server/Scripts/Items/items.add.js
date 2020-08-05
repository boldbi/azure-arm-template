$(function () {
    $("#AddCategoryPopup").ejDialog({
        width: "600px",
        height: "250px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true
    });

    $("#report_popup").ejDialog({
        width: "760px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        title: window.Server.App.LocalizationContent.AddDashboard,
        enableModal: true,
        showHeader: false,
        open: "onDashboardDialogOpen"
    });

    $("#sample-item-popup").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "900px",
        title: "",
        beforeOpen: function (args) {
            $("#sample-item-popup_wrapper").css("z-index", "2147483647");
        },
        showHeader: false,
        enableModal: true,
        beforeClose: function (args) {
            $("#itemsstring_ddinput_popup_list_wrapper, #items_acString_suggestion, #items_WaitingPopup, #item-grid-container_WaitingPopup, #sample-item-popup_wrapper, #sample-item-popup_wrapper_WaitingPopup").css("z-index", "9999");
        },
        close: "DialogBoxClose",
        closeOnEscape: true
    });

    var addCategoryWaitingPopupTemplateId = createLoader("AddCategoryPopup_wrapper");
    $("#AddCategoryPopup_wrapper").ejWaitingPopup({ template: $("#" + addCategoryWaitingPopupTemplateId) });

    var reportWaitingPopupTemplateId = createLoader("report_popup_wrapper");
    $("#report_popup_wrapper").ejWaitingPopup({ template: $("#" + reportWaitingPopupTemplateId) });

    var sampleItemWaitingPopupTemplateId = createLoader("sample-item-popup_wrapper");
    $("#sample-item-popup_wrapper").ejWaitingPopup({ template: $("#" + sampleItemWaitingPopupTemplateId) });
}); 

$(document).on("click", ".add-sample-button", function () {
    $("#sample-item-popup iframe").attr("src", addSampleItemsUrl);
    $("#sample-item-popup").ejDialog("open");
    ShowWaitingProgress("#sample-item-popup_wrapper", "show");
});

$(document).on("click", ".explore", function () {
    $("#sample-item-popup iframe").attr("src", addSampleItemsUrl);
    $("#sample-item-popup").ejDialog("open");
    ShowWaitingProgress("#sample-item-popup_wrapper", "show");
});

$(document).on("click", ".dashboard-notification .su-close", function () {
    $(".dashboard-notification").remove();
});

function openNewCategoryPopup() {
    $("#AddCategoryPopup").ejDialog("open");
}

function openNewDashboardPopup() {
    $("#report_popup").ejDialog("open");
    $("#report_popup_wrapper").ejWaitingPopup("show");
}

function onDashboardDialogOpen() {
    $("#report_iframe").attr("src", addDashboardIframeUrl);
}

function onDashboardDialogClose() {
    $("#report_popup").find("iframe").contents().find("html").html("");
    window.IsAddDashboard = false;
    window.CategoryName = "";
}