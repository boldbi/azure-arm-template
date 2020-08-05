
var dashboardDialogHeight = "306px";
var dashboardDialogWidth = "450px";
var widgetDialogHeight = "340px";
var widgetDialogWidth = "400px";


$("#pin-widget-popup").ejDialog({
    width: widgetDialogWidth,
    height: widgetDialogHeight,
    showOnInit: false,
    allowDraggable: true,
    enableResize: false,
    title: "[[[Pin Item to the Homepage]]]",
    enableModal: true,
    showHeader: false
});
var pinWidgeWaitingPopupTemplateId = createLoader("pin-widget-popup_wrapper");
$("#pin-widget-popup_wrapper").ejWaitingPopup({ template: $("#" + pinWidgeWaitingPopupTemplateId) });

$("#dashboard-homepage-popup").ejDialog({
    width: dashboardDialogWidth,
    height: dashboardDialogHeight,
    showOnInit: false,
    allowDraggable: true,
    enableResize: false,
    title: "Set Dashboard as Homepage",
    enableModal: true,
    showHeader: false
});
var dashboardHomepageWaitingPopupTemplateId = createLoader("dashboard-homepage-popup_wrapper");
$("#dashboard-homepage-popup_wrapper").ejWaitingPopup({ template: $("#" + dashboardHomepageWaitingPopupTemplateId) });
