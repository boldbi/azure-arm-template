var userdaterangeobj = ""
var activityLogStartDateTime = ""
var activityLogEndDateTime = ""
var dropDownList = ""
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
    
    dropDownListInitializationForAdd('#user-event-type', 'EventType', '', '', '',specificEventType);
    dropDownListInitializationForAdd('#user-event-category', 'EventCategory', '', '', '',specificEventCategory);
    userdaterangeobj = new ej.calendars.DateRangePicker({
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
    userdaterangeobj.appendTo("#datePicker");

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
    var dateRange = $("#datePicker").val().split('-');
    var startDate = $.trim(dateRange[0]) != "" ? $.trim(dateRange[0]) + " " + activityLogStartDateTime : "";
    var endDate = $.trim(dateRange[1]) != "" ? $.trim(dateRange[1]) + " " + activityLogEndDateTime : "";
    var eventType = document.getElementById("user-event-type").ej2_instances[0].value;
    var eventCategory = document.getElementById("user-event-category").ej2_instances[0].value;
    eventType = eventType != null ? eventType : null;
    eventCategory = eventCategory != null ? eventCategory : null;
    var gridObj = document.getElementById("userActivityLogGrid").ej2_instances[0];
    var userLogdata = new ej.data.DataManager({ url: filterUserLogsUrl + "?startDate=" + startDate + "&endDate=" + endDate + "&eventType=" + (eventType !== null ? eventType : '') + "&eventCategory=" + (eventCategory !== null ? eventCategory : ''), adaptor: new ej.data.UrlAdaptor() });
    gridObj.dataSource = userLogdata;
});

$(document).on("click", "#refresh", function () {
    grid.refresh();
});

$(document).on("click", ".activity-log-info", function (args) {
    openActivityLogDetails(args)
});

var serverApp = angular.module("serverApp", []);
serverApp.controller('activityLogInfoCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.ActivityLogDetail = null;

    $scope.openActivityLogInfoDialog = function (activityLogDetail) {
        if (activityLogDetail.rowData.StatusMessage != null && activityLogDetail.rowData.StatusMessage != " " && activityLogDetail.rowData.StatusMessage != "") {
            $(".mail-error-message").show();
        }
        $scope.ActivityLogDetail = activityLogDetail.rowData;

        document.getElementById("user-activity-log").style.visibility = 'visible';
        document.getElementById("user-activity-log").ej2_instances[0].show();
        $timeout(function () {
            $scope.$apply();
        }, 10);
    };

    $scope.capitalizeFirstLetter = function (string) {
        if (!string) return '-';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    $scope.getLogDetails = function(appType, appSource) {
        if (appType === appTypeApi) {
            if (appSource === appSourceBI) {
                return dashboardServer;
            } else if (appSource === appSourceUMS) {
                return identityProvider;
            }
        }
        else if (appType === appTypeJobs && appSource === appSourceBI)
        {
            return dashboardJobs;
        }
        return '-';
    };
}]);

function openActivityLogDetails(args) {
    var LogInfoCtrl = angular.element('[ng-controller=activityLogInfoCtrl]').scope();
    var grid = document.getElementById("userActivityLogGrid").ej2_instances[0];
    var record = grid.getRowInfo(args.target);
    LogInfoCtrl.openActivityLogInfoDialog(record) ;
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

