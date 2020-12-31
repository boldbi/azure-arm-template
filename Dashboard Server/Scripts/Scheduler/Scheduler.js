var reportItemName = "";
var reportItemId = "";
var reportCategoryName = "";
var multiDashboardName = "";
var childId = "";
var createdItemId = "";
var url = "";
var alertChange = 1;
var dateFormat = "";
var timeFormat = "";
var listDashboards = "";
var childDashboards = "";
var item = "";
var condition = "";
var itemConditionArray = "";
var recurrence = "";
var endType = "";
var endDate = "";
var endAfter = "";
var startDate = "";
var itemRecurrence = "";
var frequency = "";
var exportType = "";
var subscriberExternalRecipient = "";
var subscriberGroup = "";
var subscriberUser = ""
var itemConditionCategory = "";
var itemWidgetName = "";
var emailContent = "";
var buttonValue = "";
var filterContent = "";
var designerServiceUrl = "";
var dashboardServerUrl = "";
var dataServiceUrlforDataAlert = "";
var isCustomExpressionOpened = false;

$(document).ready(function () {
    dateFormat = $("#dateFormat").val();
    timeFormat = $("#timeFormat").val();
    designerServiceUrl = $('meta[name="designer_service:url"]').attr("content");
    dashboardServerUrl = $('meta[name="dashboard_server:url"]').attr("content");
    dataServiceUrlforDataAlert = $("meta[name='data_service:url']").attr("content");
    $(".category-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchCategories);
    $(".dashboard-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchDashboards);
    $(".childdashboard-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchTabs);
});

function createSchedule(itemId, itemName, categoryName, multidashboardname) {
    itemName != "" ? $(".schedule-popup-title").html(" " + itemName + " - " + window.Server.App.LocalizationContent.Schedule) : $(".schedule-popup-title").html(" " + itemName + " " + window.Server.App.LocalizationContent.Schedule);
    $(".schedule-popup-title").attr("title", itemName);
    parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
    reportItemId = itemId;
    reportItemName = itemName;
    reportCategoryName = categoryName;
    multiDashboardName = multidashboardname;
    childId = itemId;
    $("#selected_dashboard").change();
}

function scheduleNameCheck(scheduleId, scheduleName) {
    $("#schedule-name-error-container").css("display", "none");
    $("span.loader-gif").remove();
    $("#schedule-name-error-container").parent().append($("<span class='col-sm-4 no-padding loader-gif'><div class='loader-blue loader-icon' id='schedule-name-validation-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
    $.ajax({
        type: "POST",
        url: checkScheduleNameExistUrl,
        data: { scheduleId: scheduleId, scheduleName: scheduleName },
        success: function (data) {
            if (data.Result) {
                $("span.loader-gif").remove();
                $("#schedule-name").closest("div").addClass("has-error");
                $("#schedule-name-error-container").css("display", "block");
                $("#schedule-name-validator").html(window.Server.App.LocalizationContent.IsScheduleExist);
            } else {
                $("#schedule-name").closest("div").removeClass("has-error");
                $("span.loader-gif").remove();
                $("#schedule-name-error-container").css("display", "none");
            }
        }
    });
}

function addTitleForCategory() {
    $("#selected_category").selectpicker("refresh");
    for (var i = 0; i < $(".category-dropdown  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".category-dropdown .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".category-dropdown .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

function addTitleForDashboard() {
    $("#selected_dashboard").selectpicker("refresh");
    for (var i = 0; i < $(".dashboard-dropdown  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".dashboard-dropdown .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".dashboard-dropdown .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

function addTitleForChildDashboards() {
    $("#selected_childdashboard").selectpicker("refresh");
    for (var i = 0; i < $(".childdashboard-dropdown  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".childdashboard-dropdown .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".childdashboard-dropdown .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

function validateSchedule(current) {
    var startDateTimeObj = $("#start-date").data("ejDateTimePicker");
    var scheduleName = $("#schedule-name").val();
    if (!($("#schedule-name-error-container").css("display") == "block") && !($("body .loader-gif").length) && $("#selected_category option:selected").val() != "" && $("#selected_dashboard option:selected").val() != "" && scheduleName) {
        if (!parent.IsValidName("name", scheduleName)) {
            $("#schedule-name-error-container").css("display", "block");
            $("#schedule-name-validator").html(window.Server.App.LocalizationContent.AvoidSpecialCharactors);
            return false;
        }
        if ($(current).hasClass("subscribe-body")) {
            switch ($("#recurrence-type").val().toString().toLowerCase()) {
                case "daily":
                    break;
                case "weekly":
                    if (!$('#days-check-box input[type="checkbox"]').is(":checked")) {
                        $("#weekly-day-error-container").css("display", "block");
                        $("#weekly-days-validator").html(window.Server.App.LocalizationContent.WeekDaysValidator);
                        return false;
                    }
                    else {
                        $("#weekly-day-error-container").css("display", "none");
                    }
                    break;
                case "monthly":
                    break;
                case "yearly":
                    var currentMonth = $("#yearly-month").val().toString();
                    var day = parseInt($("#yearly-day").val());
                    var dayObject = $("#yearly-day").data("ejNumericTextbox");
                    switch (currentMonth.toLowerCase()) {
                        case "february":
                            if (day > 28) {
                                dayObject.option("value", 28);
                            }
                            break;

                        case "april":
                        case "june":
                        case "september":
                        case "november":
                            if (day > 30) {
                                dayObject.option("value", 30);
                            }
                            break;

                        case "january":
                        case "march":
                        case "may":
                        case "july":
                        case "august":
                        case "october":
                        case "december":
                            if (day > 31) {
                                dayObject.option("value", 31);
                            }
                            break;
                    }
                    break;
                case "hourly":
                    if ($(".time-width").val() == "") {
                        $(".frequency-error").css("display", "inline");
                        $(".time-width").parent("span").addClass("validation-error");
                        return false;
                    }
                    else {
                        var time = $(".time-width").val();
                        var timesplit = time.split(':');
                        var minutes = (timesplit[0] * 60) + timesplit[1];
                        if (minutes > 3) {
                            $(".frequency-error").css("display", "none");
                            $(".time-width").parent("span").removeClass("validation-error");
                        } else {
                            $(".frequency-error").css("display", "inline");
                            $(".time-width").parent("span").addClass("validation-error");
                            return false;
                        }
                    }
                    break;
            }

            if (!startDateTimeObj.model.dateTimeFormat == "M/d/yyyy h:mm tt") {
                $("#start-date-error-container").css("display", "block");
                $("#start-date-validator").html(window.Server.App.LocalizationContent.ScheduleValidator);
                return false;
            }
            else {
                $("#start-date-error-container").css("display", "none");
            }

            switch ($('input[name=end-type]:checked', "#schedule-end-type").val().toLowerCase()) {
                case "endby":
                    var endDateTimeObj = $("#end-date").data("ejDateTimePicker");
                    if (!endDateTimeObj.model.dateTimeFormat == "M/d/yyyy h:mm tt") {
                        $("#end-date-error-container").css("display", "block");
                        $("#end-date-validator").html(window.Server.App.LocalizationContent.ScheduleValidator);
                        return false;
                    }
                    else {
                        $("#end-date-error-container").css("display", "none");
                    }
                    break;
            }
            return true;
        }
    } else {
        if ($("#selected_category option:selected").val() == "") {
            $("#category-message").css("display", "block");
        }
        if ($("#selected_dashboard option:selected").val() == "") {
            $("#dashboard-message").css("display", "block");
        }
        if (!scheduleName) {
            $("#schedule-name-error-container").css("display", "block");
            $("#schedule-name-validator").html(window.Server.App.LocalizationContent.ScheduleValidator);
        }
        return false;
    }
    return true;
}

$(document).on("click", "#schedule-submit-cancel,#schedule-popup,#schedule-next-cancel", function (event) {
    if (isCustomExpressionOpened) {
        onCloseCustomExpression();
        return;
    }
    closePopupContainer();
});

$(document).keyup(function (e) {
    if (e.keyCode == 27) closePopupContainer();
});

function closePopupContainer() {
    parent.$("#popup-container").ejDialog("close");
    parent.$("#editpopup-container").ejDialog("close");
}

$(document).on("change", "#selected_category", function () {
    reportCategoryName = "";
    itemName = "";
    var selected = $(this).find("option:selected").text();
    if ($(this).find("option:selected").val() == "" || $(this).find("option:selected").val() != "") {
        $(".schedule-popup-title").html(window.Server.App.LocalizationContent.Schedule);
        $(".schedule-popup-title").attr("title", "");
    }
    $("#selected_dashboard").attr("disabled", true);
    $(".dashboard-dropdown").append($("<span class='no-padding loader-gif'><div class='loader-blue loader-icon' id='selected-category-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
    var filterSettings = [];
    filterSettings.push({ PropertyName: "CategoryName", FilterType: "equals", FilterKey: selected });
    var invalid = undefined;
    if (itemId != null) {
        listDashboards = "";
    }
    $.ajax({
        type: "POST",
        url: getDashboardUrl,
        data: { searchKey: invalid, skip: 0, take: 20, sorted: invalid, filterCollection: filterSettings, displayCategory: "SpecificCategory", isScheduleRequest: true },
        success: function (result, data) {
            $("#selected_dashboard").attr("disabled", false);
            $(".dashboard-dropdown span.loader-gif").remove();
            var dashboards = result.result;
            for (var t = 0; t < dashboards.length; t++) {
                listDashboards += '<option value="' + dashboards[t].Id + '">' + dashboards[t].Name + '</option>';
            }
            $("#selected_dashboard").html("");
            $("#selected_dashboard").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectDashboard + '</option>' + listDashboards).selectpicker("refresh");
            $("#selected_childdashboard").attr("disabled", true);
            $("#selected_childdashboard").html("");
            $("#selected_childdashboard").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectDashboard + '</option>').selectpicker("refresh");
            addTitleForDashboard();
        }
    });
    if ($("#selected_category option:selected").val() != "") {
        $("#category-message").css("display", "none");
    }
});

$(document).on("change", "#selected_dashboard", function () {
    $("#selected_childdashboard").attr("disabled", true);
    var selected = $(this).find("option:selected").text();
    var itemId = $(this).find("option:selected").val();
    createdItemId = itemId;
    $(".childdashboard-dropdown .bootstrap-select").append($("<span class='no-padding loader-gif'><div class='loader-blue loader-icon' id='selected-dashboard-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
    var filterSettings = [];
    filterSettings.push({ PropertyName: "Name", FilterType: "equals", FilterKey: selected });
    var invalid = undefined;
    var listItems = "";
    var childItems = "";
    if (itemId != "") {
        $(".schedule-popup-title").html(" " + selected + " -" + window.Server.App.LocalizationContent.Schedule);
        $(".schedule-popup-title").attr("title", selected);
    }
    else {
        $(".schedule-popup-title").html(window.Server.App.LocalizationContent.Schedule);
        $(".schedule-popup-title").attr("title", "");
    }
    $(".items-dropdown select").html("");
    $(".items-dropdown").append($("<span class='no-padding loader-gif'><div class='loader-blue loader-icon' id='selected-dashboard-items-dropdown-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
    $(".items-dropdown").find("select").attr("disabled", true);
    if (itemId != "") {
        $.ajax({
            type: "POST",
            url: getChildDashboardUrl,
            data: { parentId: itemId },
            success: function (result, data) {
                $(".childdashboard-dropdown span.loader-gif").remove();
                var dashboards = result.result;
                if (dashboards !== null) {
                    $("#selected_childdashboard").attr("disabled", false);
                    for (var t = 0; t < dashboards.length; t++) {
                        if (dashboards[t].DashboardId !== childId) {
                            childItems += '<option data-designerid=' +
                                dashboards[t].DesignerId +
                                ' value="' +
                                dashboards[t].DashboardId +
                                '">' +
                                dashboards[t].Name +
                                '</option>';
                        } else {
                            childItems += '<option data-designerid=' +
                                dashboards[t].DesignerId +
                                ' value="' +
                                dashboards[t].DashboardId +
                                '" selected="selected">' +
                                dashboards[t].Name +
                                '</option>';
                        }
                    }
                }
                $("#selected_childdashboard").html("");
                $("#selected_childdashboard").append('<option value="" selected=selected>' + window.Server.App.LocalizationContent.ChildDashboards + '</option>' + childItems).selectpicker("refresh");
                addTitleForChildDashboards();
                $("#selected_childdashboard").trigger('change');
            }
        });

        if ($(".schedule-dialog").find("#dataAlert").length > 0) {
            $("#dataAlert").remove();
        }
    }
    if ($("#data-changes-container").length > 0) {
        $.ajax({
            type: "POST",
            url: getwidgetUrl,
            data: { itemId: itemId },
            success: function (data) {
                var widget = data;
                var listWidgets = "";
                for (var t = 0; t < widget.data.length; t++) {
                    var parentName = "";
                    var parentId = "";
                    if (widget.isMultiDashboard == true) {
                        parentName = " (" + widget.data[t].ParentName + ")";
                        parentId = "data-itemid=" + widget.data[t].ParentId;
                    }

                    listWidgets += '<option ' + parentId + '  value="' + widget.data[t].Name + '">' + widget.data[t].Name + ' ' + parentName + '</option>';
                }
                $(".items-dropdown select").append('<option disabled class="hide-option" selected="selected" value="">'+window.Server.App.LocalizationContent.SelectWidget+'</option>' + listWidgets).selectpicker("refresh");
                addTitleForWidgets();
                $("#selected-items").change();
                $("#data-changes-container #condition-div #measure-div,#data-changes-container #condition-div #dimension-div").html("");
                $("#data-changes-container #condition-div #add-condition,#data-changes-container #add-dimension-condition").css("display", "none");
                refreshConditionCategory();
                $("span.loader-gif").remove();
                $(".items-dropdown").find("select").removeAttr("disabled");
                $(".items-dropdown").find(".bootstrap-select li,.bootstrap-select .btn-default").removeClass("disabled");
                $(".items-dropdown").find(".dropdown-menu").addClass("alignment-dropdown");
                $(".items-dropdown").find(".dropdown-menu .inner").addClass("alignment-dropdown-inner");
                $(".items-dropdown").find(".dropdown-menu li:first").css("height", "0px");
            }
        });
    }
    $("#schedule-submit").attr("data-report-id", itemId);
    $("#schedule-submit").attr("data-item-id", itemId);
    if ($("#selected_dashboard option:selected").val() != "") {
        $("#dashboard-message").css("display", "none");
    }

    hideDataAlert(false);
});

$(document).on("change", "#selected_childdashboard", function () {
    var selected = $(this).find("option:selected").text();
    var itemId = $(this).find("option:selected").val();
    if (selected == "All") {
        itemId = $("#selected_dashboard").find("option:selected").val();
        selected = $("#selected_dashboard").find("option:selected").text();
        createdItemId = itemId;
    }
    else {
        itemId = $("#selected_childdashboard").find("option:selected").val();
        selected = $("#selected_childdashboard").find("option:selected").text();
        createdItemId = itemId;
    }
    if (itemId != "") {
        $(".schedule-popup-title").html(" " + selected + " - " + window.Server.App.LocalizationContent.Schedule);
        $(".schedule-popup-title").attr("title", selected);
    }
    else {
        $(".schedule-popup-title").html(window.Server.App.LocalizationContent.Schedule);
        $(".schedule-popup-title").attr("title", "");
    }
    $(".items-dropdown select").html("");
    $(".items-dropdown").append($("<span class='no-padding loader-gif'><div class='loader-blue loader-icon' id='selected-childdashboard-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
    $(".items-dropdown").find("select").attr("disabled", true);
    if ($("#data-changes-container").length > 0) {
        $.ajax({
            type: "POST",
            url: window.getwidgetUrl,
            data: { itemId: itemId },
            success: function (data) {
                var widget = data;
                var listWidgets = "";
                for (var t = 0; t < widget.data.length; t++) {
                    var parentName = "";
                    var parentId = "";
                    if (widget.isMultiDashboard == true) {
                        parentName = " (" + widget.data[t].ParentName + ")";
                        parentId = "data-itemid=" + widget.data[t].ParentId;
                    }

                    listWidgets += '<option ' + parentId + '  value="' + widget.data[t].Name + '">' + widget.data[t].Name + ' ' + parentName + '</option>';
                }
                $(".items-dropdown select").append('<option disabled class="hide-option" selected="selected" value="">'+window.Server.App.LocalizationContent.SelectWidget+'</option>' + listWidgets).selectpicker("refresh");
                addTitleForWidgets();
                $("#selected-items").change();
                $("#data-changes-container #condition-div #measure-div,#data-changes-container #condition-div #dimension-div").html("");
                $("#data-changes-container #condition-div #add-condition,#data-changes-container  #add-dimension-condition").css("display", "none");
                refreshConditionCategory();
                $("span.loader-gif").remove();
                $(".items-dropdown").find("select").removeAttr("disabled");
                $(".items-dropdown").find(".bootstrap-select li,.bootstrap-select .btn-default").removeClass("disabled");
                $(".items-dropdown").find(".dropdown-menu").addClass("alignment-dropdown");
                $(".items-dropdown").find(".dropdown-menu .inner").addClass("alignment-dropdown-inner");
                $(".items-dropdown").find(".dropdown-menu li:first").css("height", "0px");
            }
        });
    }
    $("#schedule-submit").attr("data-report-id", itemId);
    $("#schedule-submit").attr("data-item-id", itemId);
    $(".childdashboard-dropdown .btn-group .dropdown-menu.open").removeAttr("style");
    $(".childdashboard-dropdown .btn-group .dropdown-menu.open").css("overflow", "hidden");
});

$(document).on("focusout", "#schedule-name", function (event) {
    var scheduleName = $("#schedule-name").val().trim();
    var idSchedule = "";
    if (actionType == "Create") {
       idSchedule = $("#schedule-submit").attr("data-schedule-id");
    }
    else {
        idSchedule = scheduleId;
    }
    
    if ($.trim(scheduleName) != "") {
        $("#schedule-name").closest("div").removeClass("has-error");
        $("#schedule-name-error-container").css("display", "none");
        if (scheduleName) {
            scheduleNameCheck(idSchedule, scheduleName);
        } else {
            $("#schedule-name-error-container").css("display", "none");
        }
    }
    else {
        $("#schedule-name").closest("div").addClass("has-error");
        $("#schedule-name-error-container").css("display", "block");
        $("#schedule-name-validator").html(window.Server.App.LocalizationContent.ScheduleValidator);
    }
});

$(document).on("keyup", "#schedule-name", function (event) {
    if ($.trim($("#schedule-name").val()) != "") {
        $("#schedule-name").closest("div").removeClass("has-error");
        $("#schedule-name-error-container").css("display", "none");
    }
    else {
        $("#schedule-name").closest("div").addClass("has-error");
        $("#schedule-name-error-container").css("display", "block");
        $("#schedule-name-validator").html(window.Server.App.LocalizationContent.ScheduleValidator);
    }
});

function validateSchedule(current) {
   var scheduleName = $("#schedule-name").val();
    if (!($("#schedule-name-error-container").css("display") == "block") && !($("body .loader-gif").length) && $("#selected_category option:selected").val() != "" && $("#selected_dashboard option:selected").val() != "" && scheduleName) {
        if (!parent.IsValidName("name", scheduleName)) {
            $("#schedule-name-error-container").css("display", "block");
            $("#schedule-name-validator").html(window.Server.App.LocalizationContent.AvoidSpecialCharactors);
            return false;
        }
        } else {
        if ($("#selected_category option:selected").val() == "") {
            $("#category-message").css("display", "block");
        }
        if ($("#selected_dashboard option:selected").val() == "") {
            $("#dashboard-message").css("display", "block");
        }
        if (!scheduleName) {
            $("#schedule-name-error-container").css("display", "block");
            $("#schedule-name-validator").html(window.Server.App.LocalizationContent.ScheduleValidator);
        }
        return false;
    }
    return true;
}

$(document).on("click", "#schedule-next", function (event) {
    var scheduleMessage = "";
    if (validateSchedule(this)) {
        if (alertChange == 2) {
            if ($(this).hasClass("time-interval-body")) {
                var dataAlertInstance = $("#dataAlert").data("ejDashboardDesigner");
                dataAlertInstance.getDataAlertModel();
            }
            else if ($(this).hasClass("subscribe-body")) {
                validateNextSchedule();
            }
            else if ($(this).hasClass("email-editor-body")) {
                $("#email-content-validation").html("");
                url = recurrenceType;
                enableTimeIntervalOption();
                $("#schedule-next").removeClass("email-editor-body");
            }
            else {
                url = dataAlertUrl;
                enableDataNotificationOption();
            }
        }
        else {
            var frequecy = $("#frequency").css("display")
            if (frequecy == "block") {
                $("#recurrence-type option[value='Hourly']").attr("selected", "selected");
                $("#recurrence-type").selectpicker("refresh");
            }
            if ($(this).hasClass("time-interval-body")) {
                url = recurrenceType;
                enableTimeIntervalOption();
                }
            else if ($(this).hasClass("subscribe-body")) {
                validateNextSchedule();
                
            }
            else {
                url = recurrenceType;
                enableTimeIntervalOption();
            }
        }
        }
});

$(document).on("click", "#schedule-back", function (event) {
    if (isCustomExpressionOpened) {
        onCloseCustomExpression();
        return;
    }

    if ($("#schedule-next").parent("div").css("display") == "none") {
        enableTimeIntervalOption();
    }
    else {
        if ($("#schedule-next").hasClass("subscribe-body")) {
            if (alertChange == 1) {
                enableScheduleOption();
            }
            else if (alertChange == 3) {
                $("#schedule-next").addClass("time-interval-body");
                $("#dataAlert").css("display", "block");
            }
            else {
                enableEmailEditor();
            }
            $("#schedule-next").removeClass("subscribe-body");
        }
        else if ($("#schedule-next").hasClass("time-interval-body")) {
            enableScheduleOption();
        }
        else if ($("#schedule-next").hasClass("email-editor-body")) {
            enableDataNotificationOption();
            $("#schedule-next").removeClass("email-editor-body");
        }
    }
});

$(document).on("click", "#data-alerts", function () {
    if ($("#data-alerts").prop("checked") == true) {
        alertChange = 2;
        if (actionType == "Edit" && $("#selected_childdashboard").find("option").length <= 1 && $("#selected_childdashboard").attr("disabled") != "disabled" && childDashboards.length > 1) {
            var childItems = "";
            for (var t = 0; t < childDashboards.length; t++) {
                if (childDashboards[t].Name.toLowerCase() == itemName.toLowerCase()) {
                    childItems += '<option data-designerid=' + childDashboards[t].DesignerId + ' value="' + childDashboards[t].DashboardId + '" selected="selected">' + childDashboards[t].Name + '</option>';
                }
                else {
                    childItems += '<option data-designerid=' + childDashboards[t].DesignerId + ' value="' + childDashboards[t].DashboardId + '">' + childDashboards[t].Name + '</option>';
                }
            }
            $("#selected_childdashboard").html("");
            $("#selected_childdashboard").append('<option value="">' + window.Server.App.LocalizationContent.ChildDashboards + '</option>' + childItems).selectpicker("refresh");
        }
    }
    else {
        alertChange = 1;
    }
    if ($("#schedule-next").hasClass("subscribe-body") || $("#schedule-next").hasClass("time-interval-body")) {
        $("#schedule-next").removeClass("subscribe-body");
        $("#schedule-next").removeClass("time-interval-body");
    }
});

function enableTimeIntervalOption() {
    $(".schedule-popup-body").css("display", "none");
    $("#windowCaption").html(window.Server.App.LocalizationContent.RecurrenceIntervalValidator);
    $(".schedule-dialog .modal-body #time-intervals-div").css("display", "inline");
    $(".schedule-dialog #data-changes-div-container,.schedule-dialog #data-changes-container,.schedule-dialog #email-editor-panel").css("display", "none");
    $(".subscribe-popup-body").css("display", "none");
    $("#next-container").css("display", "block");
    $("#submit-container").css("display", "none");
    $("#dataAlert").css("display", "none");
    if ($("#schedule-next").hasClass("time-interval-body")) {
        $("#schedule-next").removeClass("time-interval-body");
    }
    $("#schedule-next").addClass("subscribe-body");
    $("#schedule-back").css("display", "inline");
    className = "time-intervals-div";
    if ($(".schedule-dialog").find("#time-intervals-div").length <= 0) {
        partialPost(url, className);
    }
}

function enableDataNotificationOption() {
    $("#windowCaption").html(window.Server.App.LocalizationContent.DataAlertValidator);
    $(".schedule-popup-body,#email-editor-panel").css("display", "none");
    $(".schedule-dialog #data-changes-div-container,.schedule-dialog #data-changes-container").css("display", "inline");
    $("#data-changes-container_wrapper,#data-changes-container,#data-changes-div-container").css("display", "inline");
    $("#time-intervals-div").css("display", "none");
    $(".subscribe-popup-body").css("display", "none");
    $("#next-container").css("display", "block");
    $("#submit-container").css("display", "none");
    $("#dataAlert").css("display", "block");
    if ($("#schedule-next").hasClass("subscribe-body")) {
        $("#schedule-next").removeClass("subscribe-body");
    }
    $("#schedule-next").addClass("time-interval-body");
    $("#schedule-back").css("display", "inline");
    className = "data-changes-container";
    if ($(".schedule-dialog").find("#dataAlert").length <= 0) {
          partialPostDataChanges(url, className);
        }  
}

function enableSubscribeOption() {
    $("#windowCaption").html(window.Server.App.LocalizationContent.ExportFormatValidator);
    $(".schedule-popup-body").css("display", "none");
    $(".schedule-dialog .modal-body #email-editor-panel,.schedule-dialog .modal-body #time-intervals-div").css("display", "none");
    $(".schedule-dialog #data-changes-div-container,.schedule-dialog #data-changes-container").css("display", "none");
    $(".subscribe-popup-body").fadeIn();
    $("#next-container").css("display", "none");
    $("#submit-container").css("display", "block");
    $("#schedule-back").css("display", "inline");
    $("#dataAlert").css("display", "none");
    className = "subscribers-panel";
    if ($(".schedule-dialog").find("#subscribers-panel").length <= 0) {
        partialPost(url, className);
    }
}

function enableScheduleOption() {
    $("#windowCaption").html(window.Server.App.LocalizationContent.TimeBaseSchedule);
    $(".subscribe-popup-body, #next-container, #submit-container,#time-intervals-div,#data-changes-container").css("display", "none");
    $(".schedule-popup-body").fadeIn();
    $("#next-container").css("display", "block");
    $("#schedule-back").css("display", "none");
    $("#dataAlert").css("display", "none");
    if ($("#schedule-next").hasClass("subscribe-body") || $("#schedule-next").hasClass("time-interval-body")) {
        $("#schedule-next").removeClass("subscribe-body");
        $("#schedule-next").removeClass("time-interval-body");
        $("#schedule-next").removeClass("email-editor-body");
    }
}

function enableEmailEditor() {
    $("#windowCaption").html(window.Server.App.LocalizationContent.AlertMessageValidator);
    $(".schedule-popup-body").css("display", "none");
    $(".schedule-dialog .modal-body #time-intervals-div,.schedule-dialog .modal-body #subscribers-panel").css("display", "none");
    $(".schedule-dialog #data-changes-div-container,.schedule-dialog #data-changes-container").css("display", "none");
    $("#email-editor-panel").css("opacity", "1");
    $("#email-editor-panel").fadeIn();
    $("#next-container").css("display", "block");
    $("#submit-container").css("display", "none");
    $("#dataAlert").css("display", "none");
    if ($("#schedule-next").hasClass("subscribe-body") || $("#schedule-next").hasClass("time-interval-body")) {
        $("#schedule-next").removeClass("subscribe-body");
        $("#schedule-next").removeClass("time-interval-body");
        $("#schedule-next").addClass("email-editor-body");
    }
    $("#schedule-back").css("display", "inline");
    className = "email-editor-panel";
    if ($(".schedule-dialog").find("#email-editor-panel").length <= 0) {
        partialPost(url, className);
    }
    else {
        var selectOptions = "";
        for (var t = 0; t < filterContent.Filters.length; t++) {
            selectOptions += "<option data-id='" + filterContent.Filters[t].FilterName + "'>" + filterContent.Filters[t].DisplayText + "</option>"
        }
        $("#widget-items").html(selectOptions).selectpicker("refresh");
        parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
    }
}

function partialPost(url, className) {
    if (!$(".schedule-dialog").hasClass(className)) {
        parent.$("#popup-container_wrapper").ejWaitingPopup("show");
        parent.$("#editpopup-container_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: url,
            data: {},
            cache: false,
            dataType: 'html',
            success: function (data) {
                $(".modal-body").append(data);
            }
        });
    }
}

function partialPostDataChanges(url, className) {
    if (!$(".schedule-dialog").hasClass(className)) {
        parent.$("#popup-container_wrapper").ejWaitingPopup("show");
        parent.$("#editpopup-container_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url:url,
            data: { itemId: createdItemId },
            success: function (data) {
                $("#popup-container").append(data);
                dataAlertInitailization();
            }
        });
    }
}

$("#scheduleSearch_global").on("keyup", "#scheduleSearch_formfield", function () {
    var searchText = $(this).val();
    if (searchText.length > 2) {
        $("#scheduleGrid").data("ejGrid").search(searchText);
    } else {
        $("#scheduleGrid").data("ejGrid").search("");
    }
});

function refreshScheduleGridItem(scheduleId) {
    //change the loading icon to play icon
    var scheduleGridObj = $("#scheduleGrid").data("ejGrid");
    for (var i = 0; i < scheduleGridObj.model.currentViewData.length; i++) {
        if (scheduleGridObj.model.currentViewData[i].Id == scheduleId) {
            $("span span[data-scheduleid =" + scheduleId + "]").removeClass("loader-gif").addClass("su-play-folder");
        }
    }
}

function editSchedule(id, itemId, itemName, categoryName, multidashboardname) {
    if (multidashboardname == null || multidashboardname == "undefined" || multidashboardname == "") {
        reportItemId = "";
        reportCategoryName = categoryName;
        multidashboardName = "";
        itemId = "";
    }
    else {
        reportItemId = "";
        reportCategoryName = categoryName;
        multiDashboardName = multidashboardname;
        childId = itemId;
    }
    itemName != "" ? $(".schedule-popup-title").html(" " + itemName + " - " + window.Server.App.LocalizationContent.Schedule) : $(".schedule-popup-title").html(" " + itemName + " " + window.Server.App.LocalizationContent.Schedule);
    $(".schedule-popup-title").attr("title", itemName);
    scheduleId = id;
    reportItemName = itemName;
    var filterSettings = [];
    filterSettings.push({ PropertyName: "CategoryName", FilterType: "equals", FilterKey: reportCategoryName });
    var invalid = undefined;
    var listItems = "";
    var childItems = "";
    var listCategories = "";
    $.ajax({
        type: "POST",
        url: getScheduleInfoUrl,
        data: { scheduleId: id },
        success: function (data) {
            parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
            item = data.ScheduleItem;
            condition = data.Condition;
            itemConditionArray = JSON.parse(condition);
            recurrence = item.RecurrenceType;
            endType = item.EndType;
            endDate = item.EndDateString;
            endAfter = item.EndAfter;
            startDate = item.StartDateString;
            createdItemId = item.ItemId;
            itemRecurrence = item.Recurrence;
            if (recurrence.toLowerCase() == "hourly") {
                frequency = item.Recurrence.HourlySchedule.MinutesInterval;
            }
            exportType = item.ExportType;
            subscriberExternalRecipient = data.SubscribedExternalRecipient;
            subscriberGroup = data.SubscribedGroup;
            subscriberUser = data.SubscribedUser
            itemConditionCategory = item.ConditionCategory;
            itemWidgetName = item.ItemName;
            emailContent = item.EmailContent;
            buttonValue = $("#add-alert-rule").val();
            $("#selected-items[value='" + item.ItemName + "']").attr("selected", true);
            if (item.IsDataChanges == true) {
                $("#data-alerts").prop("checked", "checked");
                alertChange = 2;
            }
            else {
                //  cursorPos.value("Hi {:Username},\n\nThe configured data notification condition has been met. \n \nPlease find a snapshot of the current state of the dashboard attached.\n\nRegards,\n\n{:OrganizationName}");
                $('#data-changes-div,#time-intervals-div').css("display", "none");
                alertChange = 1;
            }
            $("#schedule-name").val(item.Name);
            if(!item.IsEnabled)
            {
                $("#enable-schedule").prop("checked", "");
            }

            hideDataAlert(!item.IsDataChanges);
        }
    });
   if (multidashboardname != "") {
    $.ajax({
        type: "POST",
        url: getDashboardUrl,
        async:false,
        data: { searchKey: invalid, skip: 0, take: 20, sorted: invalid, filterCollection: filterSettings, displayCategory: "SpecificCategory" },
        success: function (result, data) {
            var dashboards = result.result;
            for (var t = 0; t < dashboards.length; t++) {
                if (dashboards[t].Name.toLowerCase() == multidashboardname.toLowerCase()) {
                    listItems +=  '<option value="' + dashboards[t].Id +'" selected=selected>' + dashboards[t].Name + '</option>';
                }
            }
            $("#selected_dashboard").html("");
            $("#selected_dashboard").html(listItems).selectpicker("refresh");
        }
    });
    $("#selected_childdashboard").attr("disabled", false);
        }
   var itemId = $("#selected_dashboard").find("option:selected").val();
   $.ajax({
       type: "POST",
       url: getChildDashboardUrl,
       data: { parentId: itemId },
       async: false,
       success: function (result, data) {
           childDashboards = result.result;
           if (childDashboards != null) {
               $("#selected_childdashboard").attr("disabled", false);
           }
       }
   });
 }

function refreshConditionCategory() {
    $(".condition-category-changes").find("select").html("");
    $(".condition-category-changes").find("select").append('<option value="5" data-title="' + window.Server.App.LocalizationContent.ValueChange + '" name="ValueChanges" selected="selected">' + window.Server.App.LocalizationContent.ValueChangeOption + '</option>' +
                                        '<option value="1" data-title="' + window.Server.App.LocalizationContent.Increases + '" name="Increases">' + window.Server.App.LocalizationContent.IncreasesOption + '</option>' +
                                        '<option value="2" data-title="' + window.Server.App.LocalizationContent.ContinousIncreases + '" name="ContinousIncreases">' + window.Server.App.LocalizationContent.ContinousIncreasesOption + '</option>' +
                                        '<option value="3" data-title="' + window.Server.App.LocalizationContent.Decreases + '" name="Decreases">' + window.Server.App.LocalizationContent.DecreasesOption + '</option>' +
                                        '<option value="4" data-title="' + window.Server.App.LocalizationContent.ContinousDecreases + '" name="ContinousDecreases">' + window.Server.App.LocalizationContent.ContinousDecreasesOption + '</option>').selectpicker("refresh");
    $("#selected-option").selectpicker("refresh");
    for (var i = 0; i < $(".condition-category-changes select option").length; i++) {
        var hoveredtext = $(".condition-category-changes select option").eq(i).attr("data-title");
        $(".condition-category-changes .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr({ "title": hoveredtext, "data-toggle": "tooltip", "data-container": "body", "data-placement": "right" });
    }
    $(".condition-category-changes .btn-group .dropdown-menu .selectpicker li a").tooltip();
}

function addTitleForWidgets() {
    $("#selected-items").selectpicker("refresh");
    for (var i = 0; i < $(".items-dropdown  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".items-dropdown .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".items-dropdown .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

function addTitleForUsersAndGroups() {
    $("#user-search").selectpicker("refresh");
    for (var i = 0; i < $("#user-search-container .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#user-search-container .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("#user-search-container .btn-group .dropdown-menu .selectpicker li").eq(i).find("a").attr("title", hoveredtext);
    }
    $("#group-search").selectpicker("refresh");
    for (var i = 0; i <= $("#group-search-container .btn-group .dropdown-menu  li").length; i++) {
        var hoveredtext = $("#group-search-container .btn-group .dropdown-menu  li").eq(i).find("a .text").text();
        $("#group-search-container .btn-group .dropdown-menu li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

function addTitleForRecurrenceType() {
    $("#recurrence-type").selectpicker("refresh");
    $("#recurrence-type-container").find(".dropdown-menu").addClass("dropdown-height");
    for (var i = 0; i < $("#recurrence-type-container .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#recurrence-type-container .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("#recurrence-type-container .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }

    $("#monthly-dow-week").selectpicker("refresh");
    for (var i = 0; i < $("#monthly-dow-week-container .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#monthly-dow-week-container .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("#monthly-dow-week-container .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
    $("#monthly-dow-day").selectpicker("refresh");
    $("#monthly-dow-day-container").find(".dropdown-menu").addClass("day-dropdown-width");
    for (var i = 0; i < $("#monthly-dow-day-container .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#monthly-dow-day-container .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("#monthly-dow-day-container .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
    $("#yearly-dow-week").selectpicker("refresh");
    for (var i = 0; i < $("#yearly-dow-week-container .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#yearly-dow-week-container .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("yearly-dow-week-container .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
    $("#yearly-dow-day").selectpicker("refresh");
    $("#yearly-dow-day-container").find(".dropdown-menu").addClass("day-dropdown-width");
    for (var i = 0; i < $("#yearly-dow-day-container .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#yearly-dow-day-container .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("#yearly-dow-day-container .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
    $("#yearly-dow-month").selectpicker("refresh");
    $("#yearly-dow-month-ccontainer").find(".dropdown-menu").addClass("day-dropdown-width");
    for (var i = 0; i < $("#yearly-dow-month-ccontainer .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#yearly-dow-month-ccontainer .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("#yearly-dow-month-ccontainer .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
    $("#yearly-month").selectpicker("refresh");
    $("#yearly-month").next("div").find(".dropdown-menu").addClass("day-dropdown-width");
    for (var i = 0; i < $("#yearly-schedule-option .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $("#yearly-schedule-option .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $("#yearly-schedule-option .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

var listCategories = "";
$(document).on('show.bs.dropdown', '.category-dropdown', function () {
    $(".category-dropdown").find(".open,.bootstrap-select").removeClass("dropdown-alignment");
    if (listCategories == "") {
        $(".category-dropdown .bootstrap-select").append($("<span class='no-padding loader-gif'><div class='loader-blue loader-icon' id='category-dropdown-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
        $(".category-dropdown .bootstrap-select .open").hide();
        var filterSettings = [];
        filterSettings.push({ PropertyName: "CategoryName", FilterType: "equals", FilterKey: reportCategoryName });
        var invalid = undefined;
        $.ajax({
            type: "POST",
            url: getCategoryUrl,
            success: function (data) {
                var categories = data;
                for (var t = 0; t < categories.data.length; t++) {
                    if (categories.data[t].Name == reportCategoryName) {
                        listCategories += '<option value="' + categories.data[t].Id + '" selected= "selected">' + categories.data[t].Name + '</option>';
                    }
                    else {
                        listCategories += '<option value="' + categories.data[t].Id + '">' + categories.data[t].Name + '</option>';
                    }
                }
                $("#selected_category").html("");
                if (reportItemId == "") {
                    $("#selected_category").html('<option value="" disabled="disabled" class="hide-option" selected="selected">'+window.Server.App.LocalizationContent.SelectCategory+'</option>' + listCategories)
                  .selectpicker("refresh");
                }
                else {
                    $("#selected_category").html(listCategories)
                                  .selectpicker("refresh");
                }
                addTitleForCategory();
                $(".category-dropdown .bootstrap-select ul li").each(function () {
                    if($(this).hasClass("selected")){
                        $(this).addClass("active");
                    }
                })
                if (listCategories != "") {
                    $(".category-dropdown .bootstrap-select .open").show();
                }
                $(".category-dropdown span.loader-gif").remove();
                }
        });
    }
    $(".category-dropdown").find(".open").addClass("dropdown-alignment");
});

$(document).on('show.bs.dropdown', '.dashboard-dropdown', function () {
    $(".dashboard-dropdown").find(".open,.bootstrap-select").removeClass("dropdown-alignment");
    if ($("#selected_category").find("option:selected").val() == "" && multiDashboardName == null) {
        $("#category-message").css("display", "block");
        $("#selected_dashboard").attr("disabled", false);
    }
    else {
        if (listDashboards == "") {
            $(".dashboard-dropdown .bootstrap-select").append($("<span class='no-padding loader-gif'><div class='loader-blue loader-icon' id='dashboard-dropdown-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
            $(".dashboard-dropdown .bootstrap-select .open").hide();

            var filterSettings = [];
            filterSettings.push({ PropertyName: "CategoryName", FilterType: "equals", FilterKey: reportCategoryName });
            var invalid = undefined;
            var listItems = "";
            var childItems = "";
            if ((reportItemId == "" || reportItemId != "") && (itemName != "" && reportCategoryName != "")) {
                $.ajax({
                    type: "POST",
                    url: getDashboardUrl,
                    data: { searchKey: invalid, skip: 0, take: 20, sorted: invalid, filterCollection: filterSettings, displayCategory: "SpecificCategory" },
                    success: function (result, data) {
                        var dashboards = result.result;
                        for (var t = 0; t < dashboards.length; t++) {
                            if (multiDashboardName == null || multiDashboardName == "undefined" || multiDashboardName == "") {
                                listDashboards += (dashboards[t].Name.toLowerCase() == itemName.toLowerCase())
                                    ? '<option value="' +
                                    dashboards[t].Id +
                                    '" selected=selected>' +
                                    dashboards[t].Name +
                                    '</option>'
                                    : '<option value="' + dashboards[t].Id + '">' + dashboards[t].Name + '</option>';
                            }
                            else {
                                listDashboards += (dashboards[t].Name.toLowerCase() == multiDashboardName.toLowerCase())
                                    ? '<option value="' +
                                    dashboards[t].Id +
                                    '" selected=selected>' +
                                    dashboards[t].Name +
                                    '</option>'
                                    : '<option value="' + dashboards[t].Id + '">' + dashboards[t].Name + '</option>';
                            }
                        }
                        $("#selected_dashboard").html("");
                        if (reportItemId == "") {
                            $("#selected_dashboard")
                                .html("<option value='' disabled='disabled' class='hide-option' selected='selected'>" + window.Server.App.LocalizationContent.SelectDashboard + "</option>" + listDashboards)
                                .selectpicker("refresh");
                        }
                        else {
                            $("#selected_dashboard")
                                .html(listDashboards)
                                .selectpicker("refresh");
                        }
                        addTitleForDashboard();
                        $(".dashboard-dropdown ul li").each(function () {
                            if ($(this).hasClass("selected")) {
                                $(this).addClass("active");
                            }
                        });
                        if (listDashboards != "") {
                            $(".dashboard-dropdown .bootstrap-select .open").show();
                            }
                       
                        $(".dashboard-dropdown span.loader-gif").remove();
                      }
                });
            } else {
                $("#selected_dashboard").html('<option value="" disabled="disabled" class="hide-option"selected="selected">'+ window.Server.App.LocalizationContent.SelectDashboard +'</option>').selectpicker("refresh");
                $(".dashboard-dropdown .bootstrap-select .open").show();
                $(".dashboard-dropdown .btn-group .dropdown-menu.open").removeAttr("style");
                $(".dashboard-dropdown .btn-group .dropdown-menu.open").css("overflow", "hidden");
                $(".dashboard-dropdown span.loader-gif").remove();
            }
        } 
    }
    $(".dashboard-dropdown").find(".open").addClass("dropdown-alignment");
});

$(document).on('show.bs.dropdown', '.childdashboard-dropdown', function () {
    if (actionType == "Edit" && $("#selected_childdashboard").find("option").length <= 1) {
        $(".childdashboard-dropdown .bootstrap-select").append($("<span class='no-padding loader-gif'><div class='loader-blue loader-icon' id='childdashboard-dropdown-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
        $(".childdashboard-dropdown .bootstrap-select .open").hide();
        var itemId = $("#selected_dashboard").find("option:selected").val();
        var childItems = "";
        for (var t = 0; t < childDashboards.length; t++) {
            if (childDashboards[t].Name.toLowerCase() == itemName.toLowerCase()) {
                childItems += '<option data-designerid=' + childDashboards[t].DesignerId + ' value="' + childDashboards[t].DashboardId + '" selected="selected">' + childDashboards[t].Name + '</option>';
            }
            else {
                childItems += '<option data-designerid=' + childDashboards[t].DesignerId + ' value="' + childDashboards[t].DashboardId + '">' + childDashboards[t].Name + '</option>';
            }
        }
        $("#selected_childdashboard").html("");
        $("#selected_childdashboard").append('<option value="">' + window.Server.App.LocalizationContent.ChildDashboards + '</option>' + childItems).selectpicker("refresh");
        addTitleForChildDashboards();
        $(".childdashboard-dropdown ul li").each(function () {
            if ($(this).hasClass("selected")) {
                $(this).addClass("active");
            }
        });
        $(".childdashboard-dropdown span.loader-gif").remove();
        if (childItems != "") {
            $(".childdashboard-dropdown .bootstrap-select .open").show();
        }
    }
});

function hideDataAlert(isHide) {
    var dataAlertsSwitch = $("#data-alerts");
    var dataAlertDisabledInfo = $(".data-alerts-disabled");
    if (isHide) {
        dataAlertsSwitch.prop("checked", "").prop("disabled", "disabled");
        dataAlertDisabledInfo.css("display", "block");
    }
    else {
        dataAlertsSwitch.prop("disabled", "");
        dataAlertDisabledInfo.css("display", "none");        
    }
}

function afterEvaluateDataAlert(args) {
    parent.$("#popup-container_wrapper").ejWaitingPopup("show");
    filterContent = args;
    if (args.IsValidModel) {
        url = emailEditor;
        enableEmailEditor();
    } else {
        parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
        parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
    }
}

function onActionBegin(args) {
    if (args.eventType == "beforeOpenDaExpressionWindow") {
        isCustomExpressionOpened = true;
        $("#windowCaption").html(window.Server.App.LocalizationContent.CustomExpressionValidator);
        $(".schedule-popup-title").html(" " + window.Server.App.LocalizationContent.Schedule + " - " + window.Server.App.LocalizationContent.CustomExpression);
        $("#schedule-next, #schedule-next-cancel").hide();
    }

    if (args.eventType == "beforeOpenDaRelativeDateDialog") {
        $("#schedule-back").prop('disabled', true);
        $("#schedule-next").prop('disabled', true);
        $("#schedule-next-cancel").prop('disabled', true);
    }
}


function onActionComplete(args) {
    if (args.eventType == "afterCloseDaRelativeDateDialog") {
        $("#schedule-back").prop('disabled', false);
        $("#schedule-next").prop('disabled', false);
        $("#schedule-next-cancel").prop('disabled', false);
    }

    parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
    parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
}

function dataAlertInitailization() {
    currentTimeFormat = currentTimeFormat.toLowerCase() == "true" ? "HH:mm" : "hh:mm tt";
    var designerModel = {
        serviceUrl: designerServiceUrl,
        dataServiceUrl: dataServiceUrlforDataAlert,
        serverUrl: dashboardServerUrl,
        mode: ej.dashboardDesigner.mode.dataalert,
        itemId: createdItemId,
        dashboardPath: createdItemId + "/" + version,
        serviceAuthorizationToken: designerToken,
        datasources: sharedDataSources,
        dataAlert: isNullOrWhitespace(item) ? null : item.DaJsonString,
        canEditDashboard: canEdit,
        actionBegin: "onActionBegin",
        actionComplete: "onActionComplete",
        afterEvaluateDataAlert: "afterEvaluateDataAlert",
        renderDaExpression: "renderDaExpression",
        localeSettings: {
            culture: dataLanguage,
            dateFormat: currentDateFormat,
            timeFormat: currentTimeFormat
        }
    };
    var designer = new ejDashboardDesigner($('#dataAlert'), designerModel);
    $("#dataAlert").css("height", $(".share-popup").innerHeight()); 
}

function onCloseCustomExpression() {
    var dataAlertInstance = $("#dataAlert").data("ejDashboardDesigner");
    dataAlertInstance.closeDataAlertExpression();
    $("#windowCaption").html(window.Server.App.LocalizationContent.DataAlertValidator);
    isNullOrWhitespace(itemName) ? $(".schedule-popup-title").html(" " + $("#selected_dashboard").find("option:selected").html() + " - " + window.Server.App.LocalizationContent.Schedule) : $(".schedule-popup-title").html(" " + itemName + " - " + window.Server.App.LocalizationContent.Schedule);
    $("#schedule-next, #schedule-next-cancel").show();
    isCustomExpressionOpened = false;  
}
