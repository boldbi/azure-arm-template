var previousAccountName;
var windowRef;

$(document).ready(function () {
    addPlacehoder("#search-area");

    $("#edit-connected-account-popup").ejDialog({
        width: "auto",
        height: "auto",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        open: "OnEditConnectedAccountOpen",
        close: "OnEditConnectedAccountClose"
    });

    var supportWaitingPopupTemplateId = createLoader("edit-connected-account-popup_wrapper");
    $("#edit-connected-account-popup_wrapper").ejWaitingPopup({ template: $("#" + supportWaitingPopupTemplateId) });

});

$(document).on("keyup", "#edit-connected-account-name", function (e) {
    var accountName = $("#edit-connected-account-name").val().trim();
    if (accountName != previousAccountName && accountName != "") {
        $("#submit-edit-account").removeAttr("disabled");
    } else {
        $("#submit-edit-account").attr("disabled", true);
    }
});

$(document).on("click", ".edit-connected-account", function () {
    $("#edit-connected-account-popup").ejDialog("open");
    $("#edit-connected-account-name").val($(this).attr("data-account-name"));
    $("#edit-connected-account-button").attr("data-conected-account-id", $(this).attr("data-content"))
    previousAccountName = $(this).attr("data-account-name");
});

$(document).on("click", ".re-authorize-account", function () {
    if (windowRef != undefined) {
        windowRef.close();
    }
    $(window).on('message', handleReauthorizeMessage);
    windowRef = window.open($(this).attr("data-reauthorize-url") + "&origin=" + window.location.origin, "", "height=600,width=500");
});

function handleReauthorizeMessage(evt) {
    if (evt.originalEvent != undefined && JSON.parse(evt.originalEvent.data).Status) {
        SuccessAlert(window.Server.App.LocalizationContent.ReauthorizeConnectedAccount, window.Server.App.LocalizationContent.ReauthorizeConnectedAccountSuccess, 7000);
        refreshConnectedAccountGrid(0);
    } else {
        WarningAlert(window.Server.App.LocalizationContent.ReauthorizeConnectedAccount, window.Server.App.LocalizationContent.ReauthorizeConnectedAccountFailure, 0);
    }
    $(window).off('message', handleReauthorizeMessage);
}

$(document).on("click", "#close-edit-connected-account, #cancel-edit-account", function () {
    $("#submit-edit-account").attr("disabled", true);
    $("#edit-connected-account-popup").ejDialog("close");
});

$(document).on("click", ".delete-connected-account", function () {
    var connectedAccountId = $(this).attr("data-content");
    var connectedAccountName = $(this).attr("data-account-name");
    var connectedAccountGridObj = $("#ConnectedAccountGrid").data("ejGrid");
    var currentPage = connectedAccountGridObj.model.pageSettings.currentPage;
    messageBox("su-delete", window.Server.App.LocalizationContent.DeleteConnectedAccount, window.Server.App.LocalizationContent.DeleteConnectedAccountConfirm + " — <span id='delete-item-name' class='delete-item-body highlight-name'>" + connectedAccountName + "</span>" + " ?", "error", function () {
        ShowWaitingProgress("#server-app-container", "show");
        $.ajax({
            type: "POST",
            url: deleteConnectedAccountUrl,
            data: { accountId: connectedAccountId },
            success: function (result) {
                if (result.Status) {
                    SuccessAlert(window.Server.App.LocalizationContent.DeleteConnectedAccount, window.Server.App.LocalizationContent.DeleteConnectedAccountSuccess, 7000);
                    refreshConnectedAccountGrid(currentPage);
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.DeleteConnectedAccount, window.Server.App.LocalizationContent.DeleteConnectedAccountFailure, 0);
                }
            }
        });
        onCloseMessageBox();
    });
});

$(document).on("click", ".search-accounts", function () {
    var gridObj = $("#ConnectedAccountGrid").data("ejGrid");
    gridObj.model.pageSettings.currentPage = 1;
    gridObj.refreshContent();
});

$(document).on("click", "#submit-edit-account", function () {
    $("#edit-connected-account-popup_wrapper").ejWaitingPopup("show");
    var connectedAccountId = $("#edit-connected-account-button").attr("data-conected-account-id");
    var connectedAccountName = $("#edit-connected-account-name").val().trim();
    var connectedAccountGridObj = $("#ConnectedAccountGrid").data("ejGrid");
    var currentPage = connectedAccountGridObj.model.pageSettings.currentPage;
    $.ajax({
        type: "POST",
        url: editConnectedAccountUrl,
        data: { accountId: connectedAccountId, accountName: connectedAccountName },
        success: function (result) {
            $("#edit-connected-account-popup_wrapper").ejWaitingPopup("hide");
            if (result.Status) {
                $("#submit-edit-account").attr("disabled", true);
                $("#edit-connected-account-popup").ejDialog("close");
                SuccessAlert(window.Server.App.LocalizationContent.EditConnectedAccount, window.Server.App.LocalizationContent.EditConnectedAccountSuccess, 7000);
                refreshConnectedAccountGrid(currentPage);
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.EditConnectedAccount, window.Server.App.LocalizationContent.EditConnectedAccountFailure, 0);
            }
        }
    });
});

function fnOnLinkedAccountGridActionBegin(args) {
    var searchValue = $("#search-linked-accounts").val();
    this.model.query._params.push({ key: "searchKey", value: searchValue });
    var filerSettings = [], i;
    var userGridWaitingPopupTemplateId = createLoader("ConnectedAccountGrid");
    this.element.ejWaitingPopup({ template: $("#" + userGridWaitingPopupTemplateId) });
    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ 'PropertyName': column.field, 'FilterType': column.operator, 'FilterKey': column.value });
        }

        this.model.query._params.push({ key: "filterCollection", value: filerSettings });
    }
}

function OnEditConnectedAccountOpen() {
    $("#edit-connected-account-name").focus();
}

function OnEditConnectedAccountClose() {
    $("#edit-connected-account-popup_wrapper").ejWaitingPopup("hide");
}

function refreshConnectedAccountGrid(currentPage) {
    var connectedAccountGridObj = $("#ConnectedAccountGrid").data("ejGrid");
    var sortingInfo = connectedAccountGridObj.model.sortSettings.sortedColumns;
    $.ajax({
        type: "POST",
        url: window.getConnectedAccountsUrl,
        beforeSend: ShowWaitingProgress("#server-app-container", "show"),
        success: function (result) {
            $("#ConnectedAccountGrid").ejGrid("option", "model.dataSource", result);
            var currentGridObj = $("#ConnectedAccountGrid").data("ejGrid");
            if (sortingInfo != null) {
                if (sortingInfo[0] != null) {
                    currentGridObj.sortColumn(sortingInfo[0].field, sortingInfo[0].direction);
                }
            }
            connectedAccountGridObj.gotoPage(currentPage);
            ShowWaitingProgress("#server-app-container", "hide");
        }
    });
}