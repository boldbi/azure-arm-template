var publishInfoDialogObj = "";
var publishHistoryDialogObj = "";
var publishFailureStatusInfo = "";
var publishedItemRemoveDialog = "";

$(document).ready(function () {
    $("#PublishItemGrid").ejGrid({
        dataSource: window.publishedItemDetails,
        gridLines: ej.Grid.GridLines.None,
        allowSorting: true,
        allowPaging: true,
        allowGrouping: true,
        allowSearching: true,
        allowSelection: true,
        allowFiltering: true,
        filterSettings: { filterType: "menu" },
        groupSettings: { groupedColumns: ['ItemName'], captionFormat: "#grouping-synchronize-template" },
        pageSettings: { pageSize: 20 },
        enableRowHover: true,
        enableAltRow: false,
        toolbarSettings: { showToolbar: false, toolbarItems: [ej.Grid.ToolBarItems.Search] },
        searchSettings: { fields: ["TenantName", "ItemName", "Dashboard", "Status", "LastUpdatedDateString"], key: "", ignoreCase: false },
        columns: [
            { field: 'ItemName', headerText: window.Server.App.LocalizationContent.PublishedItemName, width: 100, allowFiltering: true, allowSorting: true, allowGrouping: true },
            { field: 'TenantName', headerText: window.Server.App.LocalizationContent.PublishedItemSiteName, width: 60, allowFiltering: true, allowSorting: true, allowGrouping: true },
            { field: 'Dashboard', headerText: window.Server.App.LocalizationContent.PublishedItemDashboard, templateID: '#dashboard-template', width: 80, allowFiltering: false, allowSorting: true, allowGrouping: false },
            { field: 'LastUpdatedDateString', headerText: window.Server.App.LocalizationContent.PublishedItemLastPublished, width: 70, allowFiltering: false, allowSorting: true, allowGrouping: false },
            { field: 'PublishType', headerText: window.Server.App.LocalizationContent.PublishedItemSiteType, width: 40, allowFiltering: false, allowSorting: true, allowGrouping: false },
            { field: 'Status', headerText: window.Server.App.LocalizationContent.PublishedItemStatus, templateID: '#status-template', width: 40, allowFiltering: false, allowSorting: false, allowGrouping: true },
            { field: 'Option', headerText: window.Server.App.LocalizationContent.PublishedItemAction, width: 30, template: true, templateID: '#options', allowFiltering: false, allowSorting: false, allowGrouping: false }
        ],
        actionComplete: function (args) {
            onSynchronizeClick(args.model.groupSettings.groupedColumns.length);
            $("#PublishItemGrid .e-gridcontent .emptyrecord").html(window.Server.App.LocalizationContent.SynchronizeEmpty);
        }
    });

    publishHistoryDialogObj = new ejs.popups.Dialog({
        isModal: true,
        closeOnEscape: true,
        width: "900px",
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });

    publishHistoryDialogObj.appendTo("#PublishHistoryContainer");

    publishFailureStatusInfo = new ejs.popups.Dialog({
        isModal: true,
        closeOnEscape: true,
        width: '500px',
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });

    publishFailureStatusInfo.appendTo("#PublishFailureStatus");

    publishedItemRemoveDialog = new ejs.popups.Dialog({
        isModal: true,
        closeOnEscape: true,
        width: '500px',
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });

    publishedItemRemoveDialog.appendTo("#publish-remove-container");

});

function onSynchronizeClick(n) {
    if (n > 1) {
        $("#PublishItemGrid .e-gridcontent tr td button").addClass("hide-synchronize");
    } else {
        $("#PublishItemGrid .e-gridcontent tr td button").removeClass("hide-synchronize");
        setTimeout(function () {
            showOrHideSynchronizeButton();
        }, 50);
    }
}

function showOrHideSynchronizeButton() {
    var publishItemGridObj = $("#PublishItemGrid").data("ejGrid");
    for (var i = 0; i < publishedItemDetails.length; i++) {
        var selectedList = publishItemGridObj.getCurrentViewData()[publishItemGridObj.getIndexByRow($($("#PublishItemGrid .e-gridcontent tr.e-row")[i]))];
        if (selectedList !== undefined) {
            $($($("#PublishItemGrid .e-gridcontent tr.e-row")[i]).parent().parent().parent().parent().prev().children()[1]).children().removeClass("hide-synchronize");
        }
    }
}

function onConfirmSynchronizeDialog() {
    var publishItemGridObj = $("#PublishItemGrid").data("ejGrid");
    var selectedList = publishItemGridObj.getCurrentViewData()[publishItemGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))];
    messageBox("su-synchronize", window.Server.App.LocalizationContent.Synchronize, window.Server.App.LocalizationContent.SynchronizeConfirmation, "error", function () {
        synchronizePublishedResource(selectedList.ItemId, selectedList.PublishId, false);
    }, function () {
        onCloseMessageBox();
    });
}

function onConfirmSynchronizeAllDialog(e) {
    var selectedElement = $($($(e.currentTarget).parent().parent().next().children()[1]).children()[0].rows[0]);
    var publishItemGridObj = $("#PublishItemGrid").data("ejGrid");
    var selectedList = publishItemGridObj.getCurrentViewData()[publishItemGridObj.getIndexByRow(selectedElement)];
    messageBox("su-synchronize", window.Server.App.LocalizationContent.Synchronize, window.Server.App.LocalizationContent.SynchronizeConfirmation, "error", function () {
        synchronizePublishedResource(selectedList.ItemId, null, true);
    }, function () {
        onCloseMessageBox();
    });
}

function onCloseMessageBox() {
    parent.$("#messageBox").ejDialog("close");
}

function synchronizePublishedResource(selectedItemId, publishId, isBulk) {
    $.ajax({
        url: synchronizeSitesUrl,
        data: { itemId: selectedItemId, publishId: publishId, isBulkSynchronize: isBulk },
        type: "POST",
        success: function (data) {
            if (data.Status) {
                var gridObj = $("#PublishItemGrid").data("ejGrid");
                gridObj.dataSource(data.Result);
                SuccessAlert(window.Server.App.LocalizationContent.Synchronize, window.Server.App.LocalizationContent.SynchronizeSuccess, 5000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.Synchronize, window.Server.App.LocalizationContent.SynchronizeWarning, 5000);
            }
        }
    });	
    onCloseMessageBox();
}

function publishHistoryDialog() {
    var publishItemGridObj = $("#PublishItemGrid").data("ejGrid");
    var publishHistoryGridObj = $("#PublishHistoryGrid").data("ejGrid");
    publishHistoryGridObj.dataSource(publishItemGridObj.getCurrentViewData()[publishItemGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))].PublishJobHistory); 
    publishHistoryDialogObj.show();
    $("#PublishHistoryContainer").show();
}

function openPublishInfo() {
    var publishItemInfoCtrl = angular.element('[ng-controller=PublishInfoCtrl]').scope();
    var publishItemGridObj = $("#PublishItemGrid").data("ejGrid");
    publishItemInfoCtrl.openItemInfo(publishItemGridObj.getCurrentViewData()[publishItemGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))]);
}

function onFailureStatusClick() {
    setTimeout(function () {
        var publishHistoryGridObj = $("#PublishHistoryGrid").data("ejGrid");
        var jobDetails = publishHistoryGridObj.getCurrentViewData()[publishHistoryGridObj.getIndexByRow($("#PublishHistoryGrid .e-gridcontent tr.e-row[aria-selected *='true']"))];
        publishFailureStatusInfo.show();
        $(".fluent-item-popup-body #PublishFailureStatusMessage").html(jobDetails.StatusMessage);
        $("#PublishFailureStatus").show();
        if ($("#PublishFailureStatusMessage").innerHeight() < 400) {
            $("#PublishFailureStatus .fluent-item-popup-body").addClass("failure-status-dialog-scolling");
        } else {
            $("#PublishFailureStatus .fluent-item-popup-body").removeClass("failure-status-dialog-scolling");
        }
    }, 50);
}

$(document).on("click", "#PublishHistoryContainer .popup-close, #PublishHistoryContainer #close-button", function () {
    publishHistoryDialogObj.hide();
});

function closeFailureInfo() {
    publishFailureStatusInfo.hide();
}

function showRemoveConfirmation() {
    publishedItemRemoveDialog.show();
}

function hideRemoveConfirmation() {
    publishedItemRemoveDialog.hide();
}

function removePublishedItem() {
    var publishItemGridObj = $("#PublishItemGrid").data("ejGrid");
    var selectedList = publishItemGridObj.getCurrentViewData()[publishItemGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))];
    $.ajax({
        url: removePublishedItemUrl,
        data: { publishId: selectedList.PublishId },
        type: "POST",
        success: function (data) {
            if (data.Status) {
                var gridObj = $("#PublishItemGrid").data("ejGrid");
                gridObj.dataSource(data.Result);
                SuccessAlert(window.Server.App.LocalizationContent.RemovePublishedItem, window.Server.App.LocalizationContent.RemovePublishedItemSuccess, 5000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.RemovePublishedItem, window.Server.App.LocalizationContent.RemovePublishedItemWarning, 5000);
            }
        }
    });
    hideRemoveConfirmation();
}