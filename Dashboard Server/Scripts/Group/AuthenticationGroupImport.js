var gridObj;
var selectedValues = [];
var selectedObject = [];
var objectSelected = [];
var currentPageResult = [];
var selectedIndex = [];
var authGroupResponse = null;

function fnCreate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
    $("#prev-page").ejButton({ click: "prevBtnClick" });
    $("#next-page").ejButton({ click: "nextBtnClick" });
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

        if (gridObj.model.currentViewData.length === 0)
        {
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
        var duplicateUsers = $.grep(currentPageResult, function (elt) {
            return elt.IsDuplicated === true;
        });
        if (currentPageResult.length === 0)
            $("#checkbox-header").prop("enabled", false);
        else
            $("#checkbox-header").prop("enabled", true);

        if (gridObj.getRows() != null) {
            if ((currentPageResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
                $("#checkbox-header").prop("enabled", true);
            else
                $("#checkbox-header").prop("enabled", false);
        }
    }

    enableimportbutton();
    $('[data-toggle="tooltip"]').tooltip();

    showOrHideGridPager("#Grid");

    if (authGroupResponse != null && typeof (authGroupResponse) != "undefined") {
        $("#current-page-label").html(authGroupResponse.PageNumber);
        var currentPage = parseInt($("#current-page-value").val());
        if (currentPage != authGroupResponse.PageNumber && authGroupResponse.PageNumber > 0) {            
            $("#current-page-value").val(authGroupResponse.PageNumber);
            if (authGroupResponse.PageNumber == 1) {
                $("#prev-page").prop('disabled', true);
            }
        }

        if (authGroupResponse.IsLastPage) {
            $("#next-page").prop('disabled', true);
        }
    }
}

function SaveAuthGroups() {
    if (objectSelected.length > 0) {
        $(".empty-validation").css("display", "none");
        showWaitingPopup("server-app-container");
        $.ajax({
            type: "POST",
            url: saveSelectedAuthGroupsUrl,
            data: { selectedGroups: objectSelected, authType },
            success: function (result) {
                if (result.ImportStatus !== null) {
                    var gridObj = $("#Grid").data("ejGrid");
                    var statusHtml = "<h5>" + window.Server.App.LocalizationContent.ImportGroup + "</h5><table style='text-align: left;table-layout:fixed;' class='table table-striped table-hover post-success-table'><thead class='thead-default'><tr><th>" + window.Server.App.LocalizationContent.Group + "</th><th>" + window.Server.App.LocalizationContent.Status + "</th></tr></thead>";
                    var isUserLimitExceed = false;
                    for (var t = 0; t < result.ImportStatus.length; t++) {
                        var status = window.Server.App.LocalizationContent.Success;
                        var classname = "success";
                        if (result.ImportStatus[t].Status == false) {
                            status = window.Server.App.LocalizationContent.PartialSucccess;
                            classname = "danger";
                        }
                        statusHtml += "<tr><td>" + result.ImportStatus[t].GroupName + "</td><td class=" + classname + ">" + status + "</td></tr>";
                        if (result.ImportStatus[t].IsUserLimitExceed) {
                            isUserLimitExceed = true;
                        }
                    }
                    statusHtml += "</table>";
                    var title = window.Server.App.LocalizationContent.AuthGroupImport;
                    if ($.type(result) == "object" && result.Count != 0) {
                        parent.messageBox("su-group-1", title, window.Server.App.LocalizationContent.AdDuplicateGroup, "success", function () {
                            parent.onCloseMessageBox();
                            $("#checkbox-header").prop("checked", false);
                            gridObj.refreshContent();
                        }, function () { }, 575);
                    } else {
                        parent.messageBox("su-group-1", title, "<span id='group-imported'>" + objectSelected.length + window.Server.App.LocalizationContent.GroupsImporSuccess + "</span>" + statusHtml, "success", function () {
                            parent.onCloseMessageBox();
                            $("#checkbox-header").prop("checked", false);
                            gridObj.refreshContent();
                        }, function () { }, 575);
                        $(".groupcount").html(objectSelected.length);
                        $("#import-button").attr("disabled", "disabled");
                    }
                    if (isUserLimitExceed) {
                        $("#limit-user").ejDialog("open");
                        $("#zero-user-acc .licensed-user-count").html(result.LicenseSettings.Users);
                        $("#zero-user-acc").show();
                    }
                    gridObj.clearSelection();
                    objectSelected = [];
                    selectedIndex = [];
                }

                hideWaitingPopup("server-app-container");
            },
            error: handleAjaxError()
        });
    } else {
        $(".grid-error-validation").css("display", "none");
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

        objectSelected = $.extend(true, objectSelected, currentPageResult);
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
function fnOnAuthGroupGridActionBegin(args) {
    var itemGridWaitingPopupTemplateId = createLoader("Grid");
    this.element.ejWaitingPopup({ template: $("#" + itemGridWaitingPopupTemplateId) });
    if (args.requestType != "refresh") {
        $(".grid-error-validation, .empty-validation, .grid-validation").css("display", "none");
    }

    var authVal = parseInt($("#auth-provider-list").val());
    this.model.query._params.push({ key: "authSettingsData", value: serializedAuthSettingsList[authVal] }, { key: "pageNumber", value: parseInt($("#current-page-value").val()) });
}

function setHeaderCheckedStatus(gridObj) {
    var duplicateUsers = $.grep(currentPageResult, function (elt) {
        return elt.IsDuplicated === true;
    });
    if (gridObj.getRows() != null) {
        if ((currentPageResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
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
    var duplicateUsers = $.grep(currentPageResult, function (elt) {
        return elt.IsDuplicated === true;
    });
    if (gridObj.getRows() != null) {
        if ((currentPageResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
            $("#checkbox-header").prop("checked", true);
        else
            $("#checkbox-header").prop("checked", false);
    }
    enableimportbutton();
}

function refreshTemplate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}

function prevBtnClick() {
    var currentVal = parseInt($("#current-page-value").val());
    var targetVal = currentVal - 1;
    if (targetVal == 1) {
        $("#prev-page").prop('disabled', true);
    }
    $("#next-page").prop('disabled', false);
    $("#current-page-label").html(targetVal);
    $("#current-page-value").val(targetVal);
    var gridObj = $("#Grid").data("ejGrid");
    gridObj.gotoPage(targetVal);
    $("#checkbox-header").prop("checked", false);
}

function nextBtnClick() {
    var currentVal = parseInt($("#current-page-value").val());
    var targetVal = currentVal + 1;
    $("#prev-page").prop('disabled', false);
    $("#current-page-value").val(targetVal);
    var gridObj = $("#Grid").data("ejGrid");
    gridObj.gotoPage(targetVal);
    $("#checkbox-header").prop("checked", false);
}

function processAuthGroupResponse(data) {
    if (typeof (data) != "undefined") {
        authGroupResponse = data.authGroupResponse;
        currentPageResult = $.grep(data.result, function (item) { return item.IsDuplicated != true; });
    }    
}

$(document).ready(function () {
    $("#auth-provider-list").on("change", function () {
        var index = parseInt($(this).val());
        var link = (authSettingsList[index].TenantId != guidEmpty ? localSettingsBaseUrl : globalSettingsBaseUrl) + "?tab=" + (authSettingsList[index].AuthType == 1 ? "oauth-settings" : "openid-settings");
        $("#modify-button-link").attr("href", link);
        var gridObj = $("#Grid").data("ejGrid");
        gridObj.refreshContent();
    });
});