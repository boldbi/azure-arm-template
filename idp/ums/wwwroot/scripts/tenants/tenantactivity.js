var clickedFlag = false;
var dateArray = [];
var leastItemLogId, leastItemCommentLogId, leastScheduleLogId;
var isResetClicked = false;
var itemEvents = [
    { event: "Dashboard.Added", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Dashboard.Edited", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Dashboard.Deleted", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Dashboard.Moved", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Dashboard.Copied", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Dashboard.Cloned", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Dashboard.Rollbacked", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Dashboard.Visited", itemtype: "Dashboard", itemHeader: getHeaderCheckbox("Dashboard") },
    { event: "Category.Added", itemtype: "Category", itemHeader: getHeaderCheckbox("Category") },
    { event: "Category.Edited", itemtype: "Category", itemHeader: getHeaderCheckbox("Category") },
    { event: "Category.Deleted", itemtype: "Category", itemHeader: getHeaderCheckbox("Category") },
    { event: "Datasource.Added", itemtype: "Datasource", itemHeader: getHeaderCheckbox("Datasource") },
    { event: "Datasource.Edited", itemtype: "Datasource", itemHeader: getHeaderCheckbox("Datasource") },
    { event: "Datasource.Deleted", itemtype: "Datasource", itemHeader: getHeaderCheckbox("Datasource") },
    { event: "Datasource.Rollbacked", itemtype: "Datasource", itemHeader: getHeaderCheckbox("Datasource") },
    { event: "Schedule.Added", itemtype: "Schedule", itemHeader: getHeaderCheckbox("Schedule") },
    { event: "Schedule.Edited", itemtype: "Schedule", itemHeader: getHeaderCheckbox("Schedule") },
    { event: "Schedule.Deleted", itemtype: "Schedule", itemHeader: getHeaderCheckbox("Schedule") },
    { event: "Schedule.Run", itemtype: "Schedule", itemHeader: getHeaderCheckbox("Schedule") },
    { event: "Comment.Added", itemtype: "Comment", itemHeader: getHeaderCheckbox("Comment") },
    { event: "Comment.Edited", itemtype: "Comment", itemHeader: getHeaderCheckbox("Comment") },
    { event: "Comment.Replied", itemtype: "Comment", itemHeader: getHeaderCheckbox("Comment") },
    { event: "Comment.Deleted", itemtype: "Comment", itemHeader: getHeaderCheckbox("Comment") },
    { event: "Comment.UserMention", itemtype: "Comment", itemHeader: getHeaderCheckbox("Comment") }
];

$(function () {
    $("#activity-daterange").ejDateRangePicker({
        allowEdit: false,
        width: "275px",
        change: "onChangeEventFilter",
        ranges: [
            { label: "This Week", range: [new Date(new Date().setDate(new Date().getDate() - new Date().getDay())), new Date(new Date().setDate((new Date().getDate() - new Date().getDay()) + 6))] },
            { label: "This Month", range: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)] },
            { label: "Last Month", range: [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)] },
            { label: "Last 6 Months", range: [new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)] },
            { label: "This Year", range: [new Date(new Date().getFullYear(), 0), new Date(new Date().getFullYear(), 12, 0)] },
            { label: "Last Year", range: [new Date(new Date().getFullYear() - 1, 0), new Date(new Date().getFullYear() - 1, 12, 0)] }
        ]
    });

    $(".rangeItem.e-custompic").html("Custom Range");

    $('#event-filter').ejDropDownList({
        dataSource: itemEvents,
        enableFilterSearch: true,
        fields: { groupBy: "itemHeader", text: "event" },
        watermarkText: "Select Item Events",
        showCheckbox: true,
        change: "eventFilterValueChange",
        selected: true,
        width: "275px",
        minPopupHeight: "315px"
    });

    $('#record-count').ejDropDownList({
        dataSource: [
            { value: 100 },
            { value: 250 },
            { value: 500 }
        ],
        fields: { text: "value" },
        selected: true,
        value: 100,
        width: "150px",
        change: "onChangeEventFilter"
    });

    $('#status-filter').ejDropDownList({
        dataSource: [
            { value: "Success" },
            { value: "Failure" }
        ],
        fields: { text: "value" },
        selected: true,
        value: "Success",
        width: "150px",
        showCheckbox: true,
        change: "onChangeEventFilter"
    });

    var actionButtonWaitingPopupTemplateId = createLoader("action-btn");
    $("#action-btn").ejWaitingPopup({ template: $("#" + actionButtonWaitingPopupTemplateId) });
    var loaderDivWaitingPopupTemplateId = createLoader("loader-div");
    $("#loader-div").ejWaitingPopup({ template: $("#" + loaderDivWaitingPopupTemplateId) });
    var activityFeedBodyWaitingPopupTemplateId = createLoader("activity-feed-body");
    $("#activity-feed-body").ejWaitingPopup({ template: $("#" + activityFeedBodyWaitingPopupTemplateId) });

    if (isLoadActivity) {
        showHideLoaderPopup("show", false);
        renderLogs(activityFeed.Data, 0, 0, 0, false);
        renderRecordsCount(activityFeed.Data.RecordsCount);
    }
});

$(document).on('click', '#ad-tab-nav li#activity a', function (e) {
    if (!isLoadActivity) {
        getActivityLogs(0, 0, 0, false);
        isLoadActivity = true;
    }
});

function onChangeEventFilter() {
    if (!isResetClicked) {
        $.xhrPool.abortAll();
        applyFilters();
    }
}

$(document).on("click", "#action-btn", function () {
    $("#error-notification-info").css("display", "none");
    getActivityLogs(leastItemLogId, leastItemCommentLogId, leastScheduleLogId, true);
});

function getActivityLogs(lstItemLogId, lstItemCommentLogId, lstScheduleLogId, isLoadMore) {
    showHideLoaderPopup("show", isLoadMore);
    $.ajax({
        type: "POST",
        data: JSON.stringify(getPostData(lstItemLogId, lstItemCommentLogId, lstScheduleLogId, isLoadMore)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: getFeedsTagUrl,
        success: function (data) {
            renderLogs(data, lstItemLogId, lstItemCommentLogId, lstScheduleLogId, isLoadMore);
            if (!isLoadMore) {
                renderRecordsCount(data.RecordsCount);
            }            
        }
    });
}

function renderLogs(data, lstItemLogId, lstItemCommentLogId, lstScheduleLogId, isLoadMore) {
    var feedsTag = "";
    if (data.Status) {
        if (!data.IsEmpty) {
            leastItemLogId = data.LeastItemLogId;
            leastItemCommentLogId = data.LeastItemCommentLogId;
            leastScheduleLogId = data.LeastScheduleLogId;
            var feeds = data.ActivityFeeds;
            if (!isLoadMore) {
                dateArray = [];
            }
            for (var i = 0; i < feeds.length; i++) {
                if (dateArray.indexOf(feeds[i].ModifiedDateString) === -1) {
                    feedsTag +=
                        "<div class='row date-row'><div class='content'><span class='date-header'>" +
                        (new Date(feeds[i].ModifiedDateString).toDateString() === new Date().toDateString()
                            ? "Today"
                            : feeds[i].ModifiedDateString) +
                        "</span><span class='date-split-line'></span></div></div>";
                    dateArray = dateArray.concat(feeds[i].ModifiedDateString);
                }

                var itemIcon = "";
                var eventIcon = "";
                var feedLine = "";
                var feedColorClass = "";

                if (feeds[i].ItemLogId != null) {
                    switch (feeds[i].ItemType.toString().toLowerCase()) {
                        case "dashboard":
                            itemIcon = feeds[i].IsDraft ? "su-draft" : "su-nav-dashboard";
                            break;
                        case "category":
                            itemIcon = "su-categoried-dashboard";
                            break;
                        case "datasource":
                            itemIcon = "su-nav-datasource";
                            break;
                        case "schedule":
                            itemIcon = "su-nav-schedule";
                            break;
                        case "widget":
                            itemIcon = "su-nav-widgets";
                            break;
                    }

                    feedLine += feeds[i].ItemType.toString().toLowerCase() === "dashboard" && feeds[i].IsDraft
                            ? "Draft dashboard"
                            : feeds[i].ItemType.toString();
                    switch (feeds[i].ItemLogType.toString().toLowerCase()) {
                        case "added":
                            feedLine += (feeds[i].ItemType.toString().toLowerCase() === "dashboard"
                                ? " added"
                                : " created");
                            feedColorClass = "feed-added";
                            eventIcon = "su-add";
                            break;
                        case "edited":
                            feedLine += " updated" + (feeds[i].ItemType.toString().toLowerCase() === "dashboard"
                                    ? " to version " + feeds[i].VersionNumber : "");
                            feedColorClass = "feed-edited";
                            eventIcon = "su-edit";
                            break;
                        case "deleted":
                            feedLine += " deleted";
                            feedColorClass = "feed-deleted";
                            eventIcon = "su-delete";
                            break;
                        case "moved":
                            feedLine += " moved";
                            feedColorClass = "feed-edited";
                            eventIcon = "su-move";
                            break;
                        case "copied":
                            feedLine += " copied";
                            feedColorClass = "feed-edited";
                            eventIcon = "su-copy";
                            break;
                        case "cloned":
                            feedLine += " cloned";
                            feedColorClass = "feed-edited";
                            eventIcon = "su-clone";
                            break;
                        case "rollbacked":
                            feedLine += " rolled back";
                            feedColorClass = "feed-edited";
                            eventIcon = "su-roll-back";
                            break;
                        case "visited":
                            feedLine += " visited";
                            feedColorClass = "feed-edited";
                            eventIcon = "su-eye";
                            break;
                    }
                }
                else if (feeds[i].ItemCommentLogId != null) {
                    itemIcon = "su-with-comment";
                    switch (feeds[i].ItemCommentLogType.toString().toLowerCase()) {
                        case "added":
                            feedLine += "Comment added";
                            feedColorClass = "feed-added";
                            eventIcon = "su-add";
                            break;
                        case "replied":
                            feedLine += "Comment has been replied";
                            feedColorClass = "feed-added";
                            eventIcon = "su-reply";
                            break;
                        case "usermention":
                            feedLine += feeds[i].ListOfMentionedUsers +
                                (feeds[i].ListOfMentionedUsers > 1 ? " users" : " user") +
                                " has been mentioned in a comment";
                            feedColorClass = "feed-added";
                            eventIcon = "su-user-1";
                            break;
                        case "edited":
                            feedLine += "Comment edited";
                            feedColorClass = "feed-edited";
                            eventIcon = "su-edit";
                            break;
                        case "deleted":
                            feedLine += "Comment deleted";
                            feedColorClass = "feed-deleted";
                            eventIcon = "su-delete";
                            break;
                    }
                }
                else if (feeds[i].ScheduleLogId != null) {
                    itemIcon += "su-nav-schedule";
                    if (feeds[i].ExportType.toString().toLowerCase() === "refresh") {
                        feedLine += "Data Source refresh schedule -";
                        if (feeds[i].ScheduleStatus.toString().toLowerCase() === "run") {
                            feedLine += "started";
                            feedColorClass = "feed-added";
                        }
                        else if (feeds[i].ScheduleStatus.toString().toLowerCase() === "success") {
                            feedLine += " success";
                            feedColorClass = "feed-added";
                        } else {
                            feedLine += " failed";
                            feedColorClass = "feed-failure";
                        }
                        eventIcon = "su-nav-datasource";
                    } else {
                        feedLine += "Dashboard export schedule - " + feeds[i].ExportType.toString();
                        if (feeds[i].ScheduleStatus.toString().toLowerCase() === "run") {
                            feedLine += " - started";
                            feedColorClass = "feed-added";
                        }
                        else if (feeds[i].ScheduleStatus.toString().toLowerCase() === "success") {
                            feedLine += " - success";
                            feedColorClass = "feed-added";
                        } else {
                            feedLine += " - failed";
                            feedColorClass = "feed-failure";
                        }
                        eventIcon = "su-image";
                    }
                }

                feedsTag += "<div class='row " +
                    feedColorClass +
                    "'><div class='content'><span class='su " +
                    itemIcon +
                    " item-icon'></span><span class='su " +
                    eventIcon +
                    " event-icon'></span><div class='feed-content'><p>" +
                    feedLine +
                    ".</p><br/><span class='date'>" +
                    feeds[i].ModifiedDateString +
                    " - " + feeds[i].ModifiedDateTime + "</span></div></div></div>";
            }

            if (!data.IsFinal) {
                $("#more-notification-btn").css("display", "block");
            } else {
                $("#more-notification-btn").css("display", "none");
                $("#no-more-notification-info").css("display", "block");
            }
        } else if (lstItemLogId <= 1 && lstItemCommentLogId <= 1 && lstScheduleLogId <= 1) {
            $("#more-notification-btn").css("display", "none");
            $("#no-notification-info").css("display", "block");
        } else {
            $("#more-notification-btn").css("display", "none");
            $("#no-more-notification-info").css("display", "block");
        }
    } else {
        $("#error-notification-info").css("display", "block");
    }

    if (isLoadMore) {
        $("#activity-feed-body").append(feedsTag);
    } else {
        $("#activity-feed-body").html(feedsTag);
    }

    $('[data-toggle="tooltip"]').tooltip();
    showHideLoaderPopup("hide", isLoadMore);
    clickedFlag = isResetClicked = false;
}

function showHideLoaderPopup(type, isLoadMore) {
    $("#" + (isLoadMore ? "action-btn" : "loader-div")).ejWaitingPopup(type);
    $("#loader-div_WaitingPopup div svg circle").attr("r", "13");
}

function getHeaderCheckbox(type) {
    return "<label><input type='checkbox' class='item-type-header' data-value='" + type + "' id='" + type.toString().toLowerCase() + "-header'/><span>" + type + "</span></label>";
}

$(document).on("click", ".item-type-header", function () {
    var clickedHeader = $(this).attr("data-value");
    var drpDownObj = $("#event-filter").ejDropDownList("instance");

    if (!clickedFlag) {
        clickedFlag = true;
        applyFilters();
    }

    for (var i = 0; i < drpDownObj.listitems.length; i++) {
        if (drpDownObj.listitems[i].innerText.indexOf(clickedHeader) !== -1) {
            if ($(this).prop("checked")) {
                drpDownObj.setSelectedText(drpDownObj.listitems[i].innerText);
            } else {
                drpDownObj.unselectItemByText(drpDownObj.listitems[i].innerText);
            }
        }
    }
});

function eventFilterValueChange(args) {
    $.xhrPool.abortAll();
    var selectedCategory = args.selectedText.split('.')[0];
    var selectedCurrentCategoryCount = 0;
    var visibleCurrentCategoryCount = 0;
    var drpDownObj = $("#event-filter").ejDropDownList("instance");

    for (var i = 0; i < drpDownObj.listitems.length; i++) {
        if (drpDownObj.listitems[i].innerText.indexOf(selectedCategory) !== -1) {
            visibleCurrentCategoryCount++;
            if (args.text != null && args.text != undefined && args.text.indexOf(drpDownObj.listitems[i].innerText) !== -1) {
                selectedCurrentCategoryCount++;
            }
        }
    }

    if (visibleCurrentCategoryCount === selectedCurrentCategoryCount) {
        if ($("#" + selectedCategory.toString().toLowerCase() + "-header").prop("indeterminate") === true) {
            $("#" + selectedCategory.toString().toLowerCase() + "-header").prop("indeterminate", false);
        }
        $("#" + selectedCategory.toString().toLowerCase() + "-header").prop("checked", true);
    } else if (selectedCurrentCategoryCount === 0) {
        if ($("#" + selectedCategory.toString().toLowerCase() + "-header").prop("indeterminate") === true) {
            $("#" + selectedCategory.toString().toLowerCase() + "-header").prop("indeterminate", false);
        }
        $("#" + selectedCategory.toString().toLowerCase() + "-header").prop("checked", false);
    } else {
        $("#" + selectedCategory.toString().toLowerCase() + "-header").prop("indeterminate", true);
    }

    if (!isResetClicked) {
        applyFilters();
    }
}

function applyFilters() {
    $("#no-notification-info, #no-more-notification-info, #error-notification-info").css("display", "none");
    getActivityLogs(0, 0, 0, false);
}

function getPostData(lstItemLogId, lstItemCommentLogId, lstScheduleLogId, isLoadMore) {
    var activityDateRange = $("#activity-daterange").ejDateRangePicker("instance");
    var filterStartDateTime = activityDateRange.model.value != null ? activityDateRange.model.value.split('-')[0].trim() : "";
    var filterEndDateTime = activityDateRange.model.value != null ? activityDateRange.model.value.split('-')[1].trim() : "";
    var drpDownObj = $("#event-filter").ejDropDownList("instance");
    var statusObj = $("#status-filter").ejDropDownList("instance");

    var data =
    {
        "activityRequest.TenantInfoId": tntInfoId,
        "activityRequest.LeastItemLogId": lstItemLogId,
        "activityRequest.LeastItemCommentLogId": lstItemCommentLogId,
        "activityRequest.LeastScheduleLogId": lstScheduleLogId,
        "activityRequest.StartDate": filterStartDateTime,
        "activityRequest.EndDate": filterEndDateTime,
        "activityRequest.EventFilterValue": drpDownObj.model.value,
        "activityRequest.RecordCount": $("#record-count").val(),
        "activityRequest.StatusFilterValue": statusObj.model.value,
        "activityRequest.IsLoadMore": isLoadMore
    };

    return data;
}

$(document).on("click", ".reset-filters", function () {
    var drpDownObj = $("#event-filter").ejDropDownList("instance");
    var dateRangeObj = $('#activity-daterange').ejDateRangePicker("instance");
    var countObj = $('#record-count').ejDropDownList("instance");
    var statusObj = $("#status-filter").ejDropDownList("instance");

    if (drpDownObj.model.value !== null || dateRangeObj.model.value !== null || countObj.model.value !== "100" || statusObj.model.value !== "Success") {
        isResetClicked = true;
        if (drpDownObj.model.value !== null) {
            drpDownObj.unCheckAll();
            $(".item-type-header").prop("indeterminate", false).prop("checked", false);
        }

        if (dateRangeObj.model.value !== null) {
            $("#activity-daterange_popup .e-drp-reset").click();
        }

        if (countObj.model.value !== "100") {
            countObj.selectItemByValue(100);
        }

        if (statusObj.model.value != "Success") {
            statusObj.unCheckAll()
            statusObj.selectItemByIndex(0)
        }

        $.xhrPool.abortAll();
        window.setTimeout(applyFilters, 250);
    }
});

function renderRecordsCount(data) {
    var records = data;
    var recordstag = "";
    var tag = "";
    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "added") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "edited") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "deleted") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "moved") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "copied") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "cloned") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "rollbacked") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "dashboard" && records[i].ItemLogType.toLowerCase() === "visited") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    recordstag += (tag === "" ? "" : "<div class='record-count-div'><span class='item-type'>Dashboard</span><br/>" + tag + "</div>");
    tag = "";

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "category" && records[i].ItemLogType.toLowerCase() === "added") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "category" && records[i].ItemLogType.toLowerCase() === "edited") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "category" && records[i].ItemLogType.toLowerCase() === "deleted") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    recordstag += (tag === "" ? "" : "<div class='record-count-div'><span class='item-type'>Category</span><br/>" + tag + "</div>");
    tag = "";

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "datasource" && records[i].ItemLogType.toLowerCase() === "added") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "datasource" && records[i].ItemLogType.toLowerCase() === "edited") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "datasource" && records[i].ItemLogType.toLowerCase() === "deleted") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "datasource" && records[i].ItemLogType.toLowerCase() === "rollbacked") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    recordstag += (tag === "" ? "" : "<div class='record-count-div'><span class='item-type'>Datasource</span><br/>" + tag + "</div>");
    tag = "";

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "schedule" && records[i].ItemLogType.toLowerCase() === "added") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "schedule" && records[i].ItemLogType.toLowerCase() === "edited") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemType !== null && records[i].ItemLogType !== null && records[i].ItemType.toLowerCase() === "schedule" && records[i].ItemLogType.toLowerCase() === "deleted") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemLogType + "</span></div>";
        }
    }

    recordstag += (tag === "" ? "" : "<div class='record-count-div'><span class='item-type'>Schedule</span><br/>" + tag + "</div>");
    tag = "";

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemCommentLogType !== null && records[i].ItemCommentLogType.toLowerCase() === "added") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemCommentLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemCommentLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemCommentLogType !== null && records[i].ItemCommentLogType.toLowerCase() === "edited") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemCommentLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemCommentLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemCommentLogType !== null && records[i].ItemCommentLogType.toLowerCase() === "replied") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemCommentLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemCommentLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemCommentLogType !== null && records[i].ItemCommentLogType.toLowerCase() === "deleted") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemCommentLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemCommentLogType + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ItemCommentLogType !== null && records[i].ItemCommentLogType.toLowerCase() === "usermention") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ItemCommentLogType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ItemCommentLogType + "</span></div>";
        }
    }

    recordstag += (tag === "" ? "" : "<div class='record-count-div'><span class='item-type'>Comment</span><br/>" + tag + "</div>");
    tag = "";

    for (var i = 0; i < records.length; i++) {
        if (records[i].ExportType !== null && records[i].ScheduleStatus.toLowerCase() === "run") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ExportType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ExportType + "</span><br/><span class='item-status label label-primary'>" + records[i].ScheduleStatus + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ExportType !== null && records[i].ScheduleStatus.toLowerCase() === "success") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ExportType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ExportType + "</span><br/><span class='item-status label label-" + (records[i].ScheduleStatus.toLowerCase() === "success" ? "success" : "warning") + "'>" + records[i].ScheduleStatus + "</span></div>";
        }
    }

    for (var i = 0; i < records.length; i++) {
        if (records[i].ExportType !== null && records[i].ScheduleStatus.toLowerCase() === "failure") {
            tag += "<div class='record-line'><span class='event-icon su " + getEventIconClass(records[i].ExportType.toLowerCase()) + "'></span><br/><span class='item-count'>" + records[i].RecordCount + "</span><br/><span class='item-event'>" + records[i].ExportType + "</span><br/><span class='item-status label label-" + (records[i].ScheduleStatus.toLowerCase() === "success" ? "success" : "warning") + "'>" + records[i].ScheduleStatus + "</span></div>";
        }
    }

    recordstag += (tag === "" ? "" : "<div class='record-count-div'><span class='item-type'>Schedule Run</span><br/>" + tag + "</div>");
    tag = "";

    recordstag = (recordstag === "" ? "" : "<div class='record-summary-header'>Summary</div>" + recordstag);
    $("#records-summary").html(recordstag);
}

function getEventIconClass(eventType) {
    var eventIcon = "";
    switch (eventType) {
        case "added":
            eventIcon = "su-add";
            break;
        case "edited":
            eventIcon = "su-edit";
            break;
        case "deleted":
            eventIcon = "su-delete";
            break;
        case "moved":
            eventIcon = "su-move";
            break;
        case "copied":
            eventIcon = "su-copy";
            break;
        case "cloned":
            eventIcon = "su-clone";
            break;
        case "rollbacked":
            eventIcon = "su-roll-back";
            break;
        case "replied":
            eventIcon = "su-reply";
            break;
        case "usermention":
            eventIcon = "su-user-1";
            break;
        case "refresh":
            eventIcon = "su-nav-datasource";
            break;
        case "image":
            eventIcon = "su-image";
            break;
        case "pdf":
            eventIcon = "su-image";
            break;
        case "excel":
            eventIcon = "su-image";
            break;
        case "visited":
            eventIcon = "su-eye";
            break;
    }

    return eventIcon;
}

$(window).scroll(function () {
    if ($("#record-summary-div").is(":visible")) {
        var top_of_element = $(".row.date-row:first-child").offset().top;
        var bottom_of_element = $(".row.date-row:first-child").offset().top + $(".row.date-row:first-child").outerHeight();
        var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
        var top_of_screen = $(window).scrollTop();

        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
            if ($("#record-summary-div").hasClass("scroll-class")) {
                $("#record-summary-div").removeClass("scroll-class");
            }
        }
        else {
            if (!$("#record-summary-div").hasClass("scroll-class")) {
                $("#record-summary-div").addClass("scroll-class");
            }
        }
    }
});