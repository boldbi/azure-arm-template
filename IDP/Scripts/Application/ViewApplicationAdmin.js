var selectedAdmins = [];
var gridAdminData = [];
var admins = [];
var selectedAdminArrayPushPopAllowed = true;
var singleAdminRemove = false;
var singleAdminSelectedId;

function onAddAdminsDialogClose() {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    gridObj.clearSelection();
    gridObj.model.filterSettings.filteredColumns = [];
    gridObj.model.pageSettings.currentPage = 1;
    selectedAdmins = [];
    $("#add-admin-search").val("");
    $("#add-admin-clear-search").css("display", "none");
    $(".search-icon").css("display", "block");
    $(".admin-checkbox-header").prop("checked", false);
    $(".checkbox-row").prop("checked", false);
    $("#add-admins-dialog").ejDialog("close");
}

function onAddAdminsDialogOpen() {
    selectedAdmins = [];
    getUsersForAdminAccess();
}

function fnOnAdminGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-app-admins").val();
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

function fnOnAddAdminGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#add-admin-search").val();
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

function fnOnAddAdminGridActionComplete(args) {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    var checkboxHeader = $("#admin-checkbox-header");
    checkboxHeader.prop("disabled", true).change(headCheckboxOnChangeForAdmin);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType == "paging" || args.requestType == "sorting") {
        if (typeof gridObj.model.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.UserId;
                var index = jQuery.inArray(JSON.stringify(record.UserId), $.map(selectedAdmins, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_admins_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_admins_grid .checkbox-row#admin-row-check" + rowUniId).prop("checked", true);
                    gridObj.selectRows(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length == 0);
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedAdmins = [];
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length == 0);
    }
    if (args.requestType === "paging" || args.requestType === "sorting" || args.requestType === "refresh" || args.requestType === "filtering") {
        if ((gridObj.model.selectedRecords.length) == gridObj.model.currentViewData.length) {
            checkboxHeader.prop("checked", true);
        } else {
            checkboxHeader.prop("checked", false);
        }
    }

    enableAccessButtonForAdmin();
    $("[data-toggle='tooltip']").tooltip();
}

function fnOnAdminGridActionComplete(args) {
    $("[data-toggle='tooltip']").tooltip();
    var gridObj = $("#admins_grid").data("ejGrid");

    if (args.requestType == "paging" || args.requestType == "sorting") {
        if (typeof gridObj.model.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var index = jQuery.inArray(JSON.stringify(record.UserId), $.map(selectedAdmins, JSON.stringify));
                if (index != -1) {
                    selectedAdminsArrayPushPopAllowed = false; //during pagination, while retaining the selected admin users, pushpop operation should not be done for the admin users selected already 
                    gridObj.selectRows(i);
                }
            }
        }
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedAdmins = [];
    }

    if (gridObj.getSelectedRecords().length != 0) {
        $("#remove-admins-button").removeClass("hide").addClass("show");
    }
    else {
        $("#remove-admins-button").removeClass("show").addClass("hide");
    }
}

function getUsersForAdminAccess() {
    var requestUrl = $("meta[name='add-ump-app-admins-link']").attr("content") + $("#application-id").val();
    $("#add_admins_grid").ejGrid({
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
        create: "fnCreateForAdmin",
        recordClick: "onAddAdminRecordClick",
        templateRefresh: "refreshTemplateForAdmin",
        actionBegin: "fnOnAddAdminGridActionBegin",
        actionComplete: "fnOnAddAdminGridActionComplete",
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
                 headerTemplateID: "#admin-checkbox-header-template",
                 template: true,
                 templateID: "#admin-checkbox-row-template",
                 textAlign: ej.TextAlign.Center,
                 width: 15,
                 allowFiltering: false
             },
              {
                  template: true,
                  templateID: "#user-name-template",
                  headerText: "Name",
                  width: 115,
                  headerTemplateID: "#user-name-header",
                  field: "DisplayName",
                  type: "string"
              },
             {
                 template: true,
                 field: "Email",
                 templateID: "#email-template",
                 headerText: "Email Address",
                 headerTemplateID: "#user-email-header",
                 type: "string",
                 width: 155
             }
        ]
    });
}

function onAddAdminRecordClick(args) {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    var checkboxHeader = $("#admin-checkbox-header");
    var isChecked = args.row.find(".checkbox-row").is(":checked");
    if (isChecked) {
        gridObj.multiSelectCtrlRequest = true;

        if (jQuery.inArray(JSON.stringify(args.data.UserId), $.map(selectedAdmins, JSON.stringify)) == -1) {
            selectedAdmins.push(args.data.UserId);
        } else {
            gridObj.selectRows(args.row.index());
        }
    }
    else {
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(args.row.index());
        var index = jQuery.inArray(JSON.stringify(args.data.UserId), $.map(selectedAdmins, JSON.stringify));
        if (index != -1) {
            selectedAdmins.splice(index, 1);
            gridObj.selectRows(args.row.index());
        }
    }
    gridAdminData = gridObj.model.currentViewData;
    var adminRowCheckedCount = 0;
    for (i = 0; i <= gridAdminData.length - 1; i++) {
        if ($($("#add_admins_grid .checkbox-row")[i]).is(":checked") == true) {
            adminRowCheckedCount = adminRowCheckedCount + 1;
        }
    }
    if (gridObj.getRows() != null) {
        if ((gridAdminData.length) === adminRowCheckedCount)
            checkboxHeader.prop("checked", true);
        else
            checkboxHeader.prop("checked", false);
    }
    enableAccessButtonForAdmin();
}

function fnCreateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

function refreshTemplateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

function headCheckboxOnChangeForAdmin() {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    gridAdminData = gridObj.model.currentViewData;
    if ($("#admin-checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length);
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].UserId), $.map(selectedAdmins, JSON.stringify));
            if (index == -1) {
                selectedAdmins.push(gridAdminData[i].UserId);
            }
        }
        if (isSafari) {
            $(".admin-checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].UserId), $.map(selectedAdmins, JSON.stringify));
            if (index != -1) {
                selectedAdmins.splice(index, 1);
            }
        }
        if (isSafari) {
            $(".admin-checkbox-header-label").removeClass("check");
        }
    }
    enableAccessButtonForAdmin();
}

function enableAccessButtonForAdmin() {
    $("#provide-admin-access-button").attr("disabled", selectedAdmins.length === 0);
}

function provideAccessstoAdmins() {
    var requestUrl = $("meta[name='provide-admin-access-link']").attr("content") + $("#application-id").val();
    if (selectedAdmins.length > 0) {
        showWaitingPopup("add_admins_grid");
        $.ajax({
            type: "POST",
            data: { selectedAdmins: selectedAdmins },
            url: requestUrl,
            success: function (result) {
                hideWaitingPopup("add_admins_grid");
                $("#provide-admin-access-button").attr("disabled", "disabled");
                var gridObj = $("#add_admins_grid").data("ejGrid");
                gridObj.clearSelection();
                gridObj.model.pageSettings.currentPage = 1;
                selectedAdmins = [];
                gridObj.refreshContent();
                var adminGridObj = $("#admins_grid").data("ejGrid");
                adminGridObj.refreshContent();
                onAddAdminsDialogClose();
                if (result.status) {
                    var content = "Granted administrative access to " + result.count + " user(s) successfully.";
                    SuccessAlert("Application Administrative Access Granted", content, 7000);
                } else {
                    var message = "Error while granting administrative access to users.";
                    WarningAlert("Application Administrative Access Granted", message, 7000);
                }
            }
        });
    }
}

function getAppAdmins() {
    var requestUrl = $("meta[name='ump-app-admins-link']").attr("content") + $("#application-id").val();
    $("#admins_grid").ejGrid({
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
        allowKeyboardNavigation: false,
        rowSelecting: function () {
            this.multiSelectCtrlRequest = true;
        },
        enableRowHover: true,
        rowSelected: "onAdminRecordSelect",
        actionBegin: "fnOnAdminGridActionBegin",
        actionComplete: "fnOnAdminGridActionComplete",
        rowDataBound: function () {
            var height = $(".e-gridcontent").height();
            if (height != null) {
                rowBound();
            }
        },
        dataBound: function (args) {
            $("[data-toggle='tooltip']").tooltip();
        },
        columns: [
             {
                 template: true,
                 templateID: "#user-profile-template",
                 headerText: "Name",
                 width: 115,
                 headerTemplateID: "#username-header",
                 field: "DisplayName",
                 type: "string"
             },
             {
                 field: "Email",
                 templateID: "#user-email-template",
                 headerText: "Email Address",
                 headerTemplateID: "#email-header",
                 type: "string",
                 width: 155
             },
             {
                 template: true,
                 allowSorting: false,
                 headerText: "Actions",
                 templateID: "#admincommandstemplate",
                 headerTemplateID: "#actionsheader",
                 width: (window.innerWidth > 1024) ? 40 : 80
             }
        ]
    });
}

$(document).on("click", "#remove-admins-button", function () {
    $("#admin-remove-confirmation").ejDialog("open");
});

function onAdminRecordSelect(args) {
    var index = jQuery.inArray(JSON.stringify(args.data.UserId), $.map(selectedAdmins, JSON.stringify));
    if (selectedAdminArrayPushPopAllowed) {
        var index = jQuery.inArray(JSON.stringify(args.data.UserId), $.map(selectedAdmins, JSON.stringify));
        if (index == -1) {
            selectedAdmins.push(args.data.UserId);
        } else {
            selectedAdmins.splice(index, 1);
        }
    }
    selectedAdminArrayPushPopAllowed = true;
    if (selectedAdmins.length >= 1) {
        $("#remove-admins-button").removeClass("hide").addClass("show");
    }
    else {
        $("#remove-admins-button").addClass("hide").removeClass("show");
    }
}

$(document).on("click", ".delete-admin-permission", function () {
    singleAdminSelectedId = $(this).attr("data-admin-id");
    $("#admin-remove-confirmation").ejDialog("open");
    singleAdminRemove = true;
});

function onAdminRemoveDialogClose() {
    $("#admin-remove-confirmation").ejDialog("close");
}

$(document).on("click", ".admin-remove-confirm-button", function () {
    if (singleAdminRemove) {
        admins = singleAdminSelectedId;
    } else {
        admins = selectedAdmins;
    }
    removeAdminAccess(admins);
});

function removeAdminAccess(admins) {
    var requestUrl = $("meta[name='remove-admin-access-link']").attr("content") + $("#application-id").val();
    if (admins.length > 0) {
        showWaitingPopup("admin-remove-confirmation");
        $.ajax({
            type: "POST",
            data: { selectedAdmins: admins },
            url: requestUrl,
            success: function (result) {
                hideWaitingPopup("admin-remove-confirmation");
                var adminGridObj = $("#admins_grid").data("ejGrid");
                adminGridObj.clearSelection();
                adminGridObj.model.pageSettings.currentPage = getCurrentPageNumber(adminGridObj.model.pageSettings.pageSize, selectedAdmins.length, adminGridObj.model.pageSettings.totalRecordsCount, adminGridObj.model.pageSettings.currentPage);
                selectedAdmins = [];
                adminGridObj.refreshContent();
                $("#remove-admins-button").removeClass("show").addClass("hide");
                $("#admin-remove-confirmation").ejDialog("close");
                if (result.status) {
                    var content = "Revoked administrative access for " + result.count + " user(s) successfully.";
                    SuccessAlert("Application Administrative Access Revoked", content, 7000);
                } else {
                    var message = "Error while revoking administrative access to users.";
                    WarningAlert("Application Administrative Access Revoked", message, 7000);
                }
                singleAdminRemove = false;
            }
        });
    }
}