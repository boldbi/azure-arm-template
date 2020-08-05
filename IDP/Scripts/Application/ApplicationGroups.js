var selectedGroups = [];
var selectedGroupsArrayPushPopAllowed = true;
var gridGroupData;
var groups = [];
var singleGroupSelected = false;
var singleGroupSelectedId;

$(document).ready(function () {
    $("#grant-access-group-dialog")
        .ejDialog({
            width: "900px",
            height: "539px",
            showOnInit: false,
            allowDraggable: true,
            enableResize: false,
            showHeader: false,
            enableModal: true,
            close: "onAddGroupsDialogClose",
            open: "onAddGroupsDialogOpen",
            closeOnEscape: true
        });
    $("#group-remove-confirmation").ejDialog({
        width: "378px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        showHeader: false,
        enableModal: true,
        close: "onGroupRemoveDialogClose",
        closeOnEscape: true,
        open: "onGroupRemoveDialogOpen"
    });

    $("#grant-access-group-dialog_wrapper").keyup(function (e) {
        if (e.keyCode == 13) {
            provideAccesstoGroups();
        }
    });
});

$(document).on("click", "#add-groups-button", function () {
    var gridObj = $('#groups_grid').data("ejGrid");
    gridObj.clearSelection();
    $("#remove-groups-button").addClass("hide").removeClass("show");
    $("#grant-access-group-dialog").ejDialog("open");
});
function onAddGroupsDialogOpen() {
    selectedGroups = [];
    getGroupsWithoutAccess();
}

function onAddGroupsDialogClose() {
    var gridObj = $("#add_groups_grid").data("ejGrid");
    gridObj.clearSelection();
    gridObj.model.filterSettings.filteredColumns = [];
    gridObj.model.pageSettings.currentPage = 1;
    selectedGroups = [];
    $("#add-group-search").val("");
    $("#add-group-clear-search").css("display", "none");
    $(".search-icon").css("display", "block");
    $("#group-checkbox-header").prop("checked", false);
    $(".checkbox-row").prop("checked", false);
    $("#grant-access-group-dialog").ejDialog("close");
}

function fnCreate() {
    $("#group-checkbox-header").change(headerCheckboxOnChange);
}

function refreshTemplate() {
    $("#group-checkbox-header").change(headerCheckboxOnChange);
}

function getAppGroups() {
    var requestUrl = $("meta[name='ump-app-groups-link']").attr("content") + $("#application-id").val();
    $("#groups_grid").ejGrid({
        dataSource: ej.DataManager({ url: requestUrl, adaptor: "UrlAdaptor" }),
        gridLines: ej.Grid.GridLines.None,
        allowPaging: true,
        allowSorting: true,
        enableAltRow: false,
        allowSearching: true,
        allowSelection: true,
        allowFiltering: true,
        pageSettings: { pageSize: 20 },
        filterSettings: { filterType: "menu" },
        selectionType: ej.Grid.SelectionType.Multiple,
        allowKeyboardNavigation: false,
        selectionSettings: { selectionMode: ["row"] },
        rowSelecting: function () {
            this.multiSelectCtrlRequest = true;
        },
        enableRowHover: true,
        rowSelected: "onGroupRecordSelect",
        actionBegin: "fnOnGroupGridActionBegin",
        actionComplete: "fnOnGroupGridActionComplete",
        dataBound: function () {
            $('[data-toggle="tooltip"]').tooltip();
        },
        columns: [
             {
                 template: true,
                 templateID: "#group-profile-template",
                 width: 85,
                 headerTemplateID: "#name-header",
                 field: "Name",
                 type: "string"
             },
             {
                 field: "Description",
                 templateID: "#group-description-template",
                 headerTemplateID: "#description-header",
                 type: "string",
                 width: 140
             },
             {
                 field: "UsersCount",
                 template: true,
                 templateID: "#users-count-template",
                 allowSorting: false,
                 allowFiltering: false,
                 headerTemplateID: "#users-header",
                 textAlign: ej.TextAlign.Center,
                 width: (window.innerWidth > 1024) ? 40 : 80
             },
             {
                 visible: ($("#access-to-all-users").val() == false),
                 template: true,
                 allowSorting: false,
                 templateID: "#groups-command-template",
                 headerTemplateID: "#actions-header-for-group",
                 width: (window.innerWidth > 1024) ? 40 : 80
             }
        ]
    });
}

function onGroupRecordSelect(args) {
    var groupsGrid = $("#groups_grid").data("ejGrid");
    if (selectedGroupsArrayPushPopAllowed) {
        var index = jQuery.inArray(JSON.stringify(args.data.GroupId), $.map(selectedGroups, JSON.stringify));
        if (index == -1) {
            selectedGroups.push(args.data.GroupId);
        } else {
            selectedGroups.splice(index, 1);
        }
    }
    selectedGroupsArrayPushPopAllowed = true;
    if (selectedGroups.length >= 1) {
        $("#remove-groups-button").removeClass("hide").addClass("show");
    }
    else {
        $("#remove-groups-button").addClass("hide").removeClass("show");
    }
}

function fnOnGroupGridActionBegin(args) {
    var searchValue = $("#search-app-groups").val().trim();
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

function fnOnGroupGridActionComplete(args) {
    $('[data-toggle="tooltip"]').tooltip();
    var groupsGrid = $("#groups_grid").data("ejGrid");

    if (args.requestType === "paging" || args.requestType === "sorting") {
        if (typeof groupsGrid.model.currentViewData != 'undefined') {
            for (var i = 0; i < groupsGrid.model.currentViewData.length; i++) {
                var record = groupsGrid.model.currentViewData[i];
                var index = jQuery.inArray(JSON.stringify(record.GroupId), $.map(selectedGroups, JSON.stringify));
                if (index != -1) {
                    selectedGroupsArrayPushPopAllowed = false; //during pagination, pushpop operation should not be done for the groups that are selected already 
                    groupsGrid.selectRows(i);
                }
            }
        }
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedGroups = [];
    }

    if (groupsGrid.getSelectedRecords().length != 0) {
        $("#remove-groups-button").removeClass("hide").addClass("show");
    }
    else {
        $("#remove-groups-button").removeClass("show").addClass("hide");
    }
}

function headerCheckboxOnChange() {
    var gridObj = $("#add_groups_grid").data("ejGrid");
    gridGroupData = gridObj.model.currentViewData;
    if ($("#group-checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length);
        for (var i = 0; i < gridGroupData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridGroupData[i].GroupId), $.map(selectedGroups, JSON.stringify));
            if (index == -1) {
                selectedGroups.push(gridGroupData[i].GroupId);
            }
        }
        if (isSafari) {
            $(".checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
        for (var i = 0; i < gridGroupData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridGroupData[i].GroupId), $.map(selectedGroups, JSON.stringify));
            if (index != -1) {
                selectedGroups.splice(index, 1);
            }
        }
        if (isSafari) {
            $(".checkbox-header-label").removeClass("check");
        }
    }
    enableGrantAccessButton();
}

function groupRecordClick(args) {
    var gridObj = $("#add_groups_grid").data("ejGrid");
    var checkboxHeader = $("#group-checkbox-header");
    var isChecked = args.row.find(".checkbox-row").is(":checked");
    if (isChecked) {
        gridObj.multiSelectCtrlRequest = true;

        if (jQuery.inArray(JSON.stringify(args.data.GroupId), $.map(selectedGroups, JSON.stringify)) == -1) {
            selectedGroups.push(args.data.GroupId);
        } else {
            gridObj.selectRows(args.row.index());
        }
    }
    else {
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(args.row.index());
        var index = jQuery.inArray(JSON.stringify(args.data.GroupId), $.map(selectedGroups, JSON.stringify));
        if (index != -1) {
            selectedGroups.splice(index, 1);
            gridObj.selectRows(args.row.index());
        }
    }
    gridGroupData = gridObj.model.currentViewData;
    var groupRowCheckedCount = 0;
    for (i = 0; i <= gridGroupData.length - 1; i++) {
        if ($($("#add_groups_grid .checkbox-row")[i]).is(":checked") == true) {
            groupRowCheckedCount = groupRowCheckedCount + 1;
        }
    }
    if (gridObj.getRows() != null) {
        if ((gridGroupData.length) === groupRowCheckedCount)
            checkboxHeader.prop("checked", true);
        else
            checkboxHeader.prop("checked", false);
    }
    enableGrantAccessButton();
}

function enableGrantAccessButton() {
    $("#grant-access-button").attr("disabled", selectedGroups.length == 0);
}

function getGroupsWithoutAccess() {
    var requestUrl = $("meta[name='add-app-groups-link']").attr("content") + $("#application-id").val();
    $("#add_groups_grid").ejGrid({
        dataSource: ej.DataManager({ url: requestUrl, adaptor: "UrlAdaptor" }),
        gridLines: ej.Grid.GridLines.None,
        allowPaging: true,
        allowSorting: true,
        enableAltRow: false,
        allowSearching: true,
        allowSelection: true,
        allowFiltering: true,
        pageSettings: { pageSize: 20 },
        filterSettings: { filterType: "menu" },
        selectionType: ej.Grid.SelectionType.Multiple,
        selectionSettings: { selectionMode: ["row"] },
        enableRowHover: true,
        create: "fnCreate",
        recordClick: "groupRecordClick",
        templateRefresh: "refreshTemplate",
        actionBegin: "fnOnAddGroupGridActionBegin",
        actionComplete: "fnOnAddGroupGridActionComplete",
        rowDataBound: function () {
            var height = $(".e-gridcontent").height();
            if (height != null) {
                rowBound();
            }
        },
        dataBound: function () {
            $('[data-toggle="tooltip"]').tooltip();
        },
        columns: [
             {
                 headerTemplateID: "#group-checkbox-header-template",
                 template: true,
                 templateID: "#group-checkbox-row-template",
                 textAlign: ej.TextAlign.Center,
                 width: 35,
                 allowFiltering: false
             },
             {
                 template: true,
                 templateID: "#group-profile-template",
                 width: 135,
                 headerTemplateID: "#name-header",
                 field: "Name",
                 type: "string"
             },
             {
                 field: "Description",
                 templateID: "#group-description-template",
                 headerTemplateID: "#description-header",
                 type: "string",
                 width: 155
             },
             {
                 field: "UsersCount",
                 template: true,
                 templateID: "#users-count-template",
                 allowSorting: false,
                 allowFiltering: false,
                 headerTemplateID: "#users-header",
                 textAlign: ej.TextAlign.Center,
                 width: 100
             }
        ]
    });
}

function fnOnAddGroupGridActionBegin(args) {
    var searchValue = $("#add-group-search").val();
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

function fnOnAddGroupGridActionComplete(args) {
    var gridObj = $("#add_groups_grid").data("ejGrid");
    var checkboxHeader = $("#group-checkbox-header");
    checkboxHeader.prop("disabled", true).change(headerCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType === "paging" || args.requestType === "sorting") {
        if (typeof gridObj.model.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.GroupId;
                var index = jQuery.inArray(JSON.stringify(record.GroupId), $.map(selectedGroups, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_groups_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_groups_grid .checkbox-row#group-row-check" + rowUniId).prop("checked", true);
                    gridObj.selectRows(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length === 0);
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedGroups = [];
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length == 0);
    }
    if (args.requestType === "paging" || args.requestType === "sorting" || args.requestType === "refresh" || args.requestType === "filtering") {
        if ((gridObj.model.selectedRecords.length) == gridObj.model.currentViewData.length) {
            checkboxHeader.prop("checked", true);
        } else {
            checkboxHeader.prop("checked", false);
        }
    }

    enableGrantAccessButton();
    $('[data-toggle="tooltip"]').tooltip();
}

function provideAccesstoGroups() {
    var requestUrl = $("meta[name='provide-app-access-group-link']").attr("content") + $("#application-id").val();
    if (selectedGroups.length > 0) {
        showWaitingPopup("add_groups_grid");
        $.ajax({
            type: "POST",
            data: { selectedGroups: selectedGroups },
            url: requestUrl,
            success: function (result) {
                hideWaitingPopup("add_groups_grid");
                $("#grant-access-button").attr("disabled", "disabled");
                var gridObj = $("#add_groups_grid").data("ejGrid");
                gridObj.clearSelection();
                gridObj.model.pageSettings.currentPage = 1;
                selectedGroups = [];
                gridObj.refreshContent();
                var groupGridObj = $("#groups_grid").data("ejGrid");
                groupGridObj.refreshContent();
                onAddGroupsDialogClose();
                if (result.status) {
                    var content = "Granted access to " + result.count + " group(s) successfully.";
                    SuccessAlert("Application Access Granted", content, 7000);
                } else {
                    var message = "Error while granting access to groups.";
                    WarningAlert("Application Access Granted", message, 7000);
                }
            }
        });
    }
}

function removeGroupAccess(groups) {
    var requestUrl = $("meta[name='remove-app-access-group-link']").attr("content") + $("#application-id").val();
    if (groups.length > 0) {
        showWaitingPopup("group-remove-confirmation");
        $.ajax({
            type: "POST",
            data: { selectedGroups: groups },
            url: requestUrl,
            success: function (result) {
                hideWaitingPopup("group-remove-confirmation");
                var gridObj = $("#groups_grid").data("ejGrid");
                gridObj.clearSelection();
                gridObj.model.pageSettings.currentPage = getCurrentPageNumber(gridObj.model.pageSettings.pageSize, selectedGroups.length, gridObj.model.pageSettings.totalRecordsCount, gridObj.model.pageSettings.currentPage);
                selectedGroups = [];
                gridObj.refreshContent();
                $("#remove-groups-button").removeClass("show").addClass("hide");
                $("#group-remove-confirmation").ejDialog("close");
                if (result.status) {
                    var content = "Revoked access for " + result.count + " group(s) successfully.";
                    SuccessAlert("Application Access Revoked", content, 7000);
                } else {
                    var message = "Error while revoking access to groups.";
                    WarningAlert("Application Access Revoked", message, 7000);
                }
                singleGroupSelected = false;
            }
        });
    }
}

$(document).on("click", ".remove-group-access", function () {
    singleGroupSelectedId = $(this).attr("data-group-id");
    $("#group-remove-confirmation").ejDialog("open");
    singleGroupSelected = true;
});

$(document).on("click", ".group-remove-confirm-button", function () {
    if (singleGroupSelected) {
        groups = singleGroupSelectedId;
    } else {
        groups = selectedGroups;
    }
    removeGroupAccess(groups);
});

$(document).on("click", "#remove-groups-button", function () {
    $("#group-remove-confirmation").ejDialog("open");
});

function onGroupRemoveDialogClose() {
    $("#group-remove-confirmation").ejDialog("close");
}

$(document).keyup(function (e) {
    if (e.keyCode == 27) { // Esc
        selectedGroups.length = 0;
        $("#remove-groups-button").addClass("hide").removeClass("show");
    }
});