$(function () {
    $("#ItemAction").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "525px",
        title: "",
        showHeader: false,
        enableModal: true,
        close: "itemActionEmpty",
        closeOnEscape: true
    });

    var itemActionWaitingPopupTemplateId = createLoader("ItemAction_wrapper");
    $("#ItemAction_wrapper").ejWaitingPopup({ template: $("#" + itemActionWaitingPopupTemplateId) });
});

function MoveDashboardItem(itemDetail, action) {
    $("#ItemAction").ejDialog("open");
    $("#ItemAction_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: moveIframeUrl,
        data: { itemId: itemDetail.Id, itemAction: action },
        success: function (data) {
            $("#ItemAction").html(data);
            $("#ItemAction_wrapper .e-dialog-scroller").attr("style", "overflow:inherit; border:none");
            $("#ItemAction_wrapper").ejWaitingPopup("hide");
        }
    });
}

function CopyDashboardItem(itemDetail, action) {
    var itemId = $(this).attr("data-itemId");
    $("#ItemAction").ejDialog("open");
    $("#ItemAction_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: copyIframeUrl,
        data: { itemId: itemDetail.Id, itemAction: action },
        success: function (data) {
            $("#ItemAction").html(data);
            $("#ItemAction_wrapper .e-dialog-scroller").attr("style", "overflow:inherit;border:none");
            $("#ItemAction_wrapper").ejWaitingPopup("hide");
        }
    });
}