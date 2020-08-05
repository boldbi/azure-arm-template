$(document).ready(function () {

    if (($(parent.window).width()) > 1400) {
        $("#version-container").addClass("versions");
    }

    if (($(parent.window).width()) < 1400) {
        $("#version-container").removeClass("versions");
    }

    $(document).on("click", "#version-tab", function (e) {
        $(this).parent("li").addClass("active");
        $("#item-log-tab").parent("li").removeClass("active");
        $("#item-version-container").removeClass("hidden").addClass("show");
        $("#item-log-container").removeClass("show").addClass("hidden");
    });

    $(document).on("click", "#item-log-tab", function (e) {
        $(".down-arrow").css("left", "185px");
        $(this).parent("li").addClass("active");
        $("#version-tab").parent("li").removeClass("active");
        $("#item-version-container").removeClass("show").addClass("hidden");
        $("#item-log-container").removeClass("hidden").addClass("show");
    });

    $(document).on("click", ".version-popup-close", function (e) {
        $("#item-version-controller").css("display", "none");
        eDialog = parent.$("#version-window-container").data("ejDialog");
        eDialog.close();
    });

    $(document).on("click", ".item-roll-back", function (e) {
        var versionId = $(this).attr("data-item-version");
        var itemId = $(this).attr("data-itemid");

        doAjaxPost("POST", rollBackUrl, { ItemId: itemId, versionId: versionId },
            function (data, result) {
                if (result.status) {
                    var gridObj = $("#grid").data("ejGrid");
                    gridObj.refreshContent();
                    var loggridObj = $("#loggrid").data("ejGrid");
                    loggridObj.refreshContent();
                } else {
                    parent.messageBox("su-versions", window.Server.App.LocalizationContent.VersionHistory, result.statusMessage, "success", function () {
                        parent.onCloseMessageBox();
                    });
                }

                $("#loggrid").ejWaitingPopup("hide");
            }, null, null, null, null, null, true);
    });
});


$(document).on("click", "#version-window-container .popup-close, #version-window-container #close-button", function () {
    $("#grid").ejGrid("option", { dataSource: [] });
    $("#loggrid").ejGrid("option", { dataSource: [] });
    window.parent.$("#version-window-container").ejDialog("close");
});

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        var dialogData = parent.$("#version-window-container").data("ejDialog");
        if (dialogData != undefined) {
            window.parent.$("#version-window-container").ejDialog("close");
        }
    }
});

$(document).ready(function () {
    $(".dropdown-toggle").tooltip({ selector: '[data-toggle=tooltip]' });
});

function VersionHistory(itemId, itemName, isMultiTab) {
    var versionGrid = $("#grid").data("ejGrid");
    var logGrid = $("#loggrid").data("ejGrid");
    var hasVersionDialog = $("#version-window-container").data("ejDialog");

    if (hasVersionDialog != null) {
        $("#version-window-container").ejDialog("open");
    }
    else {
        $("#version-window-container").ejDialog({
            showOnInit: true,
            allowDraggable: true,
            enableResize: false,
            width: "900px",
            title: "",
            showHeader: false,
            enableModal: true,
            close: "DialogBoxClose",
            closeOnEscape: true
        });
    }
    $(".modal-header .modal-title").html(itemName);
    $("#version-tab").parent("li").addClass("active");
    $("#item-log-tab").parent("li").removeClass("active");
    $("#item-version-container").removeClass("hidden").addClass("show");
    $("#item-log-container").removeClass("show").addClass("hidden");
    var dataManager_version = ej.DataManager({ url: itemVersionUrl + "?ItemId=" + itemId, adaptor: new ej.UrlAdaptor() });
    versionGrid.dataSource(dataManager_version);
    var dataManager_log = ej.DataManager({ url: itemLogsUrl + "?ItemId=" + itemId, adaptor: new ej.UrlAdaptor() });
    logGrid.dataSource(dataManager_log);

    var gridObj = $("#grid").data("ejGrid");
    if (typeof (isMultiTab) !== "undefined" && isMultiTab) {
        gridObj.hideColumns("option");
    } else {
        gridObj.showColumns("option");
    }
}