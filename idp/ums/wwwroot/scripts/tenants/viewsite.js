var isUserTabLoaded = false;
var isAttributeTabLoaded = false;
var isFirstRequest = false;
var selectedUsers = [];
var selectedRecords = [];
var selectedUsersArrayPushPopAllowed = true;
var gridUserData = [];
var users = [];
var singleUserRemove = false;
var singleUserSelectedId;
var SelectedUserIdList = [];
var isSafari = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
var needPush = true;
var isFreshLoad = true;
var isIsolationCodeUpdated = false;
var validateTimer;
var validateInterval = 1000;
var previousIndex = [];
var previousIndexUserId = [];
var tenantId;
var UpdateTenantId;

function fnCreate() {
    $("#checkbox-header").change(headCheckboxOnChange);
}

$(document).ready(function () {
    addPlacehoder("#grant-users-access-dialog");
    addPlacehoder("#search-area");
    addPlacehoder("#search-app-admins");
    addPlacehoder("#add-admin-search");
    addPlacehoder("#add-user-search-area");
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    createWaitingPopup('user-remove-confirmation-dialog');
    createWaitingPopup('add-tenant-popup');
    createWaitingPopup('grant-users-access-dialog');
    toggleInputFields();
    updateInfoMessage();

    var isolationSwitchContainer = $("#isolation-switch-container");
    if (isolationSwitchContainer.length) {
        isolationSwitchContainer.on("click", function () {
            enableIsolationCode();
        });
    }

    if (enableAIFeature != undefined && enableAIFeature)
    {
        var widget = document.getElementById("widgetsummarization-enable-switch");
        var aiservice = document.getElementById("aiservice-enable-switch");
        var dashboard = document.getElementById("dashboardinsight-enable-switch");
        var updateai = document.getElementById("update-enable-aiservice");

        if (widget)
        {
            widget.disabled = false;
        }
        if (aiservice)
        {
            aiservice.disabled = false;
        }
        if (dashboard)
        {
            dashboard.disabled = false;
        }
        if (updateai)
        {
            updateai.disabled = false;
        }
    }
    else
    {
        var widget = document.getElementById("widgetsummarization-enable-switch");
        var aiservice = document.getElementById("aiservice-enable-switch");
        var dashboard = document.getElementById("dashboardinsight-enable-switch");
        var updateai = document.getElementById("update-enable-aiservice");
        if (widget)
        {
            widget.disabled = true;
        }
        if (aiservice)
        {
            aiservice.disabled = true;
        }
        if (dashboard)
        {
            dashboard.disabled = true;
        }
        if (updateai)
        {
            updateai.disabled = true;
        }
    }

    var grantUserAccessDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.GrantAccessToUsers + " - " + tenantName,
        content: document.getElementById("grant-users-access-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: onAddUsersDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton, cssClass: 'cancel-button' } },
            { click: provideAccesstoUsers, buttonModel: { content: window.Server.App.LocalizationContent.GrantSiteAccessButton, isPrimary: true, cssClass: 'provide-access-button' } }
        ],
        width: "900px",
        height: "539px",
        isModal: true,
        visible: false,
        closeOnEscape: true,
        animationSettings: { effect: 'Zoom' },
        close: onAddUsersDialogClose,
    });
    grantUserAccessDialog.appendTo("#grant-users-access-dialog");

    $("#add-users-button").on("click", function () {
        var gridObj = document.getElementById('users_grid').ej2_instances[0];
        gridObj.clearSelection();
        $("#remove-users-button").addClass("d-none").removeClass("d-block");
        document.getElementById("grant-users-access-dialog").ej2_instances[0].show();
        onAddUsersDialogOpen();
    });

    var removeUserAccessDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.RevokeAccess,
        content: document.getElementById("user-remove-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: removeConfirm, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onUserRemoveDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton, cssClass: 'cancel-button' } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        visible: false,
        closeOnEscape: true,
        animationSettings: { effect: 'Zoom' },
        close: "onUserRemoveDialogClose",
    });
    removeUserAccessDialog.appendTo("#user-remove-confirmation-dialog");

    var addTenantDialog = new ej.popups.Dialog({
        width: $(window).width(),
        height: $(window).height(),
        isModal: false,
        enableResize: false,
        visible: false,
        closeOnEscape: true
    });
    addTenantDialog.appendTo("#add-tenant-popup");

    initializeEj2CheckBox("all-settings");
    initializeEj2CheckBox("date-and-time");
    initializeEj2CheckBox("look-and-feel");
    initializeEj2CheckBox("branding");
    initializeEj2CheckBox("email");
    initializeEj2CheckBox("account");
    initializeEj2CheckBox("language");

    var query = window.location.search;
    if (query.includes("?tab=general")) {
        $('a[href="#application-tab"]').tab("show");
    }
    else if (query.includes("?tab=users") && isActiveSite) {
        if (!isUserTabLoaded) {
            getAppUsers();
            isUserTabLoaded = true;
        }
        $('a[href="#users-tab"]').tab("show");
    }
    else if (query.includes("?tab=isolation-code") && isActiveSite) {
        $('a[href="#data-security-tab"]').tab("show");
        enableIsolationCode();
    }
    else if (query.includes("?tab=attributes") && isActiveSite) {
        if (!isAttributeTabLoaded) {
            getAttributes();
            isAttributeTabLoaded = true;
        }
        $('a[href="#custom-attribute-tab"]').tab("show");
    }
    else if (query.includes("?tab=site-settings") && isActiveSite) {
        $('a[href="#site-settings-tab"]').tab("show");
    }
    else if (query.includes("?tab=ai-service") && isActiveSite) {
        $('a[href="#ai-serviceKey-tab"]').tab("show");
    }
    else if (query.includes("?tab=resource-limitation") && isActiveSite) {
        $('a[href="#resource-limitation-tab"]').tab("show");
    }
    else {
        isFreshLoad = false;
        $('a[href="#application-tab"]').tab("show");
    }

    window.addEventListener("popstate", function (e) {
        needPush = false;
        var tab = e.state;
        $("li").removeClass("active");
        if (tab === "general") {
            $("#application a").attr("href", "#application-tab");
            $('a[href="#application-tab"]').tab('show');
        }
        else if (tab === "users" && isActiveSite) {
            $("#users a").attr("href", "#users-tab");
            $('a[href="#users-tab"]').tab('show');
        }
        else if (tab === "isolation-code" && isActiveSite) {
            $("#data-security a").attr("href", "#data-security-tab");
            $('a[href="#data-security-tab"]').tab('show');
        }
        else if (tab === "ai-service" && isActiveSite) {
            $("#ai-service a").attr("href", "#ai-serviceKey-tab");
            $('a[href="#ai-serviceKey-tab"]').tab('show');
        }
        else if (tab === "resource-limitation" && isActiveSite) {
            $("#resource-limitation a").attr("href", "#resource-limitation-tab");
            $('a[href="#resource-limitation-tab"]').tab('show');
        }
        else if (tab === "attributes" && isActiveSite) {
            $("#custom-attribute a").attr("href", "#custom-attribute-tab");
            $('a[href="#custom-attribute-tab"]').tab('show');
        }
        else if (tab === "site-settings" && isActiveSite) {
            $("#site-settings a").attr("href", "#site-settings-tab");
            $('a[href="#site-settings-tab"]').tab('show');
        }
        else {
            $("#application a").attr("href", "#application-tab");
            $('a[href="#application-tab"]').tab('show');
        }
    });

    $(document).on('click', "input#add-user", function () {
        var firstName = $("#firstname").val().trim();
        var userName = $("#username").val().trim().toLowerCase();
        var password = $("#new-password").val();
        var emailid = $('#mailid').val().trim();
        var tenantId = $("#myId").val();
        var isValid = $("#dialog-container").valid();
        $(".popover").hide();

        if (isValid) {
            $(".useradd-validation-messages").css("display", "none");
            var g = document.getElementById('users_grid').ej2_instances[0];

            showWaitingPopup('user-add-dialog');

            var lastName = $('#lastname').val().trim();
            var values = { UserName: userName, Email: emailid, FirstName: firstName, LastName: lastName, Password: password };

            $.ajax({
                type: "POST", url: isPresentUserNameAndEmailId, data: { userName: userName, emailId: emailid.toLowerCase() },
                success: function (data) {
                    if (data.IsUserNameExist || data.IsEmailExist) {
                        if (data.IsUserNameExist) {
                            $('#username').closest('div').addClass("has-error");
                            $("#invalid-username").html(window.Server.App.LocalizationContent.UsernameExists).css("display", "block");
                            $(".useradd-validation-messages").css("display", "block");
                            hideWaitingPopup('user-add-dialog');
                        }
                        if (data.IsEmailExist) {
                            $('#mailid').closest('div').addClass("has-error");
                            $("#invalid-email").html(window.Server.App.LocalizationContent.EmailAddressExists).css("display", "block");
                            $(".useradd-validation-messages").css("display", "block");
                            hideWaitingPopup('user-add-dialog');
                        }
                        return;
                    }
                    else {
                        $.ajax({
                            type: "POST", url: addUserUrl, data: { userDetail: values, tenantInfoId: tenantId },
                            success: function (data) {
                                if (data.Data) {
                                    hideWaitingPopup('user-add-dialog');
                                    $("#add-user").attr("disabled", "disabled");
                                    $("#create-new-user").removeClass("d-none").addClass("d-block");
                                    $(".form input[type='text']").val('');
                                    onUserAddDialogClose();
                                    $.ajax({
                                        type: "POST",
                                        url: checkMailSettingUrl,
                                        success: function (result) {
                                            var messageText = "";
                                            if (result.activation == 0) {
                                                SuccessAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.UserAddedActivated, 7000)
                                            }
                                            else if (result.result  && result.activation == 1) {
                                                SuccessAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.UserAdded, 7000);
                                            }
                                            else if (!result.result && result.isAdmin == true && result.activation == 1) {
                                                WarningAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.UserActivationEmailCannotSent, null, 7000);
                                            }
                                            g.refresh();
                                        }
                                    });
                                }
                                else {
                                    onUserAddDialogClose();
                                    WarningAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.InternalServerErrorTryAgain, data.Message, 7000);
                                    g.refresh();
                                }
                            }
                        });
                    }

                }
            });

        }
        else {
            $(".useradd-validation-messages").css("display", "block");
        }
    });

});

$(document).on("shown.bs.tab", 'a[data-bs-toggle="tab"]', function (e) {
    $("li").removeClass("active");
    var target = $(e.target).attr("href"); // activated tab
    var data;

    if (target.indexOf("#application-tab") !== -1) {
        $("#application").closest("li").addClass("active");
        data = "general";
    }

    else if (target.indexOf("#users-tab") !== -1) {
        $("#users").closest("li").addClass("active");
        data = "users";
        if (!isUserTabLoaded) {
            getAppUsers();
            isUserTabLoaded = true;
        }
    }

    else if (target.indexOf("#data-security-tab") !== -1) {
        $("#data-security").closest("li").addClass("active");
        data = "isolation-code";
    }

    else if (target.indexOf("#ai-serviceKey-tab") !== -1) {
        $("#ai-service").closest("li").addClass("active");
        data = "ai-service";
    }
    else if (target.indexOf("#resource-limitation-tab") !== -1) {
        $("#resource-limitation").closest("li").addClass("active");
        data = "resource-limitation";
    }
    else if (target.indexOf("#custom-attribute-tab") !== -1) {
        $("#custom-attribute").closest("li").addClass("active");
        data = "attributes";
        if (!isAttributeTabLoaded) {
            getAttributes();
            isAttributeTabLoaded = true;
        }
    }
    else if (target.indexOf("#site-settings-tab") !== -1) {
        $("#site-settings").closest("li").addClass("active");
        data = "site-settings";
    }
    pushUrl(data);
    needPush = true;
});

function pushUrl(data) {
    if (needPush) {
        if (isFreshLoad) {
            history.replaceState(data, null, window.location.pathname + "?tab=" + data);
            isFreshLoad = false;
        }
        else {
            history.pushState(data, null, window.location.pathname + "?tab=" + data);
        }
    }
}

function fnOnApplicationGridLoad() {
    isFirstRequest = true;
    var searchValue = $("#search-tenants").val().trim();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnApplicationRowSelected() {
    var applicationgrid = document.getElementById('tenants_grid').ej2_instances[0];
    var selectedApplications = applicationgrid.getSelectedRecords();
}

function fnApplicationRecordClick(args) {
    var checkbox = args.row.find(".application-grid-chkbx");
    checkbox.prop("checked", !checkbox.prop("checked"));
}

function fnOnApplicationGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-tenants").val().trim();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnOnUserGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-app-users").val();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnOnAddUserGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#add-user-search").val();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnOnApplicationGridActionComplete(args) {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            container: 'body'
        });
    });
    
    if (this.properties.pageSettings.totalRecordsCount != null) {
        $("#application-count").text(this.properties.pageSettings.totalRecordsCount);
    }
    else {
        $("#application-count").text(0);
    }


    if ($("#application-list-container").is(":visible")) {
        query = (window.location.search).toString();
        if (query === "?action=create-new-site") {
            $("#add-tenant").trigger("click");
        }
    }
}

function fnOnUserGridActionComplete(args) {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    var usergrid = document.getElementById('users_grid').ej2_instances[0];
    if (args.requestType == "paging" || args.requestType == "sorting") {
        if (typeof usergrid.currentViewData != 'undefined') {
            for (var i = 0; i < usergrid.currentViewData.length; i++) {
                var record = usergrid.currentViewData[i];
                var index = jQuery.inArray(JSON.stringify(record.UserId), $.map(selectedUsers, JSON.stringify));
                if (index != -1) {
                    selectedUsersArrayPushPopAllowed = false; //during pagination, pushpop operation should not be done for the users selected already 
                    usergrid.selectRows(i);
                }
            }
        }
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedUsers = [];
    }

    if (usergrid.getSelectedRecords().length != 0) {
        $("#remove-users-button").removeClass("d-none").addClass("d-block");
    }
    else {
        $("#remove-users-button").removeClass("d-block").addClass("d-none");
    }
}

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
    }
}

$(document).on("click", ".search-application", function () {
    var gridObj = document.getElementById('tenants_grid').ej2_instances[0];
    gridObj.pageSettings.currentPage = 1;
    gridObj.refresh();
});

function getAppUsers() {
    var requestUrl = $("meta[name='ump-app-users-link']").attr("content") + $("#application-id").val();
    var data = new ejs.data.DataManager({
        url: requestUrl,
        adaptor: new ejs.data.UrlAdaptor(),
    });
    var userGrid = new ejs.grids.Grid({
        dataSource: data,
        gridLines: 'None',
        allowPaging: true,
        allowSorting: true,
        allowSelection: true,
        selectionSettings: { type: 'Multiple', mode: 'Row' },
        pageSettings: { pageSize: 20 },
        rowSelecting: function (e) {
            this.multiSelectCtrlRequest = true;
        },
        enableHover: true,
        enableAltRow: false,
        rowDataBound: function (args) {
            var height = $(".e-gridcontent").height();
            if (height != null) {
                rowBound();
            }
            args.row.querySelector('.revoke-access').firstChild.style.visibility = "hidden";
            //  Mouse enter and leave events are bound to the row elements 
            args.row.addEventListener('mouseenter', function (args) {
                // Menu is shown 
                args.target.querySelector('.revoke-access').firstChild.style.visibility = "visible";
            })
            args.row.addEventListener('mouseleave', function (args) {
                // Menu is hidden 
                args.target.querySelector('.revoke-access').firstChild.style.visibility = "hidden";
            })
        },
        dataBound: function (args) {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl, {
                    container: 'body'
                });
            });
        },
        load: fnOnUserGridActionBegin,
        actionBegin: fnOnUserGridActionBegin,
        actionComplete: fnOnUserGridActionComplete,
        rowSelected: onUserRecordSelect,
        rowDeselected: onUserRecordSelect,
        columns: [
            {
                allowFiltering: false,
                template: "#user-profile-template",
                width: 115,
                headerTemplate: "#username-header",
                field: "DisplayName",
                type: "string"
            },
            {
                field: "Username",
                allowFiltering: false,
                template: "#user-username-template",
                headerTemplate: "#user-username-header",
                type: "string",
                width: 120
            },
            {
                field: "Email",
                allowFiltering: false,
                template: "#user-email-template",
                headerTemplate: "#email-header",
                type: "string",
                width: 135
            },
            {
                field: "Activation Method",
                allowFiltering: false,
                template: "#activation-method-template",
                headerTemplate: "#activation-method-header",
                type: "string",
                width: 135
            },
            {
                field: "UserStatus",
                allowFiltering: false,
                allowSorting: false,
                template: "#user-status-template",
                headerTemplate: "#status-header",
                type: "string",
                width: 50
            },
            {
                template: true,
                allowSorting: false,
                allowFiltering: false,
                template: "#commandstemplate",
                headerTemplate: "#actionsheader",
                width: 80,
                customAttributes: { class: 'revoke-access' }
            }
        ]
    });
    userGrid.appendTo("#users_grid");
}

function getAttributes() {
    var tooltip = new ej.popups.Tooltip({
        target: ".grid-content",
        position: 'TopCenter',
        beforeRender: beforeRender
    }, "#grid-tooltip");

    var attributeGrid = new ejs.grids.Grid({
        dataSource: window.siteAttributes,
        gridLines: 'None',
        allowSorting: true,
        allowSearching: false,
        allowPaging: true,
        allowSelection: true,
        allowFiltering: false,
        pageSettings: { pageSize: 10 },
        enableHover: true,
        enableAltRow: false,
        created: initialSiteGridCreate,
        dataBound: function (args) {
        },
        columns: [
            { field: 'Name', template: "#attribute-name-template", headerText: window.Server.App.LocalizationContent.Name, width: 40, allowSorting: true, allowFiltering: true },
            { field: 'Value', template: "#attribute-value-template", headerText: window.Server.App.LocalizationContent.Value, width: 60, allowSorting: true, allowFiltering: true },
            { field: 'Description', template: "#attribute-description-template", headerText: window.Server.App.LocalizationContent.Description, width: 50, allowSorting: true, allowFiltering: true },
            { field: 'ModifiedDateString', headerText: window.Server.App.LocalizationContent.LastModified, width: 40, allowSorting: true, allowFiltering: false },
            { field: 'Options', headerText: '', template: "#options", width: 20, allowSorting: false, allowFiltering: false }
        ]
    });
    attributeGrid.appendTo("#SiteAttributesGrid");

    $.ajax({
        type: "GET",
        url: siteAttributesUrl,
        data: { tenantInfoId: tenantInfoId },
        success: function (result) {
            if (result.Status) {
                var siteAttributesGrid = document.getElementById('SiteAttributesGrid').ej2_instances[0];
                siteAttributesGrid.dataSource = result.Attributes;
            }
            hideWaitingPopup("SiteAttributesGrid");
        }
    });

    function beforeRender(args) {
        tooltip.content = args.target.closest("td").innerText;
    }
}

function getUsersWithoutAccess() {
    var requestUrl = $("meta[name='add-ump-app-users-link']").attr("content") + $("#application-id").val();
    var data = new ejs.data.DataManager({
        url: requestUrl,
        adaptor: new ejs.data.UrlAdaptor()
    });
    if (document.getElementById('add_users_grid').ej2_instances == null) {
        var addUsersGrid = new ejs.grids.Grid({
            dataSource: data,
            gridLines: 'None',
            allowPaging: true,
            allowSorting: true,
            enableAltRow: false,
            allowSearching: true,
            allowSelection: true,
            allowFiltering: false,
            pageSettings: { pageSize: 20 },
            selectionSettings: { type: 'Multiple' },
            enableHover: true,
            created: fnCreate,
            load: fnOnAddUserGridActionBegin,
            actionBegin: fnOnAddUserGridActionBegin,
            actionComplete: fnOnAddUserGridActionComplete,
            rowDataBound: function () {
                var height = $(".e-gridcontent").height();
                if (height != null) {
                    rowBound();
                }
            },
            dataBound: function (args) {
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl, {
                        container: 'body'
                    });
                });
            },
            columns: [
                {
                    headerTemplate: "#checkbox-header-template",
                    template: "#checkbox-row-template",
                    width: 15,
                    allowFiltering: false
                },
                {
                    allowFiltering: false,
                    template: "#user-name-template",
                    width: 115,
                    headerTemplate: "#user-name-header",
                    field: "DisplayName",
                    type: "string"
                },
                {
                    allowFiltering: false,
                    field: "Email",
                    template: "#email-template",
                    headerTemplate: "#user-email-header",
                    type: "string",
                    width: 155
                }
            ]
        });
        addUsersGrid.appendTo("#add_users_grid");
    }
    else {
        document.getElementById('add_users_grid').ej2_instances[0].dataSource = data
    }
}

function enableAccessButton() {
    $(".provide-access-button").attr("disabled", selectedUsers.length == 0);
}

function fnOnAddUserGridActionComplete(args) {
    var gridObj = document.getElementById('add_users_grid').ej2_instances[0];
    var checkboxHeader = $("#checkbox-header");
    checkboxHeader.prop("disabled", true).change(headCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType === "paging" || args.requestType === "sorting") {
        if (typeof gridObj.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.currentViewData.length; i++) {
                var record = gridObj.currentViewData[i];
                var rowUniId = record.UserId;
                var index = jQuery.inArray(JSON.stringify(record.UserId), $.map(selectedUsers, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_users_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_users_grid .checkbox-row#row-check" + rowUniId).prop("checked", true);
                    gridObj.selectionModule.selectRow(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.currentViewData.length == 0);
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedUsers = [];
        checkboxHeader.attr("disabled", gridObj.currentViewData.length == 0);
    }

    if (args.requestType === "paging" || args.requestType === "sorting" || args.requestType === "refresh" || args.requestType === "filtering") {
        if ((gridObj.selectionModule.selectedRecords.length) == gridObj.currentViewData.length) {
            checkboxHeader.prop("checked", true);
        } else {
            checkboxHeader.prop("checked", false);
        }
    }

    enableAccessButton();
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

$(document).on("change", ".checkbox-row", function (args) {
    var gridObj = document.getElementById('add_users_grid').ej2_instances[0];
    var checkBoxList = $(".checkbox-row");
    var index = checkBoxList.index(this);
    var checkboxHeader = $("#checkbox-header");
    var isChecked = $(this).is(":checked");
    var currentId = $(this).attr("data-checked-id");
    if (isChecked) {
        gridObj.multiSelectCtrlRequest = true;
        selectedUsers.push(currentId);
        previousIndex.push(index);
        gridObj.selectionModule.selectRows(previousIndex, index);
    }

    else {
        var arrayIndex = selectedUsers.indexOf(currentId);
        var previousArrayIndex = previousIndex.indexOf(index)
        selectedUsers.splice(arrayIndex, 1);
        previousIndex.splice(previousArrayIndex, 1);
        gridObj.selectionModule.selectRows(previousIndex);
    }
    gridAdminData = gridObj.currentViewData;
    var userRowCheckedCount = 0;
    for (i = 0; i <= gridAdminData.length - 1; i++) {
        if ($($("#add_users_grid .checkbox-row")[i]).is(":checked") == true) {
            userRowCheckedCount = userRowCheckedCount + 1;
        }
    }
    if (gridObj.getRows() != null) {
        checkboxHeader.prop("checked", gridAdminData.length === userRowCheckedCount);
    }
    enableAccessButton();
});

function onAddUsersDialogOpen() {
    $(".provide-access-button").attr("disabled", "diasabled");
    selectedUsers = [];
    getUsersWithoutAccess();
}

function onAddUsersDialogClose() {
    var gridObj = document.getElementById('add_users_grid').ej2_instances[0];
    gridObj.clearSelection();
    selectedUsers = [];
    $("#add-user-search").val("");
    $("#add-user-clear-search").css("display", "none");
    $(".search-icon").css("display", "block");
    $(".checkbox-header").prop("checked", false);
    $(".checkbox-row").prop("checked", false);
    gridObj.pageSettings.currentPage = 1;
    gridObj.refresh();
    document.getElementById("grant-users-access-dialog").ej2_instances[0].hide();
}

function refreshTemplate() {
    $("#checkbox-header").change(headCheckboxOnChange);
}

function headCheckboxOnChange() {
    var gridObj = document.getElementById('add_users_grid').ej2_instances[0];
    gridUserData = gridObj.currentViewData;
    if ($("#checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRowsByRange(0, $(".checkbox-row").length);
        for (var i = 0; i < gridUserData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridUserData[i].UserId), $.map(selectedUsers, JSON.stringify));
            if (index == -1) {
                selectedUsers.push(gridUserData[i].UserId);
            }
        }
        if (isSafari) {
            $(".checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
        for (var i = 0; i < gridUserData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridUserData[i].UserId), $.map(selectedUsers, JSON.stringify));
            if (index != -1) {
                selectedUsers.splice(index, 1);
            }
        }
        if (isSafari) {
            $(".checkbox-header-label").removeClass("check");
        }
    }
    enableAccessButton();
}

function provideAccesstoUsers() {
    var requestUrl = $("meta[name='provide-app-access-link']").attr("content") + $("#application-id").val();
    if (selectedUsers.length > 0) {
        $("#grant-users-access-dialog").children(".e-spinner-pane").addClass("e-spin-show").addClass("e-spinner-bg").removeClass("e-spin-hide");
        $.ajax({
            type: "POST",
            data: { selectedUsers: selectedUsers },
            url: requestUrl,
            success: function (result) {
                $("#grant-users-access-dialog").children(".e-spinner-pane").removeClass("e-spin-show").removeClass("e-spinner-bg").addClass("e-spin-hide");
                $(".provide-access-button").attr("disabled", "disabled");
                var userGridObj = document.getElementById('users_grid').ej2_instances[0];
                userGridObj.refresh();
                onAddUsersDialogClose();
                if (result.status) {
                    var content = window.Server.App.LocalizationContent.GrantedAccessTo.format(result.count);
                    SuccessAlert(window.Server.App.LocalizationContent.GrantSiteAccess, content, 7000);
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.GrantSiteAccess, window.Server.App.LocalizationContent.GrantSiteAccessError, result.Message, 7000);
                }
            }
        });
    }
}

////Remove user Access
$(document).on("click", ".delete-permission", function (e) {
    e.preventDefault();
    singleUserSelectedId = $(this).attr("data-user-id");
    document.getElementById("user-remove-confirmation-dialog").ej2_instances[0].show();
    singleUserRemove = true;
});

function onUserRemoveDialogClose() {
    document.getElementById("user-remove-confirmation-dialog").ej2_instances[0].hide();
}

function removeConfirm() {
    if (singleUserRemove) {
        users = singleUserSelectedId;
    } else {
        var usergrid = document.getElementById('users_grid').ej2_instances[0];
        selectedRecords = usergrid.getSelectedRecords();
        jQuery.each(selectedRecords, function (index, record) {
            selectedUsers.push(record.UserId)
        });
        users = selectedUsers;
    }
    removeUserAccess(users);
}

function removeUserAccess(users) {
    var requestUrl = $("meta[name='remove-app-access-link']").attr("content") + $("#application-id").val();
    if (users.length > 0) {
        showWaitingPopup('user-remove-confirmation-dialog');
        $.ajax({
            type: "POST",
            data: { selectedUsers: users },
            url: requestUrl,
            success: function (result) {
                hideWaitingPopup('user-remove-confirmation-dialog');
                var userGridObj = document.getElementById('users_grid').ej2_instances[0];
                userGridObj.clearSelection();
                userGridObj.pageSettings.currentPage = getCurrentPageNumber(userGridObj.pageSettings.pageSize, selectedUsers.length, userGridObj.pageSettings.totalRecordsCount, userGridObj.pageSettings.currentPage);
                selectedUsers = [];
                userGridObj.refresh();
                $("#remove-users-button").removeClass("d-block").addClass("d-none");
                document.getElementById("user-remove-confirmation-dialog").ej2_instances[0].hide();
                if (result.status) {
                    var content = window.Server.App.LocalizationContent.RevokedAccessFor.format(result.count);
                    SuccessAlert(window.Server.App.LocalizationContent.RevokeSiteAccess, content, 7000);
                }
                else if (!result.status && result.errormessage !== '')
                {
                    WarningAlert(window.Server.App.LocalizationContent.RevokeSiteAccess, window.Server.App.LocalizationContent.RevokeSiteAccessForAdminError, null, 7000);
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.RevokeSiteAccess, window.Server.App.LocalizationContent.RevokeSiteAccessError, result.Message, 7000);
                }
                singleUserRemove = false;
                users = [];
            }
        });
    }
}

$(document).on("click", "#remove-users-button", function () {
    document.getElementById("user-remove-confirmation-dialog").ej2_instances[0].show();
});

function onUserRecordSelect(args) {
    var usergrid = document.getElementById('users_grid').ej2_instances[0];
    selectedRecords = usergrid.getSelectedRecords();
    selectedUsersArrayPushPopAllowed = true;
    if (selectedRecords.length >= 1) {
        $("#remove-users-button").removeClass("d-none").addClass("d-block");
    }
    else {
        $("#remove-users-button").addClass("d-none").removeClass("d-block");
    }
}

$(document).on("click", "#application-clientid", function () {
    $("#application-clientid").select();
});

$(document).on("click", "#application-accesstoken", function () {
    $("#application-accesstoken").select();
});

$(document).on("click", "#add-tenant", function () {
    var tenantId = "";
    $("#add-tenant-iframe").attr("src", addTenantUrl + "?actionType=create" + "&tenantId=" + tenantId);
    document.getElementById("add-tenant-popup").ej2_instances[0].show();
    showWaitingPopup('add-tenant-popup');
});

$(document).on("click", ".tenant-action", function (e) {
    var action = $(this).attr("data-action").trim();
    var tenantId = $(this).attr("data-tenant-id").trim();
    var tenantName = $(this).attr("data-tenant-name").trim();
    var tenantType = $(this).attr("data-tenant-type").trim();
    var messageContent = "Are you sure you want " + action + " site - <span class='tenant-name'>" + tenantName + "</span> ?";
    if (action === "activate") {
        headerIcon = "tick";
        headerText = window.Server.App.LocalizationContent.Activate;
        actionUrl = activateTenantUrl;
    }
    else if (action === "suspend") {
        headerIcon = "suspend";
        headerText = window.Server.App.LocalizationContent.Suspend;
        actionUrl = suspendTenantUrl;
    }
    else if (action === "edit") {
        $("#add-tenant-iframe").attr("src", addTenantUrl + "?actionType=" + action + "&tenantId=" + tenantId);
        document.getElementById("add-tenant-popup").ej2_instances[0].show();
        showWaitingPopup('add-tenant-popup');
    }
    else if (action === "delete") {
        headerIcon = "delete";
        headerText = window.Server.App.LocalizationContent.Delete;
        actionUrl = deleteTenantUrl;
        if (useSingleTenantDb)
        {
            messageContent += "<br/><br/>";
        }
        else {
            messageContent += "<br/><br/><div><span><input type='checkbox' class='material-checkbox' id='delete-database-checkbox' /><input id='delete-database-checkbox' type='hidden'/><label for='delete-database-checkbox' class='label-database'>" + window.Server.App.LocalizationContent.DeleteDatabase + "</label></span ></div><div class='tenant-delete-warning'> <span>" + window.Server.App.LocalizationContent.Warning + ":" + "</span><div class = 'warning-content'> " + window.Server.App.LocalizationContent.DeleteAllResourceWithoutDataBase + "</div></div>";
        }
    }
    else if (action === "make-master") {
        UpdateTenantId = tenantId;
        onMasterDialogOpen(tenantName, tenantType)
    }


    if (action !== "edit" && action !== "make-master") {
        messageBox("su-" + headerIcon, headerText + " " + window.Server.App.LocalizationContent.SiteLetter, messageContent, "error", function () {
            updateTenantStatus(actionUrl, tenantId, action);
        });
    }
});

$(document).on("change", "#delete-database-checkbox", function () {
    if ($(this).is(":checked")) {
        $(".warning-content").html(window.Server.App.LocalizationContent.DeleteAllResource);
    } else {
        $(".warning-content").html(window.Server.App.LocalizationContent.DeleteAllResourceWithoutDataBase);
    }
});

function updateTenantStatus(actionUrl, tenantId, action) {
    showWaitingPopup('messageBox');
    var actionName = action === "suspend" ? window.Server.App.LocalizationContent.Suspend : action === "delete" ? window.Server.App.LocalizationContent.Delete : window.Server.App.LocalizationContent.Activate;
    var isDeleteDatabase = $("#delete-database-checkbox").is(":checked");
    var input = {}
    if (action === "delete") {
        input = {
            tenantId: tenantId,
            isDeleteDatabase: isDeleteDatabase

        };

    } else {
        input = { tenantId: tenantId }
    }
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: input,
        success: function (data) {
            if (data.Success) {
                if (action === "suspend") {
                    SuccessAlert(actionName + " " + window.Server.App.LocalizationContent.SiteLetter, window.Server.App.LocalizationContent.SiteSuspendSuccess, 7000);
                }
                else if (action === "delete") {
                    if (!data.Value) {
                        SuccessAlert(actionName + " " + window.Server.App.LocalizationContent.SiteLetter,
                            window.Server.App.LocalizationContent.SiteDeleteSuccesswithoutdatabase,
                            7000);
                    } else {
                        SuccessAlert(actionName + " " + window.Server.App.LocalizationContent.SiteLetter,
                            window.Server.App.LocalizationContent.SiteDeleteSuccess,
                            7000);
                    }
                }
                else if (action === "activate") {
                    SuccessAlert(actionName + " " + window.Server.App.LocalizationContent.SiteLetter, window.Server.App.LocalizationContent.SiteActivatedSuccess, 7000);
                }
            }
            else {
                WarningAlert(actionName + " " + window.Server.App.LocalizationContent.SiteLetter, window.Server.App.LocalizationContent.SuspendOrDeleteSiteFailed.format(action), data.Message, 7000);
            }
            var tenantGridObj = document.getElementById('tenants_grid').ej2_instances[0];
            tenantGridObj.refresh();
        },
        complete: function () {
            hideWaitingPopup('messageBox');
            onCloseMessageBox();
        }
    });
}

function enableIsolationCode() {
    isolationCode = isIsolationCodeUpdated ? $("#isolation-code").val().trim() : isolationCode;
    var isEnabled = $("#isolation-enable-switch").is(":checked");
    if (isEnabled) {
        $("#isolation-code").removeAttr("disabled");
        $("#isolation-code").focus();
    } else {
        $("#isolation-code").attr('disabled', 'disabled');
        $("#isolation-code").val(isolationCode);
        $("#isolation-code-validation").html("");
        $("#isolation-code").removeClass("has-error");
        isIsolationCodeUpdated = false;
    }

    if ($("#isolation-code").val() == "" && isEnabled) {
        $("#update-isolation-code").attr("disabled", true);
        $("#isolation-code-validation").html(window.Server.App.LocalizationContent.IsolationCodeValidator);
    }
    else {
        if (isEnabled) {
            if (ValidateIsolationCode($("#isolation-code").val(), "#isolation-code")) {
                $("#isolation-code-validation").html("");
                $("#update-isolation-code").attr("disabled", false);
            }
        }
    }
}

var inputFields = [
    "#dashboards-limitation-textbox",
    "#schedule-limitation-textbox",
    "#data-source-limitation-textbox",
    "#slideshow-limitation-textbox"
];
function validateIntegerInput(inputElement, validationMessageElement) {
    var value = $(inputElement).val().trim();
    var isValid = value === '' || value === null || /^\d+$/.test(value);

    if (!isValid) {
        $(validationMessageElement).html(window.Server.App.LocalizationContent.ResourceLimitationValidator).show();
        $("#update-resource-limitation").prop("disabled", true);
        $(inputElement).addClass("has-error");
        return false;
    } else {
        $(validationMessageElement).html("").hide();
        $(inputElement).removeClass("has-error");
        $("#update-resource-limitation").prop("disabled", false);
        return true;
    }
}

function toggleInputFields() {
    var isEnabled = $("#resource-limitation-enable-switch").is(":checked");

    inputFields.forEach(function (field) {
        var value = $(field).val();
        var limitationValue = value ? value.trim() : '';
        if (isEnabled) {
            $(field).removeAttr("disabled");
        } else {
            $(field).attr("disabled", "disabled").val("");
            $(field).removeClass("has-error");
            $(field).siblings(".validation-message").html("").hide();
            $(field).val(limitationValue);
        }
    });
}

$("input[type='text']").on("input", function () {
    var validationMessageElement = $(this).siblings(".validation-message");
    validateIntegerInput(this, validationMessageElement);
});

$("#resource-limitation-enable-switch").change(function () {
    toggleInputFields();
    updateInfoMessage();
});

$("#update-resource-limitation").on("click", function () {
    var isValid = true;
    var isEnabled = $("#resource-limitation-enable-switch").is(":checked");
    var tenantInfoId =  $("#resource-limitation-enable-switch").attr("data-tenant-id");
    if (isEnabled){
        isValid = false;
        inputFields.forEach(function (field) {
            var validationMessageElement = $(field).siblings(".validation-message");
            isValid = validateIntegerInput(field, validationMessageElement);
        });
    }
    
    if (isValid){
        var resourceLimitationSettings = {
            isEnabled: isEnabled,
            dashboardsLimitation: $("#dashboards-limitation-textbox").val() ? $("#dashboards-limitation-textbox").val().trim() : "",
            scheduleLimitation: $("#schedule-limitation-textbox").val() ? $("#schedule-limitation-textbox").val().trim() : "",
            dataSourcesLimitation: $("#data-source-limitation-textbox").val() ? $("#data-source-limitation-textbox").val().trim() : "",
            slideShowLimitation: $("#slideshow-limitation-textbox").val() ? $("#slideshow-limitation-textbox").val().trim() : "",
        };
        showWaitingPopup("content-area");
        $.ajax({
            type: "POST",
            data: { tenantInfoId: tenantInfoId, resourceLimitationSettings: JSON.stringify(resourceLimitationSettings)},
            url: updateResourceLimitationUrl,
            success: function (result) {
                if (result.Status) {
                    SuccessAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.ResourceLimitationSuccess, 7000);
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.ResourceLimitationFailed, 7000);
                }
                hideWaitingPopup("content-area");
            }
        });
    }
});

function updateInfoMessage() {
    var isEnabled = $("#resource-limitation-enable-switch").is(":checked");
    var infoMessage = document.getElementById('tenant-info-message');
    if (infoMessage != null){
        if (isEnabled) {
            infoMessage.textContent = window.Server.App.LocalizationContent.ResourceEnabledInfoMessage;
        } else {
            infoMessage.textContent = window.Server.App.LocalizationContent.ResourceDisabledInfoMessage;
        }
    }
}
    
$(document).on("click", "#update-enable-aiservice", function () {
   var isAiServiceKeyEnabled= $("#aiservice-enable-switch").is(":checked");
   var isWidgetSummarizationEnabled= $("#widgetsummarization-enable-switch").is(":checked");
   var isDashboardInsightEnabled= $("#dashboardinsight-enable-switch").is(":checked");
   var tenantInfoId =  $("#aiservice-enable-switch").attr("data-tenant-id");
    showWaitingPopup("content-area");
    $.ajax({
        type: "POST",
        data: { tenantInfoId: tenantInfoId, isAIServiceEnabled: isAiServiceKeyEnabled, isWidgetSummarizationEnabled: isWidgetSummarizationEnabled, isDashboardInsightEnabled: isDashboardInsightEnabled },
        url: addIsAIServiceKeyEnableUrl,
        success: function (result) {
            if (result.Status) {
                if(isAiServiceKeyEnabled)
                {
                    SuccessAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.AiServiceEnabledSuccess, 7000);
                }
                else
                {
                    SuccessAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.AiServiceDisabledSuccess, 7000);
                }
            } else {
                if(isAiServiceKeyEnabled)
                {
                    WarningAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.AiServiceKeyError, 7000);
                }
                else
                {
                    WarningAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.AiServiceDisableError, 7000);
                }
            }
            hideWaitingPopup("content-area");
        }
    });
});
$(document).on("click", "#update-tenant-settings", function () {
    var globalSettingsOptions = [];
    $(".enable-disable").each(function () {
        if (this.id != "all-settings" && document.getElementById(this.id).ej2_instances[0].checked) {
            globalSettingsOptions.push(document.getElementById(this.id).ej2_instances[0].value);
        }
    });

    showWaitingPopup("content-area");
    $.ajax({
        type: "POST",
        data: { tenantInfoId: tenantInfoId, globalSettingsOptions: globalSettingsOptions },
        url: updateTenantSettingsUrl,
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.SiteSettingsSucess, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.SiteSettings, window.Server.App.LocalizationContent.SiteSettingsError, 7000);
            }
            hideWaitingPopup("content-area");
        }
    });
});

$(document).on("click", "#update-isolation-code", function (e) {
    var isolationCode = $("#isolation-code").val().trim();
    var tenantInfoId = $(".isolation-code-value").attr("data-tenant-id");
    var isIsolationCodeEnabled = $("#isolation-enable-switch").is(":checked");
    showWaitingPopup('content-area');
    $.ajax({
        type: "POST",
        data: { tenantInfoId: tenantInfoId, isolationCode: isolationCode, isIsolationCodeEnabled: isIsolationCodeEnabled },
        url: updateIsolationCodeUrl,
        success: function (result) {
            if (result.Status) {
                isIsolationCodeUpdated = true;
                SuccessAlert(window.Server.App.LocalizationContent.IsolationCode, window.Server.App.LocalizationContent.IsolationCodeSucess, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.IsolationCode, window.Server.App.LocalizationContent.IsolationCodeError, result.Message, 7000);
            }
            hideWaitingPopup('content-area');
        }
    });
});



$(document).on("keyup", "#isolation-code", function (e) {
    clearTimeout(validateTimer);
    validateTimer = setTimeout(validateCode, validateInterval);
});

$(document).on("keydown", "#isolation-code", function (e) {
    clearTimeout(validateTimer);
});

function validateCode() {
    ValidateIsolationCode($("#isolation-code").val(), "#isolation-code");
}

$(document).on("click", "#data-security", function (e) {
    enableIsolationCode();
});

function initializeEj2CheckBox(id) {
    var checkbox = new ejs.buttons.CheckBox({ created: onCreateGlobalSettings, cssClass: "e-check-box", change: onChangeGlobalSettings });
    checkbox.appendTo('#' + id);
}

function onCreateGlobalSettings() {
    if (this.element.id == "all-settings" && $("." + this.cssClass).find("#" + this.element.id).attr("indeterminate") == "indeterminate") {
        this.indeterminate = true;
    }
    else {
        this.checked = $("." + this.cssClass).find("#" + this.element.id).attr("checked") == "checked";
        this.value = $("." + this.cssClass).find("#" + this.element.id).attr("value");
    }
}

function changeIndeterminateState() {
    var checkedCount = 0;
    var unCheckedCount = 0;
    $(".enable-disable").each(function () {
        if (this.id != "all-settings") {
            if (document.getElementById(this.id).ej2_instances[0].checked) {
                checkedCount++;
            }
            else {
                unCheckedCount++
            }
        }
    });

    if (checkedCount > 0 && unCheckedCount > 0) {
        document.getElementById("all-settings").ej2_instances[0].indeterminate = true;
    }
    else if (checkedCount > 0 && unCheckedCount == 0) {
        document.getElementById("all-settings").ej2_instances[0].indeterminate = false;
        document.getElementById("all-settings").ej2_instances[0].checked = true;
    }
    else {
        document.getElementById("all-settings").ej2_instances[0].indeterminate = false;
        document.getElementById("all-settings").ej2_instances[0].checked = false;
    }
}

function onChangeGlobalSettings(args) {
    document.getElementById("all-settings").ej2_instances[0].indeterminate = false;
    if (this.element.id == "all-settings" && args.checked) {
        $(".enable-disable").each(function () {
            if (this.id !== "email" || (this.id === "email" && !canDisableEmailSettingsOption)) {
                document.getElementById(this.id).ej2_instances[0].checked = true;
            }
        });
    }
    else if (this.element.id == "all-settings" && !args.checked) {
        document.getElementById("all-settings").ej2_instances[0].indeterminate = false;
        $(".enable-disable").each(function () {
            if (this.id !== "email" || (this.id === "email" && !canDisableEmailSettingsOption)) {
                document.getElementById(this.id).ej2_instances[0].checked = false;
            }
        });
    }
    else {
        changeIndeterminateState();
    }
}

$(document).on("click", "#new-user-button", function () {
    var usersgrid = document.getElementById('users_grid').ej2_instances[0];
    usersgrid.clearSelection();
});

$(document).on("click", "#edit-site-attribute", function () {
    event.preventDefault();
    editCustomAttribute(this);
});

$(document).on("click", "#remove-site-attribute", function () {
    event.preventDefault();
    deleteConfirmation(this);
});

$(document).on("click", "#add-custom-attribute", function () {
    openCustomAttributeDialog();
});

