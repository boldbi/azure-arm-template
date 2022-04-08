var isKeyUp = false;
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
    var isFirstRequest = false;
    addPlacehoder("#search-area");

    var singleUserDeleteDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.TM.App.LocalizationContent.DeleteUser + "</div>",
        content: document.getElementById("singleuser-delete-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: deleteSingleUser, buttonModel: { content: window.TM.App.LocalizationContent.YesButton, isPrimary:true } },
            { click: onSingleDeleteDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.NoButton } }
        ],
        width: "378px",
        height: "auto",
        isModal: true,
        visible: false
    });
    singleUserDeleteDialog.appendTo("#singleuser-delete-confirmation");

    $("#singleuser-delete-confirmation").ejWaitingPopup();

    $("#user-delete-confirmation").ejDialog({
        width: "378px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        showHeader: false,
        title: window.TM.App.LocalizationContent.DeleteUser,
        enableModal: true,
        close: "onDeleteDialogClose",
        closeOnEscape: true,
        open: "onDeleteDialogOpen"
    });

    var makeAdminDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.TM.App.LocalizationContent.AssignRole + "</div>",
        content: document.getElementById("make-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: MakeSingleUserAdmin, buttonModel: { content: window.TM.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onMakeAdminDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.NoButton } }
        ],
        width: "378px",
        height: "auto",
        isModal: true,
        visible: false,
        close: "onRefreshUserGrid"
    });
    makeAdminDialog.appendTo("#make-admin-confirmation");

    var makeMultipleAdminDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.TM.App.LocalizationContent.AssignRole + "</div>",
        content: document.getElementById("multiple-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: MakeMultipleUserAdmin, buttonModel: { content: window.TM.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onMultipleAdminDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.NoButton } }
        ],
        width: "378px",
        height: "auto",
        isModal: true,
        visible: false,
        close: "onRefreshUserGrid"
    });
    makeMultipleAdminDialog.appendTo("#multiple-admin-confirmation");

    var removeAdminDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.TM.App.LocalizationContent.RemoveRole + "</div>",
        content: document.getElementById("remove-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: removeAdmin, buttonModel: { content: window.TM.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onRemoveAdminDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.NoButton } }
        ],
        width: "378px",
        height: "auto",
        isModal: true,
        visible: false,
        close: "onRefreshUserGrid"
    });
    removeAdminDialog.appendTo("#remove-admin-confirmation");


    var grantAccessDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.TM.App.LocalizationContent.GrantSiteAcessHeaderTitle + " </div>",
        content: document.getElementById("add-tenants-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: provideAccesstoTenants, buttonModel: { content: window.TM.App.LocalizationContent.GrantSiteAccessButton, isPrimary: true } },
            { click: onAddTenantsDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.CancelButton } }
        ],
        width: "900px",
        height: "539px",
        isModal: true,
        visible: false,
    });
    grantAccessDialog.appendTo("#grant-access-dialog");

    var addTenantsReportDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.TM.App.LocalizationContent.ManageUserAccess + " </div>",
        content: document.getElementById("add-tenants-report-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: onTenantsReportDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.CancelButton } }
        ],
        width: "900px",
        height: "300px",
        allowDragging: true,
        isModal: true,
        visible: false,
        closeOnEscape: true,
        close: "onRefreshUserGrid"
    });
    addTenantsReportDialog.appendTo("#add-tenants-report-dialog");

    $(document).ready(function () {
        if (document.getElementById("existing-user-count") != null) {
            if ($("#existing-user-count").attr("data-value").toLowerCase() == "true" && $("#csv-file-error").attr("data-value").toLowerCase() != "error") {
                parent.messageBox("su-single-user", window.TM.App.LocalizationContent.ImportFromCSV, window.TM.App.LocalizationContent.NoDataInUploadedFile, "success", function () {
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

        if (isValid) {
            $(".useradd-validation-messages").css("display", "none");
            var userGrid = $('#user_grid').data("ejGrid");

            showWaitingPopup("user-add-dialog_wrapper");

            var lastName = $('#lastname').val().trim();
            var values = "&userName=" + userName + "&emailid=" + emailid.toLowerCase() + "&firstname=" + firstName + "&lastname=" + lastName + "&password=" + password;

            $.ajax({
                type: "POST", url: isPresentUserNameAndEmailId, data: { userName: userName, emailId: emailid.toLowerCase() },
                success: function (data) {
                    if (data.IsUserNameExist || data.IsEmailExist) {
                        if (data.IsUserNameExist) {
                            $('#username').closest('div').addClass("has-error");
                            $("#invalid-username").html(window.TM.App.LocalizationContent.UsernameExists).css("display", "block");
                            $(".useradd-validation-messages").css("display", "block");
                            hideWaitingPopup("user-add-dialog_wrapper");
                        }
                        if (data.IsEmailExist) {
                            $('#mailid').closest('div').addClass("has-error");
                            $("#invalid-email").html(window.TM.App.LocalizationContent.EmailAddressExists).css("display", "block");
                            $(".useradd-validation-messages").css("display", "block");
                            hideWaitingPopup("user-add-dialog_wrapper");
                        }
                        return;
                    }
                    else {
                        $.ajax({
                            type: "POST", url: postactionUrl, data: values,
                            success: function (data, result) {
                                if ($.type(data) == "object") {
                                    if (data.Data.result == "success") {
                                        hideWaitingPopup("user-add-dialog_wrapper");
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
                                                    SuccessAlert(window.TM.App.LocalizationContent.AddUser, window.TM.App.LocalizationContent.UserAddedActivated, 7000);
                                                }
                                                else if (result.result == "success" && result.activation == 1) {
                                                    SuccessAlert(window.TM.App.LocalizationContent.AddUser, window.TM.App.LocalizationContent.UserAdded, 7000);
                                                }
                                                else if (result.result == "failure" && result.isAdmin == true && result.activation == 1) {
                                                    WarningAlert(window.TM.App.LocalizationContent.AddUser, window.TM.App.LocalizationContent.UserActivationEmailCannotSent, 7000);
                                                }
                                                userGrid.refreshContent();
                                            }
                                        });
                                    }
                                    else if (data.IsUserLimitExceed) {
                                        hideWaitingPopup("user-add-dialog_wrapper");
                                        $("#limit-user").ejDialog("open");
                                        $("#zero-user-acc").show();
                                    }
                                    else {
                                        WarningAlert(window.TM.App.LocalizationContent.AddUser, window.TM.App.LocalizationContent.InternalServerErrorTryAgain, 7000);
                                        userGrid.refreshContent();
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
            if ($("#invalid-email").is(':visible')) {
                if (isEmailExist) {
                    $(".useradd-validation-messages").css("display", "none");
                    $('#username').closest('div').addClass("has-error");
                    $('#mailid').closest('div').addClass("has-error");
                    $("#invalid-email").html(window.TM.App.LocalizationContent.IsMailExist).css("display", "block");
                    $("#firstname").parent('div').removeClass("has-error");
                    $("#user-password").parent('div').removeClass("has-error");
                    isEmailExist = false;
                }
            }
            else {
                $(".useradd-validation-messages").css("display", "block");
            }
        }
    });

    $(document).on("click", "#addnew-group", function () {
        $(".group-validation").closest("div").removeClass("has-error");
        $("#existing-group").hide();
        $("#addnew-group").hide();
        $("#add-existing-group").show();
        $("#new-group").show();
    });

    $(document).on("click", "#add-existing-group", function () {
        $(".group-validation").css("display", "none");
        $("#existing-group").show();
        $("#add-existing-group").hide();
        $("#addnew-group").show();
        $("#new-group").hide();
    });

    $(document).on("click", "#cancel-addgroup-button,#group-close-button", function () {
        parent.$(".modal[data-dialog='add-users-in-group'], .modal-backdrop, #user-add-dialog-wrapper").remove();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            parent.$(".modal[data-dialog='add-users-in-group'], .modal-backdrop, #user-add-dialog-wrapper").remove();
        }
        if (e.keyCode == 13 && ($("#new-group").css("display") == "none")) {
            return false;
        } else if (e.keyCode == 13 && $("#existing-group").css("display") == "none") {
            AddUserGroup();
            return false;
        }
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 13 && ($("#new-group").css("display") == "none")) {
            return false;
        } else if (e.keyCode == 13 && $("#existing-group").css("display") == "none") {
            AddUserGroup();
            return false;
        }
    });

    $("#user-delete-confirmation-wrapper,#user-delete-confirmation-overLay").keyup(function (e) {
        if (e.keyCode == 13) {
            MakeFlyDeleteUsers();
        }
    });

    $(document).on("click", "#add-user-group-button", function () {
        AddUserGroup();
    });

    function AddUserGroup() {
        $("#group-name-validation").closest("div").addClass("has-error");
        var userGrid = $('#user_grid').data("ejGrid");
        showWaitingPopup("movable-dialog");
        if ($("#new-group").css("display") == "none") {
            var GroupNameDropdown = $("#groupname-dropdown").val();

            var GroupUsers = document.getElementsByName("hiddenUserName[]");
            var GrList = '';
            for (var t = 0; t < GroupUsers.length; t++) {
                if (GrList == '')
                    GrList = GroupUsers[t].value;
                else
                    GrList = GrList + "," + GroupUsers[t].value;
            }
            var values = "GroupId=" + GroupNameDropdown + "&GroupUsers=" + GrList;
            var msg = '';

            if (GroupNameDropdown == '') {
                msg += "Test";
                $("#groupname-dropdown").css("border", "1px solid #ff0000");
            } else
                $("#groupName-dropdown").css("border", "");
            doAjaxPost("POST", updateUserIntoGroupUrl, values, function (data) {
                hideWaitingPopup("movable-dialog");
                if ($.type(data) == "string") {
                    CloseGroup();
                    $("#success-message").append(data);
                    userGrid.refreshContent();
                } else {
                }
            });
        } else if ($("#existing-group").css("display") == "none") {
            var userGrid = $('#user_grid').data("ejGrid");
            var isValid = $(".new-group-form").valid();
            if (isValid) {
                doAjaxPost("POST", checkGroupnameUrl, { GroupName: $("#group-name").val() }, function (data) {
                    if (data.toLowerCase() != "true") {
                        var GroupName = $("#group-name").val();
                        var GroupColor = "";
                        var GroupDescription = $("#group-description").val();
                        var GroupUsers = document.getElementsByName("hiddenUserName[]");
                        var GrList = '';
                        for (var t = 0; t < GroupUsers.length; t++) {
                            if (GrList == '')
                                GrList = GroupUsers[t].value;
                            else
                                GrList = GrList + "," + GroupUsers[t].value;
                        }
                        var values = "GroupName=" + GroupName + "&GroupColor=" + GroupColor + "&GroupDescription=" + GroupDescription + "&GroupUsers=" + GrList;
                        doAjaxPost("POST", saveUserIntoGroupUrl, values, function (data) {
                            if ($.type(data) == "object") {
                                hideWaitingPopup("movable-dialog");
                                if (data.Data.status) {
                                    CloseGroup();
                                    $("#existing-group").show();
                                    $("#new-group").hide();
                                    userGrid.refreshContent();
                                } else {
                                }
                            }
                        });
                    } else {
                        hideWaitingPopup("movable-dialog");
                        $("#group-name-validation").html(window.TM.App.LocalizationContent.GroupExists).css("display", "block");
                        $("#group-name-validation").closest("div").addClass("has-error");
                    }
                });
            }
            else {
                hideWaitingPopup("movable-dialog");
            }
        }
    }

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

function fnOnUserRowSelected(args) {
    var usergrid = $('#user_grid').data("ejGrid");
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
    var usergrid = $('#user_grid').data("ejGrid");
    var selectedUsers = usergrid.getSelectedRecords();
    var loggeduser = $(".user-delete-button").attr("data-log-user").toLowerCase();
    if (usergrid.getSelectedRecords().length == 1) {
        jQuery.each(selectedUsers, function (index, record) {
            if (record.Email.toLowerCase() == loggeduser) {
                $("#add-user-in-group").removeClass("hide").addClass("show");
                $(".user-delete-button").css("display", "none");
            }
            else {
                $("#add-user-in-group").removeClass("hide").addClass("show");
                $(".user-delete-button").css("display", "block");
                $("#grant-user-").css("disabled", true);
            }
        });
    }
    else if (usergrid.getSelectedRecords().length > 1) {
        $('#add-user-in-group').removeClass("hide").addClass("show");
        $(".user-delete-button").css("display", "block");
        jQuery.each(selectedUsers, function (index, record) {
            if (record.Email.toLowerCase() == loggeduser) {
                $(".user-delete-button").css("display", "block");
                $("#grant-user-button").css("disabled", false);
                return false;
            }
        });
    }
    else {
        $('#add-user-in-group').removeClass("show").addClass("hide");
    }
}

function fnUserRecordClick(args) {
    var checkbox = args.row.find('.userList-grid-chkbx');
    checkbox.prop("checked", !checkbox.prop("checked"));
}

function fnOnUserGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-users").val();
    this.model.query._params.push({ key: "searchKey", value: searchValue });
    var filerSettings = [], i;

    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ 'PropertyName': column.field, 'FilterType': column.operator, 'FilterKey': column.value });
        }

        this.model.query._params.push({ key: "filterCollection", value: filerSettings });
    }
    if (role != "") {
        this.model.query._params.push({ key: "roleValue", value: role });
    }
}

function fnOnUserGridActionComplete(args) {
    $('[data-toggle="tooltip"]').tooltip();
    if (args.model.currentViewData.length == 0) {
        rowBound();
    }
    var usergrid = $('#user_grid').data("ejGrid");
    if (usergrid.getSelectedRecords().length != 0) {
        $("#add-user-in-group").removeClass("hide").addClass("show");
    }
    else {
        $("#add-user-in-group").removeClass("show").addClass("hide");
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



$(document).on("click", ".user-add-group", function () {

    $("body").ejWaitingPopup();
    $("body").ejWaitingPopup("show");

    setTimeout(function () {
        var container;
        $.ajax({
            type: "POST",
            url: getAddUserInGroupDialogUrl,
            data: {},
            async: false,
            success: function (result) {
                container = result;
            }
        });

        $("#content-area").append(container);
        var usergrid = $("#user_grid").data("ejGrid");
        addPlacehoder("#new-group");

        $.validator.addMethod("isValidName", function (value, element) {
            return IsValidName("name", value)
        }, "Please avoid special characters");

        $(".new-group-form").validate({
            errorElement: 'span',
            onkeyup: function (element) { $(element).valid(); },
            onfocusout: function (element) { $(element).valid(); },
            rules: {
                "group-name": {
                    isRequired: true,
                    isValidName: true
                }
            },
            highlight: function (element) {
                $(element).closest('div').addClass("has-error");
                $(".group-validation").css("display", "block");
            },
            unhighlight: function (element) {
                if ($(element).attr('name') == 'group-name') {
                    $(element).closest('div').removeClass('has-error');
                    $(element).closest('div').find("span").html("");
                }
            },
            errorPlacement: function (error, element) {
                $(element).closest('div').find("span").html(error.html());
            },
            messages: {
                "group-name": {
                    isRequired: window.TM.App.LocalizationContent.GroupNameValidator
                }
            }
        });
        var selectedUsers = usergrid.getSelectedRecords();
        var UserList = "";
        var GroupList = "";
        var groupList;
        $("#usersCount").html(selectedUsers.length);
        $("#add-existing-group").css("display", "none");
        jQuery.each(selectedUsers, function (index, record) {
            UserList += "<div class='RoleItems'><input type='hidden' name='hiddenUserName[]' value='" + record.UserId + "'>" + record.FirstName + " " + record.LastName + "</div>";
        });
        $("#modal-footer").append(UserList);
        $("#confirm-modal, .modal").css("display", "block");
        $(".modal-backdrop").fadeIn(function () {
            $(".modal-dialog").fadeIn();
            $(".modal.fade.in").css("display", "block");
        });
        $.ajax({
            type: "POST",
            url: getAllActiveGroupListUrl,
            data: {},
            async: false,
            success: function (result) {
                groupList = result;
            }
        });
        for (var g = 0; g < groupList.length; g++) {
            GroupList += "<option value='" + groupList[g].GroupId + "'>" + groupList[g].GroupName + "</option>";
        }
        $("#groupname-dropdown").append(GroupList);
        $("#groupname-dropdown").selectpicker("refresh");
        for (var i = 0; i < $("#existing-group .btn-group .dropdown-menu .selectpicker li").length; i++) {
            var hoveredtext = $("#existing-group .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
            $("#existing-group .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
        }
        //$("#groupname-dropdown").focus();
        $("body").ejWaitingPopup("hide");
    }, 1500);
});

function MakeFlyDeleteUsers() {
    showWaitingPopup("user-delete-confirmation");
    var userList = "";
    var usergrid = $('#user_grid').data("ejGrid");
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
            hideWaitingPopup("user-delete-confirmation");
            parent.messageBox("su-open", window.TM.App.LocalizationContent.DeleteUsers, window.TM.App.LocalizationContent.UsersDeleted, "success", function () {
                var count = parent.$("#user-count-text").val();
                var currentVal = parseInt(count) - deleteUserCount;
                parent.$("#user-count").html(currentVal);
                parent.$("#user-count-text").val(currentVal);
                if (data.AdUserCount == 0) {
                    $("#ad-indication").html("");
                }
                if (data.AzureADUserCount == 0) {
                    $("#azure-ad-indication").html("");
                }
                if (data.DatabaseUserCount == 0) {
                    $("#database-indication").html("");
                }
                parent.onCloseMessageBox();
            });
            $("#user-delete-confirmation").ejDialog("close");
            onConfirmDeleteUser(selectedRecords.length);
        }
        else {
            hideWaitingPopup("user-delete-confirmation");
            parent.messageBox("su-open", window.TM.App.LocalizationContent.DeleteUsers, window.TM.App.LocalizationContent.UsersDeleteFailed, "success", function () {
                $("#user-delete-confirmation").ejDialog("close");
                parent.onCloseMessageBox();
            });
        }
    }, function () {
        hideWaitingPopup("user-delete-confirmation");
        parent.messageBox("su-open", window.TM.App.LocalizationContent.DeleteUsers, window.TM.App.LocalizationContent.UsersDeleteFailed, "error", function () {
            $("#user-delete-confirmation").ejDialog("close");
            parent.onCloseMessageBox();
        });
    });
}

function onConfirmDeleteUser(count) {
    var usergrid = $('#user_grid').data("ejGrid");
    var currentPage = usergrid.model.pageSettings.currentPage;
    var pageSize = usergrid.model.pageSettings.pageSize;
    var totalRecordsCount = usergrid.model.pageSettings.totalRecordsCount;
    var lastPageRecordCount = usergrid.model.pageSettings.totalRecordsCount % usergrid.model.pageSettings.pageSize;
    if (lastPageRecordCount != 0 && lastPageRecordCount <= count) {
        usergrid.model.pageSettings.currentPage = currentPage - 1;
    }
    usergrid.refreshContent();
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
    var data = ej.DataManager({
        url: getItemsUrl + "?includeActiveSites=true",
        adaptor: new ej.UrlAdaptor()
    });
    $("#add_tenants_grid").ejGrid({
        dataSource: data,
        gridLines: ej.Grid.GridLines.None,
        allowPaging: true,
        allowSorting: true,
        allowSearching: true,
        allowSelection: true,
        allowFiltering: false,
        enableAltRow: false,
        pageSettings: { pageSize: 20 },
        filterSettings: { filterType: "menu" },
        selectionType: ej.Grid.SelectionType.Multiple,
        selectionSettings: { selectionMode: ["row"] },
        enableRowHover: true,
        enableAltRow: false,
        create: "fnCreate",
        rowDataBound: function () {
            var height = $(".e-gridcontent").height();
            if (height != null) {
                rowBound();
            }
        },
        dataBound: function (args) {
            $("[data-toggle='tooltip']").tooltip();
        },
        rowSelecting: function (e) {
            this.multiSelectCtrlRequest = true;
        },
        load: "fnOnApplicationGridLoad",
        templateRefresh: "refreshTemplate",
        actionBegin: "fnOnApplicationGridActionBegin",
        actionComplete: "fnOnApplicationGridActionComplete",
        columns: [
            {
                headerTemplateID: "#admin-checkbox-header-template",
                template: true,
                templateID: "#admin-checkbox-row-template",
                textAlign: ej.TextAlign.Center,
                width: 15,
                allowFiltering: false
            },
            {
                template: true,
                allowFiltering: false,
                allowSorting: true,
                templateID: "#application-name-template",
                headerText: "Application Name",
                width: 155,
                headerTemplateID: "#applicationname-header",
                field: "TenantName",
                type: "string"
            },
            {
                template: true,
                allowFiltering: false,
                templateID: "#application-url-template",
                headerText: "Application URL",
                width: 150,
                headerTemplateID: "#application-url-header",
                field: "DNS",
                type: "string"
            }

        ]

    });
}

function fnCreate() {
    $("#admin-checkbox-header").change(headCheckboxOnChange);
}

function refreshTemplate() {
    $("#admin-checkbox-header").change(headCheckboxOnChange);
}

function headCheckboxOnChange() {
    var gridObj = $("#add_tenants_grid").data("ejGrid");
    gridUserData = gridObj.model.currentViewData;
    if ($("#admin-checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length);
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
    args.model.dataSource.adaptor = new ej.UrlAdaptor();
    args.model.enableTouch = false;
}

function fnOnApplicationGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#add-tenant-search").val();
    this.model.query._params.push({ key: "searchKey", value: searchValue });
    var filerSettings = [], i;

    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ 'PropertyName': column.field, 'FilterType': column.operator, 'FilterKey': column.value });
        }

        this.model.query._params.push({ key: "filterCollection", value: filerSettings });
    }
}

function fnOnApplicationGridActionComplete(args) {
    var gridObj = $("#add_tenants_grid").data("ejGrid");
    var checkboxHeader = $("#admin-checkbox-header");
    var checkboxRow = $(".checkbox-row");
    checkboxHeader.prop("disabled", true).change(headCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType === "paging" || args.requestType === "sorting") {
        if (typeof gridObj.model.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.Id;
                var index = jQuery.inArray(JSON.stringify(record.Id), $.map(selectedTenants, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_tenants_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_tenants_grid .checkbox-row#admin-row-check" + rowUniId).prop("checked", true);
                    gridObj.selectRows(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length == 0);
    }
    if (args.requestType == "refresh" || args.requestType == "filtering") {
        selectedTenants = [];
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length == 0);
    }

    if (args.requestType === "paging" || args.requestType === "sorting" || args.requestType === "refresh" || args.requestType === "filtering") {
        if ((gridObj.model.selectedRecords.length) == gridObj.model.currentViewData.length) {
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
    var isChecked = $(this).is(":checked")
    var gridObj = $("#add_tenants_grid").data("ejGrid");
    var checkboxHeader = $("#admin-checkbox-header");
    var currentId = $(this).attr("data-id");

    if (isChecked) {
        selectedTenants.push(currentId);
        previousIndex.push(index);
        gridObj.selectRows(previousIndex, index);
    }
    else {
        var arrayIndex = selectedTenants.indexOf(currentId);
        var previousArrayIndex = previousIndex.indexOf(index)
        selectedTenants.splice(arrayIndex, 1);
        previousIndex.splice(previousArrayIndex, 1);
        gridObj.selectRows(previousIndex);
    }
    gridAdminData = gridObj.model.currentViewData;
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
    $("#provide-access-button").attr("disabled", selectedTenants.length === 0);
}

function onAddTenantsDialogClose() {
    var gridObj = $('#add_tenants_grid').data("ejGrid");
    gridObj.clearSelection();
    document.getElementById("grant-access-dialog").ej2_instances[0].hide();
}

function provideAccesstoTenants() {
    var userList = "";
    var usergrid = $('#user_grid').data("ejGrid");
    var selectedRecords = usergrid.getSelectedRecords();
    jQuery.each(selectedRecords, function (index, record) {
        if (record.Email.toLowerCase() != "") {
            if (userList == "")
                userList = record.Email;
            else
                userList = userList + "," + record.Email;
        }
    });
    var values = { "User": userList, "Tenant": selectedTenants.toString() };
    showWaitingPopup("add_tenants_grid")
    $.ajax({
        type: "POST",
        url: grantAccessUrl,
        data: values,
        success: function (data) {
            hideWaitingPopup("add_tenants_grid");
            $("#provide-access-button").attr("disabled", "disabled");
            var tenantsGrid = $("#add_tenants_grid").data("ejGrid");
            tenantsGrid.refreshContent();
            onAddTenantsDialogClose();
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
    var gridRows = ejGrid.getRows();
    if (gridRows.length > 0) {
        $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("failed-msg-box-height").addClass("msg-box-height"); //Message box height adjustment 
        $(".message-content").removeClass("text-center");
        messageBox("su-single-user", window.TM.App.LocalizationContent.ImportFromCSV, window.TM.App.LocalizationContent.UserImportIncomplete, "error", function () {
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
    showWaitingPopup("content-area");
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
                    var gridObj = $("#user_import_grid").data("ejGrid");
                    gridObj.showColumns("Error");
                    var nameObj = $("td.user-name");
                    for (var i = 0; i < result.Data.length; i++) {
                        if (!result.Data[i].IsExist && result.Data[i].DisplayMessage != "") {
                            var obj = $(nameObj[i]).siblings(":last");
                            obj.html("<ol>" + result.Data[i].DisplayMessage + "</ol>");
                        }
                    }
                    $('[data-toggle="tooltip"]').tooltip();
                    hideWaitingPopup("content-area");
                    $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("failed-msg-box-height").addClass("msg-box-height");//Message box height adjustment
                    $(".message-content").addClass("text-center");
                    messageBox("su-single-user", window.TM.App.LocalizationContent.ImportFromCSV, window.TM.App.LocalizationContent.DuplicateOrInvalidData, "success", function () {
                        parent.onCloseMessageBox();
                    });
                    $("#import-button").attr("disabled", "disabled");
                } else {
                    $(".import-file #user-import-validation-msg").css("display", "none");
                    $("#user_import_grid").ejGrid("option", { dataSource: [] });
                    var messageText = result.activation == 0 ? " " + window.TM.App.LocalizationContent.UsersHasAddedActivated : " " + window.TM.App.LocalizationContent.UsersHasAdded;
                    $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("failed-msg-box-height").addClass("msg-box-height");//Message box height adjustment
                    $(".message-content").addClass("text-center");
                    messageBox("su-single-user", window.TM.App.LocalizationContent.ImportFromCSV, result.Count + messageText, "success", function () {
                        parent.onCloseMessageBox();
                        window.location.href = userPageUrl;
                    });
                    $("#import-button").attr("disabled", "disabled");
                    hideWaitingPopup("content-area");
                }
            } else {
                $("#messageBox_wrapper, .e-dialog-scroller, #messageBox").removeClass("msg-box-height").addClass("failed-msg-box-height");//Message box height adjustment               
                $(".message-content").addClass("text-center");
                messageBox("su-single-user", window.TM.App.LocalizationContent.ImportFromCSV, result.Message, "success", function () {
                    parent.onCloseMessageBox();
                });
                hideWaitingPopup("content-area");
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
    $("#singleuser-delete-confirmation").ejWaitingPopup("show");
    var userId = $(".is-delete").attr("data-content");
    doAjaxPost("POST", deleteSingleFromUserListUrl, "UserId=" + userId, function (data) {
        if (data.status) {
            var count = parent.$("#user-count-text").val();
            var currentVal = parseInt(count) - 1;
            parent.$("#user-count").html(currentVal);
            parent.$("#user-count-text").val(currentVal);
            if (data.AdUserCount == 0) {
                $("#ad-indication").html("");
            }
            if (data.AzureADUserCount == 0) {
                $("#azure-ad-indication").html("");
            }
            SuccessAlert(window.TM.App.LocalizationContent.DeleteUser, window.TM.App.LocalizationContent.UserHasDeleted, 7000);
            onConfirmDeleteUser("1");
            $("#singleuser-delete-confirmation").ejWaitingPopup("hide");
            onSingleDeleteDialogClose();
        } else {
            WarningAlert(window.TM.App.LocalizationContent.DeleteUser, window.TM.App.LocalizationContent.FailedToDeleteUser, 7000);
            onSingleDeleteDialogClose();
        }
    });
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
        $("#filename").val(window.TM.App.LocalizationContent.CsvFileValidator).css("color", "#c94442");
        $("#filename,#trigger-file").addClass("error-file-upload");
    } else {
        $("#csv-upload").attr("disabled", false);
        $("#filename,#trigger-file").removeClass("error-file-upload");
        $("#filename").val(value).css("color", "#333");
        $('#csvfile').attr('title', value);
    }
});

$(document).on("click", ".search-user", function () {
    var gridObj = $("#user_grid").data("ejGrid");
    gridObj.model.pageSettings.currentPage = 1;
    gridObj.refreshContent();
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
    var userGrid = $("#user_grid").data("ejGrid");
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
    var userGrid = $('#user_grid').data("ejGrid");
    showWaitingPopup("make-admin-confirmation");
    $.ajax({
        type: "POST",
        url: makeAdminUrl,
        data: "&users=" + userId,
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.TM.App.LocalizationContent.AssignRole, window.TM.App.LocalizationContent.MakeAdmin, 7000)
                userGrid.refreshContent();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup("make-admin-confirmation")
                onMakeAdminDialogClose();
            }
            else {
                WarningAlert(window.TM.App.LocalizationContent.AssignRole, window.TM.App.LocalizationContent.MakeAdminError, 7000)
                userGrid.refreshContent();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup("make-admin-confirmation")
                onMakeAdminDialogClose();
            }
        }
    });

}

function MakeMultipleUserAdmin() {
    var userGrid = $('#user_grid').data("ejGrid");
    var userList = "";
    var usergrid = $('#user_grid').data("ejGrid");
    var selectedRecords = usergrid.getSelectedRecords();
    if (selectedRecords.length > 1)
        SingleOrMultiple = "s";
    jQuery.each(selectedRecords, function (index, record) {
        if (record.Email.toLowerCase() != "") {
            if (userList == "")
                userList = record.UserId;
            else
                userList = userList + "," + record.UserId;
        }
    });
    showWaitingPopup("multiple-admin-confirmation");
    $.ajax({
        type: "POST",
        url: makeAdminUrl,
        data: "&users=" + userList,
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.TM.App.LocalizationContent.AssignRole, window.TM.App.LocalizationContent.MakeAdmin, 7000)
                userGrid.refreshContent();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup("multiple-admin-confirmation");
                onMultipleAdminDialogClose();
            }
            else {
                WarningAlert(window.TM.App.LocalizationContent.AssignRole, window.TM.App.LocalizationContent.MakeAdminError, 7000)
                userGrid.refreshContent();
                $("#grant-user-button, #assign-user-role-button").attr("disabled", true);
                hideWaitingPopup("multiple-admin-confirmation");
                onMultipleAdminDialogClose();
            }
        }
    });

}

function removeAdmin() {
    var userId = $(".remove-admin").attr("data-content");
    var userGrid = $('#user_grid').data("ejGrid");
    showWaitingPopup("remove-admin-confirmation");
    $.ajax({
        type: "POST",
        url: removeAdminUrl,
        data: { "userId": userId },
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.TM.App.LocalizationContent.RemoveRole, window.TM.App.LocalizationContent.RemoveAdmin, 7000)
                userGrid.refreshContent();
                hideWaitingPopup("remove-admin-confirmation");
                document.getElementById("remove-admin-confirmation").ej2_instances[0].hide();
            }
            else {
                WarningAlert(window.TM.App.LocalizationContent.RemoveRole, window.TM.App.LocalizationContent.RemoveAdminError, 7000)
                userGrid.refreshContent();
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
    showWaitingPopup("user_grid");
    var userGrid = $("#user_grid").data("ejGrid");
    $(".role-filter").removeClass("show");
    $(".role-filter").addClass("hide");
    $("#role-filter-option").closest("span").children(".e-filtericon").addClass("e-filteredicon").addClass("e-filternone");
    userGrid.refreshContent();
    hideWaitingPopup("user_grid");
}

function resetFilter() {
    showWaitingPopup("user_grid");
    role = "";
    var userGrid = $("#user_grid").data("ejGrid");
    $('input[name=filter]').attr('checked', false);
    $(".role-filter").removeClass("show");
    $(".role-filter").addClass("hide");
    $("#role-filter-option").closest("span").children(".e-filtericon").removeClass("e-filteredicon").removeClass("e-filternone");
    userGrid.refreshContent();
    hideWaitingPopup("user_grid");
}