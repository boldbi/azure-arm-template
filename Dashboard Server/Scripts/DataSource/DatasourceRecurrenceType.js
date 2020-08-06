var addScheduleDetail = "";
var item = "";
var recurrence = "";
var endType = "";
var endDate = "";
var endAfter = "";
var startDate = "";
var itemRecurrence = "";
var frequency = "";
var scheduleItemJson = {};
var designerInstance = "";

//remove Dialog box and its elements
$("#StartDate_popup").remove();
$("#EndDate_popup").remove();
$("#popup-container_wrapper").remove();
$("#PopupContainer_overLay").remove();
$("#editpopup-container_wrapper").remove();
var recurrenceTypeList = "";
var days = "";
var weeks = "";
var months = "";
var zoneDateTime = "";
var sysTime = "";
var minTime = "01:00";
var designerId = "#connectionDesigner";

var time = new Date();
if (timeFormat == "True") {
    sysTime = DateCustomFormat(dateFormat + " HH:mm", time, timeFormat);
}
else {
    sysTime = DateCustomFormat(dateFormat + " hh:mm", time, timeFormat);
    sysTime += (time.getHours() >= 12) ? " PM" : " AM";
}

if (editScheduleItem != "") {
    recurrence = editScheduleItem.RecurrenceType;
    endType = editScheduleItem.EndType;
    endDate = editScheduleItem.EndDateString;
    endAfter = editScheduleItem.EndAfter;
    startDate = editScheduleItem.StartDateString;
    createdItemId = editScheduleItem.ItemId;
    itemName = editScheduleItem.ItemName;
    itemRecurrence = editScheduleItem.Recurrence;
    if (recurrence.toLowerCase() == "hourly") {
        frequency = itemRecurrence.HourlySchedule.MinutesInterval;
    }
    if (!editScheduleItem.IsEnabled) {
        $("#enable-schedule").prop("checked", "");
    }
}

    $.ajax({
        type: "POST",
        data: { date: sysTime },
        url: getRecurrenceTypeUrl,
        async: false,
        success: function (data) {
            ShowWaitingProgress(".share-popup-header", "hide");
            if (data.RecurrenceType != null && data.RecurrenceType.length > 0) {
                if (data.RefreshDataInterval.EnableHourly) {
                    recurrenceTypeList = "<option value= " + data.RecurrenceType[4] + ">" + window.Server.App.LocalizationContent.Hourly + "</option>";
                }
                if (data.RefreshDataInterval.EnableDaily) {
                    recurrenceTypeList += "<option value= " + data.RecurrenceType[0] + ">" + window.Server.App.LocalizationContent.Daily + "</option>";
                }
                if (data.RefreshDataInterval.EnableWeekly) {
                    recurrenceTypeList += "<option value= " + data.RecurrenceType[1] + ">" + window.Server.App.LocalizationContent.Weekly + "</option>";
                }
                if (data.RefreshDataInterval.EnableMonthly) {
                    recurrenceTypeList += "<option value= " + data.RecurrenceType[2] + ">" + window.Server.App.LocalizationContent.Monthly + "</option>";
                }
                if (data.RefreshDataInterval.EnableYearly) {
                    + "<option value= " + data.RecurrenceType[3] + ">" + window.Server.App.LocalizationContent.Yearly + "</option>";
                }
            }

            for (var t = 0; t < data.Days.length; t++) {
                if (data.Days[t].toString().toLowerCase() == "weekendday"
                    || data.Days[t].toString().toLowerCase() == "day"
                    || data.Days[t].toString().toLowerCase() == "weekday") {
                    if (data.Days[t].toString().toLowerCase() == "weekendday") {
                        days += "<option value= " + data.Days[t] + ">weekendday</option>";
                    } else {
                        if (data.Days[t].toString().toLowerCase() == "weekday") {
                            days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.WeekDay + "</option>";
                        }
                        if (data.Days[t].toString().toLowerCase() == "day") {
                            days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Day + "</option>";
                        }
                    }
                }
            }

            for (var t = 0; t < data.Days.length; t++) {
                if (data.Days[t].toString().toLowerCase() != "weekendday"
                    && data.Days[t].toString().toLowerCase() != "day"
                    && data.Days[t].toString().toLowerCase() != "weekday") {
                    if (data.Days[t].toString().toLowerCase() == "sunday") {
                        days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Sunday + "</option>";
                    }
                    if (data.Days[t].toString().toLowerCase() == "monday") {
                        days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Monday + "</option>";
                    }
                    if (data.Days[t].toString().toLowerCase() == "tuesday") {
                        days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Tuesday + "</option>";
                    }
                    if (data.Days[t].toString().toLowerCase() == "wednesday") {
                        days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Wednesday + "</option>";
                    }
                    if (data.Days[t].toString().toLowerCase() == "thursday") {
                        days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Thursday + "</option>";
                    }
                    if (data.Days[t].toString().toLowerCase() == "friday") {
                        days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Friday + "</option>";
                    }
                    if (data.Days[t].toString().toLowerCase() == "saturday") {
                        days += "<option value= " + data.Days[t] + ">" + window.Server.App.LocalizationContent.Saturday + "</option>";
                    }
                }
            }

            weeks = "<option value= " + data.Weeks[0] + ">" + window.Server.App.LocalizationContent.First + "</option>"
		            + "<option value= " + data.Weeks[1] + ">" + window.Server.App.LocalizationContent.Second + "</option>"
		            + "<option value= " + data.Weeks[2] + ">" + window.Server.App.LocalizationContent.Third + "</option>"
		            + "<option value= " + data.Weeks[3] + ">" + window.Server.App.LocalizationContent.Fourth + "</option>"
		            + "<option value= " + data.Weeks[4] + ">" + window.Server.App.LocalizationContent.Last + "</option>";

            months = "<option value= " + data.Months[0] + ">" +window.Server.App.LocalizationContent.January + "</option>"
				    + "<option value= " + data.Months[1] + ">" + window.Server.App.LocalizationContent.February + "</option>"
				    + "<option value= " + data.Months[2] + ">" + window.Server.App.LocalizationContent.March + "</option>"
				    + "<option value= " + data.Months[3] + ">" +window.Server.App.LocalizationContent.April + "</option>"
				    + "<option value= " + data.Months[4] + ">" + window.Server.App.LocalizationContent.May + "</option>"
				    + "<option value= " + data.Months[5] + ">" + window.Server.App.LocalizationContent.June + "</option>"
				    + "<option value= " + data.Months[6] + ">" + window.Server.App.LocalizationContent.July + "</option>"
				    + "<option value= " + data.Months[7] + ">" + window.Server.App.LocalizationContent.August + "</option>"
				    + "<option value= " + data.Months[8] + ">" + window.Server.App.LocalizationContent.September + "</option>"
				    + "<option value= " + data.Months[9] + ">" +window.Server.App.LocalizationContent.October + "</option>"
				    + "<option value= " + data.Months[10] + ">" +window.Server.App.LocalizationContent.November + "</option>"
				    + "<option value= " + data.Months[11] + ">" + window.Server.App.LocalizationContent.December + "</option>";

            var dateTime = data.TimeZoneDateTime.toString();

            if (dateFormat == "dd/MM/yyyy") {
                var date = dateTime.split('/');
                var dd = date[0];
                var mm = date[1];
                var yyyy = date[2]
                var newdate = mm + '/' + dd + '/' + yyyy;
                var zoneTime = new Date(newdate);
            }
            else {
                var zoneTime = new Date(dateTime);
            }
           
            if (timeFormat == "True") {
                var applicationTime = DateCustomFormat(dateFormat + " HH:mm", zoneTime,timeFormat);
            }
            else {
                var applicationTime = DateCustomFormat(dateFormat + " hh:mm", zoneTime,timeFormat);
                applicationTime += (zoneTime.getHours() >= 12) ? " PM" : " AM";
            }

            zoneDateTime = applicationTime;
            minTime = data.RefreshDataInterval.MinimumTime;
            $("#time").html(sysTime);
            $("#zone").html(String(String(time).split("(")[1]).split(")")[0]);
            $("#hour-difference").val(data.HourDifference);
            $("#minute-difference").val(data.MinuteDifference);
        }
    });
    $("#recurrence-type").append(recurrenceTypeList);
    $("#monthly-dow-week").append(weeks);
    $("#monthly-dow-day").append(days);
    $("#yearly-month").append(months);
    $("#yearly-dow-week").append(weeks);
    $("#yearly-dow-day").append(days);
    $("#yearly-dow-month").append(months);
    $("#popup-container_wrapper").ejWaitingPopup("hide");
    $("#daily-every-x-days").prop("checked", true);
    $("#monthly").prop("checked", true);
    $("#yearly").prop("checked", true);
    $("#every-x-days, #monthly-date, #yearly-day").ejNumericTextbox({ name: "numeric", value: 1, minValue: 1, maxValue: 31, width: "65px", height: "32px", incrementStep: 1 });
    $("#every-x-weeks, #every-x-years").ejNumericTextbox({ name: "numeric", value: 1, minValue: 1, maxValue: 99, width: "65px", height: "32px", incrementStep: 1 });
    $("#occurence-count").ejNumericTextbox({ name: "numeric", value: 1, minValue: 1, maxValue: 999, width: "65px", height: "32px", incrementStep: 1 });
    $('#monthly-dow-every-x-months, #monthly-every-x-months').ejNumericTextbox({ name: "numeric", value: 1, minValue: 1, maxValue: 12, width: "65px", height: "32px", incrementStep: 1 });
    Globalize.addCultureInfo("en-US", "default", {
        name: "en-US",
        englishName: "English (United States)",
        nativeName: "English (United States)",
        language: "en",
        calendars: {
            standard: {
                "/": ".",
                firstDay: 1,
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                },
            }
        }
    });
    if (timeFormat == "True") {
        $("#start-date").ejDateTimePicker({ dateTimeFormat: dateFormat + " HH:mm", timeDisplayFormat: " HH:mm" });
        $("#end-date").ejDateTimePicker({ dateTimeFormat: dateFormat + " HH:mm", timeDisplayFormat: " HH:mm" });
    }
    else {
        $("#start-date").ejDateTimePicker({ dateTimeFormat: dateFormat + " hh:mm tt", timeDisplayFormat: " hh:mm tt" });
        $("#end-date").ejDateTimePicker({ dateTimeFormat: dateFormat + " hh:mm tt", timeDisplayFormat: " hh:mm tt" });
    }

    $("#start-date").ejDateTimePicker({
        interval: 10,
        value: zoneDateTime,
        change: validateDateTimePicker,
        enableStrictMode: false,
        locale: "en-US",
        timePopupWidth: 108,
        buttonText: { today: window.Server.App.LocalizationContent.Today, timeNow: window.Server.App.LocalizationContent.Now, done: window.Server.App.LocalizationContent.Done, timeTitle: window.Server.App.LocalizationContent.Time },
        change: function (args) {
            var scheduleMessage = createScheduleMessage(false);
            $("#schedule-message").text(scheduleMessage);
        }
    });
    $("#end-date").ejDateTimePicker({
        interval: 10,
        value: zoneDateTime,
        enableStrictMode: false,
        locale: "en-US",
        timePopupWidth: 108,
        buttonText: { today: window.Server.App.LocalizationContent.Today, timeNow: window.Server.App.LocalizationContent.Now, done: window.Server.App.LocalizationContent.Done, timeTitle: window.Server.App.LocalizationContent.Time },
        change: function (args) {
            var scheduleMessage = createScheduleMessage(false);
            $("#schedule-message").text(scheduleMessage);
        }
    });

    $("#start-date,#end-date").attr("disabled", "disabled");
    $("#start-date,#end-date").css({ cursor: "default" });


function validateDateTimePicker() {
    var startDate = $("#start-date").data("ejDateTimePicker");
    var endDate = $("#end-date").data("ejDateTimePicker");
    var startValue = $("#start-date").data("ejDateTimePicker").getValue();
    var mindateVal = new Date(startValue);
    var formattedString = "";
    $("#end-date").ejDateTimePicker({ minDateTime: new Date(mindateVal.getFullYear(), mindateVal.getMonth(), mindateVal.getDate()), value: new Date(startValue) });
    var hours = parseInt($("#hour-difference").val());
    var mins = parseInt($("#minute-difference").val());
    mindateVal.setHours(mindateVal.getHours() + hours);
    mindateVal.setMinutes(mindateVal.getMinutes() + mins);
    if (timeFormat == "True") {
        formattedString = DateCustomFormat(dateFormat + " HH:mm", mindateVal,timeFormat);
    }
    else {
        formattedString = DateCustomFormat(dateFormat + " hh:mm", mindateVal,timeFormat);
        formattedString += (mindateVal.getHours() >= 12) ? " PM" : " AM";
    }
    $("#time").html(formattedString);
}

function createScheduleMessage(isPopupMessage) {
    var scheduleItem = {};
    var scheduleMessage = window.Server.App.LocalizationContent.Occurs;
    scheduleItem.RecurrenceFactor = $("#occurence-count").val();
    switch ($("#recurrence-type").val().toString().toLowerCase()) {
        case "daily":
            if ($("#daily-every-x-days").prop("checked")) {
                scheduleItem.RecurrenceType = "Daily";
                scheduleItem.RecurrenceInterval = $("#every-x-days").val();
                if (scheduleItem.RecurrenceInterval == 1)
                    addScheduleDetail = window.Server.App.LocalizationContent.EveryDay;
                else
                    addScheduleDetail = window.Server.App.LocalizationContent.EveryMessage + scheduleItem.RecurrenceInterval.toString() + window.Server.App.LocalizationContent.Days;
            }
            else {
                scheduleItem.RecurrenceType = "DailyWeekDay";
                addScheduleDetail = window.Server.App.LocalizationContent.EveryWeekDay;
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
            var selectDays = $(".daygroup:checked");
            for (var i = 0; i < selectDays.length; i++) {
                if (selectDays.length == 1 || i == 0)
                    daysDetail = $(selectDays[i]).parent().text().trim();
                else if (i > 0 && i != selectDays.length - 1)
                    daysDetail = daysDetail + ", " + $(selectDays[i]).parent().text().trim();
                else
                    daysDetail = daysDetail + window.Server.App.LocalizationContent.And + $(selectDays[i]).parent().text().trim();
            }
            if (scheduleItem.RecurrenceInterval === 1) {
                addScheduleDetail = window.Server.App.LocalizationContent.EveryWeek + " ";
            }
            else {
                addScheduleDetail = window.Server.App.LocalizationContent.EveryMessage + scheduleItem.RecurrenceInterval.toString() + window.Server.App.LocalizationContent.Weeks;
            }
            addScheduleDetail += daysDetail !== "" ? window.Server.App.LocalizationContent.On + " " + daysDetail : "";
            break;
        case "monthly":
            if ($("#monthly").prop("checked")) {
                scheduleItem.RecurrenceType = "Monthly";
                scheduleItem.DaysOfMonth = $("#monthly-date").val();
                scheduleItem.RecurrenceInterval = $("#monthly-every-x-months").val();
                addScheduleDetail = window.Server.App.LocalizationContent.Day + scheduleItem.DaysOfMonth.toString() + window.Server.App.LocalizationContent.Every + scheduleItem.RecurrenceInterval.toString() + window.Server.App.LocalizationContent.Month;
            }
            else {
                scheduleItem.RecurrenceType = "MonthlyDOW";
                scheduleItem.WeekOfMonth = $("#monthly-dow-week").find('option:selected').text();
                scheduleItem.DayOfWeek = $("#monthly-dow-day").find('option:selected').text();
                scheduleItem.RecurrenceInterval = $("#monthly-dow-every-x-months").val();
                addScheduleDetail = window.Server.App.LocalizationContent.The + scheduleItem.WeekOfMonth.toString() + " " + $("#monthly-dow-day").find('option:selected').text() + window.Server.App.LocalizationContent.Every + scheduleItem.RecurrenceInterval.toString() + window.Server.App.LocalizationContent.Month;
            }
            break;
        case "yearly":
            scheduleItem.RecurrenceInterval = $("#every-x-years").val();
            if ($("#yearly").prop("checked")) {
                scheduleItem.RecurrenceType = "Yearly";
                scheduleItem.DaysOfMonth = $("#yearly-day").val();
                scheduleItem.MonthOfYear = $("#yearly-month").find('option:selected').text();
                if (scheduleItem.RecurrenceInterval == 1)
                    addScheduleDetail = window.Server.App.LocalizationContent.EveryMessage + scheduleItem.MonthOfYear.toString() + " " + scheduleItem.DaysOfMonth.toString();
                else
                    addScheduleDetail = window.Server.App.LocalizationContent.EveryMessage + scheduleItem.RecurrenceInterval.toString() + window.Server.App.LocalizationContent.Year + scheduleItem.MonthOfYear.toString() + " " + scheduleItem.DaysOfMonth.toString();
            }
            else {
                scheduleItem.RecurrenceType = "YearlyDOW";
                scheduleItem.WeekOfMonth = $("#yearly-dow-week").find('option:selected').text();
                scheduleItem.DayOfWeek = $("#yearly-dow-day").find('option:selected').text();
                scheduleItem.MonthOfYear = $("#yearly-dow-month").find('option:selected').text();
                if (scheduleItem.RecurrenceInterval == 1)
                    addScheduleDetail = window.Server.App.LocalizationContent.The + scheduleItem.WeekOfMonth.toString() + " " + $("#yearly-dow-day option:selected").text() + window.Server.App.LocalizationContent.Of + scheduleItem.MonthOfYear.toString();
                else
                    addScheduleDetail = window.Server.App.LocalizationContent.EveryMessage + scheduleItem.RecurrenceInterval.toString() + window.Server.App.LocalizationContent.Year + scheduleItem.WeekOfMonth.toString() + " " + $("#yearly-dow-day option:selected").text() + window.Server.App.LocalizationContent.Of + scheduleItem.MonthOfYear.toString();
            }
            break;
        case "hourly":
            scheduleItem.RecurrenceType = "Hourly";
            scheduleItem.Frequency = $(".time-width").val();
            scheduleItem.RecurrenceInterval = $("#every-x-hours-value").val();
            var timesplit = scheduleItem.Frequency.split(':');
            var minutes = (timesplit[0]) + timesplit[1];
            var timeText = "";
            if (parseInt(timesplit[0]) > 0)
                timeText += timesplit[0] + " hour(s) ";
            if (parseInt(timesplit[1]) > 0)
                timeText += timesplit[1] + " minute(s)";
           
            var minimum = minTime.split(':');

            if (parseInt(minimum[0]) === 0 && parseInt(timesplit[0]) === 0) {
                if (parseInt(timesplit[1]) < parseInt(minimum[1])) {
                    timeText = minimum[1] + " minute(s)";
                    $("#refresh-interval-warning-message").show();
                }
                else {
                    $("#refresh-interval-warning-message").hide();
                }                
            }
            else if (parseInt(timesplit[0]) < parseInt(minimum[0])) {
                if (parseInt(minimum[1]) === 0) {
                    timeText = minimum[0] + " hour(s) ";
                }
                else if (parseInt(timesplit[0]) === 0) {
                    timeText = minimum[0] + " hour(s) " + minimum[1] + " minute(s)";
                }
                if (parseInt(timesplit[1]) > parseInt(minimum[1])) {
                    $("#refresh-interval-warning-message").show();
                }
                else {
                    $("#refresh-interval-warning-message").hide();
                }                
            }
            else if (parseInt(timesplit[0]) <= parseInt(minimum[0])) {
                if (parseInt(timesplit[0]) === 0) {
                    timeText = minimum[0] + " hour(s) " + minimum[1] + " minute(s)";
                }
                else {
                    if (parseInt(timesplit[1]) < parseInt(minimum[1])) {
                        timeText = minimum[0] + " hour(s) " + minimum[1] + " minute(s)";
                    }
                }
                $("#refresh-interval-warning-message").hide();
            }
            else {
                $("#refresh-interval-warning-message").hide();
            }
            addScheduleDetail = window.Server.App.LocalizationContent.EveryMessage + timeText;
            break;
    }
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    switch ($("input[name=end-type]:checked", "#schedule-end-type").val().toString()) {
        case "never":
            addScheduleDetail = addScheduleDetail +window.Server.App.LocalizationContent.EffectiveFrom + startDate;
            break;
        case "endafter":
            addScheduleDetail = addScheduleDetail +window.Server.App.LocalizationContent.EffectiveFrom + startDate + window.Server.App.LocalizationContent.EndsAfter + scheduleItem.RecurrenceFactor + window.Server.App.LocalizationContent.Occurrence;
            break;
        case "endBy":
            addScheduleDetail = addScheduleDetail +window.Server.App.LocalizationContent.EffectiveFrom + startDate + window.Server.App.LocalizationContent.Until + endDate;
            break;
    }
    $("#recurrence-module").css("display", "block");
    return (isPopupMessage) ? addScheduleDetail : scheduleMessage + addScheduleDetail;
}

$(document).on("change", "#recurrence-type", function () {
    var selected = $(this).find("option:selected").val();
    $("#daily-schedule-option, #weekly-schedule-option, #monthly-schedule-option, #yearly-schedule-option,#frequency").css("display", "none");
    switch (selected.toString().toLowerCase()) {
        case "daily":
            $("#daily-schedule-option").css("display", "block");
            $("#no-view-start,#no-view-end,#time-zone").css("display", "inline");
            break;
        case "weekly":
            $("#weekly-schedule-option").css("display", "block");
            $("#no-view-start,#no-view-end,#time-zone").css("display", "inline");
            break;
        case "monthly":
            $("#monthly-schedule-option").css("display", "block");
            $("#no-view-start,#no-view-end,#time-zone").css("display", "inline");
            break;
        case "yearly":
            $("#yearly-schedule-option").css("display", "block");
            $("#no-view-start,#no-view-end,#time-zone").css("display", "inline");
            break;
        case "hourly":
            $("#frequency").css("display", "block");
            $("#no-view-start,#no-view-end,#time-zone").css("display", "inline");
            break;
    }
    var scheduleMessage = createScheduleMessage(false);
    $("#schedule-message").text(scheduleMessage);
});

function validateSchedule(current) {
    var startDateTimeObj = $("#start-date").data("ejDateTimePicker");
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

//To  stop animation in radio-button on page rendering
$(document).on("click", ".css-radio", function () {
    $(this).siblings("label").removeClass("notransition");
});

function DateTimeParser(dateTime) {
    if (dateTime == undefined) {
        return "";
    }
    var pattern = /Date\(([^)]+)\)/;
    var resultStrs = pattern.exec(dateTime);

    if (resultStrs != null) {
        var dtObj = new Date(parseInt(resultStrs[1]));
        return dtObj;
    }
    else {
        return dateTime;
    }
}

$(document).on("click", "#schedule-submit", function (event) {
    FormJsonString();
    if (validateSchedule(this)) {
        validateNextSchedule();
    }
});

$(document).on("click", "#schedule-submit-cancel", function (event) {

    if (isServer) {
        $("#recurrence-module").hide();
        parent.closeRefreshDataSourceDialog();
    }
    else {
        $("#recurrence-module").hide();
        designerInstance = parent.$(designerId).data('ejDashboardDesigner');
        designerInstance.onScheduleCancelClick({ 'Status': true });
    }
});

$(document).on("click", "#refresh-schedule-close-icon", function (event) {
    if (isServer) {
        $("#recurrence-module").hide();
        parent.closeRefreshDataSourceDialog();
    }
    else {
        $("#recurrence-module").hide();
        designerInstance = parent.$(designerId).data('ejDashboardDesigner');
        designerInstance.onScheduleCancelClick({ 'Status': true });
    }
});

function FormJsonString() {
    scheduleItemJson.StartDate = $("#start-date").val();
    scheduleItemJson.ItemId = createdItemId;
    scheduleItemJson.ItemName = itemName;
    scheduleItemJson.ScheduleId = editScheduleItem.ScheduleId;
    scheduleItemJson.TimeZone = timeZone;
    scheduleItemJson.DateTimeFormat = dateFormat + (timeFormat === "True" ? " HH:mm" : " hh:mm tt");
    switch ($("#recurrence-type").val().toString().toLowerCase()) {
        case "daily":
            if ($("#daily-every-x-days").prop("checked")) {
                scheduleItemJson.RecurrenceType = "Daily";
                scheduleItemJson.RecurrenceInterval = $("#every-x-days").val();
            }
            else {
                scheduleItemJson.RecurrenceType = "DailyWeekDay";
            }
            break;
        case "weekly":
            scheduleItemJson.RecurrenceType = "Weekly";
            scheduleItemJson.RecurrenceInterval = $("#every-x-weeks").val();
            scheduleItemJson.Sunday = $("#sun").prop("checked");
            scheduleItemJson.Monday = $("#mon").prop("checked");
            scheduleItemJson.Tuesday = $("#tues").prop("checked");
            scheduleItemJson.Wednesday = $("#wed").prop("checked");
            scheduleItemJson.Thursday = $("#thu").prop("checked");
            scheduleItemJson.Friday = $("#fri").prop("checked");
            scheduleItemJson.Saturday = $("#sat").prop("checked");
            break;
        case "monthly":
            if ($("#monthly").prop("checked")) {
                scheduleItemJson.RecurrenceType = "Monthly";
                scheduleItemJson.DaysOfMonth = $("#monthly-date").val();
                scheduleItemJson.RecurrenceInterval = $("#monthly-every-x-months").val();
            }
            else {
                scheduleItemJson.RecurrenceType = "MonthlyDOW";
                scheduleItemJson.WeekOfMonth = $("#monthly-dow-week").find('option:selected').text();
                scheduleItemJson.DayOfWeek = $("#monthly-dow-day").find('option:selected').text();
                scheduleItemJson.RecurrenceInterval = $("#monthly-dow-every-x-months").val();
            }
            break;
        case "yearly":
            scheduleItemJson.RecurrenceInterval = $("#every-x-years").val();
            if ($("#yearly").prop("checked")) {
                scheduleItemJson.RecurrenceType = "Yearly";
                scheduleItemJson.DaysOfMonth = $("#yearly-day").val();
                scheduleItemJson.MonthOfYear = $("#yearly-month").find('option:selected').text();
            }
            else {
                scheduleItemJson.RecurrenceType = "YearlyDOW";
                scheduleItemJson.WeekOfMonth = $("#yearly-dow-week").find('option:selected').text();
                scheduleItemJson.DayOfWeek = $("#yearly-dow-day").find('option:selected').text();
                scheduleItemJson.MonthOfYear = $("#yearly-dow-month").find('option:selected').text();
            }
            break;
        case "hourly":
            scheduleItemJson.RecurrenceType = "Hourly";
            scheduleItemJson.Frequency = $(".time-width").val();
            scheduleItemJson.RecurrenceInterval = $("#every-x-hours-value").val();
            break;
    }

    scheduleItemJson.IsEnabled = $("#enable-schedule").prop("checked");
    switch ($("input[name=end-type]:checked", "#schedule-end-type").val().toString()) {
        case "never":
            scheduleItemJson.ScheduleEndType = "NoEnd";
            break;
        case "endafter":
            scheduleItemJson.ScheduleEndType = "EndAfter";
            scheduleItemJson.RecurrenceFactor = $("#occurence-count").val();
            break;
        case "endBy":
            scheduleItemJson.ScheduleEndType = "EndBy";
            scheduleItemJson.EndDate = $("#end-date").val();
            break;
    }

    return scheduleItemJson;
}

function validateNextSchedule() {
   
    $.ajax({
        type: "POST",
        url: getNextScheduleUrl,
        async:false,
        data: {
            scheduleList: JSON.stringify({ ScheduleItem: scheduleItemJson, IsDataSourceschedule:true})
        },
        beforeSend: function () {
            if (isServer) {
                parent.showDataSourceLoaderIcon();
            }
        },
        success: function (data) {
            if (data === "") {
                if (isServer) {
                    parent.hideDataSourceLoaderIcon();
                }
                $("#end-date-validator").html(window.Server.App.LocalizationContent.InvaliEndDate).css("display", "inline");
            }
            else {
                $("#end-date-validator").css("display", "none");

                if (isServer) {
                    $.ajax({
                        type: "POST",
                        url: updateScheduleInfoUrl,
                        async: false,
                        data: {
                            scheduleList: JSON.stringify({ ScheduleItem: scheduleItemJson })
                        },
                        success: function (data) {
                            if (data) {
                                parent.resultRefreshDataSourceDialog(true);
                            }
                            else {
                                parent.resultRefreshDataSourceDialog(false);
                            }
                        }
                    });
                }
                else {
                    designerInstance = parent.$(designerId).data('ejDashboardDesigner');
                    designerInstance.onScheduleSubmitClick({ 'Status': true, 'Data': scheduleItemJson, 'ScheduleMessage': $("#schedule-message").text() });
                }

                $("#recurrence-module").hide();
            }
        }
    });
}

$(document).on("change", ".change-event, input[type=radio][name=daily-recurrence-type], input[type=radio][name=end-type], input[type=radio][name=monthly], input[type=radio][name=yearly]", function () {
    var scheduleMessage = createScheduleMessage(false);
    $("#schedule-message").text(scheduleMessage);
});

$(document).ready(function () {
    $(".schedule-dialog #time-intervals-div").css("display", "inline");
    $("#recurrence-type").trigger("change");
    $(".time-width").ejTimePicker({
        timeFormat: "HH:mm",
        minutesInterval: 5,
        minTime: minTime
    });

    if (actionType.toLowerCase() == "create") {
        scheduleMessage = createScheduleMessage(false);
        $("#schedule-message").text(scheduleMessage);
    }
    else {
        $("#frequency").css("display", "none");
        switch ((recurrence).toLowerCase()) {
            case "hourly":
                recurrenceType = "Hourly";
                $("#frequency").css("display", "block");
                $("#hourly-schedule-option").css("display", "block");
                var mins = (frequency % 60) < 10 ? ("0" + (frequency % 60)) : frequency % 60;
                var hours = (parseInt(frequency / 60) < 10) ? ("0" + parseInt(frequency / 60)) : parseInt(frequency / 60);
                conversionToMinutes = hours + ":" + mins;
                $("#frequency").find("input").val(conversionToMinutes);
                break;
            case "daily":
                recurrence = "Daily";
                $("#daily-schedule-option").css("display", "block");
                $("#daily-every-x-days").prop("checked", true);
                var everyXDaysObj = $("#every-x-days").data("ejNumericTextbox");
                everyXDaysObj.option("value", itemRecurrence.DailySchedule.DaysInterval);
                break;

            case "dailyweekday":
                recurrence = "Daily";
                $("#daily-schedule-option").css("display", "block");
                $("#daily-weekdays").prop("checked", true);
                break;

            case "weekly":
                recurrence = "Weekly";
                $("#weekly-schedule-option").css("display", "block");
                var everyXWeeksObj = $("#every-x-weeks").data("ejNumericTextbox");
                everyXWeeksObj.option("value", itemRecurrence.WeeklySchedule.WeeksInterval);
                $("#sun").prop("checked", itemRecurrence.WeeklySchedule.DaysOfWeek.Sunday);
                $("#mon").prop("checked", itemRecurrence.WeeklySchedule.DaysOfWeek.Monday);
                $("#tues").prop("checked", itemRecurrence.WeeklySchedule.DaysOfWeek.Tuesday);
                $("#wed").prop("checked", itemRecurrence.WeeklySchedule.DaysOfWeek.Wednesday);
                $("#thu").prop("checked", itemRecurrence.WeeklySchedule.DaysOfWeek.Thursday);
                $("#fri").prop("checked", itemRecurrence.WeeklySchedule.DaysOfWeek.Friday);
                $("#sat").prop("checked", itemRecurrence.WeeklySchedule.DaysOfWeek.Saturday);
                break;

            case "monthly":
                recurrence = "Monthly";
                $("#monthly-schedule-option").css("display", "block");
                $("#monthly").prop("checked", true);
                var monthlyDateObj = $("#monthly-date").data("ejNumericTextbox");
                monthlyDateObj.option("value", itemRecurrence.MonthlySchedule.DayOfMonth);
                var monthlyEveryXMonthsObj = $("#monthly-every-x-months").data("ejNumericTextbox");
                monthlyEveryXMonthsObj.option("value", itemRecurrence.MonthlySchedule.Months);
                break;

            case "monthlydow":
                recurrence = "Monthly";
                $("#monthly-schedule-option").css("display", "block");
                $("#monthly-dow").prop("checked", true);
                $("#monthly-dow-week option[value='" + itemRecurrence.MonthlyDowSchedule.WeeksOfTheMonth + "']").attr("selected", true);
                $("#monthly-dow-week").selectpicker("refresh");
                $("#monthly-dow-day option[value='" + itemRecurrence.MonthlyDowSchedule.DaysOfTheWeek + "']").attr("selected", true);
                $("#monthly-dow-day").selectpicker("refresh");
                var monthlyDOWEveryXMonthsObj = $("#monthly-dow-every-x-months").data("ejNumericTextbox");
                monthlyDOWEveryXMonthsObj.option("value", itemRecurrence.MonthlyDowSchedule.Months);
                break;

            case "yearly":
                recurrence = "Yearly";
                $("#yearly-schedule-option").css("display", "block");
                $("#yearly").prop("checked", true);
                var everyXYearsObj = $("#every-x-years").data("ejNumericTextbox");
                everyXYearsObj.option("value", itemRecurrence.YearlySchedule.YearsInterval);
                $("#yearly-month option[value='" + itemRecurrence.YearlySchedule.MonthsOfTheYear + "']").attr("selected", true);
                $("#yearly-month").selectpicker("refresh");
                var yearlyDayObj = $("#yearly-day").data("ejNumericTextbox");
                yearlyDayObj.option("value", itemRecurrence.YearlySchedule.DayOfMonth);
                break;

            case "yearlydow":
                recurrence = "Yearly";
                $("#yearly-schedule-option").css("display", "block");
                $("#yearly-dow").prop("checked", true);
                var everyXYearsObj = $("#every-x-years").data("ejNumericTextbox");
                everyXYearsObj.option("value", itemRecurrence.YearlyDowSchedule.YearsInterval);
                $("#yearly-dow-week option[value='" + itemRecurrence.YearlyDowSchedule.WeeksOfTheMonth + "']").attr("selected", true);
                $("#yearly-dow-week").selectpicker("refresh");
                $("#yearly-dow-day option[value='" + itemRecurrence.YearlyDowSchedule.DaysOfTheWeek + "']").attr("selected", true);
                $("#yearly-dow-day").selectpicker("refresh");
                $("#yearly-dow-month option[value='" + itemRecurrence.YearlyDowSchedule.MonthsOfTheYear + "']").attr("selected", true);
                $("#yearly-dow-month").selectpicker("refresh");
                break;
        }
        $("#enable-sunday,#enable-monday,#enable-tuesday,#enable-wednesday,#enable-thursday,#enable-friday,#enable-saturday").on("click", function () {
            if (isSafari) {
                $(this).find("label").toggleClass("check");
            }
        });

        $("#recurrence-type option[value='" + recurrence + "']").attr("selected", true);
        $("#recurrence-type").selectpicker("refresh");

        $("#start-date").ejDateTimePicker({ value: startDate });
        switch (endType.toString().toLowerCase()) {
            case "noenddate":
                $("#no-end-date").prop("checked", true);
                var startObj = $("#start-date").data("ejDateTimePicker").model.value;
                break;
            case "enddate":
                $("#endBy").prop("checked", true);
                $("#end-date").ejDateTimePicker({ value: endDate });
                break;
            case "endafter":
                $("#end-after").prop("checked", true);
                var occurenceCountObj = $("#occurence-count").data("ejNumericTextbox");
                occurenceCountObj.option("value", endAfter);
                break;
        }
    }
    addTitleForRecurrenceType();
    $("#recurrence-module").show();
    designerId = "#" + parent.$(parent.$(".e-dashboarddesigner")[0]).attr("id");

    if (isServer) {
        parent.hideDataSourceLoaderIcon();
    }
    else {
        designerInstance = parent.$(designerId).data('ejDashboardDesigner');
        designerInstance.onScheduleDialogRenderingComplete({ 'Status': true });
    }
});

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
