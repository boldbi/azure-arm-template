var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

$(document).ready(function () {
    if (isSafari) {
        $("#search-tenant-users").css("width", "1px");
    }

    $(document).on("keydown", "#search-tenant-users", function (e) {
        $("#validation-user-error").hide();
        $.xhrPool.abortAll();
        var currentKeyCode = parseInt(e.which);
        var element = "#" + this.id;
        if (timeOut != null) {
            clearTimeout(timeOut);
            timeOut = null;
        }
        if (currentKeyCode === keyCode.Enter) {
            PerformSearch(element);
        }
        else if (excludedSearchKeys.indexOf(currentKeyCode) === -1) {
            timeOut = setTimeout(function () {
                PerformSearch(element);
            }, 900);
        }
    });
});

function listUsersForAdminSelection() {
    var requestUrl = getAllUsersUrl;
    $("#add_admins_grid").ejGrid({
        dataSource: ej.DataManager({ url: requestUrl + "?externalFilter=true", adaptor: "UrlAdaptor" }),
        gridLines: ej.Grid.GridLines.None,
        allowSorting: true,
        allowSelection: true,
        enableAltRow: false,
        allowScrolling: true,
        scrollSettings: { height: gridHeight - (140 + $("#header-description").outerHeight()), allowVirtualScrolling: true },
        selectionType: ej.Grid.SelectionType.Multiple,
        selectionSettings: { selectionMode: ["row"] },
        pageSettings: { pageSize: 25 },
        enableRowHover: true,
        create: "fnCreateForAdmin",
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
                templateID: "#admin-template",
                headerText: window.TM.App.LocalizationContent.Name,
                width: 115,
                headerTemplateID: "#admin-header",
                field: "DisplayName",
                type: "string"
            }
        ]
    });
}

function fnCreateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

$(document).on("change", ".checkbox-row", function () {
    var checkBoxList = $(".checkbox-row");
    var index = checkBoxList.index(this);
    var isChecked = $(this).is(":checked")
    $("#validation-user-error").hide();
    var gridObj = $("#add_admins_grid").data("ejGrid");
    var checkboxHeader = $("#admin-checkbox-header");
    $(".modal-dialog").addClass("fixed-pos");
    window.setTimeout('$(".modal-dialog").removeClass("fixed-pos");', 1);
    var currentEmail = $(this).attr("data-email");

    if (isChecked) {
        selectedAdmins.push(currentEmail);
        previousIndex.push(index);
        gridObj.selectRows(previousIndex, index);
    }
    else {
        var arrayIndex = selectedAdmins.indexOf(currentEmail);
        var previousArrayIndex = previousIndex.indexOf(index)
        selectedAdmins.splice(arrayIndex, 1);
        previousIndex.splice(previousArrayIndex, 1);
        gridObj.selectRows(previousIndex);
    }
    gridAdminData = gridObj.model.currentViewData;
    var userRowCheckedCount = 0;
    for (i = 0; i <= gridAdminData.length - 1; i++) {
        if ($($("#add_admins_grid .checkbox-row")[i]).is(":checked") == true) {
            userRowCheckedCount = userRowCheckedCount + 1;
        }
    }
    if (gridObj.getRows() != null) {
        checkboxHeader.prop("checked", gridAdminData.length === userRowCheckedCount);
    }
    enableAccessButtonForAdmin();
});

function fnOnAddAdminGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-tenant-users").val();
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
    if (args.requestType == "paging" || args.requestType == "sorting" || args.requestType == "refresh" || args.requestType == "filtering" || args.requestType == "searching") {
        if (gridObj.model.currentViewData.length == 0) {
            checkboxHeader.prop("checked", false);
            checkboxHeader.prop("disabled", true);
            $(".no-user-warning").css("display", "block");
            window.setTimeout('$("#admin-account-submit-container").css("margin-top", $("#add_admins_grid").height() + $(".no-user-warning").height() + 155);');
        } else {
            $(".no-user-warning").css("display", "none");
            window.setTimeout('$("#admin-account-submit-container").css("margin-top", $("#add_admins_grid").height() + 135);');
        }
        if (typeof gridObj.model.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.UserId;
                var index = jQuery.inArray(JSON.stringify(record.Email), $.map(selectedAdmins, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_admins_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_admins_grid .checkbox-row#admin-row-check" + rowUniId).prop("checked", true);
                    gridObj.selectRows(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length == 0);
    }

    if (args.requestType === "paging" || args.requestType === "sorting" || args.requestType === "refresh" || args.requestType === "filtering") {
        if ((gridObj.model.selectedRecords.length) == gridObj.model.currentViewData.length && gridObj.model.currentViewData.length > 0) {
            checkboxHeader.prop("checked", true);
        } else {
            checkboxHeader.prop("checked", false);
        }
    }

    enableAccessButtonForAdmin();
    $("[data-toggle='tooltip']").tooltip();
    window.setTimeout('hideWaitingPopup($(".model-body"));', 500);
}

function refreshTemplateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

function headCheckboxOnChangeForAdmin() {
    $("#validation-user-error").hide();
    var gridObj = $("#add_admins_grid").data("ejGrid");
    if ($("#admin-checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length);
        gridAdminData = gridObj.model.currentViewData;
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].Email), $.map(selectedAdmins, JSON.stringify));
            if (index == -1) {
                selectedAdmins.push(gridAdminData[i].Email);
            }
        }

        if (isSafari) {
            $(".admin-checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
        gridAdminData = gridObj.model.currentViewData;
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].Email), $.map(selectedAdmins, JSON.stringify));
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

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
    }
}

function onAddAdminsDialogClose() {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    gridObj.clearSelection();
    selectedAdmins = [];
    $(".admin-checkbox-header").prop("checked", false);
    $(".checkbox-row").prop("checked", false);
}

$(document).on("click", ".su-search", function () {
    $("#validation-user-error").hide();
    $("#search-tenant-users").addClass("search-width");
    $(".close-icon").css("display", "block");
    $(".su-search").css("display", "none");
    $(".placeholder").removeClass("hide").addClass("show");
});

$(document).on("click", "#clear-search", function () {
    $("#validation-user-error").hide();
    $("#search-tenant-users").removeClass("search-width");
    $(".close-icon").css("display", "none");
    $(".su-search").css("display", "block");
    $(".placeholder").removeClass("show").addClass("hide");
    var gridObj = $("#add_admins_grid").data("ejGrid");
    gridObj.clearSelection();
    selectedAdmins = [];
	gridHeight = 500;
    listUsersForAdminSelection();
    gridObj.refreshContent();
});

$(document).on("click", ".e-filtericon", function () {
    $(".e-caption").addClass("pull-left");
});

$(document).on("click", ".sort", function () {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    showWaitingPopup($(".model-body"));
    var sorting = $("#order").attr("data-value");
    if (gridObj != undefined) {
        gridObj.model.sortSettings.sortedColumns = [{ field: "Name", direction: sorting }];
        gridObj.refreshContent();
        if (sorting == "ascending") {
            $("#order").attr("data-value", "descending");
            $("#order").attr("data-original-title", "Sort by descending");
        } else {
            $("#order").attr("data-value", "ascending");
            $("#order").attr("data-original-title", "Sort by ascending");
        }
        window.setTimeout('hideWaitingPopup($(".model-body"));', 500);
    }
});