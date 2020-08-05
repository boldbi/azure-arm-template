var dataSourceScheduleDialogobj = "";

$(function () {
    $("#datasource-edit-popup").ejDialog({
        width: "650px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        close: "OnEditFileDialogClose",
        closeOnEscape: true
    });
    var datasourceEditWaitingPopupTemplateId = createLoader("datasource-edit-popup_wrapper");
    $("#datasource-edit-popup_wrapper").ejWaitingPopup({ template: $("#" + datasourceEditWaitingPopupTemplateId) });
    $(window).resize(function () {
        var gridObj = $("#items").data("ejGrid");
        (window.innerWidth < 1200) ? gridObj.hideColumns("Owner") : gridObj.showColumns("Owner");
    });

    $(document).on('click', '.item-edit', function () {
        var itemId = $(this).attr("data-item-id");
        $("#datasource-edit-popup").ejDialog("open");
        $("#datasource-edit-popup_wrapper").ejWaitingPopup("show");
        $("#datasource-edit-popup-iframe").attr("src", getDataSourceDetailsUrl + "?itemId=" + itemId);
    });

    dataSourceScheduleDialogobj = new ejs.popups.Dialog({
        isModal: true,
        closeOnEscape: true,
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });

    dataSourceScheduleDialogobj.appendTo("#datasource-refresh-schedule-container");
    
    ejs.popups.createSpinner({
        target: document.getElementById('datasource-refresh-schedule-container')
    });

    ejs.popups.setSpinner({ type: 'Material' });
});

$(document).on("click", ".refresh-data", function () {
    var itemId = $(this).attr("data-item-id");
    $.ajax({
        type: "POST",
        url: refreshData,
        data: { datasourceId: itemId },
        success: function (data) {
            if (data.status) {
                SuccessAlert(window.Server.App.LocalizationContent.DatasourceRefreshData, data.message, 7000);
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.DatasourceRefreshData, data.message, 0);
            }
        }
    });
});

$(document).on("click", ".edit-schedule", function () {
    var itemId = $(this).attr("data-item-id");
    $("#datasource-refresh-schedule-container").show();
    dataSourceScheduleDialogobj.show();
    $("#datasource-refresh-scheduler-edit-popup-iframe").attr("src", refreshDataScheduleIframeUrl + "?datasourceId=" + itemId + "&isServer=true");
    showDataSourceLoaderIcon();
});

$(document).on("click", ".items", function () {
    $(".e-waitpopup-pane").css("display", "none");
});

$(document).on("click", ".item-permissions", function () {
    var datasourceGrid = $("#items").data("ejGrid");
    shareDashboardPermission(datasourceGrid.getSelectedRecords()[0]);
});

function OnEditFileDialogClose() {
    $("#datasource-edit-popup").ejDialog("close");
}

function resultRefreshDataSourceDialog(data) {
    dataSourceScheduleDialogobj.hide();

    if (data) {
        SuccessAlert(window.Server.App.LocalizationContent.DatasourceRefreshSettings, window.Server.App.LocalizationContent.DatasourceSuccessMessage, 7000);
    }
    else {
        WarningAlert(window.Server.App.LocalizationContent.DatasourceRefreshSettings, window.Server.App.LocalizationContent.DatasourceWarningMessage, 0);
    }
}

function closeRefreshDataSourceDialog() {
    dataSourceScheduleDialogobj.hide();
}

function showDataSourceLoaderIcon() {
    ejs.popups.showSpinner(document.getElementById('datasource-refresh-schedule-container'));
}

function hideDataSourceLoaderIcon() {
    ejs.popups.hideSpinner(document.getElementById('datasource-refresh-schedule-container'));
    $("#datasource-refresh-scheduler-edit-popup-iframe").show();
}