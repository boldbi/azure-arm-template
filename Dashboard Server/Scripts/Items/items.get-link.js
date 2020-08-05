var browser = ej.browserInfo();

function intializeGetLinkDialog() {
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
}

function GetLink(itemDetail) {    
    var itemType = itemDetail.ItemType;
    if (itemType == 2) {
        $(".dashboard-link").show();
    }
    else if (itemType == 6) {
        $(".file-link").show();
        $("#compressed-link").prop("checked", true);
    }
    else if (itemType == 8) {
        $(".widget-link").show();
    }
    else {
        $(".link").show();
    }    

    var itemName = itemDetail.Name;
    var itemId = itemDetail.Id;    

    $("#get_item_link").ejDialog("open");
    $("#get_item_link").show();
    $("#get_item_link_wrapper").ejWaitingPopup("show");
    $(".get_link").show();
    if (itemDetail.IsPublic) {
        $(".private-note").hide();
        $(".public-note").show();
    }
    else {
        $(".private-note").show();
        $(".public-note").hide();
    }
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").hide();
        $("#item-link").css({ width: "100%", borderRadius: "4px" });
        $("#item-link-copy").attr("data-original-title", "");
    }
    else {
        $("#item-link-copy").tooltip({
            animation: false
        });
    }
    $(".report-name").html(itemName);
    $(".report-name").attr("title", itemName);
    $("#item-link").val(getDashboardShareLink(itemDetail.Id, itemDetail.CategoryName, itemDetail.Name));

    $("#item-link").select();
    $(".modal-footer .validation-area").css("display", "block");
    $("#get_item_link_wrapper").ejWaitingPopup("hide");
};

$(document).on("click", "#item-link-copy", function (e) {
    $("#item-link").select();
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").attr("data-original-title", "");
    }
    else {
        document.execCommand('copy');
        $("#item-link-copy").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess);
        $("#item-link-copy").tooltip("hide").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("fixTitle").tooltip("show");
        setTimeout(function () { $("#item-link-copy").attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy); $("#item-link-copy").tooltip(); }, 3000);
    }
});

function onGetLinkDialogClose() {
    $("#get_item_link").ejDialog("close");
}

function onGetLinkDialogOpen() {
    $("#get_item_link").ejDialog("open");
    $("#get_item_link").show();
    $('#get_item_link').focus();
    $("#item-link").select();
    $(".get_link").show();
    $("#item-link").val(itemUrl);
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").hide();
        $("#item-link-copy").attr("data-original-title", "");
    }
}

function getDashboardShareLink(dashboardId, categoryName, dashboardName) {
    var baseUrlArray = baseUrl.split('/');
    return encodeURI(baseUrlArray[0] + "//" + baseUrlArray[2] + viewDashboardUrlAction + "/" + dashboardId + "/" + categoryName + "/" + dashboardName);
}