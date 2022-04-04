var selecteduserIdValues = [];
var selectedObject = [];
var duplicateUsers = [];
var searchdata = [];
var isFirstRequest = true;
var selectedIndex = [];

$(document).ready(function () {
    duplicateUsers = [];
    addPlacehoder("#search-area");
    $("#total-record-count").html("0");
    $('[data-toggle="tooltip"]').tooltip();
});

function fnRecordClick(args) {
    gridObj = $("#user_grid").data("ejGrid");
    var isChecked = args.row.find(".checkbox-row").is(":checked");
    if (isChecked) {
        gridObj.multiSelectCtrlRequest = true;

        if (jQuery.inArray(JSON.stringify(args.data), $.map(selectedObject, JSON.stringify)) == -1) {
            selectedObject.push(args.data);
        } else {
            gridObj.selectRows(args.row.index());
        }
    }
    else {
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(args.row.index());
        var index = jQuery.inArray(JSON.stringify(args.data), $.map(selectedObject, JSON.stringify));
        if (index != -1) {
            selectedObject.splice(index, 1);
            gridObj.selectRows(args.row.index());
        }
    }

    if (selectedObject.length === searchdata.result.length)
        $("#checkbox-header").prop("checked", true);
    else
        $("#checkbox-header").prop("checked", false);

    enablesyncbutton();
}

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
        if (location.pathname.toLowerCase() === "/" || location.pathname.split("/")[location.pathname.split("/").length - 1].toLowerCase() == "dashboards") {
            refreshScroller();
        }
    }
}

function fnOnUserGridActionComplete(args) {
    if (args.model.currentViewData.length == 0) {
        rowBound();
    }
    var gridObj = $("#user_grid").data("ejGrid");
    $("#checkbox-header").change(headCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();

    var query = gridObj.model.query.queries;
    var keys = query.map(function (e, i) { return e.fn });
    query.splice(keys.indexOf("onPage"), 1);
    searchdata = new ej.DataManager(gridObj.model.dataSource).executeLocal(gridObj.model.query);
    var tempSelectedData = [];
    $.map(searchdata.result, function (n) {
        var index = jQuery.inArray(JSON.stringify(n), $.map(selectedObject, JSON.stringify));
        if (index != -1) {
            tempSelectedData.push(n);
        }
    });
    selectedObject = [];
    selectedObject = $.extend(true, selectedObject, tempSelectedData);

    if (args.requestType == "paging" || args.requestType == "sorting" || args.requestType == "refresh" || args.requestType == "filtering" || args.requestType == "searching") {
        for (var i = 0; i < gridObj.model.currentViewData.length; i++) {

            var record = gridObj.model.currentViewData[i];
            var rowUniId = record.UserId;
            var index = jQuery.inArray(JSON.stringify(record), $.map(selectedObject, JSON.stringify));
            if (index != -1) {
                $("#user_grid .checkbox-row#row-check" + rowUniId).prop("checked", true);
                gridObj.selectRows($($("#user_grid .checkbox-row#row-check" + rowUniId).closest("td").parent()).index());
            }
        }

        if (selectedObject.length != 0 && selectedObject.length === searchdata.result.length)
            $("#checkbox-header").prop("enabled", true);
        else
            $("#checkbox-header").prop("enabled", false);
    }
    var userCount = 0;
    if (gridObj.model.dataSource.length != null) {
        userCount = gridObj.model.dataSource.length;
    }
    $("#total-record-count").html(userCount);
    enablesyncbutton();
    $('[data-toggle="tooltip"]').tooltip();
}

$(document).on("keydown", "#search-ad-users", function (e) {
    if (e.keyCode == "13") {
        var gridObj = $("#user_grid").data("ejGrid");
        gridObj.search($("#search-ad-users").val());
        $("#checkbox-header").prop("checked", false);
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
    }
});

$(document).on("click", ".search-user", function () {
    var gridObj = $("#user_grid").data("ejGrid");
    gridObj.search($("#search-ad-users").val());
});

function SynchronizeUsers() {
    showWaitingPopup("server-app-container");
    var gridObj = $("#user_grid").data("ejGrid");
    $.ajax({
        type: "POST",
        url: synchronizeSelectedUsersUrl,
        data: { usersList: selectedObject },
        success: function (result) {
            $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").addClass("msg-box-height");  //For height adjustment purpose
            $(".message-box-btn-holder").addClass("msg-footer-height");
            var title = synchronizeSelectedUsersUrl.indexOf("azure") > 0 ? "Azure Active Directory Synchronization" : "Active Directory Synchronization";
            parent.messageBox("su-single-user", title, result.Message, "success", function () {
                parent.onCloseMessageBox();
            });
            gridObj.clearSelection();
            selectedObject = [];
            gridObj.option("dataSource", result.Data);
            hideWaitingPopup("server-app-container");
        },
        error: function () {
            $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").addClass("msg-box-height");  //For height adjustment purpose
            $(".message-box-btn-holder").addClass("msg-footer-height");
            var title = synchronizeSelectedUsersUrl.indexOf("azure") > 0 ? "Azure Active Directory Synchronization" : "Active Directory Synchronization";
            parent.messageBox("su-single-user", title, "Synchronizing users with active directory has been failed.", "success", function () {
                parent.onCloseMessageBox();
            });
            hideWaitingPopup("server-app-container");
        }
    });
}

function SynchronizeDatabaseUsers() {
    showWaitingPopup("server-app-container");
    var gridObj = $("#user_grid").data("ejGrid");
    $.ajax({
        type: "POST",
        url: synchronizeSelectedDbUsersUrl,
        data: { usersList: selectedObject },
        success: function (result) {
            $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").addClass("msg-box-height");  //For height adjustment purpose
            $(".message-box-btn-holder").addClass("msg-footer-height");
            parent.messageBox("su-single-user", "Database Synchronization", result.Message, "success", function () {
                parent.onCloseMessageBox();
                hideWaitingPopup("server-app-container");
            });
            gridObj.clearSelection();
            selectedObject = [];
            gridObj.option("dataSource", result.Data);
            hideWaitingPopup("server-app-container");
        },
        error: function () {
            $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").addClass("msg-box-height");  //For height adjustment purpose
            $(".message-box-btn-holder").addClass("msg-footer-height");
            parent.messageBox("su-single-user", "Database Synchronization", "Synchronizing users with existing database has been failed.", "success", function () {
                parent.onCloseMessageBox();
            });
            hideWaitingPopup("server-app-container");
        }
    });
}

function refreshTemplate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}
function headCheckboxOnChange(e) {

    var gridObj = $("#user_grid").data("ejGrid");
    if ($("#checkbox-header").is(':checked')) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length);
        selectedObject = [];

        selectedObject = $.extend(true, selectedObject, searchdata.result);
        if (isSafari) {
            $(".checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop({ "checked": false });
        gridObj.clearSelection();
        selectedObject = [];
        if (isSafari) {
            $(".checkbox-header-label").removeClass("check");
        }
    }
    enablesyncbutton();
}

function enablesyncbutton() {
    if (!isEmptyOrWhitespace(selectedObject) && selectedObject.length != 0) {
        $("#synchronize-users").removeClass("hide").addClass("show");
    }
    else {
        $("#synchronize-users").removeClass("show").addClass("hide");
    }
}
