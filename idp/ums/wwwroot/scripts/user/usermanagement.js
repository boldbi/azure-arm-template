﻿var isKeyUp = false;
var selectedUsers = [];
var gridUserData = [];
var users = [];
var singleUserRemove = false;
var singleUserSelectedId;
var selectedTenants = [];
var previousIndex = [];
var isSafari = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
var userAccessName = "";
var role = "";

$(document).ready(function () {
    $("#grant-user-button").on("click", onAddTenantsDialogOpen);
    $("#assign-user-role-button").on("click", onMakeMultipleAdminDialogOpen);
    var isFirstRequest = false;
    addPlacehoder("#search-area");
    createWaitingPopup('user_grid');
    createWaitingPopup('user-add-dialog');
    createWaitingPopup('movable-dialog'); 
    createWaitingPopup('user-delete-confirmation');
    createWaitingPopup('grant-access-dialog');
    createWaitingPopup('make-admin-confirmation');
    createWaitingPopup('multiple-admin-confirmation');
    createWaitingPopup('remove-admin-confirmation');
    createWaitingPopup('singleuser-delete-confirmation');

    var singleUserDeleteDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.DeleteUser,
        content: document.getElementById("singleuser-delete-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: deleteSingleUser, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onSingleDeleteDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false
    });
    singleUserDeleteDialog.appendTo("#singleuser-delete-confirmation");

    var makeAdminDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.AssignRole,
        content: document.getElementById("make-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: MakeSingleUserAdmin, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onMakeAdminDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        close: "onRefreshUserGrid"
    });
    makeAdminDialog.appendTo("#make-admin-confirmation");

    var makeMultipleAdminDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.AssignRole,
        content: document.getElementById("multiple-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: MakeMultipleUserAdmin, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onMultipleAdminDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        close: "onRefreshUserGrid"
    });
    makeMultipleAdminDialog.appendTo("#multiple-admin-confirmation");

    var removeAdminDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.RemoveRole,
        content: document.getElementById("remove-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: removeAdmin, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onRemoveAdminDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        close: "onRefreshUserGrid"
    });
    removeAdminDialog.appendTo("#remove-admin-confirmation");


    var grantAccessDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.GrantSiteAcessHeaderTitle,
        content: document.getElementById("add-tenants-dialog-content"),
        showCloseIcon: true,
        close: onAddTenantsDialogClose,
        buttons: [
            { click: onAddTenantsDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton } },
            { click: provideAccesstoTenants, buttonModel: { content: window.Server.App.LocalizationContent.GrantSiteAccessButton, isPrimary: true, cssClass: 'provide-access-button' } }
        ],
        width: "900px",
        height: "539px",
        isModal: true,
        closeOnEscape: true,
        animationSettings: { effect: 'Zoom' },
        visible: false,
    });
    grantAccessDialog.appendTo("#grant-access-dialog");

    var addTenantsReportDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.ManageUserAccess,
        content: document.getElementById("add-tenants-report-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: onTenantsReportDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.OKButton } }
        ],
        width: "900px",
        height: "300px",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        closeOnEscape: true,
        close: "onRefreshUserGrid"
    });
    addTenantsReportDialog.appendTo("#add-tenants-report-dialog");

    $(document).ready(function () {
        if (document.getElementById("existing-user-count") != null) {
            if ($("#existing-user-count").attr("data-value").toLowerCase() == "true" && $("#csv-file-error").attr("data-value").toLowerCase() != "error") {
                parent.messageBox("su-single-user", window.Server.App.LocalizationContent.ImportFromCSV, window.Server.App.LocalizationContent.NoDataInUploadedFile, "success", function () {
                    parent.onCloseMessageBox();
                });
                $("#import-button").attr("disabled", "disabled");
            }
        }
    });

    $(".user-delete-button").on("click", function () {
        $("#user-delete-confirmation").ejDialog("open");
    });

    $(document).on('click', "input#add-user", function () {
        var firstName = $("#firstname").val().trim();
        var userName = $("#username").val().trim().toLowerCase();
        var password = $("#new-password").val();
        var isValid = $("#dialog-container").valid();
        var emailid = $('#mailid').val().trim();
        $(".popover").hide();

        if (isValid) {
            $(".useradd-validation-messages").css("display", "none");
            var userGrid = document.getElementById('user_grid').ej2_instances[0];

            showWaitingPopup('user-add-dialog');

            var lastName = $('#lastname').val().trim();
            var values = { UserName: userName, Email: emailid.toLowerCase(), FirstName: firstName, LastName: lastName, Password: password }

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
                            type: "POST", url: postactionUrl, data: values,
                            success: function (data, result) {
                                if ($.type(data) == "object") {
                                    if (data.Data.result == "success") {
                                        hideWaitingPopup('user-add-dialog');
                                        $("#add-user").attr("disabled", "disabled");
                                        $("#create-user").removeClass("hide").addClass("show");
                                        $(".form input[type='text']").val('');
                                        var count = parent.$("#user-count-text").val();
                                        var currentVal = parseInt(count) + 1;
                                        parent.$("#user-count").html(currentVal);
                                        parent.$("#user-count-text").val(currentVal);
                                        onUserAddDialogClose();
                                        $.ajax({
                                            type: "POST",
                                            url: checkMailSettingUrl,
                                            success: function (result) {
                                                var messageText = "";
                                                if (result.activation == 0) {
                                                    SuccessAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.UserAddedActivated, 7000);
                                                }
                                                else if (result.result  && result.activation == 1) {
                                                    SuccessAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.UserAdded, 7000);
                                                }
                                                else if (!result.result  && result.isAdmin == true && result.activation == 1) {
                                                    WarningAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.UserActivationEmailCannotSent, null, 7000);
                                                }
                                                userGrid.refresh();
                                            }
                                        });
                                    }
                                    else if (data.IsUserLimitExceed) {
                                        hideWaitingPopup('user-add-dialog');
                                        $("#limit-user").ejDialog("open");
                                        $("#zero-user-acc").show();
                                    }
                                    else {
                                        WarningAlert(window.Server.App.LocalizationContent.AddUser, window.Server.App.LocalizationContent.InternalServerErrorTryAgain, data.Message, 7000);
                                        userGrid.refresh();
                                    }
                                    onUserAddDialogClose();
                                }
                                else {
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

    $(document).on("click", "#cancel-addgroup-button,#group-close-button", function () {
        parent.$(".modal[data-dialog='add-users-in-group'], .modal-backdrop, #user-add-dialog-wrapper").remove();
    });

    $(document).on("keyup", function (e) {
        if (e.keyCode == 27) {
            parent.$(".modal[data-dialog='add-users-in-group'], .modal-backdrop, #user-add-dialog-wrapper").remove();
        }
        if (e.keyCode == 13 && ($("#new-group").css("display") == "none")) {
            return false;
        } else if (e.keyCode == 13 && $("#existing-group").css("display") == "none") {
            return false;
        }
    });

    $(document).on("keydown", function (e) {
        if (e.keyCode == 13 && ($("#new-group").css("display") == "none")) {
            return false;
        } else if (e.keyCode == 13 && $("#existing-group").css("display") == "none") {
            return false;
        }
    });

    $("#user-delete-confirmation-wrapper,#user-delete-confirmation-overLay").keyup(function (e) {
        if (e.keyCode == 13) {
            MakeFlyDeleteUsers();
        }
    });

    $(document).on("click", "#assign-user-role-button", function () {
        document.getElementById("multiple-admin-confirmation").ej2_instances[0].show();
    });

    $(document).on("click", ".css-radio", function () {
        $(this).siblings("label").removeClass("notransition");
    });

    $(document).on("click", "#role-filter-option", function () {
        $(".role-filter").removeClass("hide");
        $(".role-filter").addClass("show");
    });

    $(document).on("click", "div.e-filterset", function () {
        $(".role-filter").removeClass("show");
        $(".role-filter").addClass("hide");
    });

    $(document).on("click", ".make-admin-button", function () {
        MakeSingleUserAdmin();
    });

    $(document).on("click", ".makemultiple-admin-button", function () {
        MakeMultipleUserAdmin();
    });

    $(document).on("click", ".remove-admin-button", function () {
        removeAdmin();
    });

});

function EmptyFile() {
    $("#grid-nodata-validation").css("display", "block");
}

function editUser(fulldata) {
    var specficuserdetails = fulldata;
    $("#user_name").val(specficuserdetails.UserName);
    $("#user_email").val(specficuserdetails.Email);
    var dtObj = new Date(parseInt((specficuserdetails.ModifiedDate).substring(6, ((specficuserdetails.ModifiedDate).length) - 2)));
    var formattedString = DateCustomFormat(window.dateFormat + " hh:mm:ss", dtObj);
    formattedString += (dtObj.getHours() >= 12) ? " PM" : " AM";
    $("#LastModified").html(formattedString);
    $("#user-profile-picture").attr('src', avatarUrl + "?Username=" + specficuserdetails.UserName + "&ImageSize=150");
    $("#upload-picture").attr("data-filename", specficuserdetails.Picture.replace("Content//images//profilepictures//" + specficuserdetails.UserName + "//", ""));

    if (fulldata.FirstName != null && fulldata.FirstName != "") {
        $("#user_firstname").val(fulldata.FirstName);
    }
    else {
        $("#user_firstname").val(specficuserdetails.FullName);
    }
    if (fulldata.LastName != null && fulldata.LastName != "") {
        $("#user_lastname").val(fulldata.LastName);
    }
    if (fulldata.Contact != null && fulldata.Contact != "") {
        $("#contact_no").val(fulldata.Contact);
    }
}

function fnOnUserGridLoad(args) {
    args.model.dataSource.adaptor = new ej.UrlAdaptor();
    args.model.enableTouch = false;
}

function fnbeforeDataBound(args) {
    if (args.count == 0 && !(args.actual.status)) {
        WarningAlert(window.Server.App.LocalizationContent.Users, window.Server.App.LocalizationContent.FailedToGetUsers, args.result, 7000);
    }
}

function fnOnUserRowSelected(args) {
    var usergrid = document.getElementById('user_grid').ej2_instances[0];
    var selectedUsers = usergrid.getSelectedRecords();
    if (usergrid.getSelectedRecords().length == 1 || usergrid.getSelectedRecords().length > 1) {
        if (selectedUsers.some(x => x.Role == "Admin")) {
            $("#assign-user-role-button").attr("disabled", true);
        }
        else {
            $("#assign-user-role-button").attr("disabled", false);
        }
    }

    if (usergrid.getSelectedRecords().length == 1 || usergrid.getSelectedRecords().length > 1) {
        $("#grant-user-button").attr("disabled", false);
    }
    else {
        $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
    }
}

function fnUserRowSelected(args) {
    var usergrid = document.getElementById('user_grid').ej2_instances[0];
    var selectedUsers = usergrid.getSelectedRecords();
    var loggeduser = $(".user-delete-button").attr("data-log-user").toLowerCase();
    if (usergrid.getSelectedRecords().length == 1) {
        jQuery.each(selectedUsers, function (index, record) {
            if (record.Email.toLowerCase() == loggeduser) {
                $(".user-delete-button").css("display", "none");
            }
            else {
                $(".user-delete-button").css("display", "block");
                $("#grant-user-button").css("disabled", true);
            }
        });
    }
    else if (usergrid.getSelectedRecords().length > 1) {
        $(".user-delete-button").css("display", "block");
        jQuery.each(selectedUsers, function (index, record) {
            if (record.Email.toLowerCase() == loggeduser) {
                $(".user-delete-button").css("display", "block");
                $("#grant-user-button").css("disabled", false);
                return false;
            }
        });
    }
}

function fnUserRecordClick(args) {
    var checkbox = args.row.find('.userList-grid-chkbx');
    checkbox.prop("checked", !checkbox.prop("checked"));
}

function fnOnUserGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-users").val();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnOnUserGridActionComplete(args) {
    $('[data-toggle="tooltip"]').tooltip();
    if (args.currentViewData.length == 0) {
        rowBound();
    }
}

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
    }
}

$(document).on("click", ".single-delete", function () {
    deleteSingleUser();
});

$(document).on("click", ".multiple-delete", function () {
    MakeFlyDeleteUsers();
});

function MakeFlyDeleteUsers() {
    showWaitingPopup('user-delete-confirmation');
    var userList = "";
    var usergrid = document.getElementById('user_grid').ej2_instances[0];
    var selectedRecords = usergrid.getSelectedRecords();
    var SingleOrMultiple = "";
    if (selectedRecords.length > 1)
        SingleOrMultiple = "s";
    var deleteUserCount = 0;
    jQuery.each(selectedRecords, function (index, record) {
        if (record.Email.toLowerCase() != $(".user-delete-button").attr("data-log-user").toLowerCase()) {
            deleteUserCount = deleteUserCount + 1;
            if (userList == "")
                userList = record.UserName;
            else
                userList = userList + "," + record.UserName;
        }
    });
    var values = "Users=" + userList;
    doAjaxPost("POST", deleteFromUserListUrl, values, function (data) {
        if (data.status) {
            hideWaitingPopup('user-delete-confirmation');
            parent.messageBox("su-open", window.Server.App.LocalizationContent.DeleteUsers, window.Server.App.LocalizationContent.UsersDeleted, "success", function () {
                var count = parent.$("#user-count-text").val();
                var currentVal = parseInt(count) - deleteUserCount;
                parent.$("#user-count").html(currentVal);
                parent.$("#user-count-text").val(currentVal);
                hideExternalUserIndication(data.ExternalUser);
                parent.onCloseMessageBox();
            });
            $("#user-delete-confirmation").ejDialog("close");
            onConfirmDeleteUser(selectedRecords.length);
        }
        else {
            hideWaitingPopup('user-delete-confirmation');
            parent.messageBox("su-open", window.Server.App.LocalizationContent.DeleteUsers, window.Server.App.LocalizationContent.UsersDeleteFailed, "success", function () {
                $("#user-delete-confirmation").ejDialog("close");
                parent.onCloseMessageBox();
            });
        }
    }, function () {
        hideWaitingPopup('user-delete-confirmation');
        parent.messageBox("su-open", window.Server.App.LocalizationContent.DeleteUsers, window.Server.App.LocalizationContent.UsersDeleteFailed, "error", function () {
            $("#user-delete-confirmation").ejDialog("close");
            parent.onCloseMessageBox();
        });
    });
}

function onConfirmDeleteUser(count) {
    var usergrid = document.getElementById('user_grid').ej2_instances[0];
    var currentPage = usergrid.pageSettings.currentPage;
    var pageSize = usergrid.pageSettings.pageSize;
    var totalRecordsCount = usergrid.pageSettings.totalRecordsCount;
    var lastPageRecordCount = usergrid.pageSettings.totalRecordsCount % usergrid.pageSettings.pageSize;
    if (lastPageRecordCount != 0 && lastPageRecordCount <= count) {
        usergrid.pageSettings.currentPage = currentPage - 1;
    }
    usergrid.refresh();
}

function returntoUserPage() {
    window.location.href = userPageUrl;
}

function CloseGroup() {
    parent.$("#popup-container,.modal-backdrop").text("");
    parent.$(".modal,.modal-backdrop").css("display", "none");
}

function onAddTenantsDialogOpen() {
    document.getElementById("grant-access-dialog").ej2_instances[0].show();

    if (document.getElementById('add_tenants_grid').ej2_instances == null) {
        var data = new ejs.data.DataManager({
            url: getItemsUrl + "?includeActiveSites=true",
            adaptor: new ejs.data.UrlAdaptor(),
            crossDomain: true
        });
        var addTenantsGrid = new ejs.grids.Grid({
            dataSource: data,
            gridLines: 'None',
            allowPaging: true,
            allowSorting: true,
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            pageSettings: { pageSize: 20 },
            rowSelecting: function (e) {
                this.multiSelectCtrlRequest = true;
            },
            load: fnOnApplicationGridLoad,
            created: fnCreate,
            actionBegin: fnOnApplicationGridActionBegin,
            actionComplete: fnOnApplicationGridActionComplete,
            enableHover: true,
            enableAltRow: false,
            rowDataBound: function () {
                var height = $(".e-gridcontent").height();
                if (height != null) {
                    rowBound();
                }
            },
            dataBound: function (args) {
                $('[data-toggle="tooltip"]').tooltip(
                    {
                        container: '#grant-access-dialog'
                    });
            },
            columns: [
                {
                    headerTemplate: "#admin-checkbox-header-template",
                    template: "#admin-checkbox-row-template",
                    width: 20,
                    allowFiltering: false
                },
                {
                    allowFiltering: false,
                    allowSorting: true,
                    template: "#application-name-template",
                    headerText: "Application Name",
                    width: 130,
                    headerTemplate: "#applicationname-header",
                    field: "TenantName",
                    type: "string"
                },
                {
                    allowFiltering: false,
                    template: "#application-url-template",
                    headerText: "Application URL",
                    width: 150,
                    headerTemplate: "#application-url-header",
                    field: "DNS",
                    type: "string"
                },
                {
                    template: '#application-tenant-template',
                    headerTemplate: '#application-tenant-header',
                    width: 110,
                    field: 'TenantType',
                    type: "string",
                }
            ]
        });
        addTenantsGrid.appendTo('#add_tenants_grid');
    }
    $(".provide-access-button").attr("disabled", "diasabled");
}

function fnCreate() {
    $("#admin-checkbox-header").change(headCheckboxOnChange);
}

function refreshTemplate() {
    $("#admin-checkbox-header").change(headCheckboxOnChange);
}

function headCheckboxOnChange() {
    var gridObj = document.getElementById('add_tenants_grid').ej2_instances[0];
    gridUserData = gridObj.currentViewData;
    if ($("#admin-checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRowsByRange(0, $(".checkbox-row").length);
        for (var i = 0; i < gridUserData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridUserData[i].Id), $.map(selectedTenants, JSON.stringify));
            if (index == -1) {
                selectedTenants.push(gridUserData[i].Id);
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
            var index = jQuery.inArray(JSON.stringify(gridUserData[i].Id), $.map(selectedTenants, JSON.stringify));
            if (index != -1) {
                selectedTenants.splice(index, 1);
            }
        }
        if (isSafari) {
            $(".admin-checkbox-header-label").removeClass("check");
        }
    }
    enableAccessButton();
}
function fnOnApplicationGridLoad(args) {
    isFirstRequest = true;
    var searchValue = $("#add-tenant-search").val();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnOnApplicationGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#add-tenant-search").val();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function fnOnApplicationGridActionComplete(args) {
    var gridObj = document.getElementById('add_tenants_grid').ej2_instances[0];
    var checkboxHeader = $("#admin-checkbox-header");
    var checkboxRow = $(".checkbox-row");
    checkboxHeader.prop("disabled", true).change(headCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType === "paging" || args.requestType === "sorting") {
        if (typeof gridObj.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.currentViewData.length; i++) {
                var record = gridObj.currentViewData[i];
                var rowUniId = record.Id;
                var index = jQuery.inArray(JSON.stringify(record.Id), $.map(selectedTenants, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_tenants_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_tenants_grid .checkbox-row#admin-row-check" + rowUniId).prop("checked", true);
                    gridObj.selectionModule.selectRow(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.currentViewData.length == 0);
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedTenants = [];
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
    $('[data-toggle="tooltip"]').tooltip();
}

$(document).on("change", ".checkbox-row", function () {
    var checkBoxList = $(".checkbox-row");
    var index = checkBoxList.index(this);
    var isChecked = $(this).is(":checked");
    var gridObj = document.getElementById('add_tenants_grid').ej2_instances[0];
    var checkboxHeader = $("#admin-checkbox-header");
    var currentId = $(this).attr("data-id");

    if (isChecked) {
        selectedTenants.push(currentId);
        previousIndex.push(index);
        gridObj.selectionModule.selectRows(previousIndex, index);
    }
    else {
        var arrayIndex = selectedTenants.indexOf(currentId);
        var previousArrayIndex = previousIndex.indexOf(index)
        selectedTenants.splice(arrayIndex, 1);
        previousIndex.splice(previousArrayIndex, 1);
        gridObj.selectionModule.selectRows(previousIndex);
    }
    gridAdminData = gridObj.currentViewData;
    var userRowCheckedCount = 0;
    for (i = 0; i <= gridAdminData.length - 1; i++) {
        if ($($("#add_tenants_grid .checkbox-row")[i]).is(":checked") == true) {
            userRowCheckedCount = userRowCheckedCount + 1;
        }
    }
    if (gridObj.getRows() != null) {
        checkboxHeader.prop("checked", gridAdminData.length === userRowCheckedCount);
    }
    enableAccessButton();
});

function enableAccessButton() {
    $(".provide-access-button").attr("disabled", selectedTenants.length === 0);
}

function onAddTenantsDialogClose() {
    var gridObj = document.getElementById('add_tenants_grid').ej2_instances[0];
    var userGrid = document.getElementById('user_grid').ej2_instances[0];
    userGrid.clearSelection();
    gridObj.clearSelection();
    gridObj.refresh();
    document.getElementById("grant-access-dialog").ej2_instances[0].hide();
    $("#add-tenant-search").val("");
    $("#add-user-search-area").find("span.su.su-inner-close.close-icon").css("display", "none");
    $("#add-user-search-area").find("span.su.su-search.search-icon").css("display", "block");
}

function provideAccesstoTenants() {
    if (selectedTenants.length > 0) {
        var userList = "";
        var usergrid = document.getElementById('user_grid').ej2_instances[0];
        var selectedRecords = usergrid.getSelectedRecords();
        jQuery.each(selectedRecords, function (index, record) {
            if (record.UserId.toLowerCase() != "") {
                if (userList == "")
                    userList = record.UserId;
                else
                    userList = userList + "," + record.UserId;
            }
        });
        var values = { "User": userList, "Tenant": selectedTenants.toString() };
        $("#grant-access-dialog").children(".e-spinner-pane").addClass("e-spin-show").addClass("e-spinner-bg").removeClass("e-spin-hide");
        $.ajax({
            type: "POST",
            url: grantAccessUrl,
            data: values,
            success: function (data) {
                $("#grant-access-dialog").children(".e-spinner-pane").removeClass("e-spin-show").removeClass("e-spinner-bg").addClass("e-spin-hide");
                $(".provide-access-button").attr("disabled", "disabled");
                var tenantsGrid = document.getElementById('add_tenants_grid').ej2_instances[0];
                tenantsGrid.refresh();
                onAddTenantsDialogClose();
                usergrid.clearSelection();
                onTenantsReportDialogOpen();
                userAccessName = data.fileName;
                $("#total-count").html(data.TenantsCount * data.UsersCount);
                $("#success-count").html(data.SuccessCount);
                $("#skip-count").html(data.SkipCount);
                $("#fail-count").html(data.FailCount);
                $("#status").html(data.Status);
                if (data.Status == "Success") {
                    $(".status-description").html("was successful. ");
                }
                else if (data.Status == "Failed") {
                    $(".status-description").html("failed. ");
                }
                else {
                    $(".status-description").html("was a partial success. ");
                }
            },
        });
    }
}

function onTenantsReportDialogOpen() {
    document.getElementById("add-tenants-report-dialog").ej2_instances[0].show();
}

$(document).on("click", ".report-download", function () {
    var fileName = userAccessName;
    $.ajax({
        type: "GET",
        url: window.baseRootUrl + "downloads/user_access/" + fileName,
        data: fileName,
        success: function (data) {
            window.location = window.baseRootUrl + "downloads/user_access/" + fileName;
        }
    });

});

function onTenantsReportDialogClose() {
    document.getElementById("add-tenants-report-dialog").ej2_instances[0].hide();
}

function onDeleteDialogClose() {
    $("#user-delete-confirmation").ejDialog("close");
}

function onDeleteDialogOpen() {
    $("#user-delete-confirmation").ejDialog("open");
    $("#user-delete-confirmation").focus();
}

function onSingleDeleteDialogOpen() {
    $("#singleuser-delete-confirmation").find("button.e-primary").addClass("critical-action-button");
    document.getElementById("singleuser-delete-confirmation").ej2_instances[0].show();
}

function onSingleDeleteDialogClose() {
    document.getElementById("singleuser-delete-confirmation").ej2_instances[0].hide();
}

function checkUserImported(t) {
    var ejGrid = $("#user_import_grid").data("ejGrid");
    if (typeof ejGrid != 'undefined' && ejGrid.getRows().length > 0) {
        $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("failed-msg-box-height").addClass("msg-box-height"); //Message box height adjustment 
        $(".message-content").removeClass("text-center");
        messageBox("su-single-user", window.Server.App.LocalizationContent.ImportFromCSV, window.Server.App.LocalizationContent.UserImportIncomplete, "error", function () {
            parent.onCloseMessageBox();
            window.location.href = $(t).attr("href");
        }, function () {
            parent.onCloseMessageBox();
            return false;
        });
        return false;
    } else {
        return true;
    }
}
function SaveUserListFromCSV() {
    $(".user-import-validation").hide();
    $("#grid-validation").css("display", "none");
    showWaitingPopup('content-area');
    var allUserList = $("#all-user-list").val();
    var userNames = "";
    var emailIds = "";
    for (var i = 0; i < $("td.user-name").length; i++) {
        if (userNames == "") {
            userNames = $("td.user-name")[i].textContent;
            if (isEmailRequired) {
                emailIds = $("td.email-id")[i].textContent;
            }
        }
        else {
            userNames = userNames + "," + $("td.user-name")[i].textContent;
            if (isEmailRequired) {
                emailIds = emailIds + "," + $("td.email-id")[i].textContent;
            }
        }
    }
    var importData = "";
    if (isEmailRequired) {
        importData = "&userNames=" + userNames + "&emailIds=" + emailIds + "&AllUSerList=" + allUserList;
    }
    else {
        importData = "&userNames=" + userNames + "&AllUSerList=" + allUserList;
    }
    $.ajax({
        type: "POST",
        url: saveSelectedCSVUserUrl,
        data: importData,
        success: function (result) {
            if (result.Status.toString().toLowerCase() == 'true') {
                if ($.type(result) == "object" && result.Data.length != 0) {
                    var gridObj = document.getElementById("user_import_grid").ej2_instances[0];
                    gridObj.showColumns("Error");
                    var nameObj = $("td.user-name");
                    for (var i = 0; i < result.Data.length; i++) {
                        if (!result.Data[i].IsExist && result.Data[i].DisplayMessage != "") {
                            var obj = $(nameObj[i]).siblings(":last");
                            obj.html("<ol>" + result.Data[i].DisplayMessage + "</ol>");
                        }
                    }
                    $('[data-toggle="tooltip"]').tooltip();
                    hideWaitingPopup('content-area');
                    $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("failed-msg-box-height").addClass("msg-box-height");//Message box height adjustment
                    $(".message-content").addClass("text-center");
                    messageBox("su-single-user", window.Server.App.LocalizationContent.ImportFromCSV, window.Server.App.LocalizationContent.DuplicateOrInvalidData, "success", function () {
                        parent.onCloseMessageBox();
                    });
                    $("#import-button").attr("disabled", "disabled");
                } else {
                    $(".import-file #user-import-validation-msg").css("display", "none");
                    var gridObj = document.getElementById("user_import_grid").ej2_instances[0]
                    gridObj.dataSource = [];
                    var messageText = result.activation == 0 ? " " + window.Server.App.LocalizationContent.UsersHasAddedActivated : " " + window.Server.App.LocalizationContent.UsersHasAdded;
                    $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("failed-msg-box-height").addClass("msg-box-height");//Message box height adjustment
                    $(".message-content").addClass("text-center");
                    messageBox("su-single-user", window.Server.App.LocalizationContent.ImportFromCSV, result.Count + messageText, "success", function () {
                        parent.onCloseMessageBox();
                        window.location.href = userPageUrl;
                    });
                    $("#import-button").attr("disabled", "disabled");
                    hideWaitingPopup('content-area');
                }
            } else {
                $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("msg-box-height").addClass("failed-msg-box-height");//Message box height adjustment               
                $(".message-content").addClass("text-center");
                messageBox("su-single-user", window.Server.App.LocalizationContent.ImportFromCSV, result.Message, "success", function () {
                    parent.onCloseMessageBox();
                });
                hideWaitingPopup('content-area');
            }
        }
    });
}

$(document).on("click", ".option-icon", function () {
    var loggeduser = $(".user-delete-button").attr("data-log-user");

    if ($(this).attr("data-content") == loggeduser) {
        $(".delete-class", ".make-admin", ".remove-admin").parent().css("display", "none");
    }
    else {
        $(".delete-class", ".make-admin", ".remove-admin").parent().css("display", "block");
    }
});

function deleteSingleUser() {
    showWaitingPopup('singleuser-delete-confirmation');
    var userId = $(".is-delete").attr("data-content");
    doAjaxPost("POST", deleteSingleFromUserListUrl, "UserId=" + userId, function (data) {
        if (data.status) {
            var count = parent.$("#user-count-text").val();
            var currentVal = parseInt(count) - 1;
            parent.$("#user-count").html(currentVal);
            parent.$("#user-count-text").val(currentVal);
            hideExternalUserIndication(data.ExternalUser);
            SuccessAlert(window.Server.App.LocalizationContent.DeleteUser, window.Server.App.LocalizationContent.UserHasDeleted, 7000);
            onConfirmDeleteUser("1");
            hideWaitingPopup('singleuser-delete-confirmation');
            onSingleDeleteDialogClose();
        } else {
            WarningAlert(window.Server.App.LocalizationContent.DeleteUser, window.Server.App.LocalizationContent.FailedToDeleteUser, data.Message, 7000);
            onSingleDeleteDialogClose();
        }
    });
}

function hideExternalUserIndication(externalUsers) {
    if (!externalUsers.HasAdUsers) {
        $("#ad-indication").html("");
    }
    if (!externalUsers.HasAzureAdUsers) {
        $("#azure-ad-indication").html("");
    }
    if (!externalUsers.HasDatabaseUsers) {
        $("#database-indication").html("");
    }
    if (!externalUsers.HasOAuthUsers) {
        $("#oauth-indication").html("");
    }
    if (!externalUsers.HasOpenIdUsers) {
        $("#openid-indication").html("");
    }
    if (!externalUsers.HasJwtSsoUsers) {
        $("#jwt-indication").html("");
    }
    if (!externalUsers.HasAzureAdB2CUsers) {
        $("#azureadb2c-indication").html("");
    }
}
$(document).on("click", "#trigger-file,#filename", function () {
    $("#filename").trigger("focus");
    $("#grid-validation-messages span").css("display", "none");
    $("#csvfile").trigger("click");
});

$(document).on("change", "#csvfile", function (e) {
    var value = $(this).val();
    if ($(this).val().substring($(this).val().lastIndexOf('.') + 1) != "csv") {
        $("#csv-upload").attr("disabled", true);
        $("#filename").val(window.Server.App.LocalizationContent.CsvFileValidator);
        $("#filename,#trigger-file").addClass("validation-message");
        $(".upload-box").addClass("e-error");
    } else {
        $("#csv-upload").attr("disabled", false);
        $("#user-import-validation-msg").css("display", "none");
        $("#filename,#trigger-file").removeClass("validation-message");
        $("#filename").val(value);
        $(".upload-box").removeClass("e-error");
        $('#csvfile').attr('title', value);
    }
});

$(document).on("click", ".search-user", function () {
    var gridObj = document.getElementById('user_grid').ej2_instances[0];
    gridObj.pageSettings.currentPage = 1;
    gridObj.refresh();
});

$(document).on("click", ".delete-class", function () {
    $(this).parent("li").addClass("is-delete");
    onSingleDeleteDialogOpen();
});

$(document).on("click", ".make-admin-class", function () {
    $(this).parent("li").addClass("make-admin");
    onMakeAdminDialogOpen();
});

$(document).on("click", ".remove-admin-class", function () {
    $(this).parent("li").addClass("remove-admin");
    onRemoveAdminDialogOpen();
});

function onMakeAdminDialogOpen() {
    document.getElementById("make-admin-confirmation").ej2_instances[0].show();
}

function onMakeMultipleAdminDialogOpen() {
    document.getElementById("multiple-admin-confirmation").ej2_instances[0].show();
}

function onRemoveAdminDialogOpen() {
    document.getElementById("remove-admin-confirmation").ej2_instances[0].show();
}

function onMakeAdminDialogClose() {
    document.getElementById("make-admin-confirmation").ej2_instances[0].hide();
}

function onRefreshUserGrid() {
    var userGrid = document.getElementById('user_grid').ej2_instances[0];
    userGrid.clearSelection();
    $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
}

function onRemoveAdminDialogClose() {
    document.getElementById("remove-admin-confirmation").ej2_instances[0].hide();
}

function onMultipleAdminDialogClose() {
    document.getElementById("multiple-admin-confirmation").ej2_instances[0].hide();
}

function MakeSingleUserAdmin() {
    var userId = $(".make-admin").attr("data-content");
    var userGrid = document.getElementById('user_grid').ej2_instances[0];
    showWaitingPopup('make-admin-confirmation');
    $.ajax({
        type: "POST",
        url: makeAdminUrl,
        data: "&users=" + userId,
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.AssignRole, window.Server.App.LocalizationContent.MakeAdmin, 7000)
                userGrid.refresh();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup('make-admin-confirmation')
                onMakeAdminDialogClose();
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.AssignRole, window.Server.App.LocalizationContent.MakeAdminError, result.Message, 7000)
                userGrid.refresh();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup('make-admin-confirmation')
                onMakeAdminDialogClose();
            }
        }
    });

}

function MakeMultipleUserAdmin() {
    var userGrid = document.getElementById('user_grid').ej2_instances[0];
    var userList = "";
    var selectedRecords = userGrid.getSelectedRecords();
    if (selectedRecords.length > 1)
        SingleOrMultiple = "s";
    jQuery.each(selectedRecords, function (index, record) {
        if (record.UserId.toLowerCase() != "") {
            if (userList == "")
                userList = record.UserId;
            else
                userList = userList + "," + record.UserId;
        }
    });
    showWaitingPopup('multiple-admin-confirmation');
    $.ajax({
        type: "POST",
        url: makeAdminUrl,
        data: "&users=" + userList,
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.AssignRole, window.Server.App.LocalizationContent.MakeAdmin, 7000)
                userGrid.refresh();
                userGrid.clearSelection();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup("multiple-admin-confirmation");
                onMultipleAdminDialogClose();
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.AssignRole, window.Server.App.LocalizationContent.MakeAdminError, result.Message, 7000)
                userGrid.refresh();
                userGrid.clearSelection();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup("multiple-admin-confirmation");
                onMultipleAdminDialogClose();
            }
        }
    });

}

function removeAdmin() {
    var userId = $(".remove-admin").attr("data-content");
    var userGrid = document.getElementById('user_grid').ej2_instances[0];
    showWaitingPopup('remove-admin-confirmation');
    $.ajax({
        type: "POST",
        url: removeAdminUrl,
        data: { "userId": userId },
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.RemoveRole, window.Server.App.LocalizationContent.RemoveAdmin, 7000)
                userGrid.refresh();
                hideWaitingPopup("remove-admin-confirmation");
                document.getElementById("remove-admin-confirmation").ej2_instances[0].hide();
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.RemoveRole, window.Server.App.LocalizationContent.RemoveAdminError, result.Message, 7000)
                userGrid.refresh();
                hideWaitingPopup("remove-admin-confirmation");
                document.getElementById("remove-admin-confirmation").ej2_instances[0].hide();
            }
        }
    });
}

function roleFilter() {
    if ($("#admin-checkbox").is(":checked")) {
        role = "Admin";
    }
    else if ($("#nonadmin-checkbox").is(":checked")) {
        role = "NonAdmin";
    }
    showWaitingPopup('user_grid');
    var userGrid = document.getElementById('user_grid').ej2_instances[0];
    $(".role-filter").removeClass("show");
    $(".role-filter").addClass("hide");
    $("#role-filter-option").closest("span").children(".e-filtericon").addClass("e-filteredicon").addClass("e-filternone");
    userGrid.refresh();
    hideWaitingPopup('user_grid');
}

function resetFilter() {
    showWaitingPopup('user_grid');
    role = "";
    var userGrid = document.getElementById('user_grid').ej2_instances[0];
    $('input[name=filter]').attr('checked', false);
    $(".role-filter").removeClass("show");
    $(".role-filter").addClass("hide");
    $("#role-filter-option").closest("span").children(".e-filtericon").removeClass("e-filteredicon").removeClass("e-filternone");
    userGrid.refresh();
    hideWaitingPopup("user_grid");
}

$(document).on("click", "#user-delete-dialog-close,#delete-dialog-close", function () {
    onDeleteDialogClose()();
});

$(document).on("click", "#import-button", SaveUserListFromCSV);
