var gridObj;
var selectedValues = [];
var selectedObject = [];
var objectSelected = [];
var searchedResult = [];
var selectedIndex = [];

function fnCreate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}
function fnActionComplete(args) {
    var gridObj = $("#Grid").data("ejGrid");
    $("#checkbox-header").prop("enabled", false);
    $("#checkbox-header").change(headCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();

    if (args.requestType == "paging" || args.requestType == "sorting" || args.requestType == "refresh" || args.requestType == "filtering" || args.requestType == "searching") {
        if (args.requestType == "filtering" || args.requestType == "searching")
            objectSelected = [];

        if (gridObj.model.currentViewData.length == 0) {
            $("#checkbox-header").prop("disabled", true);
        }
        if (typeof gridObj.model.currentViewData != "undefined") {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.GroupId;
                var index = jQuery.inArray(JSON.stringify(record), $.map(objectSelected, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#Grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#Grid .checkbox-row#row-check" + rowUniId).prop("checked", true);
                    gridObj.selectRows(rowIndex);
                }
            }
        }
        var duplicateUsers = $.grep(searchedResult, function (elt) {
            return elt.IsDuplicated === true;
        });
        if (searchedResult.length === 0)
            $("#checkbox-header").prop("enabled", false);
        else
            $("#checkbox-header").prop("enabled", true);

        if (gridObj.getRows() != null) {
            if ((searchedResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
                $("#checkbox-header").prop("enabled", true);
            else
                $("#checkbox-header").prop("enabled", false);
        }
    }

    enableimportbutton();
    $('[data-toggle="tooltip"]').tooltip();
}

function SaveActiveDirectoryGroups() {
    if (objectSelected.length > 0) {
        $(".empty-validation").css("display", "none");
        showWaitingPopup("server-app-container");
        $.ajax({
            type: "POST",
            url: saveSelectedActiveDirectoryGroupsUrl,
            data: { selectedGroups: objectSelected },
            success: function (result) {
                var gridObj = $("#Grid").data("ejGrid");
                var statusHtml = "<h5>Import Group - Status</h5><table style='text-align: left;table-layout:fixed;' class='table table-striped table-hover post-success-table'><thead class='thead-default'><tr><th>Group Name</th><th>Users imported</th><th title='Invalid Username or Email Address&#13;Duplicated Username or Email Address'>Users not imported</th><th>Status</th></tr></thead>";
                var isUserLimitExceed = false;
                for (var t = 0; t < result.ImportStatus.length; t++) {
                    var status = "Success";
                    var classname = "success";
                    if (result.ImportStatus[t].Status == false) {
                        status = "Partial Success";
                        classname = "danger";
                    }
                    statusHtml += "<tr><td>" + result.ImportStatus[t].GroupName + "</td><td>" + result.ImportStatus[t].ImportedUsers + "</td><td>" + result.ImportStatus[t].FailedUsers + "</td><td class=" + classname + ">" + status + "</td></tr>";
                    if (result.ImportStatus[t].IsUserLimitExceed) {
                        isUserLimitExceed = true;
                    }
                }
                statusHtml += "</table>";
                var title = saveSelectedActiveDirectoryGroupsUrl.indexOf("azure") > 0 ? "Azure Active Directory group import" : "Active Directory group import";
                if ($.type(result) == "object" && result.Count != 0) {
                    parent.messageBox("su-group-1", title, "Duplicate or Invalid data is found. Please change the data accordingly and re-import.", "success", function () {
                        parent.onCloseMessageBox();
                        searchADGroups($("#ad-group-import").val());
                    }, function () { }, 575);
                } else {
                    parent.messageBox("su-group-1", title, "<span id='group-imported'>" + objectSelected.length + " group(s) has been imported successfully." + "</span>" + statusHtml, "success", function () {
                        parent.onCloseMessageBox();
                        searchADGroups($("#ad-group-import").val());
                    }, function () { }, 575);
                    $(".groupcount").html(objectSelected.length);
                    $("#import-button").attr("disabled", "disabled");
                }
                if (isUserLimitExceed) {
                    $("#limit-user").ejDialog("open");
                    $("#zero-user-acc").show();
                }
                gridObj.clearSelection();
                objectSelected = [];
                selectedIndex = [];
                hideWaitingPopup("server-app-container");
            },
            error: handleAjaxError()
        });
    } else {
        $(".grid-error-validation").css("display", "none")
        $(".empty-validation").css("display", "block");
    }
}

function headCheckboxOnChange(e) {
    gridObj = $("#Grid").data("ejGrid");
    if ($("#checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length + $(".checkbox-row-disabled").length);
        for (var t = 0; t < $(".checkbox-row-disabled").length; t++) {
            var checkbox = $(".checkbox-row-disabled");
            var rowIndex = $($(checkbox[t]).closest("td").parent()).index();
            gridObj.selectRows(rowIndex);
        }
        objectSelected = [];

        objectSelected = $.extend(true, objectSelected, searchedResult);
        if (isSafari) {
            $(".checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        objectSelected = [];
        selectedIndex = [];
        gridObj.clearSelection();
        if (isSafari) {
            $(".checkbox-header-label").removeClass("check");
        }
    }
    enableimportbutton();
}

function enableimportbutton() {
    gridObj = $("#Grid").data("ejGrid");
    if (objectSelected.length > 0) {
        $("#import-button").attr("disabled", false);
    }
    else {
        $("#import-button").attr("disabled", true);
    }
}
function fnOnADGroupGridActionBegin(args) {
    if (args.requestType != "refresh") {
        $(".grid-error-validation, .empty-validation, .grid-validation").css("display", "none");
    }
    var searchValue = $("#ad-group-import").val().trim();
    this.model.query._params.push({ key: "searchKey", value: searchValue });
    var filerSettings = [], i;
    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ "PropertyName": column.field, "FilterType": column.operator, "FilterKey": column.value });
        }

        this.model.query._params.push({ key: "filterCollection", value: filerSettings });
    }
}
function setHeaderCheckedStatus(gridObj) {
    var duplicateUsers = $.grep(searchedResult, function (elt) {
        return elt.IsDuplicated === true;
    });
    if (gridObj.getRows() != null) {
        if ((searchedResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
            $("#checkbox-header").prop("checked", true);
        else
            $("#checkbox-header").prop("checked", false);
    }
    enableimportbutton();
}
function fnRecordClick(args) {
    gridObj = $("#Grid").data("ejGrid");
    var isChecked = args.row.find(".checkbox-row").is(":checked");
    if (isChecked) {
        gridObj.multiSelectCtrlRequest = true;

        if (jQuery.inArray(JSON.stringify(args.data), $.map(objectSelected, JSON.stringify)) == -1) {
            objectSelected.push(args.data);
        } else {
            gridObj.selectRows(args.row.index());
        }
    }
    else {
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(args.row.index());
        var index = jQuery.inArray(JSON.stringify(args.data), $.map(objectSelected, JSON.stringify));
        if (index != -1) {
            objectSelected.splice(index, 1);
            gridObj.selectRows(args.row.index());
        }
    }
    var duplicateUsers = $.grep(searchedResult, function (elt) {
        return elt.IsDuplicated === true;
    });
    if (gridObj.getRows() != null) {
        if ((searchedResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
            $("#checkbox-header").prop("checked", true);
        else
            $("#checkbox-header").prop("checked", false);
    }
    enableimportbutton();
}

$(document).on("keydown", "#ad-group-import", function (e) {
    if (e.keyCode == "13") {
        e.preventDefault();
        $(".grid-error-validation, .empty-validation, .grid-validation").css("display", "none");
        searchADGroups($("#ad-group-import").val());
    }
});

$(document).on("click", ".close-icon", function () {
    $(".grid-error-validation, .empty-validation, .grid-validation").css("display", "none");
    searchADGroups($("#ad-group-import").val());
});

function searchADGroups(searchKey) {
    if (searchKey.trim() != "") {
        showWaitingPopup("server-app-container");
        $.ajax({
            type: "POST",
            url: searchActiveDirectoryGroupsUrl,
            data: { searchKey: searchKey },
            success: function (result) {
                var gridObj = $("#Grid").data("ejGrid");
                if (result.count > 0) {
                    searchedResult = $.grep(result.result, function (item) { return item.IsDuplicated != true; });
                    $("#import-button").attr("disabled", "disabled");
                    gridObj.clearSelection();
                    objectSelected = [];
                }
                gridObj.option("dataSource", result.result);
                hideWaitingPopup("server-app-container");
            },
            error: handleAjaxError()
        });
    } else {
        objectSelected = [];
        enableimportbutton();
    }
}

function refreshTemplate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}