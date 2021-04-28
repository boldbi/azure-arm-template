$(document).ready(function () {
    $("#userprofile-delete-confirmation").ejDialog({
        width: "400px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        title: window.TM.App.LocalizationContent.DeleteUser,
        enableModal: true,
        close: "onDeleteDialogClose",
        closeOnEscape: true,
        open: "onDeleteDialogOpen"
    });
    $("#userprofile-delete-confirmation_wrapper").ejWaitingPopup();
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

