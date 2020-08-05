$(function () {
    $("#make_item_public").ejDialog({
        width: (window.innerWidth > 460) ? "450px" : (window.innerWidth - 10),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.MakePublic,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: "onMakePublicDialogClose",
        open: "onMakePublicDialogOpen"
    });

    $("#remove_item_public").ejDialog({
        width: (window.innerWidth > 460) ? "450px" : (window.innerWidth - 10),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.RemovePublic,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: "onRemovePublicDialogClose",
        open: "onRemovePublicDialogOpen"
    });

    var makeItemPuplicWaitingPopupTemplateId = createLoader("make_item_public_wrapper");
    $("#make_item_public_wrapper").ejWaitingPopup({ template: $("#" + makeItemPuplicWaitingPopupTemplateId) });

    var removeItemPublicWaitingPopupTemplateId = createLoader("remove_item_public_wrapper");
    $("#remove_item_public_wrapper").ejWaitingPopup({ template: $("#" + removeItemPublicWaitingPopupTemplateId) });
});

function makePublic(itemDetail) {
    $("#item_name").html(itemDetail.Name);
    var itemUrl = getDashboardShareLink(itemDetail.Id, itemDetail.CategoryName, itemDetail.Name);
    $("#make_item_public").ejDialog("open");
    $("#make_item_public_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: makePublicUrl,
        data: { itemId: itemDetail.Id, itemTypeId: itemDetail.ItemType, itemName: itemDetail.Name },
        success: function (data) {
            $("#make_item_public").html(data);
            $("#make_item_public_wrapper").ejWaitingPopup("hide");
            $("#make-public").attr("data-itemtype", itemDetail.ItemType);
            $("#make-public").attr("data-url", itemUrl);
        }
    });
}

$(document).on("click", "#make-public", function (e) {
    $("#item_name").html($(this).attr("data-name"));
    itemUrl = $(this).attr("data-url");
    var itemId = $(this).attr("data-item-id");
    var itemName = $(this).attr("data-name");
    var itemTypeId = $(this).attr("data-itemtype");
    var itemType = $(this).attr("data-item-type").trim();
    $("#make_item_public_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: makeItemPublicUrl,
        data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName },
        success: function (data) {
            if (data.validation && data.result) {
                onMakePublicDialogClose();
                onGetLinkDialogOpen();
                $(".report-name").html(itemName);
                $(".report-name").attr("title", itemName);
                $("." + itemType.toLowerCase() + "-link").show();
                $(".private-note").hide();
                $(".public-note").show();
                ResetItemList(ItemType.Dashboard);
            } else {
                $("#makepublicitem").hide();
                $("#select-area").hide();
                $("#close").show();
                $(".error-msg").show();
            }
            $("#make_item_public_wrapper").ejWaitingPopup("hide");
        }
    });
});

function makePrivate(itemDetail) {
    $("#item_name").html(itemDetail.Name);
    $("#remove_item_public").ejDialog("open");
    $("#remove_item_public_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: removePublicUrl,
        data: { itemId: itemDetail.Id, itemTypeId: itemDetail.ItemType, itemName: itemDetail.Name },
        success: function (data) {
            $("#remove_item_public").html(data);
            $("#remove_item_public_wrapper").ejWaitingPopup("hide");
            $("#remove-public").attr("data-itemtype", itemDetail.ItemType);
        }
    });
};

$(document).on("click", "#remove-public", function (e) {
    $("#item_name").html($(this).attr("data-name"));
    var itemId = $(this).attr("data-item-id");
    var itemName = $(this).attr("data-name");
    var itemTypeId = $(this).attr("data-itemtype");
    $("#remove_item_public_wrapper").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: removeItemPublicUrl,
        data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName },
        success: function (data) {
            if (data.validation && data.result) {
                $("#removepublicitem").hide();
                $("#remove-select-area").hide();
                $("#remove-close").show();
                $("#success-msg").show();
                ResetItemList(ItemType.Dashboard);
            } else {
                $("#removepublicitem").hide();
                $("#remove-select-area").hide();
                $("#success-msg").hide();
                $("#remove-close").show();
                $("#error-msg").show();
            }
            $("#remove_item_public_wrapper").ejWaitingPopup("hide");
        }
    });
});


function onMakePublicDialogClose() {
    $("#make_item_public").ejDialog("close");
}

function onMakePublicDialogOpen() {
    load();
    $("#make_item_public").ejDialog("open");
    $('#make_item_public').focus();
}

function onRemovePublicDialogClose() {
    $("#remove_item_public").ejDialog("close");
}

function onRemovePublicDialogOpen() {
    load();
    $("#remove_item_public").ejDialog("open");
    $('#remove_item_public').focus();
}