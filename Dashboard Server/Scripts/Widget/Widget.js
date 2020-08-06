$(function () {
    $("#widget_edit_popup").ejDialog({
        width: "651px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "OnEditFileDialogClose",
        closeOnEscape: true
    });
    var widgetEditWaitingPopupTemplateId = createLoader("widget_edit_popup_wrapper");
	$("#widget_edit_popup_wrapper").ejWaitingPopup({ template:$("#" + widgetEditWaitingPopupTemplateId) });
    $(window).resize(function () {
        var gridObj = $("#items").data("ejGrid");
        (window.innerWidth < 1200) ? gridObj.hideColumns("Owner") : gridObj.showColumns("Owner");
    });
    $.ajax({
        type: "Get",
        url: getLinkDialogViewUrl,
        success: function (data) {
            $("body").append(data);
            $("#get_item_link").ejDialog({
                width: (window.innerWidth > 460) ? "450px" : (window.innerWidth - 10),
                showOnInit: false,
                allowDraggable: false,
                enableResize: false,
                height: "auto",
                title: window.Server.App.LocalizationContent.GetLink,
                showHeader: false,
                enableModal: true,
                closeOnEscape: true,
                close: "onGetLinkDialogClose"
            });
            var getItemLinkWaitingPopupTemplateId = createLoader("get_item_link_wrapper");
            $("#get_item_link_wrapper").ejWaitingPopup({ template: $("#" + getItemLinkWaitingPopupTemplateId) });
        }
    });
});

$(document).on("click", ".item-edit", function () {
    var itemId = $(this).attr("data-item-id");
    $("#widget_edit_popup").ejDialog("open");
    $("#widget_edit_popup_wrapper").ejWaitingPopup("show");
    $("#widget_edit_popup_iframe").attr("src", getwidgetDetailsUrl + "?itemId=" + itemId);
});

function OnEditFileDialogClose() {
    $("#datasource_edit_popup").ejDialog("close");
}