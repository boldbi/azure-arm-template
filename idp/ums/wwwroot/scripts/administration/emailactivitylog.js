var emailLogStartDateTime = "";
var emailLogEndDateTime = "";
var daterangeobj = "";
var grid = "";
var templateGrid = ";"
var isCreateNewTemplateDialogAdded = false;
$(document).ready(function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
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
            $("#templates").hide();
            $(".email-settings-option").hide();
            var query = (window.location.search).toString();
            if (query != "?view=logs") {
                history.pushState(null, '', '?view=logs');
            }
            emailActivityLogGrid();
        }
        else if (location.href.match(/template/)) {
            $("#email-template-tab").tab("show");
            $("#email-settings").hide();
            $(".email-settings-option").hide();
            var query = (window.location.search).toString();
            if (query != "?view=template") {
                history.pushState(null, '', '?view=template');
            }
            GetCustomEmailTemplateList();
        }
        else {
            $("#email-settings-tab").tab("show");
            $("#logs").hide();
            $("#templates").hide();
            $(".email-settings-option").show();
            var query = (window.location.search).toString();
            if (query != "?view=email-settings") {
                history.pushState(null, '', '?view=email-settings');
            }
        }
    }

    $("a[data-bs-toggle='tab']").on('click', function (e) {
        $("ul.nav.nav-tabs li").removeClass("active");
        if ($(this).attr("id") == "email-logs-tab") {
            $(this).closest("li").addClass("active");
            $("#logs").show();
            $("#email-settings").hide();
            $(".email-settings-option").hide();
            $("#templates").hide();
            var query = (window.location.search).toString();
            if (query != "?view=logs") {
                history.pushState(null, '', '?view=logs');
            }
            emailActivityLogGrid();
        }
        else if ($(this).attr("id") == "email-template-tab") {
            $(this).closest("li").addClass("active");
            $("#templates").show();
            $("#logs").hide();
            $("#email-settings").hide();
            $(".email-settings-option").hide();
            var query = (window.location.search).toString();
            if (query != "?view=template") {
                history.pushState(null, '', '?view=template');
            }

            GetCustomEmailTemplateList();
        }
        else if ($(this).attr("id") == "email-settings-tab") {
            $(this).closest("li").addClass("active");
            $("#email-settings").show();
            $("#logs").hide();
            $("#templates").hide();
            $(".email-settings-option").show();
                var query = (window.location.search).toString();
            if (query != "?view=email-settings") {
                history.pushState(null, '', '?view=email-settings');
                }
        }
    });
});

$(document).on("click", ".configure-email", function () {
    var url = $(this).attr("href");
    window.location.href = url;
});

function GetCustomEmailTemplateList() {

    if (document.getElementById('customEmailTemplateGrid').ej2_instances == null) {
    var data = new ejs.data.DataManager({
        url: templateListUrl + "?isGridCall=true",
        adaptor: new ejs.data.UrlAdaptor(),
        crossDomain: true
    });
    grid = new ejs.grids.Grid({
        dataSource: data,
        gridLines: 'None',
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        allowSorting: false,
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
        dataBound: function (args) {
            $('[data-bs-toggle="tooltip"]').tooltip(
                {
                    container: 'body'
                });
        },
        columns: [
            { field: 'EmailTemplateName', headerText: window.Server.App.LocalizationContent.Template, type: "string", width: 30, allowFiltering: false, allowSorting: false },
            { field: 'Description', headerText: window.Server.App.LocalizationContent.TemplateDescription, type: "string", width: 40, allowFiltering: false, allowSorting: false },
            {
                allowSorting: false,
                headerText: window.Server.App.LocalizationContent.DefaultTemplate,
                type: 'string',
                field: "TemplateUsed",
                width: 20,
                allowFiltering: false
            },
            {
                allowSorting: false,
                template: "#options",
                width: 11,
                allowFiltering: false
            }
            
        ]
    });
        grid.appendTo('#customEmailTemplateGrid');
  }
}

$(document).on("click", ".mark-as-default", function (){
    var templateId = $(this).attr("data-template-id");
    createNewTemplate();
    $("#mark-as-default-list").attr("data-template-id", templateId);
    $.ajax({
        type: "GET",
        url: specificEventListURL,
        data: { templateId : templateId },
        success: function (result) {
            if (result.result != undefined) {
                var specificEventTemplates = result.result.map(item => ({ text: item.EmailTemplateName, value: item.Id }));
                
                if (document.getElementById('mark-as-default-list').ej2_instances != undefined && document.getElementById('mark-as-default-list').ej2_instances[0] != undefined) {
                    document.getElementById('mark-as-default-list').ej2_instances[0].destroy();
                }

                dropDownListInitializationForMarkAsDefault("#mark-as-default-list", "", specificEventTemplates);
            }
        }
    });
});

$(document).on("click", "#default", function () {
    var id = document.getElementById("mark-as-default-list").ej2_instances[0].value;
    var templateId = $("#mark-as-default-list").attr("data-template-id");
    if (id != undefined && id != 0){
        $.ajax({
            type: "POST",
            url: markAsDefaultUrl,
            data: { id: id, templateId : templateId},
            success: function (result) {
                if (result.result) {
                    SuccessAlert(window.Server.App.LocalizationContent.EmailTemplateSettings, window.Server.App.LocalizationContent.MarkTemplateAsDefault, 7000);
                    document.getElementById('customEmailTemplateGrid').ej2_instances[0].refresh();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.EmailTemplateSettings ,window.Server.App.LocalizationContent.MarkTemplateAsDefaultFailed, null, 7000);
                }
                document.getElementById("template-add-dialog").ej2_instances[0].hide();
            }
        });
    }
});
function dropDownListInitializationForMarkAsDefault(id, placeHolder, dataSource) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        dataSource:dataSource,
        fields:{ text: 'text', value: 'value' },
        floatLabelType: "Never",
        placeholder: window.Server.App.LocalizationContent.SelectTemplateDefaultContent,
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence:true,
        allowFiltering:true,
        change: onDefaultDropDownChange,
        popupHeight: '220px',
    });

    dropDownList.appendTo(id);
}

function onSetDefaultTemplateDailogOpen()
{
    $(".mark-default-disable").attr("disabled", true);
}

function onDefaultDropDownChange ()
{
    if (document.getElementById("mark-as-default-list").ej2_instances[0].value === null){
        $(".mark-default-disable").attr("disabled", true);
    }
    else{
        $(".mark-default-disable").attr("disabled", false);
    }
}

function createNewTemplate (){
    if (!isCreateNewTemplateDialogAdded){
        isCreateNewTemplateDialogAdded = true;
        var newTemplateDialog = new ejs.popups.Dialog({
            header: window.Server.App.LocalizationContent.MarkAsDefault,
            content: document.getElementById("dialog-container"),
            showCloseIcon: true,
            width: "350px",
            height: "auto",
            isModal: true,
            visible: false,
            closeOnEscape: true,
            animationSettings: { effect: 'Zoom' },
            close: clearDropDownList,
            open: onSetDefaultTemplateDailogOpen
        });
        newTemplateDialog.appendTo("#template-add-dialog");
        newTemplateDialog.show();
    }
    else{
        document.getElementById("template-add-dialog").ej2_instances[0].show();
    }

}

function clearDropDownList() {
    var dropDownList = document.getElementById("mark-as-default-list").ej2_instances[0];
    if (dropDownList != undefined) {
    dropDownList.value = null;
    dropDownList.text = null;
        document.getElementById("mark-as-default-list").ej2_instances[0].destroy();
    }
}

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
            dataBound: function (args) {
                $('[data-bs-toggle="tooltip"]').tooltip(
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

