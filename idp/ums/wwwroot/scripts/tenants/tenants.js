var browser = ej.browserInfo();

$(function () {

    var d = new Date();

    var timeZoneCookie = getAppCookie("app:timezone");

    var timeZones = [
        { text: "UTC", value: "UTC" },
        { text: "EST", value: "EST" },
        { text: "IST", value: "IST" }
    ];

    var defaultTimeZone = 1;

    for (var i = 0; i < timeZones.length; i++) {
        if (timeZoneCookie === timeZones[i].value) {
            defaultTimeZone = i;
        }
    }

    $('#appstatus').ejDropDownList({
        dataSource: appStatus,
        enableFilterSearch: true,
        fields: { text: "status" },
        watermarkText: "Select App Status",
        showCheckbox: true,
        value: selectedAppStatus,
        change: "onFilterChange",
        selected: true,
        minPopupHeight: "315px",
        width: "275px"
    });

    $("#timezone-filter").ejDropDownList({
        dataSource: timeZones,
        enableFilterSearch: false,
        fields: { text: "text" },
        watermarkText: "Select Time Zone",
        showCheckbox: false,
        change: "onTimeZoneChange",
        selectedIndex: defaultTimeZone,
        selected: true,
        width: "175px"
    });

    $("#plan-filter").ejDropDownList({
        dataSource: plans,
        enableFilterSearch: true,
        fields: { text: "status" },
        allowGrouping: isBoldBi.toLowerCase() === "true",
        watermarkText: "Select Plan",
        showCheckbox: true,
        change: "onFilterChange",
        selected: true,
        minPopupHeight: isBoldBi.toLowerCase() === "true" ? "315px" : "223px",
        width: "275px"
    });

    if (isBoldBi.toLowerCase() === "true") {
        var planDropDownList = $("#plan-filter").data("ejDropDownList");
        planDropDownList.option({ "fields": { text: "status", category: "type" } });
    }

    $("#tenant-type-filter").ejDropDownList({
        dataSource: tenantType,
        enableFilterSearch: true,
        fields: { text: "status" },
        watermarkText: "Select Product",
        showCheckbox: true,
        change: "onFilterChange",
        selected: true,
        width: "275px"
    });

    //$('#datetype').ejDropDownList({
    //    dataSource: dateType,
    //    fields: { text: "status" },
    //    watermarkText: "Select Date Type",
    //    selectedIndex: (selectedDateType - 1),
    //    width: "100%"
    //});

    $("#start-timepicker").ejDateTimePicker({
        allowEdit: false,
        value: filterStartTime
    });

    $("#end-timepicker").ejDateTimePicker({
        allowEdit: false,
        value: filterEndTime
    });

    $("#get_item_link").ejDialog({
        width: (window.innerWidth > 460) ? "450px" : (window.innerWidth - 10),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: "Get Link",
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: "onGetLinkDialogClose"
    });

    $("#tenant-dialog").ejDialog({
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        title: "Tenant",
        closeOnEscape: true,
        showOnInit: false,
        close: "onTenantDialogClose",
        open: "onTenantDialogOpen",
        width: (window.innerWidth > 460) ? "450px" : (window.innerWidth - 10)
    });

    $("#tenant-daterange").ejDateRangePicker({
        allowEdit: false,
        //enablePersistence: true,
        width: "275px",
        startDate: filterStartTime,
        endDate: filterEndTime,
        select: function (args) {
            onChangedDateRange(args);
        },
        ranges: [
            { label: "Today", range: [new Date(d.getFullYear(), d.getMonth(), d.getDate()), new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59)] },
            { label: "This Week", range: [new Date(new Date().setDate(new Date().getDate() - new Date().getDay())), new Date(new Date().setDate((new Date().getDate() - new Date().getDay()) + 6))] },
            { label: "This Month", range: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)] },
            { label: "Last Month", range: [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)] },
            { label: "Last 6 Months", range: [new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)] },
            { label: "This Year", range: [new Date(new Date().getFullYear(), 0), new Date(new Date().getFullYear(), 12, 0)] }
        ]
    });

    $(".rangeItem.e-custompic").html("Custom Range");
    $("#get_item_link_wrapper").ejWaitingPopup();
    $("#tenant-dialog_wrapper").ejWaitingPopup();
});

$(document).on("click", ".get-link", function (e) {
    var dbConnectionString = $(this).attr("data-db-url");

    $("#get_item_link").ejDialog("open");
    $("#get_item_link").show();
    $("#get_item_link_wrapper").ejWaitingPopup("show");
    $(".get_link").show();

    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").hide();
        $("#item-link").css({ width: "100%", borderRadius: "4px" });
        $("#item-link-copy").attr("data-original-title", "");
    }
    else {
        $("#item-link-copy").tooltip({
            animation: false
        });
        var maxIndex = getMaxZIndex() + 2;
        $("#get_item_link a.PopupClose").trigger('mouseover').mouseover(function () { $(".tooltip").css("z-index", maxIndex); });
        $("#get_item_link .report-name").removeAttr("title");
        $("#get_item_link .report-name").trigger('mouseover').mouseover(function () { $(".tooltip").css("z-index", maxIndex); });
    }

    if (dbConnectionString !== undefined && dbConnectionString !== null) {
        $(".container-link-div").hide();
        itemName = "Database Details";
        $(".report-name").html(itemName);
        $(".report-name").attr("data-original-title", itemName);
        $("#item-link").val(dbConnectionString.trim());
    }
    else {
        var blobConnectionString = $(this).attr("data-blob-url").trim();
        itemName = "Blob Details";
        var containerName = $(this).attr("data-container-name").trim();
        $(".report-name").html(itemName);
        $(".report-name").attr("data-original-title", itemName);
        $("#item-link").val(blobConnectionString);
        $("#container-name").val(containerName);
        $(".container-link-div").show();
    }

    $(".link-div").show();
    $("#item-link").select();
    $(".modal-footer .validation-area").css("display", "block");
    $("#get_item_link_wrapper").ejWaitingPopup("hide");
});

$(document).on("click", "#item-link-copy", function (e) {
    $("#item-link").select();
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").attr("data-original-title", "");
    }
    else {
        document.execCommand('copy');
        $("#item-link-copy").attr("data-original-title", "Copied");
        $("#item-link-copy").tooltip("hide").attr("data-original-title", "Copied").tooltip("fixTitle").tooltip("show");
        setTimeout(function () { $("#item-link-copy").attr("data-original-title", "Click to copy"); $("#item-link-copy").tooltip(); }, 3000);
    }
});

$(document).on("click", "#container-name-copy", function (e) {
    $("#container-name").select();
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#container-name-copy").removeClass("su su-copy");
        $("#container-name-copy").attr("data-original-title", "");
    }
    else {
        document.execCommand('copy');
        $("#container-name-copy").attr("data-original-title", "Copied");
        $("#container-name-copy").tooltip("hide").attr("data-original-title", "Copied").tooltip("fixTitle").tooltip("show");
        setTimeout(function () { $("#container-name-copy").attr("data-original-title", "Click to copy"); $("#container-name-copy").tooltip(); }, 3000);
    }
});

$(document).on("click", "#copy-db-connectionstring", function () {
    $("#tenant-db-connectionstring").select();
    document.execCommand("copy");
    $(this).attr("data-original-title", "Copied");
    $("#copy-db-connectionstring").tooltip("hide").attr("data-original-title", "Copied").tooltip("fixTitle").tooltip("show");
    setTimeout(function () {
        $("#copy-db-connectionstring").attr("data-original-title", "Copy to clipboard");
        $("#copy-db-connectionstring").tooltip();
    }, 3000);
});

$(document).on("click", "#copy-blob-connectionstring", function () {
    $("#tenant-blob-connectionstring").select();
    document.execCommand("copy");
    $(this).attr("data-original-title", "Copied");
    $("#copy-blob-connectionstring").tooltip("hide").attr("data-original-title", "Copied").tooltip("fixTitle").tooltip("show");
    setTimeout(function () {
        $("#copy-blob-connectionstring").attr("data-original-title", "Copy to clipboard");
        $("#copy-blob-connectionstring").tooltip();
    }, 3000);
});

$(document).on("click", "#tenant-db-connectionstring", function () {
    $("#tenant-db-connectionstring").select();
});

$(document).on("click", "#tenant-blob-connectionstring", function () {
    $("#tenant-blob-connectionstring").select();
});

$(document).on("click", ".popup-close", function () {
    onTenantDialogClose();
});

$(document).on("click", "#clear-search, #apply-filter", function () {
    var gridObj = $("#items").data("ejGrid");
    gridObj.refreshContent();
});

$(document).on("click", "#action-button", function (e) {

    var gridObj = $("#items").data("ejGrid");
    $("#tenant-dialog_wrapper").ejWaitingPopup("show");
    var action = $("#tenant-action").val();
    var tenantId = $("#tenant-id").val();
    var dns = $("#tenant-dns").val();


    var actionUrl = "";

    if (action === "activate") {
        actionUrl = activateTenantUrl;
    }
    else if (action === "suspend") {
        actionUrl = suspendTenantUrl;
    }
    else if (action === "delete") {
        actionUrl = deleteTenantUrl;
    }
    else if (action === "mark-as-internal") {
        actionUrl = markorremoveInternalUrl;
        var isInternal = true
    }
    else if (action === "remove-from-internal") {
        actionUrl = markorremoveInternalUrl;
        var isInternal = false
    }


    $.ajax({
        type: "POST",
        url: actionUrl,
        data: { tenantId: tenantId, dns: dns, isInternal: isInternal },
        success: function (data) {
            if (data.Success) {
                onTenantDialogClose();
                if (action === "activate") {
                    SuccessAlert("Tenant Activation In-progress", "Tenant marked for acivation. Within a few hours it will be activated.", 7000);
                }
                else if (action === "suspend") {
                    SuccessAlert("Tenant suspended ", "Tenant has been suspended successfully.", 7000);
                }
                else if (action === "delete") {
                    SuccessAlert("Tenant deleted ", "Tenant has been deleted successfully.", 7000);
                }
                else if (action === "mark-as-internal") {
                    SuccessAlert("Mark As Internal", "Tenant has been marked as internal successfully.", 7000);
                }
                else if (action === "remove-from-internal") {
                    SuccessAlert("Remove from Internal", "Tenant has been removed from internal sucessfully.", 7000);
                }
                gridObj.refreshContent();
            }
            else {
                $("#tenant-dialog .tenant-action-process").hide();
                $("#tenant-dialog .tenant-action-status").show();
            }
            $("#tenant-dialog_wrapper").ejWaitingPopup("hide");
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


});

$(document).on("click", ".tenant-action", function (e) {

    var action = $(this).attr("data-action").trim();
    var tenantId = $(this).attr("data-tenant-id").trim();
    var dns = $(this).attr("data-dns").trim();

    $("#tenant-dns").val(dns);
    $("#tenant-id").val(tenantId);
    $("#tenant-action").val(action);
    $("#tenant-dialog .tenant-action-markorremove").empty();

    $("#dialog-icon").attr('class', '');
    $("#tenant-dialog .tenant-name").html(dns);

    if (action === "activate") {
        $("#dialog-icon").addClass("su su-delete");
        $("#dialog-title").html("Activate Tenant");
        $("#tenant-dialog .tenant-action").html("activate");
        $("#tenant-dialog #action-button").removeClass("critical-action-button");
        $("#tenant-dialog #confirmation-div").css("display", "none");
        $("#action-button").attr("disabled", false);
    }
    else if (action === "suspend") {
        $("#dialog-icon").addClass("su su-delete");
        $("#dialog-title").html("Suspend Tenant");
        $("#tenant-dialog .tenant-action").html("suspend");
        $("#tenant-dialog #action-button").addClass("critical-action-button");
        $("#tenant-dialog #confirmation-div").css("display", "block");
    }
    else if (action === "delete") {
        $("#dialog-icon").addClass("su su-delete");
        $("#dialog-title").html("Delete Tenant");
        $("#tenant-dialog .tenant-action").html("delete");
        $("#tenant-dialog #action-button").addClass("critical-action-button");
        $("#tenant-dialog #confirmation-div").css("display", "block");
    }
    else if (action === "mark-as-internal") {
        $("#dialog-icon").addClass("su su-nav-settings");
        $("#dialog-title").html("Mark as Internal");
        $("#tenant-dialog .tenant-action").html("mark this");
        $("#tenant-dialog .tenant-action-markorremove").html(" as internal");
        $("#tenant-dialog #action-button").addClass("critical-action-button");
        $("#tenant-dialog #confirmation-div").css("display", "block");
    }
    else if (action === "remove-from-internal") {
        $("#dialog-icon").addClass("su su-nav-settings");
        $("#dialog-title").html("Remove from Internal");
        $("#tenant-dialog .tenant-action").html("remove this");
        $("#tenant-dialog .tenant-action-markorremove").html(" from internal");
        $("#tenant-dialog #action-button").addClass("critical-action-button");
        $("#tenant-dialog #confirmation-div").css("display", "block");
    }

    $("#tenant-dialog").ejDialog("open");
});

$(document).on("keyup", "#tenant_name_confirmation", function () {
    var value = $("#tenant_name_confirmation").val();
    var dns = $("#tenant-dns").val();
    if (value === dns) {
        $("#action-button").attr("disabled", false);
    }
    else {
        $("#action-button").attr("disabled", true);
    }
});

$(document).on("click", "#more-filters-button, #close-filter", function (e) {
    $("#more-filters-container").toggle();
});

$(document).on("click", "#reset-filters", function (e) {
    $('#datetype').ejDropDownList("clearText");
    $("#start-timepicker").val("");
    $("#end-timepicker").val("");
    var gridObj = $("#items").data("ejGrid");
    gridObj.refreshContent();
});

function onGetLinkDialogClose() {
    $("#get_item_link").ejDialog("close");
}

function onGetLinkDialogOpen() {
    $("#get_item_link").ejDialog("open");
    $("#get_item_link").show();
    $('#get_item_link').focus();
    $("#item-link").select();
    $(".get_link").show();
    if (browser.name.toLowerCase() === "msie") {
        $("#item-link").val(window.location.href.replace(window.location.pathname + window.location.search, "") + itemUrl.trim());
    }
    else {
        $("#item-link").val(window.location.origin + itemUrl.trim());
    }
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy");
        $("#item-link-copy").hide();
        $("#item-link-copy").attr("data-original-title", "");
    }
}

function onTenantDialogOpen() {
    $("#tenant-dialog").ejDialog("open");
    $("#tenant-dialog_wrapper").ejWaitingPopup("hide");
    $("#tenant-dialog").focus();
}

function onTenantDialogClose() {
    $("#tenant-dialog").ejDialog("close");
    $("#tenant-dialog #action-button").attr("disabled", true);
    $("#tenant-dialog .tenant-action-process").show();
    $("#tenant-dialog .tenant-action-status").hide();
    $("#tenant_name_confirmation").val("");
}

function fnActionBegin(args) {
    var searchValue = $("#search-items").val();

    if (searchValue !== "Search") {
        this.model.query._params.push({ key: "searchKey", value: searchValue });
    }

    var filerSettings = [], i;
    var searchCollection = [], i;

    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ "PropertyName": column.field, "FilterType": column.operator, "FilterKey": column.value });
        }
    }

    var selectedAppIndices = $("#appstatus").data("ejDropDownList").model.value !== null ? $("#appstatus").data("ejDropDownList").model.value.split(',') : [];
    if (selectedAppIndices.length > 0) {
        for (i = 0; i < selectedAppIndices.length; i++) {
            filerSettings.push({ "PropertyName": "TenantStatus", "FilterType": "equal", "FilterKey": selectedAppIndices[i] });
        }
    }

    var planFilterInfo = $("#plan-filter").data("ejDropDownList");

    var selectedPlans = planFilterInfo.model.value !== null ? planFilterInfo.model.value.split(",") : [];

    if (selectedPlans.length > 0) {
        for (i = 0; i < selectedPlans.length; i++) {
            filerSettings.push({ "PropertyName": "SaaSPlanId", "FilterType": "equal", "FilterKey": selectedPlans[i] });
        }
    }

    var tenantTypeFilterInfo = $("#tenant-type-filter").data("ejDropDownList");
    var selectedTenantType = tenantTypeFilterInfo.model.value !== null ? tenantTypeFilterInfo.model.value.split(",") : [];

    if (selectedTenantType.length > 0) {
        for (i = 0; i < selectedTenantType.length; i++) {
            filerSettings.push({ "PropertyName": "TenantTypeId", "FilterType": "equal", "FilterKey": selectedTenantType[i] });
        }
    }

    var timeZoneFilter = $("#timezone-filter").data("ejDropDownList");
    filerSettings.push({ "PropertyName": "TimeZone", "FilterType": "equal", "FilterKey": timeZoneFilter.model.value });

    var parame = getQueryVariable("appstatus");

    var tenantDateRange = $("#tenant-daterange").ejDateRangePicker("instance");
    var filterStartDateTime = tenantDateRange.model.value !== null ? tenantDateRange.model.value.split('-')[0].trim() : "";
    var filterEndDateTime = tenantDateRange.model.value !== null ? tenantDateRange.model.value.split('-')[1].trim() : "";
    var filterDateType = $("#datetype").val();

    if (filterStartDateTime && filterEndDateTime) {
        if (filterDateType === $("#modifiedDate").attr("data-content")) {
            filerSettings.push({ "PropertyName": "[TenantInfoTable].[ModifiedDate]", "FilterType": "greaterthanequalto", "FilterKey": filterStartDateTime, "IsDateTimeFilter": true });
            filerSettings.push({ "PropertyName": "[TenantInfoTable].[ModifiedDate]", "FilterType": "lessthanequalto", "FilterKey": filterEndDateTime, "IsDateTimeFilter": true });
        }
        else if (filterDateType === $("#statusUpdatedDate").attr("data-content")) {
            filerSettings.push({ "PropertyName": "[TenantInfoTable].[StatusUpdatedDate]", "FilterType": "greaterthanequalto", "FilterKey": filterStartDateTime, "IsDateTimeFilter": true });
            filerSettings.push({ "PropertyName": "[TenantInfoTable].[StatusUpdatedDate]", "FilterType": "lessthanequalto", "FilterKey": filterEndDateTime, "IsDateTimeFilter": true });
        }
        else {
            filerSettings.push({ "PropertyName": "[TenantInfoTable].[CreatedDate]", "FilterType": "greaterthanequalto", "FilterKey": filterStartDateTime, "IsDateTimeFilter": true });
            filerSettings.push({ "PropertyName": "[TenantInfoTable].[CreatedDate]", "FilterType": "lessthanequalto", "FilterKey": filterEndDateTime, "IsDateTimeFilter": true });
        }
    }

    this.model.query._params.push({ key: "filterCollection", value: filerSettings });
}

function fnActionComplete(args) {
    $("[data-toggle='tooltip']").tooltip();
    var gridObj = $("#items").data("ejGrid");
    if (gridObj._gridRecordsCount === 0) {
        var message = "No tenants available to display";
        this.getContentTable().find("tbody .emptyrecord").html(message);
    }
}

function onTimeZoneChange(args) {
    setAppCookie("app:timezone", args.model.value, 999);
    onFilterChange(args);
}

function onFilterChange(args) {
    $("#items").ejGrid("refreshContent");
}

function startTimePickerCreated(args) {
    var startTime = getQueryVariable("startdt");
}

function endTimePickerCreated(args) {
    var endTime = getQueryVariable("enddt");
}

function onChangedDateRange(args) {
    var gridObj = $("#items").data("ejGrid");
    gridObj.refreshContent();
}

$(document).on("click", ".e-drp-button.e-drp-reset", function (e) {
    var gridObj = $("#items").data("ejGrid");
    gridObj.refreshContent();
});

function setAppCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getAppCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}