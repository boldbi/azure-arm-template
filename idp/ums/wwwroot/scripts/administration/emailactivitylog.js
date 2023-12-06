var emailLogStartDateTime = "";
var emailLogEndDateTime = "";
var daterangeobj = "";
var grid = "";
$(document).ready(function () {
    addPlacehoder("#search-area");
    dropDownListInitialization('#email-event', window.Server.App.LocalizationContent.EmailEvent, true);
    document.getElementById("email-event").ej2_instances[0].value = selectedEventValue;
    document.getElementById("email-event").ej2_instances[0].text = selectedEventText;
    daterangeobj = new ej.calendars.DateRangePicker({
        placeholder: 'Select a range',
        format: emailActivityLogDateFormat,
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
    daterangeobj.appendTo("#datePicker");

    var emailDialog = new ejs.popups.Dialog({
        width: window.innerWidth > 480 ? "400px" : window.innerWidth - 10 + "px",
        height: "548px",
        header: window.Server.App.LocalizationContent.EmailLogDialogHeader,
        content: document.getElementById("dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: closeItemInfo, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton } },
        ],
        enableModal: true,
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false,
        close: closeItemInfo
    });
    emailDialog.appendTo("#email-activity-log");

    if ($("#mail-settings-container").is(":visible")){
        if (location.href.match(/logs/)) {
            $("#email-logs-tab").tab("show");
            $("#email-settings").hide();
            $(".email-settings-option").hide();
            var query = (window.location.search).toString();
            if (query != "?view=logs") {
                history.pushState(null, '', '?view=logs');
            }
            emailActivityLogGrid();
        }
        else {
            $("#email-settings-tab").tab("show");
            $("#logs").hide();
            $(".email-settings-option").show();
            var query = (window.location.search).toString();
            if (query != "?view=email-settings") {
                history.pushState(null, '', '?view=email-settings');
            }
        }
    }

    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "email-logs-tab") {
            $("#logs").show();
            $("#email-settings").hide();
            $(".email-settings-option").hide();
            var query = (window.location.search).toString();
            if (query != "?view=logs") {
                history.pushState(null, '', '?view=logs');
            }
            emailActivityLogGrid();
        }
        else if ($(this).attr("id") == "email-settings-tab") {
            $("#email-settings").show();
            $("#logs").hide();
            $(".email-settings-option").show();
                var query = (window.location.search).toString();
            if (query != "?view=email-settings") {
                history.pushState(null, '', '?view=email-settings');
                }
        }
    });
});

function emailActivityLogGrid() {

  if (document.getElementById('emailActivityLogGrid').ej2_instances == null) {
    $("#search-event").val("");
    var data = new ejs.data.DataManager({
        url: filterEmailLogsUrl,
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
        load: fnActionBegin,
        actionBegin: fnActionBegin,
        rowSelecting: function (e) {
            this.multiSelectCtrlRequest = true;
        },
        dataBound: function () {
            $('[data-toggle="tooltip"]').tooltip(
                {
                    container: 'body'
                });
        },

        columns: [
            { field: 'Event', headerText: window.Server.App.LocalizationContent.Event, type: "string", width: 55, allowFiltering: false, allowSorting: true },
            { field: 'ModifiedDateString', headerText: window.Server.App.LocalizationContent.Date, type: "string", width: 55, allowFiltering: false, allowSorting: true },
            { field: 'RecipientEmail', headerText: window.Server.App.LocalizationContent.Recipient, type: "string", width: 70, allowFiltering: true, allowSorting: true },
            { field: 'InitiatedBy', headerText: window.Server.App.LocalizationContent.InitiatedBy, type: "string", width: 70, allowFiltering: false, allowSorting: true },
            { field: 'Status', headerText: window.Server.App.LocalizationContent.Status, type: "string", width: 40, allowFiltering: true, allowSorting: false },
            {
                allowSorting: false,
                headerText: window.Server.App.LocalizationContent.Action,
                template: "#emaillogoptions",
                width: 40,
                allowFiltering: false
            },
        ],
    });
    grid.appendTo('#emailActivityLogGrid');
  }
}

$(document).on("click", "#apply-button", function () {
    setTimpickerValue();
    var startDateRange = document.getElementById("datePicker").ej2_instances[0].startValue != null ? document.getElementById("datePicker").ej2_instances[0].startValue.toLocaleDateString('en-US') : "";
    var endDateRange = document.getElementById("datePicker").ej2_instances[0].endValue != null ? document.getElementById("datePicker").ej2_instances[0].endValue.toLocaleDateString('en-US') : "";
    var startDate = startDateRange != "" ? startDateRange + " " + emailLogStartDateTime : "";
    var endDate = endDateRange != "" ? endDateRange + " " + emailLogEndDateTime : "";
    var eventType = document.getElementById("email-event").ej2_instances[0].value;
    var gridObj = document.getElementById("emailActivityLogGrid").ej2_instances[0];
    var emaildata = new ej.data.DataManager({ url: filterEmailLogsUrl + "?startDate=" + startDate + "&endDate=" + endDate + "&eventType=" + eventType, adaptor: new ej.data.UrlAdaptor() });
    gridObj.dataSource = emaildata;

});

function setTimpickerValue() {
    if (emailActivityLogTimeFormat == "True") {
        emailLogStartDateTime = "00:00"
        emailLogEndDateTime = "23:59";
    }
    else {
        emailLogStartDateTime = "12:00 AM";
        emailLogEndDateTime = "11:59 PM";
    }
}

function fnActionBegin(args) {
    var searchValue = $("#search-event").val();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function closeItemInfo() {
    document.getElementById("email-activity-log").ej2_instances[0].hide();
    $(".mail-error-message").hide();
}

$(document).on("click", "#refresh", function () {
   grid.refresh();
});

$(document).on("click", ".email-log-info", function (args) {
    openEmailLogDetails(args)
});

var serverApp = angular.module("serverApp", []);
serverApp.controller('emailLogInfoCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.EmailLogDetail = null;

    $scope.openEmailLogInfoDialog = function (emailLogDetail) {
        if (emailLogDetail.rowData.StatusMessage != null && emailLogDetail.rowData.StatusMessage != " " && emailLogDetail.rowData.StatusMessage != "") {
            $(".mail-error-message").show();
        }
        $scope.EmailLogDetail = emailLogDetail.rowData; 
       
        document.getElementById("email-activity-log").style.visibility = 'visible';
        document.getElementById("email-activity-log").ej2_instances[0].show();
        $timeout(function () {
            $scope.$apply();
        }, 10);
    };
}]);

function openEmailLogDetails(args) {
    var LogInfoCtrl = angular.element('[ng-controller=emailLogInfoCtrl]').scope();
    var grid = document.getElementById("emailActivityLogGrid").ej2_instances[0];
    var record = grid.getRowInfo(args.target);
    LogInfoCtrl.openEmailLogInfoDialog(record) ;
};

$(document).on("click", "#reset", function () {
    daterangeobj.value = null;
    $("#search-event").val("");
    $("#clear-search").hide();
    $(".search-user").show();
    var startDate = $.trim(null); 
    var endDate = $.trim(null);
    var eventType = $.trim(null);
    var gridObj = document.getElementById("emailActivityLogGrid").ej2_instances[0];
    var emaildata = new ej.data.DataManager({ url: filterEmailLogsUrl + "?startDate=" + startDate + "&endDate=" + endDate + "&eventType=" + eventType, adaptor: new ej.data.UrlAdaptor() });
    gridObj.dataSource = emaildata;
    document.getElementById("email-event").ej2_instances[0].text = selectedEventText;
});

