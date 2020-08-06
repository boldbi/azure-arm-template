$(document).ready(function () {
    $("#userprofile-delete-confirmation").ejDialog({
        width: "400px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        title: "Delete User",
        enableModal: true,
        close: "onDeleteDialogClose",
        closeOnEscape: true,
        open: "onDeleteDialogOpen"
    });
	var userProfileWaitingPopupTemplateId = createLoader("userprofile-delete-confirmation_wrapper");
    $("#userprofile-delete-confirmation_wrapper").ejWaitingPopup({ template:$("#" + userProfileWaitingPopupTemplateId) });
});

function onDeleteDialogClose() {
    $("#userprofile-delete-confirmation").ejDialog("close");
}

function onDeleteDialogOpen() {
    $("#userprofile-delete-confirmation").ejDialog("open");
}

function deleteSingleUser(userId) {
    doAjaxPost("POST", deleteSingleFromUserListUrl, "UserId=" + userId, function (data) {
        if (data.status) {
            window.location.href = userPageUrl;
        }
         $("#userprofile-delete-confirmation").ejDialog("close");
    });
}

