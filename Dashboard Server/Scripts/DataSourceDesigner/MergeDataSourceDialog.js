$(document).ready(function () {
    $("#create-merge-datasource-popup").ejDialog({
        width: $(window).width(),
        height: $(window).height(),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "onCreateMergeDatasourceModeDialogClose",
        closeOnEscape: true,
        beforeClose: function (args) {
            parent.$("#create-merge-datasource-popup").ejWaitingPopup("hide");
            $("#create-merge-datasource-popup").addClass("display-none");
        }
    });

    $(document).on("click", "#merge-datasource", function (e) {
        var createMergrDatasourceWaitingPopupTemplateId = createLoader("#create-merge-datasource-popup");
        $("#create-merge-datasource-popup").ejWaitingPopup({ template: $("#" + createMergrDatasourceWaitingPopupTemplateId) });
        $("#create-merge-datasource-iframe").attr("src", mergeDatasourceIframeUrl);

        $("#connection-header").addClass("display-none");
        $("#create-merge-datasource-popup").removeClass("display-none");
        $("#create-merge-datasource-popup").ejDialog("open");
        $("#create-merge-datasource-popup_wrapper #create-merge-datasource-popup #create-merge-datasource-iframe").css("height", $(window).height() - 44);
        $("#create-merge-datasource-popup").ejWaitingPopup("show");
    });
});