$(function () {
    $("#item-delete-confirmation").ejDialog({
        width: "450px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.DeleteItem,
        showHeader: false,
        enableModal: true,
        close: "onDeleteItemDialogClose",
        open: "onDeleteItemDialogOpen"
    });

    var itemDeleteConformationWaitingPopupTemplateId = createLoader("item-delete-confirmation_wrapper");
    $("#item-delete-confirmation_wrapper").ejWaitingPopup({ template: $("#" + itemDeleteConformationWaitingPopupTemplateId) });
});


function DeleteItem(itemDetail) {
    $("#delete-item-name").html(itemDetail.Name);
    $("#delete-item").attr("data-item-id", itemDetail.Id);
    var datasourceType = "";
    if (itemDetail.ItemType == ItemType.Datasource) {
        datasourceType = $(this).attr("data-datasource-type")
    }
    $("#item-delete-confirmation").ejDialog("open");
    $("#item-delete-confirmation_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: deleteConfirmationUrl,
        data: { itemId: itemDetail.Id, itemTypeId: itemDetail.ItemType, itemName: itemDetail.Name, datasourceType: datasourceType },
        success: function (data) {
            $("#item-delete-confirmation").html(data);
            $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
        }
    });
}

$(document).on("click", "#delete-item", function (e) {
    $("#item-delete-confirmation_wrapper").ejWaitingPopup("show");
    var itemId = $(this).attr("data-item-id");
    var itemtype = $(this).attr("data-itemtype");
    var datasourceType = "";
    if (itemtype == "Datasource") {
        datasourceType = $(this).attr("data-datasource-type");
    }
    var type = itemtype == "Category" ? window.Server.App.LocalizationContent.Categoy : itemtype == "Dashboard" ? window.Server.App.LocalizationContent.Dashboard : itemtype;
    $.ajax({
        type: "POST",
        url: deleteItemUrl,
        data: { itemId: itemId, datasourceType: datasourceType },
        success: function (data) {
            if (data.Success) {
                $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
                SuccessAlert(type + window.Server.App.LocalizationContent.Deleted, $("#delete-item-name").html() + window.Server.App.LocalizationContent.DeleteSuccess, 7000);
                if (itemtype == "Dashboard") {
                    if (data.DashboardCount > 0 && data.DashboardCount != undefined) {
                        ResetItemList(ItemType.Dashboard);
                        ResetItemList(ItemType.Category);

                        var iframeUrl = $("#dashboard-rendering-iframe").attr("src");
                        if (typeof (iframeUrl) != "undefined" && iframeUrl.contains(itemId)) {
                            parent.$("#body").ejWaitingPopup("show");
                            location.reload();
                        }
                    }
                    else {
                        parent.$("#body").ejWaitingPopup("show");
                        location.reload();
                    }
                } else if (itemtype == "Category") {
                    ResetItemList(ItemType.Category);
                }
            }
            else if (data.Permission == false) {
                $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
                WarningAlert(window.Server.App.LocalizationContent.DeleteFail, window.Server.App.LocalizationContent.DeletePermissionMessage + $("#delete-item-name").html(), 7000);
            }
            else {
                $("#item-delete-confirmation_wrapper").ejWaitingPopup("hide");
                WarningAlert(window.Server.App.LocalizationContent.DeleteFail, $("#delete-item-name").html() + window.Server.App.LocalizationContent.DeleteFailMessage, 7000);
            }
            $("#item-delete-confirmation").ejDialog("close");
        }
    });
});

function onDeleteItemDialogClose() {
    $("#item-delete-confirmation").ejDialog("close");
}

function onDeleteItemDialogOpen() {
    $("#item-delete-confirmation").ejDialog("open");
    $('#item-delete-confirmation').focus();
}