var gridObj;
var selectedValues = [];
var selectedObject = [];
var objectSelected = [];
var searchedResult = [];
var selectedIndex = [];

function fnCreate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}

function fnOnADUserGridActionBegin(args) {
    if (args.requestType != "refresh") {
        $(".grid-error-validation").css("display", "none");
        $(".empty-validation").css("display", "none");
        $(".grid-validation").css("display", "none");
    }
    var searchValue = $("#ad-user-import").val().trim();
    this.model.query._params.push({ key: "searchKey", value: searchValue });
    var filerSettings = [], i;

    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ 'PropertyName': column.field, 'FilterType': column.operator, 'FilterKey': column.value });
        }

        this.model.query._params.push({ key: "filterCollection", value: filerSettings });
    }
}
function fnActionComplete(args) {
    var gridObj = $("#Grid").data("ejGrid");
    $("#checkbox-header").prop("disabled", true);
    $("#checkbox-header").change(headCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType == "paging" || args.requestType == "sorting" || args.requestType == "refresh" || args.requestType == "filtering" || args.requestType == "searching") {
        if (args.requestType == "filtering" || args.requestType == "searching")
            objectSelected = [];

        if (gridObj.model.currentViewData.length == 0) {
            $("#checkbox-header").prop("disabled", true);
        }
        if (typeof gridObj.model.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.UserId;
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

        if (searchedResult.length === 0) {
            parent.$("#checkbox-header").prop("disabled", true);
        }
        else {
            parent.$("#checkbox-header").prop("disabled", false);
        }
    }

    enableimportbutton();
    $('[data-toggle="tooltip"]').tooltip();
}

function SaveActiveDirectoryUsers() {

    if (objectSelected.length > 0) {
        $(".empty-validation").css("display", "none");
        showWaitingPopup("content-area");
        $.ajax({
            type: "POST",
            data: { selectedUsers: objectSelected, searchKey: $("#ad-user-import").val() },
            url: saveSelectedActiveDirectoryUserUrl,
            success: function (result) {
                if (result.isUserLimitExceed != true) {
                    searchedResult = $.grep(result.Data, function (item) { return item.IsDuplicated != true; });
                    var gridObj = $("#Grid").data("ejGrid");
                    gridObj.option("dataSource", result.Data);
                    var title = saveSelectedActiveDirectoryUserUrl.indexOf("azure") > 0 ? "Azure  Active Directory user import" : "Active Directory user import";
                    if ($.type(result) == "object" && result.Count != 0) {
                        var message = "";
                        if (objectSelected.length != result.Count)
                            message += "<li>" + (parseInt(objectSelected.length) - parseInt(result.Count)) + " User(s) has been imported and activated successfully.</li>";

                        if (result.Count > 0)
                            message += "<li>" + result.Count + " duplicate user(s) exists. <br />(Username or Email address already exists or repeated).</li>";

                        message = "User has been imported and activated successfully.<ul class='list-area'>" + message + "</ul>";
                        message += "<ul style='padding-left: 0px;list-style: none'><li>Please click OK to check the list behind regarding the invalid or duplicate users.</li></ul>";
                        parent.messageBox("su-single-user", title, message, "success", function () {
                            parent.onCloseMessageBox();
                        }, undefined, undefined, undefined, undefined, "success-message-large");
                    } else {
                        parent.messageBox("su-single-user", title, objectSelected.length + " User(s) has been imported and activated successfully.", "success", function () {
                            parent.onCloseMessageBox();
                        });
                        $(".user-count").html(objectSelected.length);
                        $("#import-button").attr("disabled", "disabled");
                        $("#messageBox_wrapper").removeClass("success-message-large");
                    }
                    gridObj.clearSelection();
                    objectSelected = [];
                    selectedIndex = [];
                } else {
                    $("#limit-user").ejDialog("open");
                    if (result.UserLicense.UserCountsLeft > 0) {
                        $("#limit-import-ad").show();
                        $(".importad-allowed-count").html(result.UserLicense.UserCountsLeft);
                    } else {
                        $("#zero-user-acc").show();
                    }

                }

                hideWaitingPopup("content-area");
            }
        });
    } else {
        $(".grid-error-validation").css("display", "none");
        $(".empty-validation").css("display", "block");
    }
}

function headCheckboxOnChange(e) {
    gridObj = $("#Grid").data("ejGrid");
    if ($("#checkbox-header").prop('checked') == true) {
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


function recordClick(args) {
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

$(document).on("keydown", "#ad-user-import", function (e) {
    if (e.keyCode == "13") {
        e.preventDefault();
        $(".grid-error-validation").css("display", "none");
        $(".empty-validation").css("display", "none");
        $(".grid-validation").css("display", "none");
        searchADUsers($("#ad-user-import").val());
    }
});

$(document).on("click", ".close-icon", function () {
    $(".grid-error-validation").css("display", "none");
    $(".empty-validation").css("display", "none");
    $(".grid-validation").css("display", "none");
    searchADUsers($("#ad-user-import").val());
});
function searchADUsers(searchKey) {
    if (searchKey.trim() != "") {
        showWaitingPopup("Grid");
        $.ajax({
            type: "POST",
            url: SearchActiveDirectoryUsersUrl,
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
                hideWaitingPopup("Grid");
            }
        });
    } else {
        objectSelected = [];
        enableimportbutton();
    }
}
function refreshTemplate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}
