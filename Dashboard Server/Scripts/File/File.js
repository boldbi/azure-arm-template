$(function () {
    addPlacehoder("#search-area");
    $("#edit-files-popup").ejDialog({
        width: "650px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        title: window.Server.App.LocalizationContent.UpdateFile,
        enableModal: true,
        showHeader: false,
        close: "OnEditFileDialogClose",
        closeOnEscape: true,
    });
    var editFilesWaitingPopupTemplateId = createLoader("edit-files-popup_wrapper");
	$("#edit-files-popup_wrapper").ejWaitingPopup({ template:$("#" + editFilesWaitingPopupTemplateId) });

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
    refreshFooterPosition();
});

$(document).on('click', '.item-edit', function () {
    var itemId = $(this).attr("data-item-id");
    $("#edit-files-popup").ejDialog("open");
    ShowWaitingProgress("#edit-files-popup_wrapper", "show");
    $("#edit-files-popup-iframe").attr("src", editFilePopupUrl + "?itemId=" + itemId);
});


function editFilePopup(Id, Name, Description) {
    $("#edit-files-popup").ejDialog("open");
    var iframe = $("#EditCategoryPopup_iframe").contents();
    iframe.find("#file_name").val(Name);
    iframe.find("#file-description").val(Description);
}

function OnEditFileDialogClose() {
    $("#edit-files-popup").find("iframe").contents().find("html").html("");
}

$(document).on("click", ".items", function () {
    $(".e-waitpopup-pane").css("display", "none");
});

function refreshFooterPosition(height) {
    var docHeight = $(window).height();
    var footerHeight = $("#base_footer_Div").height();
    $("#base_footer_Div").css("margin-top", "0");
    var footerTop = 322 + footerHeight;
    if (footerTop < docHeight) {
        $("#base_footer_Div").css("margin-top", (docHeight - footerTop - 40) + "px");
    }
}