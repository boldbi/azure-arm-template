var isSafariOrEdge = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) || (navigator.userAgent.indexOf("Edge") != -1);
var timeformat = "";
var dateFormat = "";
$(document).ready(function () {
    $(".time-format").ejTimePicker({
        timeFormat: "HH:mm",
        minutesInterval: 5,
        minTime: "00:05"
    });
    timeformat = $("#timeFormat").val();
    dateFormat = $("#dateFormat").val();
    showWaitingPopup($("#server-app-container"));
    renderSchedulePopUp();
    if (($(parent.window).width()) > 1400) {
        $(".schedule-dialog").addClass("lg-flexible-editschedule");
    } else {
        $(".schedule-dialog").removeClass("lg-flexible-editschedule");
    }
    var item = "";
    var recurrenceType = "";
    var editScheduleDetail = "";
    $.ajax({
        type: "POST",
        url: getScheduleInfoUrl,
        success: function (data) {
            if (data !== null && data !== "") {
                item = data.ScheduleItem;
                $("#hourly-schedule-option, #daily-schedule-option, #weekly-schedule-option, #monthly-schedule-option, #yearly-schedule-option").css("display", "none");
                $('#yearly, #daily-every-x-days, #monthly').prop('checked', 'checked');// Set default
                switch ((item.RecurrenceType).toLowerCase()) {
                    case "hourly":
                        recurrenceType = "Hourly";
                        $("#hourly-schedule-option").css("display", "block");
                        var Frequency = item.Recurrence.HourlySchedule.MinutesInterval;
                        var mins = (Frequency % 60);
                        if (mins < 9) {
                            conversionToMinutes = parseInt(Frequency / 60) + ":" + "0" + (mins);
                        }
                        else {
                            conversionToMinutes = parseInt(Frequency / 60) + ":" + (Frequency % 60);
                        }
                        var timesplit = conversionToMinutes.split(':');
                        var minutes = (timesplit[0]) + timesplit[1];
                        var timeText = "";
                        if (parseInt(timesplit[0]) > 0)
                            timeText += timesplit[0] + " hour(s) ";
                        if (parseInt(timesplit[1]) > 0)
                            timeText += timesplit[1] + " minute(s)";
                        editScheduleDetail = "Occurs every " + timeText;
                        $("#hourly-schedule-option").find("input").val(conversionToMinutes);
                        break;
                    case "daily":
                        recurrenceType = "Daily";
                        $("#daily-schedule-option").css("display", "block");

                        $("#daily-every-x-days").prop("checked", "checked");

                        var everyXDaysObj = $("#every-x-days").data("ejNumericTextbox");
                        everyXDaysObj.option("value", item.Recurrence.DailySchedule.DaysInterval);
                        if (item.Recurrence.DailySchedule.DaysInterval == 1)
                            editScheduleDetail = "Occurs every day";
                        else
                            editScheduleDetail = "Occurs every " + item.Recurrence.DailySchedule.DaysInterval.toString() + " days";
                        break;

                    case "dailyweekday":
                        $("#daily-every-x-days").removeAttr("checked");
                        recurrenceType = "Daily";
                        $("#daily-schedule-option").css("display", "block");

                        $("#daily-every-x-days").prop("checked", false);
                        $("#daily-week-days").prop("checked", "checked");

                        editScheduleDetail = "Occurs every weekday";
                        break;

                    case "weekly":
                        recurrenceType = "Weekly";
                        $("#weekly-schedule-option").css("display", "block");

                        var everyXWeeksObj = $("#every-x-weeks").data("ejNumericTextbox");
                        everyXWeeksObj.option("value", item.Recurrence.WeeklySchedule.WeeksInterval);
                        $("#sun").prop("checked", item.Recurrence.WeeklySchedule.DaysOfWeek.Sunday);
                        $("#mon").prop("checked", item.Recurrence.WeeklySchedule.DaysOfWeek.Monday);
                        $("#tues").prop("checked", item.Recurrence.WeeklySchedule.DaysOfWeek.Tuesday);
                        $("#wed").prop("checked", item.Recurrence.WeeklySchedule.DaysOfWeek.Wednesday);
                        $("#thu").prop("checked", item.Recurrence.WeeklySchedule.DaysOfWeek.Thursday);
                        $("#fri").prop("checked", item.Recurrence.WeeklySchedule.DaysOfWeek.Friday);
                        $("#sat").prop("checked", item.Recurrence.WeeklySchedule.DaysOfWeek.Saturday);
                        var daysDetail = "";
                        var selectDays = $(".schedule-checkbox:checked");
                        for (var i = 0; i < selectDays.length; i++) {
                            if (selectDays.length == 1 || i == 0)
                                daysDetail = $(selectDays[i]).siblings("label").text();
                            else if (i > 0 && i != selectDays.length - 1)
                                daysDetail = daysDetail + ", " + $(selectDays[i]).siblings("label").text();
                            else
                                daysDetail = daysDetail + " and " + $(selectDays[i]).siblings("label").text();
                        }
                        if (item.Recurrence.WeeklySchedule.WeeksInterval == 1)
                            editScheduleDetail = "Occurs every " + daysDetail;
                        else
                            editScheduleDetail = "Occurs every " + item.Recurrence.WeeklySchedule.WeeksInterval.toString() + " week(s) on " + daysDetail;
                        break;

                    case "monthly":
                        recurrenceType = "Monthly";
                        $("#monthly-schedule-option").css("display", "block");

                        $("#monthly").prop("checked", "checked");

                        var monthlyDateObj = $("#monthly-date").data("ejNumericTextbox");
                        monthlyDateObj.option("value", item.Recurrence.MonthlySchedule.DayOfMonth);

                        var monthlyEveryXMonthsObj = $("#monthly-every-x-months").data("ejNumericTextbox");
                        monthlyEveryXMonthsObj.option("value", item.Recurrence.MonthlySchedule.Months);
                        editScheduleDetail = "Occurs day " + item.Recurrence.MonthlySchedule.DayOfMonth.toString() + " of every " + item.Recurrence.MonthlySchedule.Months.toString() + " month(s)";
                        break;

                    case "monthlydow":
                        recurrenceType = "Monthly";
                        $("#monthly").removeAttr("checked");
                        $("#monthly-schedule-option").css("display", "block");

                        $("#monthly").prop("checked", false);
                        $("#monthly-dow").prop("checked", "checked");

                        $("#monthly-dow-week").find("option[value='" + item.Recurrence.MonthlyDowSchedule.WeeksOfTheMonth + "']").prop("selected", "selected");
                        $("#monthly-dow-week").selectpicker("refresh");

                        $("#monthly-dow-day").find("option[value='" + item.Recurrence.MonthlyDowSchedule.DaysOfTheWeek + "']").prop("selected", "selected");
                        $("#monthly-dow-day").selectpicker("refresh");

                        var monthlyDOWEveryXMonthsObj = $("#monthly-dow-every-x-months").data("ejNumericTextbox");
                        monthlyDOWEveryXMonthsObj.option("value", item.Recurrence.MonthlyDowSchedule.Months);

                        editScheduleDetail = "Occurs the " + item.Recurrence.MonthlyDowSchedule.WeeksOfTheMonth.toString() + " " + $("#monthly-dow-day option:selected").text() + " of every " + item.Recurrence.MonthlyDowSchedule.Months + " month(s)";
                        break;
                    case "yearly":
                        recurrenceType = "Yearly";
                        $("#yearly-schedule-option").css("display", "block");

                        $("#yearly").prop("checked", "checked");

                        var everyXYearsObj = $("#every-x-years").data("ejNumericTextbox");
                        everyXYearsObj.option("value", item.Recurrence.YearlySchedule.YearsInterval);
                        $("#yearly-month").find("option[value='" + item.Recurrence.YearlySchedule.MonthsOfTheYear + "']").prop("selected", "selected");
                        $("#yearly-month").selectpicker("refresh");
                        var yearlyDayObj = $("#yearly-day").data("ejNumericTextbox");
                        yearlyDayObj.option("value", item.Recurrence.YearlySchedule.DayOfMonth);

                        if (item.Recurrence.YearlySchedule.YearsInterval == 1)
                            editScheduleDetail = "Occurs every " + item.Recurrence.YearlySchedule.MonthsOfTheYear.toString() + " " + item.Recurrence.YearlySchedule.DayOfMonth.toString();
                        else
                            editScheduleDetail = "Occurs every " + item.Recurrence.YearlySchedule.YearsInterval.toString() + " years on " + item.Recurrence.YearlySchedule.MonthsOfTheYear.toString() + " " + item.Recurrence.YearlySchedule.DayOfMonth.toString();
                        break;

                    case "yearlydow":
                        $("#yearly").removeAttr("checked");
                        recurrenceType = "Yearly";
                        $("#yearly-schedule-option").css("display", "block");

                        $("#yearly").prop("checked", false);
                        $("#yearly-dow").prop("checked", "checked");

                        var everyXYearsObj = $("#every-x-years").data("ejNumericTextbox");
                        everyXYearsObj.option("value", item.Recurrence.YearlyDowSchedule.YearsInterval);
                        $("#yearly-dow-week").find("option[value='" + item.Recurrence.YearlyDowSchedule.WeeksOfTheMonth + "']").prop("selected", "selected");
                        $("#yearly-dow-week").selectpicker("refresh");

                        $("#yearly-dow-day").find("option[value='" + item.Recurrence.YearlyDowSchedule.DaysOfTheWeek + "']").prop("selected", "selected");
                        $("#yearly-dow-day").selectpicker("refresh");

                        $("#yearly-dow-month").find("option[value='" + item.Recurrence.YearlyDowSchedule.MonthsOfTheYear + "']").prop("selected", "selected");
                        $("#yearly-dow-month").selectpicker("refresh");

                        if (item.Recurrence.YearlyDowSchedule.YearsInterval == 1)
                            editScheduleDetail = "Occurs the " + item.Recurrence.YearlyDowSchedule.WeeksOfTheMonth.toString() + " " + $("#yearly-dow-day option:selected").text() + " of " + item.Recurrence.YearlyDowSchedule.MonthsOfTheYear.toString();
                        else
                            editScheduleDetail = "Occurs every " + item.Recurrence.YearlyDowSchedule.YearsInterval.toString() + " years on " + item.Recurrence.YearlyDowSchedule.WeeksOfTheMonth.toString() + " " + $("#yearly-dow-day option:selected").text() + " of " + item.Recurrence.YearlyDowSchedule.MonthsOfTheYear.toString();
                        break;
                }
                $("#recurrence-type").find("option[value='" + recurrenceType + "']").prop("selected", "selected");
                $("#recurrence-type").selectpicker("refresh");
                var startTime = "";
                if (dateFormat == "dd/MM/yyyy") {
                    var date = item.StartDateString.split('/');
                    var dd = date[0];
                    var mm = date[1];
                    var yyyy = date[2]
                    var zonedate = mm + '/' + dd + '/' + yyyy;
                    var startdatestring = new Date(zonedate);
                }
                else {
                    var startdatestring = new Date(item.StartDateString);
                }

                if (timeformat.toLowerCase() == "false") {
                    startTime = new Date(startdatestring);
                    var time = DateCustomFormat(dateFormat + " hh:mm", startTime, timeformat);
                    var period = startTime.getHours() >= 12 ? "PM" : "AM";
                    var hours = period == "PM" ? startTime.getHours() - 12 : startTime.getHours();
                    $("#start-date").ejTimePicker({ value: hours + ":" + startTime.getMinutes() + " " + period + "" });
                }
                else {
                    startTime = new Date(startdatestring);
                    var time = DateCustomFormat(dateFormat + " HH:mm", startTime, timeformat);
                    $("#start-date").ejTimePicker({ value: startTime.getHours() + ":" + startTime.getMinutes() + " " });
                }
                $("#next-schedule").html(item.NextScheduleString);
                $(".recurrence-information").html(editScheduleDetail + " effective " + item.NextScheduleString);
                $("#enable-schedule").prop("checked", item.IsEnabled).trigger("change");


            } else {
                $("#enable-schedule").prop("checked", false).trigger("change");
                $(".recurrence-information").html("");
            }
        },
        error: handleAjaxError(),
        complete: hideWaitingPopup($("#server-app-container"))
    });

    $("#enable-checkbox,#enable-sunday,#enable-monday,#enable-tuesday,#enable-wednesday,#enable-thursday,#enable-friday,#enable-saturday").on("click", function () {
        if (isSafariOrEdge) {
            $(this).find("label").toggleClass("check");
        }
    });
});

function renderSchedulePopUp() {
    //remove Dialog box and its elements

    var recurrenceTypeList = "";
    var days = "";
    var weeks = "";
    var months = "";
    var zoneDateTime = "";

    $.ajax({
        type: "POST",
        url: getRecurrenceTypeUrl,
        async: false,
        success: function (data) {
            if (data.RecurrenceType != null && data.RecurrenceType.length > 0) {
                recurrenceTypeList = "<option value= " + data.RecurrenceType[4] + ">" + "Hourly" + "</option>"
                    + "<option value= " + data.RecurrenceType[0] + ">" + "Daily" + "</option>"
                    + "<option value= " + data.RecurrenceType[1] + ">" + "Weekly" + "</option>"
                    + "<option value= " + data.RecurrenceType[2] + ">" + "Monthly" + "</option>"
                    + "<option value= " + data.RecurrenceType[3] + ">" + "Yearly" + "</option>";
            }

            for (var t = 0; t < data.Days.length; t++) {
                if (data.Days[t].toString().toLowerCase() == "day" || data.Days[t].toString().toLowerCase() == "weekday") {
                    days += "<option value= " + data.Days[t] + ">" + data.Days[t] + "</option>";
                } else if (data.Days[t].toString().toLowerCase() == "weekendday") {
                    days += "<option value= " + data.Days[t] + ">weekend day</option>";
                } else {
                    days += "<option value= " + data.Days[t] + ">" + data.Days[t] + "</option>";
                }
            }

            for (var t = 0; t < data.Weeks.length; t++) {
                weeks += "<option value= " + data.Weeks[t] + ">" + data.Weeks[t] + "</option>";
            }
            for (var t = 0; t < data.Months.length; t++) {
                months += "<option value= " + data.Months[t] + ">" + data.Months[t] + "</option>";
            }

            zoneDateTime = data.TimeZoneDateTime.toString();
        },
        error: handleAjaxError(),
        complete: hideWaitingPopup($("#page_content_Div"))
    });

    $("#recurrence-type").append(recurrenceTypeList);
    $("#monthly-dow-week").append(weeks);
    $("#monthly-dow-day").append(days);
    $("#yearly-month").append(months);
    $("#yearly-dow-week").append(weeks);
    $("#yearly-dow-day").append(days)
    $("#yearly-dow-month").append(months);
    $("#every-x-days, #monthly-date, #yearly-day").ejNumericTextbox({ name: "numeric", value: 1, minValue: 1, maxValue: 31, width: "65px", height: "34px" });
    $("#every-x-weeks, #monthly-every-x-months, #monthly-dow-every-x-months, #every-x-years").ejNumericTextbox({ name: "numeric", value: 1, minValue: 1, maxValue: 99, width: "65px", height: "34px" });
    $("#occurenceCount").ejNumericTextbox({ name: "numeric", value: 1, minValue: 1, maxValue: 999, width: "65px", height: "34px" });
    if (timeformat.toLowerCase() == "false") {
        $("#start-date").ejTimePicker({
            interval: 10,
            value: zoneDateTime,
            enableStrictMode: false,
            popupHeight: "150px",
            timeFormat: "hh:mm tt"
        });
    }
    else {
        $("#start-date").ejTimePicker({
            interval: 10,
            value: zoneDateTime,
            enableStrictMode: false,
            popupHeight: "150px",
            timeFormat: "HH:mm"
        });
    }
    $("#start-date").css({ cursor: "default" });
    $("#recurrence-type, #monthly-dow-week, #monthly-dow-day, #yearly-dow-week, #yearly-dow-day, #yearly-dow-month, #yearly-month").selectpicker("refresh");
}

$(document).on("change", "#recurrence-type", function () {
    var selected = $(this).find("option:selected").val();
    $("#hourly-schedule-option, #daily-schedule-option, #weekly-schedule-option, #monthly-schedule-option, #yearly-schedule-option").css("display", "none");
    $("#" + selected.toString().toLowerCase() + "-schedule-option").css("display", "block");
    $("#weekly-day-error-container").hide();
});

$(document).on("click", "#update-schedule-synchronization-bottom", function () {
    var addScheduleDetail = "";
    if (validateSchedule()) {
        showWaitingPopup($("#server-app-container"));
        var scheduleItem = {};
        switch ($("#recurrence-type").val().toString().toLowerCase()) {
            case "hourly":
                scheduleItem.RecurrenceType = "Hourly";
                scheduleItem.Frequency = $(".time-format").val();
                scheduleItem.RecurrenceInterval = $("#every-x-hours-value").val();
                var timesplit = scheduleItem.Frequency.split(':');
                var minutes = (timesplit[0]) + timesplit[1];
                var timeText = "";
                if (parseInt(timesplit[0]) > 0)
                    timeText += timesplit[0] + " hour(s) ";
                if (parseInt(timesplit[1]) > 0)
                    timeText += timesplit[1] + " minute(s)";
                addScheduleDetail = "Occurs every " + timeText;
                break;
            case "daily":
                if ($("#daily-every-x-days").is(":checked")) {
                    scheduleItem.RecurrenceType = "Daily";
                    scheduleItem.RecurrenceInterval = $("#every-x-days").val();
                    if (scheduleItem.RecurrenceInterval == 1)
                        addScheduleDetail = "Occurs every day";
                    else
                        addScheduleDetail = "Occurs every " + scheduleItem.RecurrenceInterval.toString() + " days";
                }
                else {
                    scheduleItem.RecurrenceType = "DailyWeekDay";
                    addScheduleDetail = "Occurs every weekday";
                }
                break;
            case "weekly":
                scheduleItem.RecurrenceType = "Weekly";
                scheduleItem.RecurrenceInterval = $("#every-x-weeks").val();
                scheduleItem.Sunday = $("#sun").prop("checked");
                scheduleItem.Monday = $("#mon").prop("checked");
                scheduleItem.Tuesday = $("#tues").prop("checked");
                scheduleItem.Wednesday = $("#wed").prop("checked");
                scheduleItem.Thursday = $("#thu").prop("checked");
                scheduleItem.Friday = $("#fri").prop("checked");
                scheduleItem.Saturday = $("#sat").prop("checked");
                var daysDetail = "";
                var selectDays = $(".schedule-checkbox:checked");
                for (var i = 0; i < selectDays.length; i++) {
                    if (selectDays.length == 1 || i == 0)
                        daysDetail = $(selectDays[i]).siblings("label").text();
                    else if (i > 0 && i != selectDays.length - 1)
                        daysDetail = daysDetail + ", " + $(selectDays[i]).siblings("label").text();
                    else
                        daysDetail = daysDetail + " and " + $(selectDays[i]).siblings("label").text();
                }
                if (scheduleItem.RecurrenceInterval == 1)
                    addScheduleDetail = "Occurs every " + daysDetail;
                else
                    addScheduleDetail = "Occurs every " + scheduleItem.RecurrenceInterval.toString() + " week(s) on " + daysDetail;
                break;
            case "monthly":
                if ($("#monthly").is(":checked")) {
                    scheduleItem.RecurrenceType = "Monthly";
                    scheduleItem.DaysOfMonth = $("#monthly-date").val();
                    scheduleItem.RecurrenceInterval = $("#monthly-every-x-months").val();
                    addScheduleDetail = "Occurs day " + scheduleItem.DaysOfMonth.toString() + " of every " + scheduleItem.RecurrenceInterval.toString() + " month(s)";
                }
                else {
                    scheduleItem.RecurrenceType = "MonthlyDOW";
                    scheduleItem.WeekOfMonth = $("#monthly-dow-week").val();
                    scheduleItem.DayOfWeek = $("#monthly-dow-day").val();
                    scheduleItem.RecurrenceInterval = $("#monthly-dow-every-x-months").val();
                    addScheduleDetail = "Occurs the " + scheduleItem.WeekOfMonth.toString() + " " + $("#monthly-dow-day option:selected").text() + " of every " + scheduleItem.RecurrenceInterval.toString() + " month(s)";
                }
                break;
            case "yearly":
                scheduleItem.RecurrenceInterval = $("#every-x-years").val();
                if ($("#yearly").is(":checked")) {
                    scheduleItem.RecurrenceType = "Yearly";
                    scheduleItem.DaysOfMonth = $("#yearly-day").val();
                    scheduleItem.MonthOfYear = $("#yearly-month").val();
                    if (scheduleItem.RecurrenceInterval == 1)
                        addScheduleDetail = "Occurs every " + scheduleItem.MonthOfYear.toString() + " " + scheduleItem.DaysOfMonth.toString();
                    else
                        addScheduleDetail = "Occurs every " + scheduleItem.RecurrenceInterval.toString() + " years on " + scheduleItem.MonthOfYear.toString() + " " + scheduleItem.DaysOfMonth.toString();
                }
                else {
                    scheduleItem.RecurrenceType = "YearlyDOW";
                    scheduleItem.WeekOfMonth = $("#yearly-dow-week").val();
                    scheduleItem.DayOfWeek = $("#yearly-dow-day").val();
                    scheduleItem.MonthOfYear = $("#yearly-dow-month").val();
                    if (scheduleItem.RecurrenceInterval == 1)
                        addScheduleDetail = "Occurs the " + scheduleItem.WeekOfMonth.toString() + " " + $("#yearly-dow-day option:selected").text() + " of " + scheduleItem.MonthOfYear.toString();
                    else
                        addScheduleDetail = "Occurs every " + scheduleItem.RecurrenceInterval.toString() + " years on " + scheduleItem.WeekOfMonth.toString() + " " + $("#yearly-dow-day option:selected").text() + " of " + scheduleItem.MonthOfYear.toString();
                }
                break;
        }

        scheduleItem.StartDate = $("#start-date").val();
        scheduleItem.IsEnabled = $("#enable-schedule").prop("checked");

        $.ajax({
            type: "POST",
            url: updateAdScheduleUrl,
            data: { scheduleSettingsData: JSON.stringify({ ScheduleItem: scheduleItem }) },
            success: function (data) {
                if (scheduleItem.IsEnabled) {
                    $("#next-schedule").html(data.NextScheduleValue);
                    $(".recurrence-information").html(addScheduleDetail + " effective " + data.StartDateValue);
                }
                SuccessAlert("Schedule Synchronization Settings", "Settings has been updated successfully.", 7000);
            },
            error: handleAjaxError(),
            complete: function () {
                hideWaitingPopup($("#server-app-container"));
            }
        });
    }
});

function validateSchedule() {
    var startDateTimeObj = $("#start-date").data("ejTimePicker");

    switch ($("#recurrence-type").val().toString().toLowerCase()) {
        case "hourly":
            if ($(".time-format").val() == "") {
                $(".frequency-error").css("display", "inline");
                $(".time-format").parent("span").addClass("validation-error");
                return false;
            }
            else {
                var time = $(".time-format").val();
                var timesplit = time.split(':');
                var minutes = (timesplit[0] * 60) + timesplit[1];
                if (minutes > 3) {
                    $(".frequency-error").css("display", "none");
                    $(".time-format").parent("span").removeClass("validation-error");
                }
                else {
                    $(".frequency-error").css("display", "inline");
                    $(".time-format").parent("span").addClass("validation-error");
                    return false;
                }
            }
            break;
        case "daily":
            break;
        case "weekly":
            if (!$("#days-check-box input[type='checkbox']").is(":checked")) {
                $("#weekly-day-error-container").css("display", "block");
                $("#weekly-days-validator").html("Please select at least one day.");
                return false;
            } else {
                $("#weekly-day-error-container").css("display", "none");
            }
            break;
        case "monthly":
            break;
        case "yearly":
            var currentMonth = $("#yearly-month").val().toString();
            var day = parseInt($("#yearly-day").val());
            var nextScheduleYear = new Date().getFullYear() + Number($("#every-x-years").val());
            var dayObject = $("#yearly-day").data("ejNumericTextbox");
            switch (currentMonth.toLowerCase()) {
                case "february":
                    if (day > 28) {
                        dayObject.option("value", nextScheduleYear % 4 == 0 ? 29 : 28);
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
    }

    if (!startDateTimeObj.model.dateTimeFormat == "h:mm tt") {
        $("#start-date-error-container").css("display", "block");
        $("#start-date-validator").html("Please enter schedule time");
        return false;
    } else {
        $("#start-date-error-container").css("display", "none");
    }
    return true;
}

function EnableSchedule() {
    $(".schedule-dropdown").removeAttr("disabled").selectpicker("refresh");
    $(".numeric-text-box").each(function () {
        var obj = $(this).data("ejNumericTextbox");
        obj.enable();
    });

    $(".schedule-checkbox, #daily-every-x-days, #daily-week-days, #monthly, #monthly-dow,#yearly, #yearly-dow").prop("disabled", false);
    var startTimeObj = $("#start-date").data("ejTimePicker");
    startTimeObj.enable();
    var everyXHoursObj = $(".time-format").data("ejTimePicker");
    everyXHoursObj.enable();
}

function DisableSchedule() {
    $(".schedule-dropdown").attr("disabled", true).selectpicker("refresh");
    $(".numeric-text-box").each(function () {
        var obj = $(this).data("ejNumericTextbox");
        obj.disable();
    });

    $(".schedule-checkbox, #daily-every-x-days, #daily-week-days, #monthly, #monthly-dow, #yearly, #yearly-dow").prop("disabled", true);
    var startTimeObj = $("#start-date").data("ejTimePicker");
    startTimeObj.disable();
    var everyXHoursObj = $(".time-format").data("ejTimePicker");
    everyXHoursObj.disable();
}

$(document).on("change", "#enable-schedule", function () {
    if ($(this).is(":checked")) {
        EnableSchedule();
    }
    else {
        DisableSchedule();
    }
    if (isSafariOrEdge) {
        $("#enable-sunday,#enable-monday,#enable-tuesday,#enable-wednesday,#enable-thursday,#enable-friday,#enable-saturday").find("label").toggleClass("check");
        $("#daily-every-x-days, #daily-week-days, #monthly, #monthly-dow,#yearly, #yearly-dow").next().toggleClass("check");
    }
    $(".validation-message").hide();
});