var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
var addAdminsGrid;

$(document).ready(function () {
    createWaitingPopup('add-admin-element');

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
    var data = new ejs.data.DataManager({ url: requestUrl + "?externalFilter=true", adaptor: new ejs.data.UrlAdaptor() });
    if (document.getElementById('add_admins_grid').ej2_instances == null) {
        addAdminsGrid = new ejs.grids.Grid({
            dataSource: data,
            gridLines: 'None',
            allowSorting: true,
            allowSelection: true,
            allowPaging: false,
            enableAltRow: false,
            enableInfiniteScrolling: true,
            pageSettings: { pageSize: 25 },
            height: gridHeight - (140 + $("#header-description").outerHeight()),
            width: 'auto',
            selectionSettings: {Type : 'Multiple'},
            enableHover: true,
            load: fnOnAddAdminGridActionBegin,
            actionBegin: fnOnAddAdminGridActionBegin,
            actionComplete: fnOnAddAdminGridActionComplete,
            rowDataBound: function () {
                var height = $(".e-gridcontent").height();
                if (height != null) {
                    rowBound();
                }
            },
            dataBound: function (args) {
                $('[data-toggle="tooltip"]').tooltip(
                    {
                        container: 'body'
                    });
            },
            columns: [
                {
                    headerTemplate: "#admin-checkbox-header-template",
                    template: "#admin-checkbox-row-template",
                    width: 15,
                    allowFiltering: false
                },
                {
                    template: "#admin-template",
                    headerText: window.TM.App.LocalizationContent.Name,
                    width: 115,
                    headerTemplate: "#admin-header",
                    field: "DisplayName",
                    type: "string"
                }
            ]
        });
        addAdminsGrid.appendTo("#add_admins_grid");
    }
}

function fnCreateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

$(document).on("change", ".checkbox-row", function () {
    var checkBoxList = $(".checkbox-row");
    var index = checkBoxList.index(this);
    var isChecked = $(this).is(":checked")
    $("#validation-user-error").hide();
    var gridObj = document.getElementById('add_admins_grid').ej2_instances[0];
    var checkboxHeader = $("#admin-checkbox-header");
    $(".modal-dialog").addClass("fixed-pos");
    window.setTimeout('$(".modal-dialog").removeClass("fixed-pos");', 1);
    var currentUsername = $(this).attr("data-username");

    if (isChecked) {
        selectedAdmins.push(currentUsername);
        previousIndex.push(index);
        gridObj.selectionModule.selectRows(previousIndex, index);
    }
    else {
        var arrayIndex = selectedAdmins.indexOf(currentUsername);
        var previousArrayIndex = previousIndex.indexOf(index)
        selectedAdmins.splice(arrayIndex, 1);
        previousIndex.splice(previousArrayIndex, 1);
        gridObj.selectionModule.selectRows(previousIndex);
    }
    gridAdminData = gridObj.currentViewData;
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
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnOnAddAdminGridActionComplete(args) {
    var gridObj = document.getElementById('add_admins_grid').ej2_instances[0];
    var checkboxHeader = $("#admin-checkbox-header");
    checkboxHeader.prop("disabled", true).change(headCheckboxOnChangeForAdmin);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType == "paging" || args.requestType == "sorting" || args.requestType == "refresh" || args.requestType == "filtering" || args.requestType == "searching") {
        if (gridObj.currentViewData.length == 0) {
            checkboxHeader.prop("checked", false);
            checkboxHeader.prop("disabled", true);
            $(".no-user-warning").css("display", "block");
            window.setTimeout('$("#admin-account-submit-container").css("margin-top", $("#add_admins_grid").height() + $(".no-user-warning").height() + 155);');
        } else {
            $(".no-user-warning").css("display", "none");
            window.setTimeout('$("#admin-account-submit-container").css("margin-top", $("#add_admins_grid").height() + 135);');
        }
        if (typeof gridObj.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.currentViewData.length; i++) {
                var record = gridObj.currentViewData[i];
                var rowUniId = record.UserId;
                var index = jQuery.inArray(JSON.stringify(record.Username), $.map(selectedAdmins, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_admins_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_admins_grid .checkbox-row#admin-row-check" + rowUniId).prop("checked", true);
                    gridObj.selectionModule.selectRow(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.currentViewData.length == 0);
    }

    if (args.requestType === "paging" || args.requestType === "sorting" || args.requestType === "refresh" || args.requestType === "filtering") {
        if ((gridObj.getSelectedRecords().length) == gridObj.currentViewData.length && gridObj.currentViewData.length > 0) {
            checkboxHeader.prop("checked", true);
        } else {
            checkboxHeader.prop("checked", false);
        }
    }

    enableAccessButtonForAdmin();
    $("[data-toggle='tooltip']").tooltip();
    window.setTimeout('hideWaitingPopup("add-admin-element");', 500);
}

function refreshTemplateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

function headCheckboxOnChangeForAdmin() {
    $("#validation-user-error").hide();
    var gridObj = document.getElementById('add_admins_grid').ej2_instances[0];
    if ($("#admin-checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length);
        gridAdminData = gridObj.currentViewData;
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].Username), $.map(selectedAdmins, JSON.stringify));
            if (index == -1) {
                selectedAdmins.push(gridAdminData[i].Username);
            }
        }

        if (isSafari) {
            $(".admin-checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
        gridAdminData = gridObj.currentViewData;
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].Username), $.map(selectedAdmins, JSON.stringify));
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
    var gridObj = document.getElementById('add_admins_grid').ej2_instances[0];
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
    var gridObj = document.getElementById("add_admins_grid").ej2_instances[0];
    gridObj.clearSelection();
    selectedAdmins = [];
	gridHeight = 500;
    listUsersForAdminSelection();
    gridObj.refresh();
});

$(document).on("click", ".e-filtericon", function () {
    $(".e-caption").addClass("pull-left");
});

$(document).on("click", ".sort", function () {
    var gridObj = document.getElementById('add_admins_grid').ej2_instances[0];
    showWaitingPopup('add-admin-element');
    var sorting = $("#order").attr("data-value");
    if (gridObj != undefined) {
        addAdminsGrid.sortColumn('DisplayName', sorting, false);
        gridObj.refresh();
        if (sorting == "ascending") {
            $("#order").attr("data-value", "descending");
            $("#order").attr("data-original-title", "Sort by descending");
        } else {
            $("#order").attr("data-value", "ascending");
            $("#order").attr("data-original-title", "Sort by ascending");
        }
        hideWaitingPopup('add-admin-element');
    }
});