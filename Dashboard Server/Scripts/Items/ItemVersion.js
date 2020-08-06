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
        if ($(this).attr("data-item-type") != "2") {
       
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
        }
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
});﻿