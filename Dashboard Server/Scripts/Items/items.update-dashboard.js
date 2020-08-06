$(document).on("ready", function () {
    $("#edit-file-popup").ejDialog({
        width: "760px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        title: window.Server.App.LocalizationContent.UpdateDashboard,
        enableModal: true,
        showHeader: false
    });

    var editFileWaitingPopupTemplateId = createLoader("edit-file-popup_wrapper");
    $("#edit-file-popup_wrapper").ejWaitingPopup({ template: $("#" + editFileWaitingPopupTemplateId) });
});

function EditDashboard(itemId) {
    $("#edit-file-popup").ejDialog("open");
    ShowWaitingProgress("#edit-file-popup_wrapper", "show");
    $("#edit-file-popup-iframe").attr("src", getdashboarddetailsUrl + "?itemId=" + itemId);
}

function editFilePopup(Id, Name, Description) {
    $("#edit-file-popup").ejDialog("open");
    var iframe = $("#EditCategoryPopup_iframe").contents();
    iframe.find("#file_name").val(Name);
    iframe.find("#file_description").val(Description);
}

function OnEditFileDialogClose() {
    $("#edit-file-popup").find("iframe").contents().find("html").html("");
    $("#edit-file-popup").ejDialog("close");
}