$(document).ready(function () {
    $("#create-data-preview-popup").ejDialog({
        width: $(window).width(),
        height: $(window).height(),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "onCreateDataPreviewModeDialogClose",
        closeOnEscape: true,
        beforeClose: function (args) {
            parent.$("#create-data-preview-popup").ejWaitingPopup("hide");
            $("#create-data-preview-popup").addClass("display-none");
        }
    });

    $(document).on("click", "#item-preview", function (e) {
        var createDataPreviewWaitingPopupTemplateId = createLoader("#create-data-preview-popup");
        $("#create-data-preview-popup").ejWaitingPopup({ template: $("#" + createDataPreviewWaitingPopupTemplateId) });
        var itemId = $(this).attr("data-item-id");
        $("#create-data-preview-iframe").attr("src", dataPreviewIframeUrl + "/" + itemId);

        $("#connection-header").addClass("display-none");
        $("#create-data-preview-popup").removeClass("display-none");
        $("#create-data-preview-popup").ejDialog("open");
        $("#create-data-preview-popup_wrapper #create-data-preview-popup #create-data-preview-iframe").css("height", $(window).height() - 44);
        $("#create-data-preview-popup").ejWaitingPopup("show");
    });
});

function onCreateConnectionDialogClose() {
    $("#create-data-preview-popup").ejDialog("close");
}