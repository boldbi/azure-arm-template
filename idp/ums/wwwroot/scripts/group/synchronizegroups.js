var selectedObject = [];
var searchdata = [];
var selectedIndex = [];

function fnCreateGrid(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}
function fnActionComplete(args) {
    var gridObj = $("#Grid").data("ejGrid");
    $("#checkbox-header").prop("enabled", false).change(headCheckboxOnChange);
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
            var rowUniId = record.GroupId;
            var index = jQuery.inArray(JSON.stringify(record), $.map(selectedObject, JSON.stringify));
            if (index != -1) {
                var rowIndex = $($("#Grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                $("#Grid .checkbox-row#row-check" + rowUniId).prop("checked", true);
                gridObj.selectRows(rowIndex);
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

function headCheckboxOnChange(e) {
    var gridObj = $("#Grid").data("ejGrid");
    if ($("#checkbox-header").prop("checked") == true) {
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
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
        selectedObject = [];
        selectedIndex = [];
        if (isSafari) {
            $(".checkbox-header-label").removeClass("check");
        }
    }
    enablesyncbutton();
}

function enablesyncbutton() {
    if (!isEmptyOrWhitespace(selectedObject) && selectedObject.length != 0) {
        $("#sync-button").removeClass("tab-invisible").addClass("visible-tab-container");
    }
    else {
        $("#sync-button").removeClass("visible-tab-container").addClass("tab-invisible");
    }
}
function recordClick(args) {
    gridObj = $("#Grid").data("ejGrid");
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
    var duplicateUsers = $.grep(searchdata, function (elt) {
        return elt.IsDuplicated === true;
    });
    if (gridObj.getRows() != null) {
        if ((searchdata.result.length - duplicateUsers.length) === selectedObject.length && selectedObject.length > 0)
            $("#checkbox-header").prop("checked", true);
        else
            $("#checkbox-header").prop("checked", false);
    }

    enablesyncbutton();
}
function setHeaderCheckedStatus(gridObj) {
    gridObj.clearSelection();
    gridObj.selectRows(selectedIndex);
    if (selectedObject.length === searchdata.result.length)
        $("#checkbox-header").prop("checked", true);
    else
        $("#checkbox-header").prop("checked", false);

    enablesyncbutton();
}
$(document).on("click", "#syncronize-group", function () {
    showWaitingPopup("server-app-container");
    var gridObj = $("#Grid").data("ejGrid");
    $.ajax({
        type: "POST",
        url: synchronizeActiveDirectoryGroupUrl,
        data: { selectedGroups: selectedObject },
        success: function (result) {
            var statusHtml = "";
            var isUserLimitExceed = false;
            if (result.ImportStatus.length > 0) {
                statusHtml += "<h4>Synchronization Group - Status</h4><table style='text-align: left;table-layout:fixed;' class='table table-striped table-hover post-success-table'><thead class='thead-default'><tr><th>Group Name</th><th>Users added</th><th>Users removed</th><th>Users Synchronized</th><th title='Invalid Username or Email Address&#13;Duplicated Username or Email Address'>Users not Synchronized</th><th>Status</th></tr></thead>";
                for (var t = 0; t < result.ImportStatus.length; t++) {
                    var status = "Success";
                    var classname = "success";
                    if (result.ImportStatus[t].Status == false) {
                        status = "Partial Success";
                        classname = "danger";
                    }
                    statusHtml += "<tr><td>" + result.ImportStatus[t].GroupName + "</td><td>" + result.ImportStatus[t].SynchronizationUserImported + "</td><td>" + result.ImportStatus[t].SynchronizationUserRemoved + "</td><td>" + result.ImportStatus[t].ImportedUsers + "</td><td>" + result.ImportStatus[t].FailedUsers + "</td><td class=" + classname + ">" + status + "</td></tr>";
                    if (result.ImportStatus[t].IsUserLimitExceed) {
                        isUserLimitExceed = true;
                    }
                }
                statusHtml += "</table>";
            }

            hideWaitingPopup("server-app-container");
            gridObj.clearSelection();
            selectedObject = [];
            gridObj.option("dataSource", result.Data);
            $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").addClass("groupmsg-box-height");  //For height adjustment purpose
            $(".message-content").addClass("groupmsg-content-height");
            var title = synchronizeActiveDirectoryGroupUrl.indexOf("azure") > 0 ? "Azure Active Directory Synchronization" : "Active Directory Synchronization";
            parent.messageBox("su-group-1", title, result.Message + statusHtml, "success", function () {
                parent.onCloseMessageBox();
                //window.location.href = "/administration/user-management/groups";
            }, function () { }, 770, 350);
            if (isUserLimitExceed) {
                $("#limitUser").ejDialog("open");
                $("#zero-user-acc").show();
            }
        }
    });
});

$(document).on("keydown", "#search-ad-groups", function (e) {
    if (e.keyCode == "13") {
        var gridObj = $("#Grid").data("ejGrid");
        gridObj.search($("#search-ad-groups").val());
        $("#checkbox-header").prop("checked", false);
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
    }
});

$(document).on("click", ".search-group", function () {
    var gridObj = $("#Grid").data("ejGrid");
    gridObj.search($("#search-ad-groups").val());
});



