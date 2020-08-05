$(document).on("ready", function () {
    $("#update-data-source-popup").ejDialog({
        width: "760px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        title: window.Server.App.LocalizationContent.UpdateDataSource,
        enableModal: true,
        showHeader: false
    });

    var updateDataSourceWaitingPopupTemplateId = createLoader("update-data-source-popup_wrapper");
    $("#update-data-source-popup_wrapper").ejWaitingPopup({ template: $("#" + updateDataSourceWaitingPopupTemplateId) });
});

function UpdateDashboardDataSource(itemId) {
    $("#update-data-source-popup").ejDialog("open");
    ShowWaitingProgress("#update-data-source-popup_wrapper", "show");
    $("#update-data-source-popup-iframe").attr("src", getDataSourceDetailsUrl + "?itemId=" + itemId);
    $("#update-data-source-popup-iframe").attr("data-item-id", itemId);
    parent.window.IsUpdateDashboard = true;
}