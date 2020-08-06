$(document).ready(function () {
    $("#create-connection-popup").ejDialog({
        width: $(window).width(),
        height: $(window).height(),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "onCreateConnectionDialogClose",
        closeOnEscape: true,
        beforeClose: function (args) {
            parent.$("#create-connection-popup").ejWaitingPopup("hide");
            $("#create-connection-popup").addClass("display-none");
        }
    });

    $(document).on("click", "#create-datasource-connection, .create-datasource-connection", function (e) {
        var createConnectionWaitingPopupTemplateId = createLoader("#create-connection-popup");
        $("#create-connection-popup").ejWaitingPopup({ template: $("#" + createConnectionWaitingPopupTemplateId) });

        if (window.datasourceQueryString != null && window.datasourceQueryString != undefined && window.datasourceQueryString != "") {
            $("#create-connection-iframe").attr("src", createDatasourceIframeUrl + "?" + window.datasourceQueryString);
        }
        else {
            $("#create-connection-iframe").attr("src", createDatasourceIframeUrl);
        }
        $("#connection-header").addClass("display-none");
        $("#create-connection-popup").removeClass("display-none");
        $("#create-connection-popup").ejDialog("open");
        $("#create-connection-popup_wrapper #create-connection-popup #create-connection-iframe").css("height", $(window).height() - 44);
        $("#create-connection-popup").ejWaitingPopup("show");
    });
});

function onCreateConnectionDialogClose() {
    $("#create-connection-popup").ejDialog("close");
}