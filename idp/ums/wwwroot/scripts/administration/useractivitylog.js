var applicationDateRangeObj = ""
var loginDateRangeObj = ""
var activityLogStartDateTime = ""
var activityLogEndDateTime = ""
var dropDownList = ""
var gridLogin = null;
var allEventTypeOptions = [];
var loginEventTypeOptions = [];
var allEventCategoryOptions = [];

function getActivityLogViewQuery() {
    return (window.location.search || '').toString();
}

function setActivityLogViewQuery(viewName) {
    var query = getActivityLogViewQuery();
    var expectedQuery = '?view=' + viewName;
    if (query != expectedQuery) {
        history.pushState(null, '', expectedQuery);
    }
}

function activateActivityTab(tabSelector) {
    var tabElement = $(tabSelector);
    if (tabElement.length > 0) {
        tabElement.tab('show');
        $(tabSelector).closest('li').addClass('active');
    }
}

function initializeActivityLogTabFromQuery() {
    var query = getActivityLogViewQuery();
    $("#activity-tab-nav li").removeClass("active");

    if (query == '?view=login-activity') {
        activateActivityTab('#login-activity-tab-link');
        updateFilterUIForActiveTab();
        loginActivityLogGrid();
    }
    else {
        activateActivityTab('#audit-logs-tab-link');
        updateFilterUIForActiveTab();
        setActivityLogViewQuery('system-activity');
    }
}

$(document).ready(function () {
    
    var specificEventType = [];
    for(var i = 1; i < eventType.length; i++)
    {
        var eventTypeList = {'text': eventType[i].Text, 'value': eventType[i].Value}
        specificEventType.push(eventTypeList);
    }
    
    var specificEventCategory = [];
    for(var i = 1; i < eventCategory.length; i++)
    {
        var eventCategoryList = {'text': eventCategory[i].Text, 'value': eventCategory[i].Value}
        specificEventCategory.push(eventCategoryList);
    }

    allEventTypeOptions = specificEventType;
    try {
        if (typeof loginEventType !== 'undefined' && Array.isArray(loginEventType) && loginEventType.length > 0) {
            loginEventTypeOptions = loginEventType.map(function (it) { return { text: it.Text, value: it.Value }; });
        } else {
            loginEventTypeOptions = [
                { text: (window.Server && window.Server.App && window.Server.App.LocalizationContent && window.Server.App.LocalizationContent.Success) ? window.Server.App.LocalizationContent.Success : 'Success', value: 'Success' },
                { text: (window.Server && window.Server.App && window.Server.App.LocalizationContent && window.Server.App.LocalizationContent.Failed) ? window.Server.App.LocalizationContent.Failed : 'Failed', value: 'Failed' },
                { text: (window.Server && window.Server.App && window.Server.App.LocalizationContent && window.Server.App.LocalizationContent.Locked) ? window.Server.App.LocalizationContent.Locked : 'Locked', value: 'Locked' },
                { text: (window.Server && window.Server.App && window.Server.App.LocalizationContent && window.Server.App.LocalizationContent.Unlocked) ? window.Server.App.LocalizationContent.Unlocked : 'Unlocked', value: 'Unlocked' }
            ];
        }
    } catch (e) {
        loginEventTypeOptions = [
            { text: 'Success', value: 'Success' },
            { text: 'Failed', value: 'Failed' },
            { text: 'Locked', value: 'Locked' },
            { text: 'Unlocked', value: 'Unlocked' }
        ];
    }
    
    allEventCategoryOptions = specificEventCategory;
    
    dropDownListInitializationForAdd('#user-event-type', 'EventType', '', '', '',specificEventType);
    dropDownListInitializationForAdd('#user-event-category', 'EventCategory', '', '', '',specificEventCategory);
    var loginEventTypePlaceholder = (window.Server && window.Server.App && window.Server.App.LocalizationContent && window.Server.App.LocalizationContent.EventType) ? window.Server.App.LocalizationContent.EventType : 'Event Type';
    dropDownListInitializationForAdd('#login-event-type', loginEventTypePlaceholder, '', '', '',loginEventTypeOptions);
    applicationDateRangeObj = new ej.calendars.DateRangePicker({
        placeholder: 'Select a range',
        format: userActivityLogDateFormat,
        cssClass: 'e-custom',
        presets: [
            { label: window.Server.App.LocalizationContent.Today, start: new Date(), end: new Date() },
            { label: window.Server.App.LocalizationContent.Yesterday, start: new Date(new Date().setDate(new Date().getDate() - 1)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last7Days, start: new Date(new Date().setDate(new Date().getDate() - 7)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last15Days, start: new Date(new Date().setDate(new Date().getDate() - 14)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last30Days, start: new Date(new Date().setDate(new Date().getDate() - 30)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last60Days, start: new Date(new Date().setDate(new Date().getDate() - 60)), end: new Date() },
            { label: window.Server.App.LocalizationContent.ThisWeek, start: new Date(), end: new Date(new Date().setDate(new Date().getDate() + 7)) },
            { label: window.Server.App.LocalizationContent.ThisMonth, start: new Date(), end: new Date(new Date().setMonth(new Date().getMonth() + 1)) },
        ],
    });
    applicationDateRangeObj.appendTo("#applicationDatePicker");

    loginDateRangeObj = new ej.calendars.DateRangePicker({
        placeholder: 'Select a range',
        format: userActivityLogDateFormat,
        cssClass: 'e-custom',
        presets: [
            { label: window.Server.App.LocalizationContent.Today, start: new Date(), end: new Date() },
            { label: window.Server.App.LocalizationContent.Yesterday, start: new Date(new Date().setDate(new Date().getDate() - 1)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last7Days, start: new Date(new Date().setDate(new Date().getDate() - 7)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last15Days, start: new Date(new Date().setDate(new Date().getDate() - 14)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last30Days, start: new Date(new Date().setDate(new Date().getDate() - 30)), end: new Date() },
            { label: window.Server.App.LocalizationContent.Last60Days, start: new Date(new Date().setDate(new Date().getDate() - 60)), end: new Date() },
            { label: window.Server.App.LocalizationContent.ThisWeek, start: new Date(), end: new Date(new Date().setDate(new Date().getDate() + 7)) },
            { label: window.Server.App.LocalizationContent.ThisMonth, start: new Date(), end: new Date(new Date().setMonth(new Date().getMonth() + 1)) },
        ],
    });
    loginDateRangeObj.appendTo("#loginDatePicker");

    var activityLogDialog = new ejs.popups.Dialog({
        width: window.innerWidth > 380 ? "554px" : window.innerWidth - 10 + "px",
        header: window.Server.App.LocalizationContent.EmailLogDialogHeader,
        content: document.getElementById("dialog-content"),
        showCloseIcon: true,
        enableModal: true,
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false
    });
    activityLogDialog.appendTo("#user-activity-log");
    
    userActivityLogGrid();
    initializeActivityLogTabFromQuery();
    $('#activity-tab-nav a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr('href');
        $("#activity-tab-nav li").removeClass("active");
        $(e.target).closest("li").addClass("active");
        updateFilterUIForActiveTab();
        if (target === '#login-activity-tab') {
            setActivityLogViewQuery('login-activity');
            loginActivityLogGrid();
        } else {
            setActivityLogViewQuery('system-activity');
        }
    });
})


function dropDownListInitializationForAdd(id, placeHolder, index, uniqueId, templateId, dataSource) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        dataSource: dataSource,
        fields:{ text: 'text', value: 'value' },
        floatLabelType: "Never",
        cssClass: 'e-outline e-custom e-non-float',
        placeholder: placeHolder,
        allowFiltering: true
    });

    dropDownList.appendTo(id);
}

function isLoginTabActive() {
    return $('#login-activity-tab').hasClass('active');
}

function updateDropDownDataSource(elementId, dataSource) {
    var element = document.getElementById(elementId);
    if (!element || element.ej2_instances == null) {
        return;
    }

    var dropDownInstance = element.ej2_instances[0];
    var selectedValue = dropDownInstance.value;
    dropDownInstance.dataSource = dataSource;

    var matchingItem = dataSource.filter(function (item) {
        return item.value === selectedValue;
    });

    if (matchingItem.length > 0) {
        dropDownInstance.value = selectedValue;
    } else {
        dropDownInstance.value = null;
        dropDownInstance.text = null;
    }

    dropDownInstance.dataBind();
}

function updateFilterUIForActiveTab() {
    var isLoginActive = isLoginTabActive();
    $('#event-category-filter-wrapper').toggle(!isLoginActive);

    if (!isLoginActive) {
        updateDropDownDataSource('user-event-type', allEventTypeOptions);
        updateDropDownDataSource('user-event-category', allEventCategoryOptions);
    }
}

function getActiveDateRangeValue() {
    return isLoginTabActive() ? $('#loginDatePicker').val() : $('#applicationDatePicker').val();
}

function buildDateRangeParams(dateRangeValue) {
    var dateRange = (dateRangeValue || '').split('-');
    var startDate = $.trim(dateRange[0]) != "" ? $.trim(dateRange[0]) + " " + activityLogStartDateTime : "";
    var endDate = $.trim(dateRange[1]) != "" ? $.trim(dateRange[1]) + " " + activityLogEndDateTime : "";

    return {
        startDate: startDate,
        endDate: endDate
    };
}

function userActivityLogGrid()
{
    if (document.getElementById('userActivityLogGrid').ej2_instances == null) {
        var data = new ejs.data.DataManager({
            url: filterUserLogsUrl,
            adaptor: new ejs.data.UrlAdaptor(),
            crossDomain: true
        });
        grid = new ejs.grids.Grid({
            dataSource: data,
            gridLines: 'None',
            allowPaging: true,
            pageSettings: { pageSize: 20 },
            allowSorting: true,
            allowSearching: true,
            enableAltRow: false,
            enableHover: true,
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            rowSelecting: function (e) {
                this.multiSelectCtrlRequest = true;
            },
            dataBound: function () {
                var tooltipTriggerEl = document.querySelector('[data-bs-toggle="tooltip"]');
                var tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                    container: 'body'
                });
            },

            columns: [
                {
                    allowSorting:false,
                    headerText:window.Server.App.LocalizationContent.EventDate,
                    template:"#user-username-template",
                    type:"string",
                    width:25,
                    allowFiltering:false,
                },
                { field: 'EventCategoryString', headerText: window.Server.App.LocalizationContent.EventCategory, type: "string", width: 15, allowFiltering: true, allowSorting: false },
                { field: 'EventTypeString', headerText: window.Server.App.LocalizationContent.EventType, type: "string", width: 10, allowFiltering: false, allowSorting: false },
                { 
                    headerText: window.Server.App.LocalizationContent.Summary,
                    template: "#initiated-display-name",
                    type: "string",
                    width: 40,
                    allowFiltering: false,
                    allowSorting: false
                },
                {
                    allowSorting: false,
                    headerText: window.Server.App.LocalizationContent.Details,
                    template: "#activity-user-log-options",
                    width: 10,
                    allowFiltering: false
                },
            ],
        });
        grid.appendTo('#userActivityLogGrid');
    }
}

function loginActivityLogGrid()
{
    if (document.getElementById('loginActivityLogGrid').ej2_instances == null) {
        var data = new ejs.data.DataManager({
            url: filterUserLoginLogsUrl,
            adaptor: new ejs.data.UrlAdaptor(),
            crossDomain: true
        });
        gridLogin = new ejs.grids.Grid({
            dataSource: data,
            gridLines: 'None',
            allowPaging: true,
            pageSettings: { pageSize: 20 },
            allowSorting: true,
            allowSearching: true,
            enableAltRow: false,
            enableHover: true,
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            rowSelecting: function (e) {
                this.multiSelectCtrlRequest = true;
            },
            dataBound: function () {
                var tooltipTriggerEl = document.querySelector('[data-bs-toggle="tooltip"]');
                var tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                    container: 'body'
                });
            },
            columns: [
                {
                    allowSorting:false,
                    headerText:window.Server.App.LocalizationContent.EventDate,
                    template:"#user-username-template",
                    type:"string",
                    width:30,
                    allowFiltering:false,
                },
                { field: 'EventTypeString', headerText: window.Server.App.LocalizationContent.EventType, type: "string", width:15, allowFiltering: false, allowSorting: false },
                { 
                    headerText: window.Server.App.LocalizationContent.Summary,
                    template: "#initiated-display-name",
                    type: "string",
                    width:34,
                    allowFiltering: false,
                    allowSorting: false
                },
                { field: 'IpAddress', headerText: 'IP Address', type: "string", width:21, allowFiltering: false, allowSorting: false }
            ],
        });
        gridLogin.appendTo('#loginActivityLogGrid');
    }
}

function closeItemInfo() {
    document.getElementById("user-activity-log").ej2_instances[0].hide();
}

function userLogSetTimepickerValue() {
    if (userActivityLogTimeFormat == "True") {
        activityLogStartDateTime = "00:00"
        activityLogEndDateTime = "23:59";
    }
    else {
        activityLogStartDateTime = "12:00 AM";
        activityLogEndDateTime = "11:59 PM";
    }
}

$(document).on("click", "#apply-button", function () {
    userLogSetTimepickerValue();
    var dateParams = buildDateRangeParams(getActiveDateRangeValue());
    var isLoginActive = isLoginTabActive();
    var eventType = isLoginActive
        ? document.getElementById("login-event-type").ej2_instances[0].value
        : document.getElementById("user-event-type").ej2_instances[0].value;
    var eventCategory = isLoginActive ? null : document.getElementById("user-event-category").ej2_instances[0].value;
    eventType = eventType != null ? eventType : null;
    eventCategory = eventCategory != null ? eventCategory : null;
    if (isLoginActive && document.getElementById("loginActivityLogGrid").ej2_instances != null) {
        var gridObj = document.getElementById("loginActivityLogGrid").ej2_instances[0];
        var userLogdata = new ej.data.DataManager({ url: filterUserLoginLogsUrl + "?startDate=" + dateParams.startDate + "&endDate=" + dateParams.endDate + "&eventType=" + (eventType !== null ? eventType : '') + "&eventCategory=" + (eventCategory !== null ? eventCategory : ''), adaptor: new ej.data.UrlAdaptor() });
        gridObj.dataSource = userLogdata;
    } else {
        var gridObj = document.getElementById("userActivityLogGrid").ej2_instances[0];
        var userLogdata = new ej.data.DataManager({ url: filterUserLogsUrl + "?startDate=" + dateParams.startDate + "&endDate=" + dateParams.endDate + "&eventType=" + (eventType !== null ? eventType : '') + "&eventCategory=" + (eventCategory !== null ? eventCategory : ''), adaptor: new ej.data.UrlAdaptor() });
        gridObj.dataSource = userLogdata;
    }
});

$(document).on("click", "#refresh", function () {
    if (isLoginTabActive()) {
        gridLogin.refresh();
    } else {
        grid.refresh();
    }
});

$(document).on("click", ".activity-log-info", function (args) {
    openActivityLogDetails(args);
});

function getActivityLogDetails(appType, appSource) {
    if (appType === appTypeApi) {
        if (appSource === appSourceBI) {
            return dashboardServer;
        }
        if (appSource === appSourceUMS) {
            return identityProvider;
        }
    }
    if (appType === appTypeJobs && appSource === appSourceBI) {
        return dashboardJobs;
    }
    return '-';
}

function setActivityLogText(id, value) {
    var element = document.getElementById(id);
    if (element) {
        element.textContent = value && value !== "" ? value : '-';
    }
}

function capitalizeActivityLogValue(value) {
    if (!value) {
        return '-';
    }
    var text = String(value);
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function appendChangeSummaryItem(target, label, value) {
    var section = document.createElement('span');
    section.className = 'col-12 float-end no-margin no-padding change-items';

    var labelElement = document.createElement('label');
    labelElement.className = 'activity-log-label';
    labelElement.textContent = label;

    var valueElement = document.createElement('span');
    valueElement.className = 'change-item';
    valueElement.textContent = value && value !== "" ? value : '-';

    section.appendChild(labelElement);
    section.appendChild(valueElement);
    target.appendChild(section);
}

function renderActivityLogChangeSummary(rowData) {
    var section = document.getElementById('activitylog-change-summary-section');
    var container = document.getElementById('activitylog-change-summary-body');
    if (!section || !container) {
        return;
    }

    container.innerHTML = '';
    var eventType = rowData && rowData.EventTypeString ? rowData.EventTypeString : '';
    var changeRoot = rowData && rowData.UserLogDetails ? rowData.UserLogDetails.ChangeLog : null;
    var hasSummary = false;

    var updatedFieldLabel = container.dataset.updatedFieldLabel || 'Updated Field';
    var changesLabel = container.dataset.changesLabel || 'Changes';
    var oldValueLabel = container.dataset.oldValueLabel || 'Old Value';
    var newValueLabel = container.dataset.newValueLabel || 'New Value';

    if (eventType === 'Added') {
        var addedSection = document.createElement('span');
        addedSection.className = 'col-12 float-end changes-logs-section';
        appendChangeSummaryItem(addedSection, updatedFieldLabel, rowData.EventCategoryString || '-');
        appendChangeSummaryItem(addedSection, changesLabel, rowData.Summary || '-');
        container.appendChild(addedSection);
        hasSummary = true;
    }

    if (eventType === 'Updated' && changeRoot && Array.isArray(changeRoot.ChangeLogCollection)) {
        changeRoot.ChangeLogCollection.forEach(function (changeGroup) {
            if (!changeGroup || changeGroup.ChangedItem === 'Password' || !Array.isArray(changeGroup.ChangeLog)) {
                return;
            }
            changeGroup.ChangeLog.forEach(function (log) {
                var updateSection = document.createElement('span');
                updateSection.className = 'col-12 float-end changes-logs-section';
                appendChangeSummaryItem(updateSection, updatedFieldLabel, log && log.ChangedItem ? log.ChangedItem : '-');
                appendChangeSummaryItem(updateSection, oldValueLabel, capitalizeActivityLogValue(log ? log.From : '-'));
                appendChangeSummaryItem(updateSection, newValueLabel, capitalizeActivityLogValue(log ? log.To : '-'));
                container.appendChild(updateSection);
                hasSummary = true;
            });
        });
    }

    section.style.display = hasSummary ? '' : 'none';
}

function openActivityLogInfoDialog(record) {
    var rowData = record && record.rowData ? record.rowData : {};

    setActivityLogText('activitylog-summary-value', rowData.Summary);
    setActivityLogText('activitylog-date-value', rowData.EventDateformat);
    setActivityLogText('activitylog-user-email-value', rowData.InitiatedUserEmail);
    setActivityLogText('activitylog-site-value', rowData.Site);
    setActivityLogText('activitylog-ip-value', rowData.UserLogDetails && rowData.UserLogDetails.IpAddress);
    setActivityLogText('activitylog-event-category-value', rowData.EventCategoryString);
    setActivityLogText('activitylog-event-type-value', rowData.EventTypeString);
    setActivityLogText('activitylog-user-agent-value', rowData.UserLogDetails && rowData.UserLogDetails.UserAgent);

    var performedBy = rowData.InitiatedDisplayName || getActivityLogDetails(rowData.AppType, rowData.AppSource);
    setActivityLogText('activitylog-performed-by-value', performedBy);

    var sourceRow = document.getElementById('activitylog-source-row');
    var source = rowData.UserLogDetails && rowData.UserLogDetails.ChangeLog ? rowData.UserLogDetails.ChangeLog.Source : null;
    var hasSource = (rowData.EventTypeString === 'Added' || rowData.EventTypeString === 'Updated') && source;
    if (sourceRow) {
        sourceRow.style.display = hasSource ? '' : 'none';
    }
    setActivityLogText('activitylog-source-value', source);

    renderActivityLogChangeSummary(rowData);

    document.getElementById('user-activity-log').style.visibility = 'visible';
    document.getElementById('user-activity-log').ej2_instances[0].show();
}

function openActivityLogDetails(args) {
    var gridObj = document.getElementById('userActivityLogGrid').ej2_instances[0];
    var record = gridObj.getRowInfo(args.target);
    openActivityLogInfoDialog(record);
}
$(document).on("click", "#reset", function () {
    userdaterangeobj.value = null;
    $("#datePicker").val('');
    var startDate = $.trim(null);
    var endDate = $.trim(null);
    var eventType = $.trim(null);
    var eventCategory = $.trim(null);
    var gridObj = document.getElementById("userActivityLogGrid").ej2_instances[0];
    var userLogdata = new ej.data.DataManager({ url: filterUserLogsUrl + "?startDate=" + startDate + "&endDate=" + endDate + "&eventType=" + eventType + "&eventCategory=" + eventCategory, adaptor: new ej.data.UrlAdaptor() });
    gridObj.dataSource = userLogdata;
    document.getElementById("user-event-type").ej2_instances[0].text = null;
    document.getElementById("user-event-category").ej2_instances[0].text = null;
});


